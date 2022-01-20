<template>
  <div>
    <!-- <Demo :demoPageData="demoPageData" :from="from"/> -->
    <div @click="handlData">handl</div>
    <div @click="getDatasPost">getDatasPost11</div>
    <div>{{ toutiaoData }}</div>
  </div>
</template>

<script>
import http from "~/plugins/http";
import serviceHttp from "~/plugins/serviceHttp";
import api from "~/plugins/api";
export default {
  name: "DemoPage",
  data() {
    return {
      demoPageData: [],
      from: {},
      toutiaoData: []
    }
  },  
  provide() {
    return {
      demoPageData: this.demoPageData,
      from: this.from
    }
  },
  async asyncData(app) {
    let toutiaoData
          let params = { id: 10068, page: 0, size: 5 }
    // 服务端网络请求
     toutiaoData = await serviceHttp.get(app,api.demoapi1,params,)
    // vuex
  // app.store.commit('SAVE_TOKEN',999888)
  // console.log('app',app.store.state)

  
    
    return {
      demoPageData: [{ a: 1 }, { b: 2 }],
      from: { name: "大明" },
      toutiaoData
    }
  },
  methods: {
    handlData() {
      this.demoPageData = [{ c: 3 }, { f: 2 }]
      this.getDatas()

    },
    async getDatas() {
      let params = { id: 10068, page: 0, size: 5 }
      let res = await http.get(api.demoapi1, params)
      console.log('res22', res)
      if (res.code == 0) {
        this.toutiaoData = res.data
      }
    },
    async getDatasPost() {
      let params = { id: 10068, page: 0, size: 5 }
      let res = await http.post(api.demoapi1, params)
      console.log('res22', res)
      if (res.code == 0) {
        this.toutiaoData = res.data
      }
    }
  },
  mounted() {
    // this.getDatas()
  }
}
</script>
