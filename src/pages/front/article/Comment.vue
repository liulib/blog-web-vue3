<script setup lang="ts">
import { reactive, ref, toRefs, computed, watch } from 'vue'
import { message as Message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { useStore } from '@/store';

import { commentArticle, getArticleComments } from '@/apis/article/index'
import { IComment } from '@/apis/article/types'
import CommentListVue from './CommentList.vue'


interface IProps {
    articleId: number
}

interface ICommentState {
    commentList: IComment[]
}

const store = useStore()

const username = computed(() => store.state.user.username);

const props = defineProps<IProps>()

const formState = reactive({
    replyId: 0,
    articleId: 0,
    content: ''
})

const submitting = ref(false)

// 点击评论按钮
const handleSubmit = async () => {
    if (username.value === '') {
        Message.warning('请先登录')
        return
    }

    if (formState.content === '') {
        Message.warning('评论内容不能为空')
        return
    }

    // 赋值文章id
    formState.articleId = props.articleId

    try {
        submitting.value = true
        await commentArticle(formState)
        Message.success('评论成功')
        // 刷新评论数据
        initCommentData()
        // 还原数据
        formState.content = ''
    } catch (error) {
        Message.error(error as string)
    } finally {
        submitting.value = false
    }
}

// 点击了外面 关闭回复对话框  v-clickOutside="clickOutside"
// const clickOutside = () => {
//     if (formState.replyId) {
//         formState.replyId = 0
//     }
// }

// 初始化文章评论数据
const commentState: ICommentState = reactive({
    commentList: []
})

// 监听子组件点击评论事件 刷新数据
const handleReply = () => {
    initCommentData()
}

// 将树转成列表 顺带将自己的children删除掉 
const dfsTreeToListFn = <T extends IComment>(tree: T[], result: T[] = []) => {
    if (!tree?.length) {
        return [];
    }
    tree.forEach((node) => {
        result.push(node);
        if (node.children) {
            dfsTreeToListFn(node.children, result);
            node.children = []
        }
    });
    return result;
};

// 初始化数据函数
const initCommentData = () => {
    getArticleComments({ articleId: props.articleId }).then((res) => {
        // 评论只显示两级 处理数据 将多层级树转成两层树 
        res.forEach(comment => {
            // 转树
            const treeData = comment.children
            const resultData: IComment[] = []

            dfsTreeToListFn(treeData, resultData)

            // 排序 最新的在最上面
            resultData.sort((a, b) => {
                if (dayjs(a.createdAt).isBefore(dayjs(b.createdAt))) {
                    return -1;
                }
                if (dayjs(a.createdAt).isAfter(dayjs(b.createdAt))) {
                    return 1;
                }
                return 0;
            })

            comment.children = resultData
        })
        // 赋值
        commentState.commentList = res
    }).catch(err => {
        Message.error(err)
    })
}

// 监听键盘事件
const keyDown = (e) => {
    //用户点击了ctrl+enter触发
    if (e.ctrlKey && e.keyCode == 13) {
        handleSubmit()
        //用户点击了enter触发
    } else {
        formState.content += '\n'
    }
}

// 监听articleId 变化了就刷新数据
watch(() => props.articleId, () => {
    // 获取数据
    initCommentData()
})

// 初始化评论数据
initCommentData()
const { commentList } = { ...toRefs(commentState) }
</script>

<template>
    <div class="CommentBox">
        <AComment>
            <template #content>
                <AFormItem>
                    <ATextarea
                        :rows="4"
                        v-model:value="formState.content"
                        @keydown.enter.native="keyDown"
                    />
                </AFormItem>

                <div style="text-align: right;">
                    <AButton
                        html-type="submit"
                        :loading="submitting"
                        type="primary"
                        @click="handleSubmit"
                    >添加评论</AButton>
                </div>
            </template>
        </AComment>

        <CommentListVue
            :commentList="commentList"
            :articleId="articleId"
            @handleReply="handleReply"
        ></CommentListVue>
    </div>
</template>

<style lang="less" scoped>
.CommentBox {
    padding: 10px 40px 20px 40px;
}
</style>