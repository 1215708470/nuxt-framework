<template>
  <div>
  <Tutorial/>
  <nuxt-link to="/demo"><div>toDemopage</div></nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        // console.log('app',store.state,req)
  },
  //   async asyncData(app) {
  //   // vuex
  //   return {
  //   }
  // },
}
</script>
<style lang="less">

</style>
