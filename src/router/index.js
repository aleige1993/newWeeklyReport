import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/pages/errors';
Vue.use(Router);
export default new Router({
  routes: [
    { path: '*', component: PageNotFound },
    { path: '/errors', name: 'errors', component: PageNotFound },
    { path: '/', name: '/', redirect:'/index/userInfo' , component: resolve => { require(['@/pages/page-login'], resolve) } },
    { path: '/login', name: 'login', component: resolve => { require(['@/pages/page-login'], resolve) } },
    {
      path: '/index', component: resolve => { require(['@/pages/page-index'], resolve) },
      children: [
        { path: '/', component: resolve => { require(['@/pages/page-home'], resolve) }},
        { path: 'userInfo',name:'userInfo', component: resolve => { require(['@/pages/page-employee'], resolve) }},
        { path: 'weekreport',name:'weekreport', component: resolve => { require(['@/pages/page-week'], resolve) }},
        { path: 'opinion', name:'opinion',component: resolve => { require(['@/pages/opinion'], resolve) }},
        { path: 'rolepart',name:'rolepart', component: resolve => { require(['@/pages/page-role'], resolve) }},
        { path: 'reportdateil', name:'reportdateil', component: resolve => { require(['@/pages/page-week/detail'], resolve) }}
      ]
    }
  ],
  linkExactActiveClass: 'link-exact-active',
  linkActiveClass: 'link-active',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
