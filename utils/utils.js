import {
  Message
} from 'element-ui'
export function getCookie(name) {
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
