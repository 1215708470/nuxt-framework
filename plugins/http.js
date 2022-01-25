"use strict";
import axios from "axios";
import qs from "qs";
import store from '@/store'
import CONFIG from '@/config';
import Cookie from 'js-cookie'
import {Message} from 'element-ui'  
import {checkStatus} from './utils'

const {
  API_ROOT_URL,
} = CONFIG;
// import { Dialog, Toast } from "vant";

let service = axios.create({
  baseURL:API_ROOT_URL,
  timeout: 10 * 1000
})
service.interceptors.request.use(
  config => {
    let Token = Cookie.get('access_token');
    if (Token) {
      config.headers.Authorization = 'Bearer ' + Token
    }
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

      // console.log('接口请求发生错误', error)
      if (error.response) {
          if (error.response.status == 401) {
        
          }
      }
      Message.error("网络错误")
      return Promise.reject(error.response)
  }
)


export default {
  post(url, data) {
    return service({
        method: "post",
        url,
        data:qs.stringify(data),// noString?data:qs.stringify(data),
        timeout: 10000,
        headers: {
           "Content-Type":"application/x-www-form-urlencoded",
        }
      })
      .then(response => {
        return checkStatus(response);
      })
     
  },
  get(url, params,headers) {
    return service({
        method: "get",
        url,
        params, // get 请求时带的参数
        timeout: 10000,
        headers: {
          "Content-Type":"application/json;charset=utf-8"
        }
      })
      .then(response => {
        return checkStatus(response);
      })
      
  },
  // serviceGet(url, params) {
  //   return service.get(`${url}?${qs.stringify(params)}`
  //     )
  //     .then(response => {
  //       return checkStatus(response);
  //     })

  // },

};
