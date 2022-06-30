import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'cookies'

/**
 * Gets the shared environment.
 * Documentation suggests it is only executed server side, but not wrapping
 * this in a conditional results in an error.
 * https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
 *
 * @return     {Object}  Shared environment variables.
 */

Vue.use(Vuex)
const store = () =>
	new Vuex.Store({
        state: {
          access_token: '',
            userInfo: {},
            language: 'zh_CN' //zh设置语言
          },
		  //设置
          mutations: {
            //保存
            'SET_USER_INFO': function (state, userInfo) {
              state.userInfo = userInfo;
            },
            'SET_LANGUAGE': (state, language) => {
              localStorage.setItem('language', language)
              state.language = language
            },
            'SAVE_TOKEN': (state,access_token) => {
                state.access_token = access_token   

              },
          },
          getters: {
            //获取
            'GET_USER_INFO': function (state) {
              return state.userInfo 
            },
            'GET_LANGUAGE': (state) => {
              return state.language
            },
            'GET_TOKEN': (state) => {
              return state.access_token
            },

          },
		actions: {
		nuxtServerInit(app, { req, res }) {
				if (process.server) {
					let cookies = new Cookies(req, res)
					const token = cookies.get('access_token')
          console.log('req.headers.cookie',req.headers.cookie,"access_token:",token)
					app.commit('SAVE_TOKEN', token)
					app.access_token = token
				}
			}
		}
	})

export default store
