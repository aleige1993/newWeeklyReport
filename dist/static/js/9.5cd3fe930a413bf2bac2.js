webpackJsonp([9],{oLi6:function(t,e){},p1KL:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),o=a("exGp"),i=a.n(o),l={name:"opinion",props:[""],data:function(){return{totalPage:0,currentPage:1,query:{employeeName:""},tableData:[],columnData:[{label:"标题",prop:"title",minWidth:"50%"},{label:"发表人",prop:"employeeName",minWidth:"30%"},{label:"分类",prop:"categoryName",minWidth:"40%"},{label:"电话",prop:"mobilePhone",minWidth:"30%"},{label:"发表时间",prop:"createTime",minWidth:"30%",formatter:function(t,e,a){return a.substr(0,10)}},{label:"意见内容",prop:"content"}]}},computed:{},created:function(){this.onSOSO()},methods:{onSOSO:function(){this.currentPage=1,this.getList()},getList:function(){var t=this;return i()(r.a.mark(function e(){var a,n,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={page:(a=t).currentPage,pageSize:a.$config.PAGE_SIZE,query:a.query},e.next=4,a.$http.post("/api/Suggestion/manager/list",n);case 4:"0"==(o=e.sent).code&&(a.tableData=o.data.rows,o.data.totalPage&&(a.totalPage=o.data.totalPage,console.info("total",a.totalPage)));case 6:case"end":return e.stop()}},e,t)}))()},switchChanged:function(t){var e=this;return i()(r.a.mark(function a(){var n,o;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n="Y"==t.row.status?"N":"Y",o=e,a.next=4,o.$http.get("/api/Suggestion/manager/"+t.row.id,{status:n});case 4:"0"==a.sent.code&&(t.row.status=n);case 6:case"end":return a.stop()}},a,e)}))()},getStatus:function(t){return"Y"==t.row.status},exportFn:function(){var t=this;return i()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t,e.next=3,a.$http.postDownload("/api/Suggestion/manager/export",a.query);case 3:e.sent;case 4:case"end":return e.stop()}},e,t)}))()}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"waige"},[a("el-row",[a("el-col",[a("div",{staticClass:"rightflex marigbot"},[a("div",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.exportFn()}}},[a("i",{staticClass:"el-icon-download"}),t._v("导出意见")])],1),t._v(" "),a("div",[a("el-input",{staticStyle:{width:"200px"},attrs:{size:"small",placeholder:"输入姓名检索"},model:{value:t.query.employeeName,callback:function(e){t.$set(t.query,"employeeName",e)},expression:"query.employeeName"}}),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.onSOSO}},[t._v("搜索")])],1)])])],1),t._v(" "),a("div",{staticClass:"biaoge"},[a("el-row",[a("el-col",[a("el-table",{staticStyle:{width:"100%"},attrs:{"header-cell-style":{background:"#fafafa"},data:t.tableData,size:"small",border:""}},[t._l(t.columnData,function(e,n){return a("el-table-column",t._b({key:n},"el-table-column",e,!1))}),t._v(" "),a("el-table-column",t._b({scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("el-switch",{attrs:{value:t.getStatus(e),"active-text":"显示","inactive-text":"隐藏"},on:{change:function(a){return t.switchChanged(e)}}})],1)]}}])},"el-table-column",{label:"操作",minWidth:"70%",prop:"opention"},!1))],2)],1)],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","current-page":t.currentPage,"page-count":t.totalPage},on:{"current-change":t.getList,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],1)],1)],1)},staticRenderFns:[]};var s=a("VU/8")(l,c,!1,function(t){a("oLi6")},"data-v-3d92cb34",null);e.default=s.exports}});
//# sourceMappingURL=9.5cd3fe930a413bf2bac2.js.map