<script setup lang="ts">
import LoginModal from '../loginModal/LoginModal.vue'
import HeaderLeft from './HeaderLeft.vue'
import HeaderRight from './HeaderRight.vue'
</script>

<template>
    <header>
        <ALayoutHeader class="frontHeader">
            <LoginModal></LoginModal>
            <ARow>
                <ACol :xxl="4" :xl="5" :lg="5" :sm="4" :xs="24">
                    <HeaderLeft></HeaderLeft>
                </ACol>
                <ACol :xxl="20" :xl="19" :lg="19" :sm="20" :xs="0">
                    <HeaderRight></HeaderRight>
                </ACol>
            </ARow>
        </ALayoutHeader>
    </header>
</template>

<style lang="less" scoped>
.frontHeader {
    background-color: #fff;
    -webkit-box-shadow: 0 2px 8px #f0f1f2;
    box-shadow: 0 2px 8px #f0f1f2;
}
</style>