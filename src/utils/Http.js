import Vue from 'vue';
import axios from 'axios';
import config from './Config';
import userLogin from './UserLogin';
import MyRouter from '@/router';

let instance = axios.create({
  baseURL:'',
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  }
})
console.info();
// http request 拦截器
instance.interceptors.request.use(
  config => {
    const token = userLogin.getLoginInfo();
    if (token) { 
      config.headers.token = token;
    }
    return config
  },
  err => {
    return Promise.reject(err)
  });

// http response 拦截器
instance.interceptors.response.use(
  response => {
    if(response.headers.token){
      userLogin.setLoginInfo(response.headers.token);
    }
    if(response.status == 403||response.data.code == 401){
      MyRouter.push({name: 'login'});
    }
    return response;
  },
  err => {
    if(err.response.status == 403){
      MyRouter.push({name: 'login'});
      return;
    }
    return Promise.reject(err)
  })

// 处理Raw纯json字符串得请求
//axios.defaults.baseURL = config.HTTPBASEURL;
//axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

class Http {
  /**
   * 发起post请求
   * @param _url
   * @param _data
   */
  post(_url, _data) {
    return instance({
      url: _url,
      dataType: 'json',
      data: _data,
      method: 'POST'
    }).then(res => {
      let data = res.data;
      if (data.code!='0') {
        Vue.prototype.$notify.error({
          title: '提示',
          message: data.message
        });
      }
      return data;
    });
  }
  /**
   * 发起get请求
   * @param _url
   */
  get(_url, _params = {}) {
    return instance({
      url: _url,
      dataType: 'json',
      method: 'GET',
      params: _params
    }).then(res => {
      let data = res.data;
      if (data.code!='0') {
        Vue.prototype.$notify.error({
          title: '提示',
          message: data.message
        });
      }
      return data;
    }).catch(err => {});
  }
  postDownload(_url,_data){
    return instance({
      url: _url,
      responseType: "arraybuffer",
      data: _data,
      method: 'POST'
    }).then(res => {
      var contentDisposition = res.headers['content-disposition'].split(';');
      var filenames = contentDisposition.filter(f=>{
        var key = f.substr(1,8);
        return key=='filename';
      });
      var filename = filenames[filenames.length-1].split("=")[1];
      var splitIndex=filename.indexOf("''");
      if(splitIndex>-1){
        filename=decodeURI(filename.substr(splitIndex+2));
      }
      const aLink = document.createElement("a");
      let blob = new Blob([res.data], { type: "application/octet-stream" });
      aLink.href = URL.createObjectURL(blob);
      aLink.setAttribute("download", filename); // 设置下载文件名称
      aLink.click();
      document.body.appendChild(aLink);
    });
  }
}
export default Http;
