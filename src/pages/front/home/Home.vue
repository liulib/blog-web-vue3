<script setup lang="ts">
import QuickLinkVue from './QuickLink.vue'
import ArticleListVue from './ArticleList.vue'

import { getArticleList } from '@/apis/article'
import { IArticle, IQueryArticleListReq, IQueryArticleListRes } from '@/apis/article/types'
import { reactive, toRefs } from 'vue';
import { message as Message } from 'ant-design-vue'

interface IState {
    tableLoading: boolean,
    articleList: IArticle[],
    total: number,
    params: IQueryArticleListReq,
}

const state: IState = reactive({
    tableLoading: false,
    articleList: [],
    total: 0,
    params: {
        page: 1,
        pageSize: 5,
        isDelete: 0
    },
})

const { articleList, total, params } = { ...toRefs(state) }


const getArticleListReq = async () => {
    try {
        const { list, total } = await getArticleList(state.params)
        state.articleList = list
        state.total = total
    } catch (error) {
        Message.error(error as string)
    }
}

const handlePageChange = page => {
    state.params.page = page;
    getArticleListReq()
};


getArticleListReq()
</script>

<template v-if="articleList.length > 0">
    <ArticleListVue :articleList="articleList"></ArticleListVue>

    <div class="pagination-box">
        <APagination
            :total="total"
            :show-total="total => `共 ${total} 篇文章`"
            :pageSize="params.pageSize"
            :current="params.page"
            @change="handlePageChange"
        />
    </div>

    <QuickLinkVue :articleList="articleList"></QuickLinkVue>
</template>

<style lang="less" scoped>
@media only screen and(max-width: 1300px) {
    .pagination-box {
        padding-right: 20px !important;
    }
}
.pagination-box {
    display: flex;
    justify-content: flex-end;
    padding-right: 280px;
    margin-bottom: 10px;
}
</style>

