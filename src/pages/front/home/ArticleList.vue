<script setup lang="ts">
import { useRouter } from 'vue-router';

import { IArticle, } from '@/apis/article/types'
import { TimeFormat } from '@/utils/TimeFormat';

interface IProps {
    articleList: IArticle[]
}
withDefaults(defineProps<IProps>(), { articleList: () => [] })

const router = useRouter()

const handleClick = (article: number) => {
    router.push({ name: 'front-article', params: { id: article } })
}
</script>

<template>
    <div class="main-box">
        <article v-for="item in articleList" :key="item.id" class="article-box">
            <h1 class="header" @click="handleClick(item.id)">
                <ADivider orientation="left">
                    <span class="title">{{ item.title }}</span>
                    <span
                        class="create-time"
                    >{{ TimeFormat.getExpectFormat(item.createdAt, { format: "YYYY-MM-DD", isUtc: true }) }}</span>
                </ADivider>
            </h1>

            <div class="content" @click="handleClick(item.id)">
                <v-md-preview :text="item.brief" class="previewBox"></v-md-preview>
            </div>

            <div class="footer">
                <div class="footer-item">
                    <i class="iconfont icon-pinglun" />
                    {{ item.commentCount }}
                </div>

                <ADivider type="vertical" />

                <div class="footer-item">
                    <i class="iconfont icon-yueduliang" />
                    {{ item.viewCount }}
                </div>

                <ADivider type="vertical" v-if="item.tags.length > 0" />

                <div class="footer-item" v-if="item.tags.length > 0">
                    <i class="iconfont icon-24gl-tags" />
                    <ATag
                        v-for="tag in item.tags"
                        :key="tag.id"
                        :color="tag.tagColor"
                        @click="() => {
                            router.push({ name: 'front-tag', query: { tagId: tag.id, tagName: tag.tagName } })
                        }"
                    >{{ tag.tagName }}</ATag>
                </div>

                <ADivider type="vertical" />

                <div class="footer-item">
                    <i class="iconfont icon-fenlei" />
                    <ATag
                        color="blue"
                        @click="() => {
                            router.push({ name: 'front-category', query: { categoryId: item.category.id, categoryName: item.category.categoryName } })
                        }"
                    >{{ item.category.categoryName }}</ATag>
                </div>
            </div>
        </article>
    </div>
</template>


<style lang="less" scoped>
@media only screen and(max-width: 1300px) {
    .main-box {
        padding-right: 0px !important;
    }
}
.main-box {
    padding-right: 260px;
    .article-box {
        padding: 20px;
        border: 1px solid #ebedf0;
        margin: 0 20px 10px 20px;
        transition: all 0.2s linear;
        &:hover {
            cursor: pointer;
            background: #effbff;
            box-shadow: 0 15px 30px 0 rgb(0 0 0 / 10%);
        }

        &:hover ::v-deep(.previewBox) {
            .vuepress-markdown-body {
                transition: all 0.2s linear;
                background: #effbff;
            }
        }

        .header {
            color: #394d69;
            cursor: pointer;

            .title {
                font-size: 24px;
                font-weight: 600;
                margin-right: 20px;
            }
            .create-time {
                font-size: 12px;
                vertical-align: middle;
            }
        }

        .content {
            margin-top: 20px;
            ::v-deep(.previewBox) {
                .vuepress-markdown-body {
                    padding: 10px;
                    transition: all 0.2s linear;
                }
            }
        }

        .footer {
            display: flex;
            align-items: center;
            margin-top: 20px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
            .footer-item {
                i {
                    color: rgba(0, 0, 0, 0.7);
                    font-size: 14px;
                }
            }

            ::v-deep(.footer-item) {
                .ant-tag {
                    margin: 0 5px;
                }
            }
        }
    }
}
</style>