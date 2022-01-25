let CONFIG = require('./config')
const TerserPlugin = require('terser-webpack-plugin');

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt_app_demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    // '/': {
    //     // 环境
    //     // target: CONFIG.API_ROOT_URL,
    //     changeOrigin: true,	//是否跨域
    //     pathRewrite: {	//如原地址是:("/127.0.0.1/my-MMM/src/assets/data/users/login.php)
    //         '^/': ''	//需要重写的,下次请求时只需定写：("/apis/my-MMM/src/assets/data/users/login.php)
    //     }
    // },
  },
  vue: {
    config: {
      productionTip: true,
      devtools: true,
      silent: true
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: [/^element-ui/],
    analyze: false,


    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[name][contenthash].js'
    },
    maxChunkSize: 300000,
    productionSourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'svg'],
    parallel: true, //多线程
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        minSize: 30000, // 当使用import或者require引入的模块文件大于30k会被分离出来
        maxSize: 500000, //模块超过500k将被拆分
        minChunks: 2, // 模块被引用>=1次，便分割
        maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
        maxAsyncRequests: 5, // 异步加载chunk的最大并行请求数
        cacheGroups: {
          elementui: {
            test: /node_modules[\\/]element-ui/,
            chunks: 'all',
            priority: 20,
            name: true
          }
        }
      },


    },
  },
  generate: {
    minify: {
      collapseWhitespace: false
    }
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    SERVER_ENV: process.env.SERVER_ENV,
  }
}