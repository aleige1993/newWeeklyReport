webpackJsonp([13],{Bc6H:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("LOkV"),i={name:"soso",props:[""],data:function(){return{list:[],refreshing:!1,loading:!1,finished:!1,sosoval:"",islist:!1}},computed:{},beforeMount:function(){},mounted:function(){},methods:{gotoDateils:function(s){this.$router.push({path:"/layout/weekCheck",query:{id:s.weekID,name:s.employeeName,isLeader:1,empStatus:s.status,empWeekDate:s.weekDate}})},onSearch:function(){var s=this;this.$HttpApi.post("/api/WeekReview/leader/list",{page:1,pageSize:1e4,query:{employeeName:this.sosoval}}).then(function(t){var e=t.data;0==e.code?(s.list=e.data,e.data.length>0?s.islist=!1:s.islist=!0):s.$notify({message:e.message,type:"danger"})}).catch(function(s){console.log(s)})},fromTime:function(s){return s?s.slice(0,10):s},dateChanges:function(s){if(s){var t=s.slice(0,10);return t+" 至 "+Object(a.b)(t,6)}return s}},watch:{}},o={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",[a("div",{staticClass:"sosodiv"},[a("input",{directives:[{name:"model",rawName:"v-model",value:s.sosoval,expression:"sosoval"}],staticClass:"inputso",attrs:{placeholder:"请输入员工姓名"},domProps:{value:s.sosoval},on:{input:function(t){t.target.composing||(s.sosoval=t.target.value)}}}),s._v(" "),a("span",{staticClass:"sotext",on:{click:s.onSearch}},[s._v("搜索")])]),s._v(" "),a("div",{staticClass:"history"},[s.islist?a("div",{staticClass:"nodata"},[s._v("无数据，试试其他人~")]):s._e(),s._v(" "),s._l(s.list,function(t,i){return a("li",{key:i,on:{click:function(e){return s.gotoDateils(t)}}},[a("div",{staticClass:"titles"},[s._v("\n        "+s._s(t.employeeName)+" "+s._s(s.dateChanges(t.weekDate))+"\n      ")]),s._v(" "),a("div",{staticClass:"rihtdiv"},["待批复"==t.status?a("div",{staticClass:"mv_colors1 gdcss"},[s._v("\n          "+s._s(t.status)+"\n        ")]):s._e(),s._v(" "),"已延迟"==t.status?a("div",{staticClass:"mv_colors5 gdcss"},[s._v("\n          "+s._s(t.status)+"\n        ")]):s._e(),s._v(" "),"已逾期"==t.status?a("div",{staticClass:"mv_colors4 gdcss"},[s._v("\n          "+s._s(t.status)+"\n        ")]):s._e(),s._v(" "),"已批复"==t.status?a("div",{staticClass:"mv_colors3 gdcss"},[s._v("\n          "+s._s(t.status)+"\n        ")]):s._e(),s._v(" "),a("img",{attrs:{src:e("nFQE")}})])])})],2)])},staticRenderFns:[]};var n=e("VU/8")(i,o,!1,function(s){e("RNAo")},"data-v-3312ee8a",null);t.default=n.exports},RNAo:function(s,t){}});
//# sourceMappingURL=13.3ebb0c017e7aac9d274b.js.map