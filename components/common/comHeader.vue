<template>
    <div class="header-box">header</div>
</template>
<script>
import { indexInitMixin } from "@/utils/common-mixins";
export default{
  mixins: [indexInitMixin()],
    data(){
        return{

        }
    },
    mounted(){
        console.log("321")
    }
}
</script>
<style lang="less">
    .header-box{
        width: 100%;
        height: 50px;
        background: #edf2f7;
    }
</style>