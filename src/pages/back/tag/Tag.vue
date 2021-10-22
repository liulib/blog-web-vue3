<script setup lang="ts">
import { reactive, toRefs } from 'vue';

import { TimeFormat } from '@/utils/TimeFormat';
import tagColumns from './tagColumns'
import { ITag } from '@/apis/Tag/types'
import { getAllTag } from '@/apis/tag'
import AddOrEditTagModal from './AddOrEditTagModal.vue'

interface IState {
    TagList: ITag[],
    tableLoading: boolean,
    modalVisable: boolean,
    addOrEditFields: ITag,
    pagination: any
}

const state: IState = reactive({
    TagList: [],
    tableLoading: false,
    modalVisable: false,
    addOrEditFields: {
        id: 0,
        tagName: '',
        tagDes: '',
        tagColor: '',
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

const getTagListReq = async () => {
    state.TagList = await getAllTag()
}

/**
 * @description: 显示新增，编辑对话框，如果有data则是编辑，否则是新增
 */
const showAddModal = (data?: ITag) => {
    if (data) {
        Object.keys(state.addOrEditFields).forEach(key => {
            state.addOrEditFields[key] = data[key]
        })
    } else {
        state.addOrEditFields = {
            id: 0,
            tagName: '',
            tagDes: '',
            tagColor: '',
            isDelete: 0,
        }
    }

    state.modalVisable = true
}

const handlePageChange = data => {
    state.pagination = data;
    getTagListReq();
};

const closeAddOrEditModal = (isLoad: boolean) => {
    if (isLoad) {
        getTagListReq();
    }

    state.modalVisable = false
}


getTagListReq()

const { TagList, tableLoading, pagination, modalVisable, addOrEditFields } = { ...toRefs(state) }
</script>

<template>
    <div class="TagContainer">
        <AButton type="primary" class="addButton" @click="showAddModal()">新增标签</AButton>
        <ATable
            :columns="tagColumns"
            :data-source="TagList"
            :loading="tableLoading"
            :pagination="pagination"
            @change="handlePageChange"
            rowKey="id"
        >
            <template #tagColor="{ record }">
                <ATag :color="record.tagColor">{{ record.tagColor }}</ATag>
            </template>
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
        <AddOrEditTagModal
            v-if="modalVisable"
            :addOrEditFields="addOrEditFields"
            @closeAddOrEditModal="closeAddOrEditModal"
        ></AddOrEditTagModal>
    </div>
</template>


<style lang="less" scoped>
.TagContainer {
    .addButton {
        margin-bottom: 20px;
    }
    .operationButton {
        margin-right: 10px;
    }
}
</style>