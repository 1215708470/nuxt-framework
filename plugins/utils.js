
import { Message, Notification } from 'element-ui' // 这里使用了element-ui的消息提示方法，也可自行定义
export function getCookie (name) {
    var arr = []
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr == document.cookie.match(reg)) {
        return unescape(arr[2])
    } else {
        return null
    }
}

/**请求成功 */
export function checkStatus(response) {
    /**获取文件流情况处理 */
    if(response&&response.headers&&response.headers.responseType=="blob"){
      return response.data
    }
    // 如果http状态码正常，直接返回数据，
    if(response&&response.status==200){
      if(response.data.code==0){
        return response.data;
        /**403：登录超时 */
      }else if(response.data.code==403){
        // Cookie.remove('access_token')
        // Cookie.remove('userInfo')
        // localStorage.clear()
        // sessionStorage.clear()
        // Toast.fail(response.data.msg);
        // router.replace({
        //   path: "/login"
        // });
      }else{
       return Message.error(response.data.msg);
      }
    }
    // 异常状态下，把错误信息返回去
    return {
      status: -404,
      msg: "网络异常"
    };
  }