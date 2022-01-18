<script setup lang="ts">
import { nextTick, reactive, ref, toRefs, watch } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'

import { findArticleDetailById } from '@/apis/article'
import { IArticle } from '@/apis/article/types'

import { generateTitles } from '@/utils/generateTitles'

interface ITitle { title: string; lineIndex: string; indent: number }
interface IState {
    article: IArticle | null,
    titles: ITitle[]
}

const route = useRoute()
const preview = ref()
const mdContainerRef = ref()
const state: IState = reactive({
    article: null,
    titles: []
})

// 点击侧边栏跳转到指定位置 
const handleAnchorClick = (anchor) => {
    const { lineIndex } = anchor;

    const heading = preview.value?.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

    heading.scrollIntoView({ behavior: "smooth", block: "start" })
}

// 获取文章详情
const getArticleDetail = async () => {
    state.article = await findArticleDetailById({ id: route.params.id })
    nextTick(() => {
        const dom = preview.value?.$el
        state.titles = generateTitles(dom)
    })
}

// 初始化数据
getArticleDetail()

// 组件被复用时
let unWatch = watch(() => route.params, (value) => {
    // 获取数据
    getArticleDetail()
    // 将滚动条还原到顶部
    mdContainerRef.value.scrollIntoView({ behavior: "smooth", block: "start" })
})

// 离开页面的时候销毁掉unWatch 避免无用请求
onBeforeRouteLeave(() => {
    unWatch()
})

const { article, titles } = { ...toRefs(state) }
</script>

<template>
    <div class="articleContainer">
        <div
            class="mdContainer"
            :style="titles.length > 0 ? 'padding-right: 280px;' : ''"
            ref="mdContainerRef"
        >
            <v-md-preview :text="article?.content" ref="preview"></v-md-preview>
        </div>

        <div class="navContainerWrapper" v-if="titles.length > 0">
            <div class="navContainer">
                <div
                    class="nav"
                    v-for="anchor in titles"
                    :title="anchor.title"
                    :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
                    @click="handleAnchorClick(anchor)"
                >{{ anchor.title }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@media only screen and(max-width: 1300px) {
    .mdContainer {
        padding-right: 20px !important;
    }
    .navContainerWrapper {
        display: none;
    }
}
.articleContainer {
    .navContainerWrapper {
        position: fixed;
        width: 260px;
        right: 20px;
        top: 104px;
        bottom: 36px;
        &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 1px;
            background: #e8e8e8;
        }
        .navContainer {
            padding: 0 20px;
            height: 100%;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
            overflow-y: scroll;
            .nav {
                font-size: 14px;
                color: #8590a6;
                padding: 5px;
                cursor: pointer;
                &:hover {
                    color: #40a9ff;
                }
            }
        }
    }
}
</style>