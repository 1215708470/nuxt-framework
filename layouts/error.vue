  <template>
  <div class="err_main">
    <div :class="error.statusCode === 404 ? 'error_type404' : 'error_type500'">
      <div class="err_text">
        <p v-if="error.statusCode === 404">哎呀...您访问的页面不存在</p>
        <p v-else>哎呀...服务器出了点小问题</p>
        <div class="err_btn">
          <div class="reutrn" @click="returnHand">
            <span class="iconfont icon-fanhui"></span>返回上一页
          </div>
          <div class="to_home" @click="toHome">
            <span class="iconfont icon-home"></span>网站首页
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-else class="err_type2">
            <h2>500服务器错误</h2>
            <nuxt-link to="/">返回首页</nuxt-link>
    </div>-->
  </div>
</template>
 <script>
export default {
  props: ["error"],
  layout: 'error',
  data() {
    return {
    //   error: {}
    };
  },
  methods: {
    returnHand() {
      this.$router.go(-1);
    },
    toHome() {
      this.$router.push("/");
    }
  }
};
</script>
 <style lang="less" scoped>
.err_main {
  width: 100%;
  height: 100vh;
  background: rgba(229, 233, 235, 1);
  min-height: 610px;
  position: relative;
  div[class^="error_type"] {
    width: 374px;
    height: 374px;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -65%);
    .err_text {
      padding-top: 286px;
      text-align: center;
      font-size: 16px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 28px;
    }
    .err_btn {
      display: flex;
      justify-content: center;
      margin-top: 18px;
      span {
        margin-right: 4px;
      }
      .reutrn {
        margin-right: 20px;
        cursor: pointer;
        border: 1px solid rgba(221, 221, 221, 1);
        padding: 2px 15px;
        background: rgba(229, 233, 235, 1);
        border-radius: 5px;
        &:hover {
          background: #ffffff;
        }
      }
      .to_home {
        padding: 2px 15px;
        cursor: pointer;
        &:hover {
          color: #f3262d;
        }
      }
    }
  }
}
</style>
    