(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-452faa2b"],{"159f":function(t,e,r){"use strict";var n=r("2b0e");new n["default"]},"197e":function(t,e,r){},"30d1":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"search"},[r("el-card",{staticClass:"search-wrap"},[r("el-form",{ref:"searchForm",attrs:{size:"small",inline:!0,model:t.CustomerSearchForm}},[r("el-row",[r("el-col",{attrs:{span:3}},[r("el-form-item",{attrs:{prop:"name"}},[r("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"请输入客户姓名",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchBtn(e)}},model:{value:t.CustomerSearchForm.name,callback:function(e){t.$set(t.CustomerSearchForm,"name",e)},expression:"CustomerSearchForm.name"}})],1)],1),r("el-col",{attrs:{span:4}},[r("el-form-item",{attrs:{prop:"mobile"}},[r("el-input",{attrs:{placeholder:"请输入客户手机号",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchBtn(e)}},model:{value:t.CustomerSearchForm.mobile,callback:function(e){t.$set(t.CustomerSearchForm,"mobile",e)},expression:"CustomerSearchForm.mobile"}})],1)],1),r("el-col",{attrs:{span:4}},[r("el-form-item",{attrs:{prop:"source_id"}},[r("el-select",{attrs:{placeholder:"需求来源"},on:{change:t.searchBtn},model:{value:t.CustomerSearchForm.source_id,callback:function(e){t.$set(t.CustomerSearchForm,"source_id",e)},expression:"CustomerSearchForm.source_id"}},t._l(t.source,(function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)],1),r("el-col",{attrs:{span:4}},[r("el-form-item",{attrs:{prop:"state"}},[r("el-select",{attrs:{placeholder:"订单状态"},on:{change:t.searchBtn},model:{value:t.CustomerSearchForm.state,callback:function(e){t.$set(t.CustomerSearchForm,"state",e)},expression:"CustomerSearchForm.state"}},[r("el-option",{attrs:{label:"审核中",value:"0"}}),r("el-option",{attrs:{label:"待进行",value:"1"}}),r("el-option",{attrs:{label:"订单进行中",value:"2"}}),r("el-option",{attrs:{label:"已完成",value:"3"}}),r("el-option",{attrs:{label:"已取消",value:"4"}}),r("el-option",{attrs:{label:"暂停中",value:"5"}})],1)],1)],1),r("el-col",{attrs:{span:5}},[r("el-form-item",[r("el-date-picker",{staticClass:"select-date",staticStyle:{width:"250px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:t.searchBtn},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)],1),r("el-col",{attrs:{span:4}},[r("el-col",{attrs:{span:10,offset:2}},[r("el-form-item",{staticClass:"handle"},[r("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchBtn}},[t._v("搜索")])],1)],1),r("el-col",{attrs:{span:10}},[r("el-form-item",[r("el-button",{attrs:{icon:"el-icon-delete"},on:{click:t.clearBtn}},[t._v("清除查询")])],1)],1)],1)],1)],1)],1)],1)},a=[],o=(r("a15b"),r("b0c0"),r("159f"),r("e7a1")),c={name:"Search",data:function(){return{CustomerSearchForm:{name:"",mobile:"",source_id:"",create_time:[],state:""},source:[],time:[]}},mounted:function(){var t=this;Object(o["b"])().then((function(e){var r=e.code,n=e.data,a=e.msg;200===r?t.source=n:t.$message.error(a)}))},methods:{clearBtn:function(){this.$refs.searchForm.resetFields(),this.time=[],this.searchBtn()},searchBtn:function(){if(this.CustomerSearchForm.create_time=this.time?this.time.join(","):"",this.CustomerSearchForm.state)this.$emit("searchBtn",this.CustomerSearchForm);else{var t={};t.name=this.CustomerSearchForm.name,t.mobile=this.CustomerSearchForm.mobile,t.source_id=this.CustomerSearchForm.source_id,t.create_time=this.CustomerSearchForm.create_time,console.log("else: ",t),this.$emit("searchBtn",t)}}},created:function(){}},u=c,i=(r("625f"),r("2877")),s=Object(i["a"])(u,n,a,!1,null,"878577e6",null);e["a"]=s.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("1d80"),a=r("5899"),o="["+a+"]",c=RegExp("^"+o+o+"*"),u=RegExp(o+o+"*$"),i=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(c,"")),2&t&&(r=r.replace(u,"")),r}};t.exports={start:i(1),end:i(2),trim:i(3)}},"625f":function(t,e,r){"use strict";var n=r("f8c9"),a=r.n(n);a.a},7156:function(t,e,r){var n=r("861d"),a=r("d2bb");t.exports=function(t,e,r){var o,c;return a&&"function"==typeof(o=e.constructor)&&o!==r&&n(c=o.prototype)&&c!==r.prototype&&a(t,c),t}},9990:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"person-dispatch"},[r("el-row",[r("el-col",{attrs:{span:24}},[r("customer-search",{on:{searchBtn:t.searchBtn}}),r("el-card",{staticClass:"table-content",style:{height:t.screenHeight}},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"user-table-wrap",staticStyle:{width:"100%"},attrs:{data:t.customers,border:"",height:t.scrollHeight}},[r("el-table-column",{attrs:{prop:"name",align:"center",label:"客户姓名",width:"100"}}),r("el-table-column",{attrs:{align:"center",prop:"mobile",label:"联络电话",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("i",{staticClass:"el-icon-phone",staticStyle:{color:"red"}}),t._v(" "+t._s(e.row.mobile)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",prop:"family_address",label:"地址",width:"180"}}),r("el-table-column",{attrs:{align:"center",prop:"service_type",label:"服务类型",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.service_type?r("p",[t._v(t._s(e.row.service_other))]):t._e(),1==e.row.service_type?r("p",[t._v("全日住家型")]):t._e(),2==e.row.service_type?r("p",[t._v("日间照料型")]):t._e(),3==e.row.service_type?r("p",[t._v("计时收费型")]):t._e()]}}])}),r("el-table-column",{attrs:{align:"center",prop:"family_people",label:"家庭成员"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.family_people.children)+"小孩，"+t._s(e.row.family_people.adlut)+"成人，"+t._s(e.row.family_people.old)+"老人")]}}])}),r("el-table-column",{attrs:{align:"center",prop:"state",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.state?r("p",[t._v("审核中")]):t._e(),1==e.row.state?r("p",[t._v("待进行")]):t._e(),2==e.row.state?r("p",[t._v("订单进行中")]):t._e(),3==e.row.state?r("p",[t._v("已完成")]):t._e(),4==e.row.state?r("p",[t._v("已取消")]):t._e(),5==e.row.state?r("p",[t._v("暂停中")]):t._e()]}}])}),r("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.printDispatchBtn}},[t._v("查看派出单")])]}}])})],1)],1)],1)],1),r("pagination",{attrs:{currentPage:t.currentPage,perpage:t.per_page,total:t.total},on:{handlecurrentchange:t.handleCurrentChange}})],1)},a=[],o=r("30d1"),c=r("c1ce"),u=r("ed50"),i={name:"PersonDispatch",data:function(){return{searchForm:{},customers:[],currentPage:1,total:null,per_page:null,loading:!1}},computed:{screenHeight:function(){return this.$store.state.screenHeight-210+"px"},scrollHeight:function(){return this.$store.state.screenHeight-290+"px"}},watch:{},created:function(){this.getAllOrderInfo()},methods:{getSearchInfoData:function(t){var e=this;Object(u["u"])(t).then((function(t){200===t.code?(e.customers=t.data.data,console.log(t.data.data),e.currentPage=t.data.current_page,e.total=t.data.total,e.per_page=t.data.per_page,e.loading=!1):(e.$message.error(t.msg),e.loading=!1)})).catch((function(t){e.$message.error("服务器炸了！")}))},getAllOrderInfo:function(){this.loading=!0,this.getSearchInfoData(this.searchForm)},searchBtn:function(t){this.searchForm=t,this.getSearchInfoData(this.searchForm)},handleCurrentChange:function(t){this.searchForm.page=t,this.getSearchInfoData(this.searchForm)},printDispatchBtn:function(){var t=this;this.$confirm("是否打印派出单","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$message({type:"success",message:"打印成功!"})})).catch((function(){t.$message({type:"info",message:"已取消"})}))}},components:{CustomerSearch:o["a"],Pagination:c["a"]}},s=i,l=(r("ca65"),r("2877")),d=Object(l["a"])(s,n,a,!1,null,"0633ed2c",null);e["default"]=d.exports},a15b:function(t,e,r){"use strict";var n=r("23e7"),a=r("44ad"),o=r("fc6a"),c=r("a640"),u=[].join,i=a!=Object,s=c("join",",");n({target:"Array",proto:!0,forced:i||!s},{join:function(t){return u.call(o(this),void 0===t?",":t)}})},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},a9e3:function(t,e,r){"use strict";var n=r("83ab"),a=r("da84"),o=r("94ca"),c=r("6eeb"),u=r("5135"),i=r("c6b6"),s=r("7156"),l=r("c04e"),d=r("d039"),f=r("7c73"),m=r("241c").f,p=r("06cf").f,h=r("9bf2").f,g=r("58a8").trim,b="Number",_=a[b],v=_.prototype,y=i(f(v))==b,w=function(t){var e,r,n,a,o,c,u,i,s=l(t,!1);if("string"==typeof s&&s.length>2)if(s=g(s),e=s.charCodeAt(0),43===e||45===e){if(r=s.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(s.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+s}for(o=s.slice(2),c=o.length,u=0;u<c;u++)if(i=o.charCodeAt(u),i<48||i>a)return NaN;return parseInt(o,n)}return+s};if(o(b,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var O,j=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof j&&(y?d((function(){v.valueOf.call(r)})):i(r)!=b)?s(new _(w(e)),r,j):w(e)},C=n?m(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;C.length>S;S++)u(_,O=C[S])&&!u(j,O)&&h(j,O,p(_,O));j.prototype=v,v.constructor=j,c(a,b,j)}},b0c0:function(t,e,r){var n=r("83ab"),a=r("9bf2").f,o=Function.prototype,c=o.toString,u=/^\s*function ([^ (]*)/,i="name";n&&!(i in o)&&a(o,i,{configurable:!0,get:function(){try{return c.call(this).match(u)[1]}catch(t){return""}}})},b24d:function(t,e,r){},c1ce:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"pagination",style:{width:t.screenWidth}},[r("el-pagination",{attrs:{"current-page":t.currentpage,"page-size":t.perpages,layout:"prev, pager, next, jumper",total:t.totalNumber},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentpage=e},"update:current-page":function(e){t.currentpage=e}}})],1)},a=[],o=(r("a9e3"),r("159f"),{name:"Pagination",props:{currentPage:{type:Number,default:1},perpage:{type:Number,default:10},total:{type:Number,default:null}},data:function(){return{currentpage:null,perpages:null,totalNumber:null}},computed:{screenWidth:function(){return this.$store.state.screenWidth-240+"px"}},watch:{currentPage:function(t){this.currentpage=t},perpage:function(t){this.perpages=t},total:function(t){this.totalNumber=t}},methods:{handleCurrentChange:function(t){this.$emit("handlecurrentchange",t)}}}),c=o,u=(r("df89"),r("2877")),i=Object(u["a"])(c,n,a,!1,null,"0160eea8",null);e["a"]=i.exports},ca65:function(t,e,r){"use strict";var n=r("197e"),a=r.n(n);a.a},df89:function(t,e,r){"use strict";var n=r("b24d"),a=r.n(n);a.a},e7a1:function(t,e,r){"use strict";r.d(e,"k",(function(){return a})),r.d(e,"c",(function(){return o})),r.d(e,"f",(function(){return c})),r.d(e,"j",(function(){return u})),r.d(e,"g",(function(){return i})),r.d(e,"d",(function(){return s})),r.d(e,"e",(function(){return l})),r.d(e,"l",(function(){return d})),r.d(e,"h",(function(){return f})),r.d(e,"i",(function(){return m})),r.d(e,"a",(function(){return p})),r.d(e,"b",(function(){return h}));r("bc3a");var n=r("1bab");function a(){return Object(n["a"])({url:"/region/province",method:"get"})}function o(t){return Object(n["a"])({url:"/region/city",method:"get",params:{parent_id:t}})}function c(t){return Object(n["a"])({url:"/region/district",method:"get",params:{parent_id:t}})}function u(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:1}})}function i(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:2}})}function s(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:3}})}function l(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:4}})}function d(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:5}})}function f(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:6}})}function m(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:7}})}function p(){return Object(n["a"])({url:"/customer/create",method:"get"})}function h(){return Object(n["a"])({url:"/source/index",method:"get"})}},ed50:function(t,e,r){"use strict";r.d(e,"w",(function(){return a})),r.d(e,"u",(function(){return o})),r.d(e,"o",(function(){return c})),r.d(e,"j",(function(){return u})),r.d(e,"c",(function(){return i})),r.d(e,"y",(function(){return s})),r.d(e,"v",(function(){return l})),r.d(e,"g",(function(){return d})),r.d(e,"f",(function(){return f})),r.d(e,"q",(function(){return m})),r.d(e,"e",(function(){return p})),r.d(e,"k",(function(){return h})),r.d(e,"z",(function(){return g})),r.d(e,"i",(function(){return b})),r.d(e,"h",(function(){return _})),r.d(e,"s",(function(){return v})),r.d(e,"r",(function(){return y})),r.d(e,"d",(function(){return w})),r.d(e,"p",(function(){return O})),r.d(e,"x",(function(){return j})),r.d(e,"m",(function(){return C})),r.d(e,"n",(function(){return S})),r.d(e,"a",(function(){return x})),r.d(e,"b",(function(){return F})),r.d(e,"l",(function(){return k})),r.d(e,"t",(function(){return N}));var n=r("1bab");function a(t){return Object(n["a"])({url:"/staff/waiting",method:"get",params:{keyword:t}})}function o(t){return Object(n["a"])({url:"/customer/index",method:"get",params:t})}function c(t){return Object(n["a"])({url:"/customer/save",method:"post",data:t})}function u(t){return Object(n["a"])({url:"/customer/edit",method:"get",params:{id:t}})}function i(t){return Object(n["a"])({url:"/customer/cancel",method:"get",params:{id:t}})}function s(t){return Object(n["a"])({url:"/customer/update",method:"post",data:t})}function l(t){return Object(n["a"])({url:"/user/match_teacher",method:"get",params:{keyword:t}})}function d(t,e){return Object(n["a"])({url:"customer/match",method:"post",data:{customer_id:t,user_id:e}})}function f(t){return Object(n["a"])({url:"/customer/cancel",method:"get",params:{id:t}})}function m(t){return Object(n["a"])({url:"/customer/add_or_replace",method:"post",data:t})}function p(t){return Object(n["a"])({url:"/interview/delete",method:"get",params:{id:t}})}function h(t){return Object(n["a"])({url:"/interview/edit",method:"get",params:{id:t}})}function g(t){return Object(n["a"])({url:"/interview/update",method:"post",data:t})}function b(t){return Object(n["a"])({url:"/interview/index",method:"get",params:{customer_id:t.customer_id?t.customer_id:"",staff_id:t.staff_id?t.staff_id:""}})}function _(t){return Object(n["a"])({url:"/follow_up/index",method:"get",params:{customer_id:t.customer_id?t.customer_id:"",staff_id:t.staff_id?t.staff_id:""}})}function v(t){return Object(n["a"])({url:"/interview/save",method:"post",data:t})}function y(t){return Object(n["a"])({url:"/follow_up/save",method:"post",data:t})}function w(t){return Object(n["a"])({url:"/follow_up/delete",method:"get",params:{id:t}})}function O(t){return Object(n["a"])({url:"/contract/save",method:"post",data:t})}function j(t){return Object(n["a"])({url:"/contract/pass",method:"post",data:{customer_id:t}})}function C(t){return Object(n["a"])({url:"/customer/pause",method:"post",data:t})}function S(t){return Object(n["a"])({url:"/customer/restore",method:"post",data:{customer_id:t}})}function x(t){return Object(n["a"])({url:"/customer/complete",method:"post",data:{customer_id:t}})}function F(t){return Object(n["a"])({url:"/customer/copy",method:"get",params:{customer_id:t}})}function k(t){return Object(n["a"])({url:"/visit/index",method:"get",params:t})}function N(t){return Object(n["a"])({url:"/visit/save",method:"post",data:t})}},f8c9:function(t,e,r){}}]);
//# sourceMappingURL=chunk-452faa2b.87e2efec.js.map