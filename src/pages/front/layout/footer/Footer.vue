<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const createTime = ref(1624526734394)
let tips = ref('')

const timeFn = (createTime: number) => {
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateEnd = new Date(); //获取当前时间
    var dateDiff = dateEnd.getTime() - createTime; //时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    var timeFn =
        '本站运行时长：' +
        dayDiff +
        '天 ' +
        hours +
        '小时 ' +
        minutes +
        '分钟' +
        seconds +
        '秒';
    return timeFn;
};

// 第一次进入页面的页脚
tips.value = timeFn(createTime.value)
// 后续开启定时器
const timeId = setInterval(() => {
    tips.value = timeFn(createTime.value);
}, 1000);

onUnmounted(() => {
    clearInterval(timeId)
})
</script>

<template>
    <ALayoutFooter class="footer">
        <p>
            <a href="https://beian.miit.gov.cn">湘ICP备19019855号-1</a>
        </p>
        <p class="mT3">{{ tips }}</p>
    </ALayoutFooter>
</template>

<style lang="less" scoped>
.footer {
    background-color: #fff;
    text-align: center;
    height: 36px;
    font-size: 12px;
    padding: 5px;
    border-top: 1px solid #ccc;

    a {
        color: #000;
    }
}

.mT3 {
    margin-top: 3px;
}
</style>