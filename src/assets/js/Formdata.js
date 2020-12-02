// import {createApp }  from 'vue';
import axios from 'axios';
import UserLogin from './UserLogin';
import { Notify  } from 'vant';
// 处理Raw纯json字符串得请求
// axios.defaults.baseURL = 'http://3541l1m171.qicp.vip';
axios.defaults.baseURL = '';
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
// Vue.prototype.$ajax = axios;

class HttpApi {
    /**
     * 发起post请求
     * @param _url
     * @param _data
     * @param isNeedLogin 是否需要登录token默认为需要，不需要传递false即可
     */
    post(_url, _data, isNeedLogin = true) {
            let _headers = {};
            if (isNeedLogin) {
                _headers = {
                    'Authorization': UserLogin.getLoginToken()
                };
            }
            return axios({
                url: _url,
                dataType: 'json',
                data: _data,
                method: 'POST',
                headers: _headers
            }).then(res => {
                if(res.data.code == 401){
                    UserLogin.removeLoginInfo()
                    window.location.href="/"
                }
                return res || {};
            }).catch(err => {
                Notify({
                    message:err.message,
                    type: 'warning',
                })
                console.log(err)
                    // error todo
                    // Vue.prototype.$Notice.error({ title: '错误提示', desc: err });
            });
        }
        /**
         * 发起get请求
         * @param _url
         * @param isNeedLogin 是否需要登录token默认为需要，不需要传递false即可
         */
    get(_url, _params = {}, isNeedLogin = true) {
        let _headers = {};
        if (isNeedLogin) {
            _headers = {
                'Authorization': UserLogin.getLoginToken()
            };
        }
        return axios({
            url: _url,
            dataType: 'json',
            method: 'GET',
            params: _params,
            headers: _headers
        }).then(res => {
            if(res.data.code == 401){
                UserLogin.removeLoginInfo()
                window.location.href="/"
            }
            return res.data || {};
        }).catch(err => {
            // error todo
            Notify({
                message:err.message,
                type: 'warning',
            })
            console.log(err)
                // Vue.prototype.$Notice.error({ title: '错误提示', desc: err });
        });
    }
}
export default new HttpApi();