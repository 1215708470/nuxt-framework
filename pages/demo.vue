<template>
  <div class="demo-page">
    <Demo />
    <div @click="handlData">handl</div>
    <div @click="getDatasPost">getDatasPost11</div>
    <div>{{ toutiaoData }}</div>
    <div><img src="@/assets/img/nuxt.svg" alt="" /></div>
    <div>
      <input type="text" v-model="input1" @change="inputCheckout($event.target,'input1')">
      <input type="text" v-model="input2"  @change="inputCheckout($event.target,'input2')">
    </div>
  </div>
</template>

<script>
import http from "~/plugins/http";
import api from "~/plugins/api";
import { mapMutations, mapState } from "vuex";
import {setCookie,getCookie} from '@/utils/utils'


export default {
  layout:"main-layout",
  name: "DemoPage",
   head() {
    return {
      title:
        "demo页面",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "demo页面描述"
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "demo页面关键词"
        }
      ]
    };
  },
    computed: {
    ...mapState({
      Token: "access_token"
    })
  },
  data() {
    return {
      demoPageData: [],
      from: {},
      toutiaoData: [],
      input1:'',
      input2:'',
    };
  },
  // 传给子组件使用
  provide() {
    return {
      demoPageData: this.toutiaoData,
      from: this.from,
    };
  },
  async asyncData(app) {
    let toutiaoData;
    let params = { id: 10068, page: 0, size: 5 };
    try {
      // 服务端网络请求
      toutiaoData = await http.get(api.demoapi1, params,app);
      // vuex
      // app.store.commit('SAVE_TOKEN',999888)
      console.log('app11',app.store.state)
      return {
        demoPageData: [{ a: 1 }, { b: 2 }],
        from: { name: "大明" },
        toutiaoData,
      };
    } catch (error) {}
  },
  methods: {
    handlData() {
      this.demoPageData = [{ c: 3 }, { f: 2 }];
      this.getDatas();
    },
    async getDatas() {
      let params = { id: 10068, page: 0, size: 5 };
      try {
         let res = await http.get(api.demoapi1, params);
        console.log("res22", res);
        if (res.code == 0) {
          this.toutiaoData = res.data;
        }
      } catch (error) {
        
      }
    },
    async getDatasPost() {
      let params = { id: 10068, page: 0, size: 5 };
      try {
        let res = await http.post(api.demoapi1, params);
        console.log("res22", res);
        if (res.code == 0) {
          this.toutiaoData = res.data;
        }
      } catch (error) {
        console.log('error',error)
      }
    },
    //登陆存储token
    async loginHandl(){
      setCookie("access_token",999999999666)
    },
    // 校验输入框的值
    inputCheckout(target,key){
      if(target.value>100){
        target.value = 100
        this[key] = 100
        console.log(this.input1,this.input2)
      }
    }
  },
  mounted() {
  //  this.$store.commit('SAVE_TOKEN',999888)
   console.log("Token123",this.Token)
    // this.getDatas()
      setCookie("access_token",999999999666)
      console.log(this.$message("11"))

  },
};
</script>
<style lang="less">
.demo-page {
  height: 100vh;
  background: url("~assets/img/nuxt.svg") no-repeat top;
  background-size: 200px;
  img {
    width: 200px;
  }
}
</style>
