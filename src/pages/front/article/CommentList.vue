<script lang="ts">
export default {
    name: 'CommentList',
}
</script>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { message as Message } from 'ant-design-vue'
import { useStore } from '@/store';


import { commentArticle } from '@/apis/article/index'
import { IComment } from '@/apis/article/types'
import { TimeFormat } from '@/utils/TimeFormat'


interface IProps {
    commentList: IComment[]
    articleId: number
}

const store = useStore()

const username = computed(() => store.state.user.username);

const props = defineProps<IProps>()
const emit = defineEmits(['handleReply'])

const formState = reactive({
    replyId: 0,
    articleId: 0,
    content: '',
    replyUserId: 0,
    replyUsername: ''
})

// 加载按钮状态
const submitting = ref(false)

// 监听点击评论事件
const handleSubmit = async () => {
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
        // 告诉父级刷新数据
        emit('handleReply')
        // 还原回复id 这样可以关闭对话框
        formState.replyId = 0
        formState.content = ''
    } catch (error) {
        Message.error(error as string)
    } finally {
        submitting.value = false
    }
}

// 监听取消事件
const handleCancel = () => {
    // 还原回复id 这样可以关闭对话框
    formState.replyId = 0
    formState.content = ''
}

// 监听点击回复事件 赋值参数
const replyTo = async (comment) => {
    if (username.value) {
        formState.replyId = comment.id
        formState.replyUserId = comment.commentUserId
    } else {
        Message.warning('请先登录')
    }
}

// 向父级发送事件
const handleReply = () => {
    // 告诉父级刷新数据
    emit('handleReply')
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
</script>


<template>
    <AComment v-for="comment in commentList" :key="comment.id">
        <template #actions>
            <span key="comment-nested-reply-to" @click="replyTo(comment)">回复</span>
        </template>
        <template #author>
            <a>{{ comment.replyUser ? `${comment.commentUser.username} 回复 @${comment.replyUser.username}` : comment.commentUser.username }}</a>
        </template>
        <template #avatar>
            <AAvatar :src="comment.commentUser.avatar" :alt="comment.commentUser.username" />
        </template>
        <template #datetime>
            <ATooltip :title="TimeFormat.getExpectFormat(comment.createdAt, { isUtc: true })">
                <span>{{ TimeFormat.fromNow(comment.createdAt, { isUtc: true }) }}</span>
            </ATooltip>
        </template>

        <template #content>
            <div class="commentContent">{{ comment.content }}</div>
        </template>

        <div class="reply-form" v-if="formState.replyId === comment.id">
            <ATextarea
                v-model:value="formState.content"
                :placeholder="`回复${comment.commentUser.username}...`"
                @keydown.enter.native="keyDown"
            />
            <div class="reply-form-controls">
                <span class="tip">Ctrl + Enter</span>
                <AButton @click="handleCancel" style="margin-right: 10px;">取消</AButton>
                <AButton
                    html-type="submit"
                    type="primary"
                    :loading="submitting"
                    @click="handleSubmit"
                >回复</AButton>
            </div>
        </div>

        <CommentList
            v-if="comment.children.length"
            :commentList="comment.children"
            :articleId="articleId"
            @handleReply="handleReply"
        ></CommentList>
    </AComment>
</template>


<style lang="less" scoped>
.commentContent {
    padding-top: 5px;
}
.reply-form {
    overflow: hidden;
    .reply-form-controls {
        float: right;
        padding: 10px 0;
        .tip {
            color: #c2c2c2;
            margin-right: 8px;
            font-size: 13px;
        }
    }
}
</style>