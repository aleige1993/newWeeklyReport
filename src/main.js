// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css'; 
import Config from './utils/Config';
import HttpApi from './utils/Formdata';
import UserLogin from './utils/UserLogin';
import Tool from './utils/Tools';
import '../src/assets/css/reset.css'
import 'amfe-flexible'
import moment  from "moment";
Vue.prototype.$moment = moment ;
Vue.prototype.$config = Config;
Vue.prototype.$HttpApi = HttpApi
Vue.prototype.$UserLogin = UserLogin;
Vue.prototype.$Tool = Tool;

Vue.config.productionTip = false
Vue.use(Vant);
/* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })

