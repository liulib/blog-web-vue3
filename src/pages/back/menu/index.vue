<template>
    <div class="menuContainer">
        <a-button type="primary" class="addButton" @click="showAddMenuModal(0)">新增菜单</a-button>
        <a-table :columns="columns" :data-source="menuTreeData" rowKey="id" :pagination="false">
            <template #parentId="{ record }">
                <span>{{ tmpParentName[record.parentId] }}</span>
            </template>
            <template #menuType="{ record }">
                <a-tag v-if="record.menuType === 0" color="#108ee9">目录</a-tag>
                <a-tag v-if="record.menuType === 1" color="#87d068">菜单</a-tag>
                <a-tag v-if="record.menuType === 2" color="#f50f50">按钮</a-tag>
            </template>
            <template #status="{ record }">
                <a-tag v-if="record.status === 0" color="warning">禁用</a-tag>
                <a-tag v-if="record.status === 1" color="success">正常</a-tag>
            </template>
            <template #isDelete="{ record }">
                <a-tag v-if="record.isDelete === 0" color="warning">否</a-tag>
                <a-tag v-if="record.isDelete === 1" color="success">是</a-tag>
            </template>
            <template #createdAt="{ text }">
                {{
                    TimeFormat.getExpectFormat(text, { isUtc: true })
                }}
            </template>
            <template #updatedAt="{ text }">
                {{
                    TimeFormat.getExpectFormat(text, { isUtc: true })
                }}
            </template>
            <template #operation="{ record }">
                <a-button
                    type="primary"
                    class="operationButton"
                    @click="showAddMenuModal(0, record)"
                >新增子菜单</a-button>
                <a-button danger @click="showAddMenuModal(1, record)">编辑</a-button>
            </template>
        </a-table>

        <MenuModal
            v-if="addMenuModalVisible && menuTreeData"
            :fields="addMenuParams"
            :treeData="menuTreeData"
            @closeAddMenuModal="closeAddMenuModal"
        ></MenuModal>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { message } from 'ant-design-vue';

import { Menu } from '@/store/modules/user/state';
import { getMenuAll } from '@/apis/menu/index';
import columns from './menuColumns';
import MenuModal from './MenuModal.vue';
import { sortTree } from '@/utils/sortTree';
import { toTree } from '@/utils/toTree';
import { TimeFormat } from '@/utils/TimeFormat';
import { parseParent } from '@/utils/parseParent';
import { useStore } from '@/store'
import { MutationType } from '@/store/modules/user/mutation-types';


interface dataProps {
    menuTreeData: Menu[] | null;
    tmpParentName: any;
    addMenuParams: addMenuParamsProps;
    addMenuModalVisible: boolean;
}

export interface addMenuParamsProps {
    id: number;
    parentId: number;
    menuName: string;
    menuType: number;
    status: number;
    url: string;
    perms: string;
    order: number;
    remark: string;
    isDelete: number;
}

export default defineComponent({
    name: 'Menu',
    components: { MenuModal },
    setup() {
        const data: dataProps = reactive({
            menuTreeData: null,
            tmpParentName: null,
            addMenuParams: {
                id: 0,
                parentId: 0,
                menuName: '',
                menuType: 0,
                status: 0,
                url: '',
                perms: '',
                order: 0,
                remark: '',
                isDelete: 0
            },
            addMenuModalVisible: false
        });

        const store = useStore();


        const getMenuAllReq = async () => {
            try {
                const res = await getMenuAll();

                data.menuTreeData = toTree<Menu>(res);
                sortTree<Menu>(data.menuTreeData);

                store.commit(MutationType.SET_MENU_LIST, data.menuTreeData);

                // 将父级名称保存为新对象，便于渲染
                data.tmpParentName = parseParent(res, 'menuName');
            } catch (error) {
                message.error(error as string);
            }
        };

        /**
         * @description: 处理数据传递给对话框并显示对话框
         * @param {*} type 0新增 1编辑
         */
        const showAddMenuModal = (type: number, editData?: addMenuParamsProps) => {
            //处理数据
            if (type) {
                for (let item in editData) {
                    data.addMenuParams[item] = editData[item];
                }
            } else {
                // 清空
                data.addMenuParams = {
                    id: 0,
                    parentId: 0,
                    menuName: '',
                    menuType: 0,
                    status: 0,
                    url: '',
                    perms: '',
                    order: 0,
                    remark: '',
                    isDelete: 0
                };
                // 新增子菜单则带上parentId
                if (editData) {
                    data.addMenuParams.parentId = editData['id'];
                }
            }
            // 显示对话框
            data.addMenuModalVisible = true;
        };

        const closeAddMenuModal = () => {
            // 关闭对话框
            data.addMenuModalVisible = false;
            // 请求最新数据
            getMenuAllReq();
        };

        getMenuAllReq();

        return {
            ...toRefs(data),
            columns,
            TimeFormat,
            showAddMenuModal,
            closeAddMenuModal
        };
    }
});
</script>

<style lang="less" scoped>
.menuContainer {
    .addButton {
        margin-bottom: 20px;
    }
    .operationButton {
        margin-right: 10px;
    }
}
</style>
