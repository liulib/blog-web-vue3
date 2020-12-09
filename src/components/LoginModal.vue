<!--
 * @Des          : 
 * @Author       : liulib
 * @Date         : 2020-12-09 11:11:20
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-09 15:06:19
-->
<template>
    <a-modal
        class="loginModal"
        width="20%"
        :title="dialogType ? '登录' : '注册'"
        v-model:visible="visiable"
        @cancel="handleCancel"
    >
        <a-form
            ref="loginForm"
            :model="form"
            :rules="rules"
            :label-col="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
            labelAlign="left"
        >
            <a-form-item ref="username" label="用户名" name="username">
                <a-input v-model:value="form.username" />
            </a-form-item>
            <a-form-item ref="password" label="密码" name="password">
                <a-input v-model:value="form.password" />
            </a-form-item>
            <a-form-item
                v-if="!dialogType"
                ref="confirmPassword"
                label="确认密码"
                name="confirmPassword"
            >
                <a-input v-model:value="form.confirmPassword" />
            </a-form-item>
            <a-form-item
                v-if="!dialogType"
                ref="email"
                label="邮箱"
                name="email"
            >
                <a-input v-model:value="form.email" />
            </a-form-item>
        </a-form>

        <template #footer>
            <template v-if="dialogType">
                <a-button
                    key="submit"
                    type="primary"
                    :loading="confirmLoading"
                    @click="handleLogin"
                >
                    登录
                </a-button>
            </template>
            <template v-else>
                <a-button
                    key="submit"
                    type="primary"
                    :loading="confirmLoading"
                    @click="handleRegister"
                >
                    注册
                </a-button>
            </template>

            <a-button
                key="submit"
                type="primary"
                :loading="confirmLoading"
                @click="handleGithubLogin"
            >
                github登录
            </a-button>
        </template>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

interface Iform {
    username: string
    password: string
    confirmPassword: string
    email: string
}

export default defineComponent({
    name: 'LoginModal',
    props: {
        dialogType: {
            type: Number,
            default: 0
        },
        dialogVisiable: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        // 对话框显示状态
        const visiable = computed(() => {
            return props.dialogVisiable
        })
        // 加载状态
        const confirmLoading = ref(false)
        // 表单对象
        const form = ref({
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        })
        // 表单验证规则
        const rules = ref({
            username: [
                {
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                },
                {
                    min: 5,
                    max: 20,
                    message: 'Length should be 5 to 20',
                    trigger: 'blur'
                }
            ],
            password: [
                {
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }
            ],
            confirmPassword: [
                {
                    required: true,
                    message: '请再次输入密码',
                    trigger: 'blur'
                }
            ],
            email: [
                {
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur'
                }
            ]
        })
        // 点击取消
        const handleCancel = () => {
            context.emit('handleCancel')
        }
        // 点击登录
        const handleLogin = () => {
            console.log('login')
        }
        // 点击github登录
        const handleGithubLogin = () => {
            console.log('github login')
        }
        // 点击注册
        const handleRegister = () => {
            console.log('register')
        }

        return {
            handleCancel,
            handleLogin,
            handleGithubLogin,
            handleRegister,
            confirmLoading,
            visiable,
            form,
            rules
        }
    }
})
</script>

<style lang="less" scoped>
.ant-modal-footer {
    .ant-btn-primary {
        display: block;
        width: 100%;
        margin: 0;
        margin-top: 10px;
    }
}
</style>