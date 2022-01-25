<template>
    <div class="demo_page">
        demo1111
        {{demoPageData}}
        <p>{{from}}</p>
    </div>
</template>
<script>
export default {
    // name:"Demotemplate",
    // props:['from','demoPageData'],
    inject:['from','demoPageData'],
}
</script>
<style lang="less">
    .demo_page{
        background: aqua;
    }
</style>
