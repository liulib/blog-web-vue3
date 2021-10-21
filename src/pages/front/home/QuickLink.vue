<script setup lang="ts">
import { IArticle, } from '@/apis/article/types'
interface IProps {
    articleList: IArticle[]
}

withDefaults(defineProps<IProps>(), { articleList: () => [] })
</script>

<template>
    <aside class="quickLinkBox">
        <h1 class="quickAccess">快速导航</h1>
        <ul>
            <li v-for="item in articleList" class="jumpTo" :title="item.title">{{ item.title }}</li>
        </ul>
    </aside>
</template>


<style lang="less" scoped>
@media only screen and(max-width: 1300px) {
    .quickLinkBox {
        display: none;
    }
}

.quickLinkBox {
    padding-right: 10px;
    width: 260px;
    position: fixed;
    right: 20px;
    top: 104px;

    .quickAccess {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 16px;
        white-space: nowrap;
        text-align: center;
        position: relative;
        margin-bottom: 10px;
        &::before {
            content: "";
            position: absolute;
            left: 0;
            right: 70%;
            top: 50%;
            height: 1px;
            background: #e8e8e8;
        }
        &::after {
            content: "";
            position: absolute;
            left: 70%;
            right: 0;
            top: 50%;
            height: 1px;
            background: #e8e8e8;
        }
    }

    .jumpTo {
        color: #8590a6;
        padding: 8px 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
            color: #40a9ff;
            background-color: #f0f2f5;
            cursor: pointer;
        }
    }
}
</style>