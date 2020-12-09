<!--
 * @Des          : 
 * @Author       : liulib
 * @Date         : 2020-12-09 09:12:19
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-09 15:44:11
-->
<template>
    <a-layout-header class="headerBox">
        <a-row>
            <a-col :xxl="4" :xl="5" :lg="5" :sm="4" :xs="24">
                <h1 class="blogName">{{ BASE_CONFIG.HEADER_BLOG_NAME }}</h1>
            </a-col>
            <a-col
                :xxl="20"
                :xl="19"
                :lg="19"
                :sm="20"
                :xs="0"
                class="rightBox"
            >
                <div class="searchBox">
                    <a-input
                        v-model:value="value1"
                        placeholder="请输入搜索内容"
                        allow-clear
                        @change="onChange"
                    />
                </div>
                <div class="navBox">
                    <a-menu v-model:selectedKeys="current" mode="horizontal">
                        <a-menu-item v-for="item in BASE_CONFIG.NavList" :key="item.title">
                            {{ item.title }}
                        </a-menu-item>
                    </a-menu>
                </div>
                <div class="userInfoBox">
                    <template v-if="isLogin">
                        <a-button type="primary" ghost @click="showDialog(1)">
                            登录
                        </a-button>
                        <a-button type="danger" ghost @click="showDialog(0)">
                            注册
                        </a-button>
                    </template>
                    <template v-else>
                        <span>已登录</span>
                    </template>
                </div>
                <LoginModal
                    v-if="dialogVisiable"
                    :dialogType="dialogType"
                    :dialogVisiable="dialogVisiable"
                    @handleCancel="handleCancel"
                ></LoginModal>
            </a-col>
        </a-row>
    </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { BASE_CONFIG } from '../configs/base_config'
import LoginModal from '../components/LoginModal.vue'

export default defineComponent({
    name: 'WebHeader',
    components: { LoginModal },
    setup() {
        const data = reactive({
            value1: '',
            current: [],
            isLogin: true,
            dialogType: 0,
            dialogVisiable: false
        })
        const onChange = () => {
            console.log('object')
        }
        const showDialog = (type: number) => {
            data.dialogType = type
            data.dialogVisiable = true
        }
        const handleCancel = () => {
            data.dialogVisiable = false
        }
        const refData = toRefs(data)
        return {
            BASE_CONFIG,
            ...refData,
            onChange,
            showDialog,
            handleCancel
        }
    }
})
</script>

<style lang="less" scoped>
.ant-layout-header {
    padding: 0 50px 0 0;
}
.headerBox {
    background-color: #fff;

    .blogName {
        font-size: 28px;
        margin: 0;
        text-align: center;
    }
    .rightBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .searchBox {
            width: 200px;
            .ant-input-affix-wrapper {
                border: none;
                border-left: 1px solid #eee;
            }
            .ant-input-affix-wrapper-focused {
                box-shadow: none;
            }
        }
        .navBox {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            .ant-menu-horizontal {
                border-bottom: none;
            }
        }
        .userInfoBox {
            margin-left: 50px;
            width: 150px;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>