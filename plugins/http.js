"use strict";
import axios from "axios";
import qs from "qs";
import store from '@/store'
import CONFIG from '@/config';
import Cookie from 'js-cookie'

import {checkStatus} from './utils'


const {
  API_ROOT_URL,
} = CONFIG;
// import { Dialog, Toast } from "vant";
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.post['Content-Type'] = 'text/plain;charset=UTF-8'
// axios.defaults.baseURL = API_ROOT_URL
let service = axios.create({
  baseURL:API_ROOT_URL,
  timeout: 10 * 1000
})
service.interceptors.request.use(
  config => {
    let Token = Cookie.get('access_token');
    console.log('Token',Token)
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
      return Promise.reject(error.response)
  }
)


// function checkCode(res) {
//   console.log('error',res)
//   // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
//   if (res.status === -404) {
//     // alert(res.msg)
//     console.log("code异常",res.data);
//     // Toast("网络错误");

//   }
//   return res;
// }

export default {
  post(url, data) {
    return service({
        method: "post",
        url,
        data:qs.stringify(data),// noString?data:qs.stringify(data),
        timeout: 10000,
        headers: {
           "Content-Type":"application/x-www-form-urlencoded",// "application/json; charset=utf-8", //application/x-www-form-urlencoded; charset=UTF-8
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
          "Content-Type":"application/json; charset=utf-8"
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
