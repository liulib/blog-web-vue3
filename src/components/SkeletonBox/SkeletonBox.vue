<template>
    <div class="x-new-skeleton">
        <a-skeleton v-for="(i,k) in len" :key="k" active />
    </div>
</template>
<script>
export default {
    props: {
        len: {
            type: Number,
            default: () => 6
        }
    },
};
</script>

<style lang="less" scoped>
.x-new-skeleton
    .ant-skeleton.ant-skeleton-active
    .ant-skeleton-content
    .ant-skeleton-title,
.x-new-skeleton
    .ant-skeleton.ant-skeleton-active
    .ant-skeleton-content
    .ant-skeleton-paragraph
    > li {
    background: linear-gradient(90deg, #091b43 25%, #0b204e 37%, #091b43 63%);
    background-size: 400% 100%;
    -webkit-animation: ant-skeleton-loading 1.4s ease infinite;
    animation: ant-skeleton-loading 1.4s ease infinite;
}
</style>