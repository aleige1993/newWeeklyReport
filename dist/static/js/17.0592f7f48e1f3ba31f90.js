webpackJsonp([17],{"5z+f":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"myfeedback",props:[""],data:function(){return{list:[],refreshing:!1,loading:!1,finished:!1,page:1,pageSize:20}},computed:{},beforeMount:function(){},mounted:function(){},methods:{fromTime:function(e){return e?e.slice(0,10):e},gotofeedDateils:function(e){this.$router.push({path:"/layout/feedbackCheck",query:{createTime:e.createTime,title:e.title,categoryName:e.categoryName,content:e.content}})},onRefresh:function(){this.finished=!1,this.loading=!0,this.page=1,this.onLoad()},onLoad:function(){var e=this;this.refreshing&&(this.list=[],this.refreshing=!1),this.$HttpApi.post("/api/Suggestion/list",{page:this.page,pageSize:this.pageSize}).then(function(t){var i=t.data;0==i.code?0==i.data.length?e.finished=!0:(e.page=parseInt(e.page)+1,e.loading=!1,e.list=e.list.concat(i.data)):e.$notify({message:i.Message,type:"danger"})}).catch(function(e){console.log(e)})}},watch:{}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("van-pull-refresh",{staticStyle:{"min-height":"88vh"},on:{refresh:e.onRefresh},model:{value:e.refreshing,callback:function(t){e.refreshing=t},expression:"refreshing"}},[n("van-list",{attrs:{finished:e.finished,"finished-text":"没有更多了",offset:"30"},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[n("div",{staticClass:"box_div"},e._l(e.list,function(t,s){return n("li",{key:s,staticClass:"box_li",on:{click:function(i){return e.gotofeedDateils(t)}}},[n("span",{staticClass:"van-ellipsis left_span"},[e._v(e._s(t.title))]),e._v(" "),n("div",{staticClass:"right_span"},[n("span",[e._v(e._s(e.fromTime(t.createTime)))]),e._v(" "),n("img",{staticClass:"right_jt",attrs:{src:i("nFQE"),alt:""}})])])}),0)])],1)],1)},staticRenderFns:[]};var a=i("VU/8")(n,s,!1,function(e){i("T0ol")},"data-v-02125214",null);t.default=a.exports},T0ol:function(e,t){}});
//# sourceMappingURL=17.0592f7f48e1f3ba31f90.js.map