<script setup lang="ts">
import HeaderVue from './header/Header.vue'
import FooterVue from './footer/Footer.vue';
import ContentVue from './content/Content.vue';

</script>

<template>
    <ALayout class="container">
        <HeaderVue></HeaderVue>
        <ContentVue></ContentVue>
        <FooterVue></FooterVue>
    </ALayout>
</template>


<style lang="less" scoped>
.container {
    background-color: #fff;
}
</style>