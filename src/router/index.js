import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    redirect:'/login',
    component: () =>
        import ('@/pages/index')
},
{
    path: '/login',
    name: 'login',
    component: () =>
        import ('@/pages/login/index'),
},
{
    path: '/user',
    name: 'user',
    component: () =>
        import ('@/pages/user/index'),
},
{
    path: '/layout',
    name: 'layout',
    component: () =>
        import ('@/pages/weekport/index'),
    children: [
        {
            path: 'password',
            name: 'password',
            meta: { title: '修改密码' },
            component: () =>
                import ('@/pages/weekport/changesPassword')
        },
        {
            path: 'historyPort',
            name: 'historyPort',
            meta: { title: '历史周报' },
            component: () =>
                import ('@/pages/weekport/historyPort')
        },
        {
            path: 'weekReview',
            name: 'weekReview',
            meta: { title: '团队周报批复', hd: 'soso' },
            component: () =>
                import ('@/pages/weekport/weekReview')
        },
        {
            path: 'weeksoso',
            name: 'weeksoso',
            meta: { title: '团队周报批复 - 搜索' },
            component: () =>
                import ('@/pages/weekport/weeksoso')
        },
        {
            path: 'weekfill',
            name: 'weekfill',
            meta: { title: '填写周报' },
            component: () =>
                import ('@/pages/weekport/weekFill')
        },
        {
            path: 'weekCheck',
            name: 'weekCheck',
            meta: { title: '查看周报' },
            component: () =>
                import ('@/pages/weekport/weekCheck')
        },
        {
            path: 'portDetail',
            name: 'portDetail',
            meta: { title: '工作总结 - 填写' },
            component: () =>
                import ('@/pages/weekport/portDetail')
        },
        {
            path: 'portDetail2',
            name: 'portDetail2',
            meta: { title: '存在问题' },
            component: () =>
                import ('@/pages/weekport/portDetail2')
        },
        {
            path: 'portDetail3',
            name: 'portDetail3',
            meta: { title: '下周计划 -填写' },
            component: () =>
                import ('@/pages/weekport/portDetail3')
        },
        {
            path: 'feedback',
            name: 'feedback',
            meta: { title: '大地意见大厅' },
            component: () =>
                import ('@/pages/weekport/feedback')
        },
        {
            path: 'myfeedback',
            name: 'myfeedback',
            meta: { title: '我的历史意见' },
            component: () =>
                import ('@/pages/weekport/myFeedback')
        },
        {
            path: 'feedbackfill',
            name: 'feedbackfill',
            meta: { title: '匿名意见 - 填写' },
            component: () =>
                import ('@/pages/weekport/feedbackFillin')
        },
        {
            path: 'feedbackCheck',
            name: 'feedbackCheck',
            meta: { title: '匿名意见 - 查看' },
            component: () =>
                import ('@/pages/weekport/feedbackCheck')
        },
        {
            path: 'tribeFeedback',
            name: 'tribeFeedback',
            meta: { title: '本部门意见批复' },
            component: () =>
                import ('@/pages/weekport/tribeFeedback')
        }


        
    ]
} 
],
  linkExactActiveClass: 'link-exact-active',
  linkActiveClass: 'link-active',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
