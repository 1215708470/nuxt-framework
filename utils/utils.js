import {
  Message
} from 'element-ui'

//客户端获取cookie
export function getCookie(name) {
  var prefix = name + "="
  var start = document.cookie.indexOf(prefix)

  if (start == -1) {
      return null;
  }

  var end = document.cookie.indexOf(";", start + prefix.length)
  if (end == -1) {
      end = document.cookie.length;
  }

  var value = document.cookie.substring(start + prefix.length, end)
  return decodeURIComponent(value);
}
//客户端设置cookie
export function setCookie(name, value, iDay){
    let oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);
    document.cookie=name+'='+value+';expires='+oDate;
}

//客户端删除cookie
export function delCookie(name){
  var cval=getCookie(name);
  if(cval){
   var exp = new Date();
   exp.setDate(exp.getDate() - 1);
   document.cookie= name +"="+encodeURIComponent(cval)+";expires="+exp;
  }
}

/**请求成功统一处理 */
export function checkStatus(response) {
  // console.log("respons1",response)
  /**获取文件流情况处理 */
  if (response && response.headers && response.headers.responseType == "blob") {
    return response.data
  }
  // 如果http状态码正常，直接返回数据，
  if (response && response.status == 200) {
    if (response.data.code == 0) {
      return response.data;
      /**403：登录超时 */
    } else if (response.data.code == 403) {
      // Cookie.remove('access_token')
      // Cookie.remove('userInfo')
      // localStorage.clear()
      // sessionStorage.clear()
      // Toast.fail(response.data.msg);
      // router.replace({
      //   path: "/login"
      // });
    } else {
      return Message.error(response.data.msg);
    }
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: "网络异常"
  };
}

/**
 * 普通图片转base64
 * @param {*} url 
 * @param {*} callback 
 */
export function getBase64(url, callback) {
  var canvas = document.createElement('canvas'), //创建canvas元素
    dataURL = '',
    ctx = canvas.getContext('2d'),
    img = new Image; //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0, );
    dataURL = canvas.toDataURL('image/jpeg', 0.5);
    callback ? callback(dataURL) : null; //调用回调函数
    canvas = null;
  };
  img.src = url; // 图片预览
}
