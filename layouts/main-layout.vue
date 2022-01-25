<template>
    <div>
        <com-header/>
        <nuxt/>
        <com-footer/>
    </div>
</template>
<script>
    import comHeader  from "@/components/common/comHeader"
    import comFooter  from "@/components/common/comFooter"
       export default {
        components:{comHeader,comFooter},
        name:"main-layout",
    }
</script>