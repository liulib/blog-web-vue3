<!--
 * @Des          : 登录模态框，后台没写注册接口，将注册功能注释掉了
 * @Author       : liulib
 * @Date         : 2021-10-11 10:47:26
-->

<script setup lang="ts">
import { useStore } from '@/store'
import { computed, reactive, ref } from 'vue';
import { message as Message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router';

import { MutationType } from '@/store/modules/user/mutation-types'
import { LoginReq } from '@/apis/user/types'
import { UserActionTypes } from '@/store/modules/user/action-types';


interface IState {
    btnLoading: boolean,
    formState: LoginReq,
    formRules: any
}

const store = useStore()
const route = useRoute()
const router = useRouter()

const formRef = ref()

const loginModal = computed(() => store.state.user.loginModal);

const state = reactive<IState>({
    btnLoading: false,
    formState: {
        account: '',
        password: ''
    },
    formRules: {
        account: [
            {
                required: true,
                message: '请输入用户名'
            },
            {
                min: 6,
                max: 20,
                message: '长度为6~12个字符'
            }
        ],
        password: [
            {
                required: true,
                message: '请输入密码'
            },
            {
                min: 6,
                max: 20,
                message: '长度为6~12个字符'
            }
        ]
    }
})

const onSubmit = () => {
    state.btnLoading = true

    formRef.value
        .validate()
        .then(async () => {

            await store
                .dispatch(UserActionTypes.Login, state.formState)

            Message.success('登录成功！');

            store.commit(MutationType.SET_LOGIN_MODAL, { visible: false, type: 'login' })

            // 如果是重定向过来的则跳回到之前的页面
            const toPath = decodeURIComponent(
                (route.query?.redirect || '/') as string
            );

            router.replace(toPath).then(_ => {
                if (route.name == 'login') {
                    router.replace('/');
                }
            });

        })
        .catch((error) => {
            Message.error(error.message);
        })
        .finally(() => {
            state.btnLoading = false
        });
}

const handleGithubLogin = () => {
    window.open('http://github.com/login/oauth/authorize?client_id=8cfd838ae6ab49046df7', "_self")
}
</script>

<template>
    <AModal
        :title="loginModal.type === 'login' ? '登录' : '注册'"
        :visible="loginModal.visible"
        :width="400"
        :footer="null"
        @cancel="store.commit(MutationType.SET_LOGIN_MODAL, {
            visible: false,
            type: 'login'
        })"
    >
        <AForm ref="formRef" :model="state.formState" :rules="state.formRules">
            <AFormItem name="account">
                <AInput placeholder="请输入用户名" v-model:value="state.formState.account" />
            </AFormItem>

            <AFormItem name="password">
                <AInputPassword placeholder="请输入密码" v-model:value="state.formState.password" />
            </AFormItem>

            <AFormItem>
                <AButton
                    class="btnWidth100"
                    type="primary"
                    htmlType="submit"
                    :loading="state.btnLoading"
                    @click="onSubmit"
                >{{ loginModal.type === 'login' ? '登录' : '注册' }}</AButton>
            </AFormItem>

            <AFormItem>
                <AButton
                    class="btnWidth100"
                    type="primary"
                    htmlType="button"
                    @click="handleGithubLogin"
                >github登录</AButton>
            </AFormItem>
        </AForm>
    </AModal>
</template>

<style lang="less" scoped>
.btnWidth100 {
    width: 100%;
}
</style>







            <!-- <AFormItem
                v-if="loginModal.type === 'register'"
                name="confirmPassword"
                :rules="[
                    {
                        required: true,
                        message: '请确认密码'
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (
                                !value ||
                                getFieldValue('password') === value
                            ) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error('两次密码不一致')
                            );
                        }
                    })
                ]"
            >
                <AInputPassword placeholder="请确认密码" />
            </AFormItem>

            <AFormItem
                v-if="loginModal.type === 'register'"
                name="email"
                :rules="[
                    {
                        required: true,
                        message: '请输入邮箱'
                    },
                    {
                        type: 'email',
                        message: '邮箱格式不合法'
                    }
                ]"
            >
                <AInput placeholder="请输入邮箱" />
            </AFormItem>-->