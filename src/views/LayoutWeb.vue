<!--
 * @Des          : web页面布局组件
 * @Author       : liulib
 * @Date         : 2020-12-08 14:38:06
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-09 09:27:19
-->
<template>
    <div class="layoutWebBox">
        <WebHeader></WebHeader>
        <router-view></router-view>
        <WebFooter></WebFooter>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WebHeader from '../components/WebHeader.vue'
import WebFooter from '../components/WebFooter.vue'

export default defineComponent({
    components: { WebHeader, WebFooter },
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped>
</style>