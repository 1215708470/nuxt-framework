"use strict";
import axios from "axios";
import qs from "qs";
import store from '@/store'
import CONFIG from '@/config';
import {Message} from 'element-ui'  
import {checkStatus} from '@/utils/utils'
import {setCookie,getCookie,delCookie} from '@/utils/utils'

const {
  API_ROOT_URL,
} = CONFIG;

let service = axios.create({
  baseURL:process.env.SERVER_ENV=="dev"&&!process.server?"/api":API_ROOT_URL,//开发环境客户端使用代理
  timeout: 10 * 1000
})

service.interceptors.request.use(
  config => {
    //客户端请求头加token
    if(!process.server){
    let Token = getCookie('access_token');
    if (Token) {
      config.headers.Authorization = 'Bearer ' + Token
    }
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
  
  get(url, params,ctx) {
    let headers = {}
    //服务端请求头加token
    if(process.server){
      if (ctx && ctx.store && ctx.store.state) {
        let token = ctx.store.state.access_token
        console.log('serviceToken', token)
        headers = {
          "Authorization": `Bearer ${token}`
        }
      }
    }
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
