<template>
    <ALayout class="layoutBox">
        <ALayoutSider class="layoutSider">
            <LayoutMenu></LayoutMenu>
        </ALayoutSider>

        <ALayout>
            <LayoutHeader></LayoutHeader>
            <ALayoutContent>
                <LayoutContent></LayoutContent>
            </ALayoutContent>
        </ALayout>
    </ALayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutHeader from './header/index.vue';
import LayoutMenu from './menu/index.vue';
import LayoutContent from './content/index.vue';

export default defineComponent({
    name: 'Layout',
    components: {
        LayoutHeader,
        LayoutMenu,
        LayoutContent
    }
});
</script>

<style lang="less" scoped>
.layoutBox {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
}
</style>