<script setup lang="ts">
import { computed, reactive, toRefs } from 'vue'
import { useStore } from "@/store"
import { useRouter } from 'vue-router';

import { SIDEBAR } from '@/configs/base-config';
import { BlogActionTypes } from '@/store/modules/blog/action-types'
import { message as Message } from 'ant-design-vue'

import { findTopicArticle } from '@/apis/article'
import { ITopArticleRes } from '@/apis/article/types'

const router = useRouter()
const store = useStore()

const tagList = computed(() => store.state.blog.tag);
if (tagList.value.length === 0) {
    store.dispatch(BlogActionTypes.getTag, undefined)
        .then()
        .catch(error => {
            Message.error(error)
        })
}

interface ITopic {
    topicArticleList: ITopArticleRes[]
}

let topicArticleState: ITopic = reactive({
    topicArticleList: []
})

const getTopicArticleListReq = async () => {
    try {
        topicArticleState.topicArticleList = await findTopicArticle()
    } catch (error) {
        Message.error(error as string)
    }

}

const { topicArticleList } = { ...toRefs(topicArticleState) }


const openInNew = (url) => {
    window.open(url);
}

getTopicArticleListReq()




</script>

<template>
    <div class="leftSideBarBox">
        <img class="logo" :src="SIDEBAR.avatar" alt="logo" />
        <h1 class="title">{{ SIDEBAR.title }}</h1>
        <h2 class="subTitle">{{ SIDEBAR.subTitle }}</h2>
        <div class="selfSiteBox">
            <div class="item" @click="openInNew('https://github.com/liulib')">
                <i :class="['iconfont icon-github', 'myIcon'].join(' ')" />
                <span>github</span>
            </div>
        </div>

        <ADivider orientation="left">热门文章</ADivider>
        <ul class="articleBox">
            <li
                class="articleLink"
                v-for="item in topicArticleList"
                :key="item.id"
                :title="item.title"
                @click="() => {
                    router.push({ name: 'front-article', params: { id: item.id } })
                }"
            >{{ item.title }}</li>
        </ul>

        <ADivider orientation="left">标签</ADivider>
        <div class="tagBox">
            <ATag
                class="tag"
                v-for="item in tagList"
                :key="item.id"
                :color="item.tagColor"
                @click="() => {
                    router.push({ name: 'front-tag', query: { tagId: item.id, tagName: item.tagName } })
                }"
            >{{ item.tagName }}</ATag>
        </div>
    </div>
</template>

<style lang="less" scoped>
.leftSideBarBox {
    text-align: center;
    border-right: 1px solid #ccc;
    height: calc(100vh - 64px - 36px - 40px);

    .logo {
        width: 132px;
        height: 132px;
        border-radius: 66px;
    }

    .myIcon {
        font-size: 20px;
        cursor: pointer;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        margin: 10px 0;
    }

    .subTitle {
        font-size: 16px;
        margin: 10px 0;
    }
    .selfSiteBox {
        display: flex;
        justify-content: center;

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            padding: 3px 6px;
            border-radius: 6px;
            &:hover {
                background-color: #eee;
            }
        }
    }

    .tagBox {
        padding: 0 10px;
        .tag {
            margin-bottom: 10px;
            cursor: pointer;
        }
    }

    .articleBox {
        .articleLink {
            padding: 10px 20px;
            cursor: pointer;
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: left;

            &:hover {
                background-color: #eee;
                color: #40a9ff;
            }
        }
    }
}
</style>