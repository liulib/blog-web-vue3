<script setup lang="ts">
import { reactive, toRefs, computed } from 'vue';
import { message as Message } from 'ant-design-vue';

import { useStore } from "@/store"
import { TimeFormat } from '@/utils/TimeFormat';
import categoryColumns from './categoryColumns'
import { ICategory } from '@/apis/category/types'
import AddOrEditCategoryModal from './AddOrEditCategoryModal.vue'
import { BlogActionTypes } from '@/store/modules/blog/action-types'

interface IState {
    categoryList: ICategory[],
    tableLoading: boolean,
    modalVisible: boolean,
    addOrEditFields: ICategory,
    pagination: any
}

const state: IState = reactive({
    categoryList: [],
    tableLoading: false,
    modalVisible: false,
    addOrEditFields: {
        id: 0,
        categoryName: '',
        categoryDes: '',
        isDelete: 0,
    },
    pagination: {
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
    }
})

const store = useStore()

const getCategoryListReq = async () => {
    store.dispatch(BlogActionTypes.getCategory, undefined)
        .then((res) => {
            state.categoryList = res
        })
        .catch(error => {
            Message.error(error)
        })
    // state.categoryList = await getAllCategory()
}

/**
 * @description: 显示新增，编辑对话框，如果有data则是编辑，否则是新增
 */
const showAddModal = (data?: ICategory) => {
    if (data) {
        Object.keys(state.addOrEditFields).forEach(key => {
            state.addOrEditFields[key] = data[key]
        })
    } else {
        state.addOrEditFields = {
            id: 0,
            categoryName: '',
            categoryDes: '',
            isDelete: 0,
        }
    }

    state.modalVisible = true
}

const handlePageChange = data => {
    state.pagination = data;
    getCategoryListReq();
};

const closeAddOrEditModal = (isLoad: boolean) => {
    if (isLoad) {
        getCategoryListReq();
    }

    state.modalVisible = false
}


getCategoryListReq()

const { categoryList, tableLoading, pagination, modalVisible, addOrEditFields } = { ...toRefs(state) }
</script>

<template>
    <div class="categoryContainer">
        <AButton type="primary" class="addButton" @click="showAddModal()">新增分类</AButton>
        <ATable
            :columns="categoryColumns"
            :data-source="categoryList"
            :loading="tableLoading"
            :pagination="pagination"
            @change="handlePageChange"
            rowKey="id"
        >
            <template #isDelete="{ record }">
                <ATag v-if="record.isDelete === 0" color="warning">否</ATag>
                <ATag v-if="record.isDelete === 1" color="success">是</ATag>
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
                <AButton type="primary" @click="showAddModal(record)" class="operationButton">编辑</AButton>
            </template>
        </ATable>
        <AddOrEditCategoryModal
            v-if="modalVisible"
            :addOrEditFields="addOrEditFields"
            @closeAddOrEditModal="closeAddOrEditModal"
        ></AddOrEditCategoryModal>
    </div>
</template>


<style lang="less" scoped>
.categoryContainer {
    .addButton {
        margin-bottom: 20px;
    }
    .operationButton {
        margin-right: 10px;
    }
}
</style>