<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import { message as Message } from 'ant-design-vue'
import { useRouter } from 'vue-router';

import { IQueryArticleListReq } from '@/apis/article/types'
import { ClockCircleOutlined } from '@ant-design/icons-vue';
import { getArticleList } from '@/apis/article'

import { groupBy } from '@/utils/groupBy'

interface IState {
    articleList: any,
    total: number,
    params: IQueryArticleListReq;
    pagination: any,
    spinning: Boolean
}

const state: IState = reactive({
    articleList: [],
    total: 0,
    pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
    },
    params: {
        page: 1,
        pageSize: 20,
        isDelete: 0
    },
    spinning: false
})

const router = useRouter()

// 监听分页页码变化事件
const onPageChange = (val) => {
    state.pagination.current = val
    getArticleListReq()
}

// 获取文章列表
const getArticleListReq = async () => {
    // 开启加载状态
    state.spinning = true
    // 赋值分页
    state.params.page = state.pagination.current;
    state.params.pageSize = state.pagination.pageSize;
    try {
        const { list, total } = await getArticleList(state.params)
        state.articleList = groupBy(list, item => item.createdAt.slice(0, 4))
        state.total = total
    } catch (error) {
        Message.error(error as string)
    } finally {
        state.spinning = false
    }

}

getArticleListReq()

const { articleList, total, pagination, spinning } = { ...toRefs(state) }
</script>

<template>
    <div class="archiveBox">
        <ASpin v-if="spinning" :delay="100"></ASpin>
        <div v-else>
            <ATimeline>
                <ATimelineItem>Nice! {{ total }} posts in total. Keep on posting.</ATimelineItem>

                <template v-for="item in articleList">
                    <ATimelineItem class="lineItemBox" color="red">
                        <template #dot>
                            <ClockCircleOutlined style="font-size: 16px" />
                        </template>
                        <div class="yearBox">{{ item[0]['createdAt'].slice(0, 4) }}...</div>
                    </ATimelineItem>

                    <ATimelineItem v-for="article in item">
                        {{ article.createdAt.slice(5, 10) }}
                        <a
                            class="aBox"
                            @click="() => { router.push({ name: 'front-article', params: { id: article.id } }) }"
                        >{{ article.title }}</a>
                    </ATimelineItem>
                </template>
            </ATimeline>

            <APagination
                class="paginationBox"
                v-model:current="pagination.current"
                v-model:pageSize="pagination.pageSize"
                @change="onPageChange"
                :total="total"
            />
        </div>
    </div>
</template>

<style lang="less" scoped>
.archiveBox {
    padding: 20px;
    .lineItemBox {
        height: 65px;
    }
    .yearBox {
        font-size: 22px;
        font-weight: 600;
        position: relative;
        top: -4px;
    }
    .aBox {
        margin-left: 10px;
    }
    .paginationBox {
        margin-top: 20px;
    }
}
</style>