"use strict";
import axios from "axios";
import qs from "qs";
import CONFIG from '@/config';
import {
  checkStatus
} from '@/utils/utils'
const {
  API_ROOT_URL,
} = CONFIG;

let service = axios.create({
  baseURL: API_ROOT_URL,
  timeout: 10 * 1000
})
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.resolve(error.response);
  }
);
service.interceptors.response.use(
  resp => {
    return resp
  },
  error => {
  console.log(336,error)

    // console.log('接口请求发生错误', error)
    if (error.response) {
      if (error.response.status == 401) {

      }
    }

    return Promise.reject(error.response)
  }
)
/**请求成功 */
export default {
  get(ctx, url, params) {
    let headers = {}
    if (ctx && ctx.store && ctx.store.state) {
      let token = ctx.store.state.access_token
      console.log('serviceToken', token)
      headers = {
        "Authorization": `Bearer ${token}`
      }
    }
    return service({
        method: "get",
        url,
        params, // get 请求时带的参数
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          ...headers
        },

      })
      .then(response => {
        return checkStatus(response);
      }).catch(e => {
        if (e.status == 500) {
          ctx.error({
            statusCode: 500,
            message: 'Network error'
          })
        }
      })

  },
};
