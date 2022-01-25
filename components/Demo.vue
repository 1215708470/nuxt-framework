<template>
    <div class="demo_page">
        <el-input v-model="inputVal" placeholder=""></el-input>
        {{demoPageData}}
        <p>{{from}}</p>
        <el-button type="success">按钮</el-button>
    </div>
</template>
<script>
export default {
    // name:"Demotemplate",
    // props:['from','demoPageData'],
    inject:['from','demoPageData'],
    data(){
        return {
            inputVal:"123"
        }
    }
}
</script>
<style lang="less">
    .demo_page{
        background: aqua;
    }
</style>
