<!--
 * @Des     : 分类和标签共用的页面
 * @Author  : liulib
 * @Date    : 2021-10-21 15:01:30
-->

<script setup lang="ts">
import { reactive, ref, computed, onMounted, toRefs, watch } from 'vue'
import { message as Message } from 'ant-design-vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import { IQueryArticleListReq } from '@/apis/article/types'
import { getArticleList } from '@/apis/article'


const route = useRoute()
const router = useRouter()

// 如果是正常跳转过来的都会有categoryName或者tagName，如果用户手动删除掉这个参数就会有bug，不考虑了
let type = ref('')
type.value = route.query.categoryName ? '分类' : '标签'


interface IState {
    articleList: any,
    total: number,
    pagination: any,
    spinning: Boolean
}

const state: IState = reactive({
    articleList: [],
    total: 0,
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
    spinning: false
})

const params = computed(() => {
    let params = {
        page: state.pagination.current,
        pageSize: state.pagination.pageSize,
        isDelete: 0
    }
    switch (type.value) {
        case '分类':
            params['categoryId'] = route.query.categoryId
            break
        case '标签':
            params['tagId'] = route.query.tagId
            break
    }
    return params
})

// 获取文章列表
const getArticleListReq = async () => {
    // 开启加载状态
    state.spinning = true
    try {
        const { list, total } = await getArticleList(params.value)
        state.articleList = list
        state.total = total
    } catch (error) {
        Message.error(error as string)
    } finally {
        state.spinning = false
    }
}

// 监听分页页码变化事件
const onPageChange = (val) => {
    state.pagination.current = val
    getArticleListReq()
}

// 初次进入
onMounted(() => {
    getArticleListReq()
})

// 组件被复用时
let unWatch = watch(() => route.query, (value) => {
    getArticleListReq()
})

// 离开页面的时候销毁掉unWatch 避免无用请求
onBeforeRouteLeave(() => {
    unWatch()
})

const { articleList, pagination, total } = { ...toRefs(state) }
</script>

<template>
    <div class="categoryBox">
        <ATimeline>
            <ATimelineItem class="lineItemBox">
                <span class="type">当前{{ type }}</span>
                <span
                    class="name"
                >{{ type === "分类" ? route.query.categoryName : route.query.tagName }}</span>
            </ATimelineItem>

            <ATimelineItem v-for="item in articleList">
                {{ item.createdAt.slice(5, 10) }}
                <a
                    class="aBox"
                    @click="() => { router.push({ name: 'front-article', params: { id: item.id } }) }"
                >{{ item.title }}</a>
            </ATimelineItem>
        </ATimeline>

        <APagination
            class="paginationBox"
            v-model:current="pagination.current"
            v-model:pageSize="pagination.pageSize"
            @change="onPageChange"
            :total="total"
        />
    </div>
</template>


<style lang="less" scoped>
.categoryBox {
    padding: 20px;

    .lineItemBox {
        height: 65px;
    }
    .type {
        font-size: 20px;
        color: #bbb;
        margin-right: 10px;
    }
    .name {
        font-size: 20px;
    }

    .paginationBox {
        margin-top: 20px;
    }
}
</style>