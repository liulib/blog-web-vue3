<script setup lang="ts">
import { nextTick, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'

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
const state: IState = reactive({
    article: null,
    titles: []
})

const handleAnchorClick = (anchor) => {
    const { lineIndex } = anchor;

    const heading = preview.value?.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

    heading.scrollIntoView({ behavior: "smooth", block: "start" })
}

const getArticleDetail = async () => {
    state.article = await findArticleDetailById({ id: route.params.id })
}

getArticleDetail().then(() => {
    nextTick(() => {
        const dom = preview.value?.$el
        state.titles = generateTitles(dom)
        console.log(state.titles.length);
    })
})

const { article, titles } = { ...toRefs(state) }
</script>

<template>
    <div class="articleContainer">
        <div class="mdContainer" :style="titles.length > 0 ? 'padding-right: 280px;' : ''">
            <v-md-preview :text="article?.content" ref="preview"></v-md-preview>
        </div>

        <div class="navContainer" v-if="titles.length > 0">
            <div
                class="nav"
                v-for="anchor in titles"
                :title="anchor.title"
                :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
                @click="handleAnchorClick(anchor)"
            >{{ anchor.title }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@media only screen and(max-width: 1300px) {
    .mdContainer {
        padding-right: 20px !important;
    }
    .navContainer {
        display: none;
    }
}
.articleContainer {
    .navContainer {
        padding: 0 20px;
        width: 260px;
        position: fixed;
        right: 40px;
        top: 104px;
        bottom: 36px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 1px;
            background: #e8e8e8;
        }

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
</style>