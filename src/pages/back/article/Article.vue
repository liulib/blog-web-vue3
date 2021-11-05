<script setup lang="ts">
import { reactive, toRefs, computed } from 'vue';
import { useStore } from "@/store"
import { message as Message } from 'ant-design-vue'

import { articleColumns } from './ArticleColumns'
import { IArticle, IQueryArticleListReq } from '@/apis/article/types'
import { getArticleList } from '@/apis/article'
import { IAddOrEditFieldsProps } from './types'

import AddOrEditArticleModalVue from './AddOrEditArticleModal.vue';
import { BlogActionTypes } from '@/store/modules/blog/action-types'
import { TimeFormat } from '@/utils/TimeFormat';


interface IState {
    addOrEditVisible: boolean,
    tableLoading: boolean,
    articleList: IArticle[],
    total: number,
    addOrEditFields: IAddOrEditFieldsProps,
    params: IQueryArticleListReq;
    pagination: any,
}

const store = useStore()

const state: IState = reactive({
    addOrEditVisible: false,
    tableLoading: false,
    articleList: [],
    total: 0,
    addOrEditFields: {
        id: 0,
        categoryId: undefined,
        title: '',
        brief: '',
        content: '',
        briefUrl: '',
        isDelete: 0,
        tags: []
    },
    pagination: {
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        total: 0,
        showTotal: total => `共 ${total} 条`
    },
    params: {
        page: 1,
        pageSize: 10,
        categoryId: undefined,
        tagId: undefined,
        isDelete: ''
    }
})

// 初始化的时候检测是否存在分类和标签数据，不存在则获取
// 可以放在modal中，网络比较慢就放在这边先加载了
const categoryList = computed(() => store.state.blog.category);
const tagList = computed(() => store.state.blog.tag);

if (categoryList.value.length === 0) {
    store.dispatch(BlogActionTypes.getCategory, undefined)
        .then()
        .catch(error => {
            Message.error(error)
        })
}
if (tagList.value.length === 0) {
    store.dispatch(BlogActionTypes.getTag, undefined)
        .then()
        .catch(error => {
            Message.error(error)
        })
}

const getArticleListReq = async () => {
    // 赋值分页
    state.params.page = state.pagination.current;
    state.params.pageSize = state.pagination.pageSize;
    try {
        const { list, total } = await getArticleList(state.params)
        state.articleList = list
        state.total = total
    } catch (error) {
        Message.error(error as string)
    }

}

const handlePageChange = data => {
    state.pagination = data;

    getArticleListReq()
};

/**
 * @description: 根据条件显示新增或者编辑对话框
 * @param {Number} type 0新增 1编辑
 */
const showAddOrEditModal = (type: number, editData?: IArticle) => {
    if (type === 1 && editData) {
        // 赋值数据
        const tmpData = JSON.parse(JSON.stringify(editData));
        // 处理tags
        tmpData['tags'] = tmpData['tags'].map((element: any) => {
            return element.id;
        });
        // 处理category
        tmpData['categoryId'] = tmpData['category']['id'];

        state.addOrEditFields = tmpData
    } else {
        state.addOrEditFields = {
            id: 0,
            categoryId: undefined,
            title: '',
            brief: '',
            content: '',
            briefUrl: '',
            isDelete: 0,
            tags: []
        }
    }

    state.addOrEditVisible = true
}

const closeAddOrEditModal = (flag: boolean) => {
    state.addOrEditVisible = false
    if (flag) {
        // 刷新数据
        state.pagination.current = 1
        getArticleListReq()
    }
}

const { addOrEditVisible, articleList, tableLoading, pagination, addOrEditFields } = { ...toRefs(state) }

// 初始化页面数据
getArticleListReq()
</script>


<template>
    <div class="articleManageContainer">
        <AButton type="primary" class="addButton" @click="showAddOrEditModal">新增文章</AButton>

        <ATable
            bordered
            :columns="articleColumns"
            :data-source="articleList"
            :loading="tableLoading"
            :pagination="pagination"
            rowKey="id"
            @change="handlePageChange"
        >
            <template #isDelete="{ record }">
                <ATag v-if="record.isDelete === 0" color="warning">否</ATag>
                <ATag v-if="record.isDelete === 1" color="success">是</ATag>
            </template>
            <template
                #createdAt="{ record }"
            >{{ TimeFormat.getExpectFormat(record.createdAt, { isUtc: true }) }}</template>

            <template
                #updatedAt="{ record }"
            >{{ TimeFormat.getExpectFormat(record.updatedAt, { isUtc: true }) }}</template>

            <template #operation="{ record }">
                <AButton @click="showAddOrEditModal(1, record)">编辑文章</AButton>
            </template>
        </ATable>

        <AddOrEditArticleModalVue
            v-if="addOrEditVisible"
            :addOrEditFields="addOrEditFields"
            @closeAddOrEditModal="closeAddOrEditModal"
        ></AddOrEditArticleModalVue>
    </div>
</template>


<style lang="less" scoped>
.articleManageContainer {
    .addButton {
        margin-bottom: 20px;
    }
    .operationButton {
        margin-right: 10px;
    }
}
</style>