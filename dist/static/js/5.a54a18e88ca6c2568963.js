webpackJsonp([5],{SxPs:function(t,s){},jT7l:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={name:"",props:[""],data:function(){return{tel:"",password:"",islogin:!1}},computed:{},beforeMount:function(){},mounted:function(){console.log(11111)},methods:{subLogin:function(){var t=this,s=this;this.islogin=!0,this.$HttpApi.post("/api/Employee/login",{userName:this.tel,userPwd:this.password}).then(function(e){0==e.data.code?(s.$UserLogin.setLoginInfo(e.headers.token),s.$router.push({name:"user"})):t.$notify({message:"账号或密码不正确",type:"danger"}),t.islogin=!1}).catch(function(s){t.islogin=!1})}},watch:{}},o={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"dagonin"},[a("img",{staticClass:"logos",attrs:{src:e("rO6+"),alt:""}}),t._v(" "),a("img",{staticClass:"bgtu",attrs:{src:e("m3xL"),alt:""}}),t._v(" "),a("p",{staticClass:"titles"},[t._v("登录 USERLOGIN")]),t._v(" "),a("div",{staticClass:"divgrap"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],staticClass:"inputtext",attrs:{type:"text",placeholder:"手机号码"},domProps:{value:t.tel},on:{input:function(s){s.target.composing||(t.tel=s.target.value)}}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"inputtext",attrs:{type:"password",placeholder:"密码"},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}}),t._v(" "),a("van-button",{staticClass:"buttvat",attrs:{round:"",type:"primary",loading:t.islogin},on:{click:t.subLogin}},[t._v("登录")])],1)])},staticRenderFns:[]};var n=e("VU/8")(a,o,!1,function(t){e("SxPs")},"data-v-274c7440",null);s.default=n.exports},m3xL:function(t,s,e){t.exports=e.p+"static/img/buglogo.994f1ca.png"},"rO6+":function(t,s,e){t.exports=e.p+"static/img/dadilogo.1b0af79.png"}});
//# sourceMappingURL=5.a54a18e88ca6c2568963.js.map