(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31530b8d"],{"06f4":function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"f",(function(){return i})),a.d(t,"a",(function(){return s})),a.d(t,"g",(function(){return c})),a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return l})),a.d(t,"e",(function(){return u}));var n=a("1bab");function r(e){return Object(n["a"])({url:"/complaint/index",method:"get",params:e})}function i(e){return Object(n["a"])({url:"/complaint/save",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/complaint/delete",method:"get",params:{id:e}})}function c(e){return Object(n["a"])({url:"user/sale",method:"get",params:{keyword:e}})}function o(e,t){return Object(n["a"])({url:"complaint/match",method:"post",data:{complaint_id:e,assign_user_id:t}})}function l(e){return Object(n["a"])({url:"complaint/state",method:"post",data:e})}function u(e){return Object(n["a"])({url:"/complaint/deal_with",method:"post",data:e})}},"0fc5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sale-distribute"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("feedback-search",{on:{searchBtn:e.searchBtn}}),a("el-card",{staticClass:"table-content",style:{height:e.screenHeight}},[a("el-table",{staticClass:"user-table-wrap",staticStyle:{width:"100%"},attrs:{data:e.feedFormData,border:"",height:e.scrollHeight}},[a("el-table-column",{attrs:{prop:"name",align:"center",label:"客户姓名",width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"mobile",label:"联络电话",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{staticClass:"el-icon-phone",staticStyle:{color:"red"}}),e._v(" "+e._s(t.row.mobile)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",prop:"complaint_time",label:"时间",width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"content","show-overflow-tooltip":!0,label:"投诉事件"}}),a("el-table-column",{attrs:{align:"center",prop:"status",label:"是否解决",width:"180"},scopedSlots:e._u([{key:"default",fn:function(e){return[e.row.status?a("div",[a("i",{staticClass:"el-icon-success",staticStyle:{color:"#67C23A","font-size":"28px"}})]):a("div",[a("i",{staticClass:"el-icon-circle-close",staticStyle:{color:"#F56C6C","font-size":"28px"}})])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"is_assign",label:"是否分配",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.is_assign?a("div",[e._v("已分配")]):a("div",[e._v("未分配")])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"assign_user_id",label:"售后服务人员",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.username?a("p",[e._v(" "+e._s(t.row.username)+" ")]):a("p",[e._v("暂无")])]}}])}),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"分配",placement:"top"}},[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-thumb"},on:{click:function(a){return e.distributeSuccess(t.row.id)}}})],1)]}}])})],1)],1)],1)],1),a("pagination",{attrs:{currentPage:e.currentPage,perpage:e.per_page,total:e.total},on:{handlecurrentchange:e.handleCurrentChange}}),a("el-dialog",{attrs:{title:"分配",visible:e.distributeDialogVisible,width:"550px",center:""},on:{"update:visible":function(t){e.distributeDialogVisible=t}}},[a("div",{staticClass:"content"},[a("el-input",{staticClass:"input-with-select",attrs:{size:"mini",placeholder:"请输入要分配的售后人员姓名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.queryStaffBtn(t)}},model:{value:e.queryStaffName,callback:function(t){e.queryStaffName=t},expression:"queryStaffName"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.queryStaffBtn},slot:"append"})],1),a("el-table",{staticClass:"queryStaffTable",staticStyle:{width:"100%"},attrs:{data:e.defalutStaffData,"highlight-current-row":!0,height:"260"}},[a("el-table-column",{attrs:{align:"center",prop:"id",label:"编号",width:"90"}}),a("el-table-column",{attrs:{align:"center",prop:"create_time",label:"录入时间"}}),a("el-table-column",{attrs:{align:"center",prop:"username",label:"姓名",width:"90"}}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.distributeSheBtn(t.row.username,t.row.id)}}},[e._v("分配给他")])]}}])})],1)],1)])],1)},r=[],i=(a("fb6a"),a("f415")),s=a("c1ce"),c=a("109a"),o=a("06f4"),l={name:"SaleDistribute",mixins:[c["a"]],data:function(){return{addFeedDialogVisible:!1,addFeedForm:{name:"",mobile:"",time:"",content:""},currentCustomId:"",queryStaffName:"",distributeDialogVisible:!1,defalutStaffData:[]}},computed:{screenHeight:function(){return this.$store.state.screenHeight-210+"px"},scrollHeight:function(){return this.$store.state.screenHeight-290+"px"}},watch:{},methods:{searchBtn:function(e){this.searchForm=e,this.getAllComplaints(this.searchForm)},handleCurrentChange:function(e){this.searchForm.page=e,this.getAllComplaints(this.searchForm)},searchSaleStaffInfo:function(e){var t=this;Object(o["g"])(this.queryStaffName).then((function(e){var a=e.code,n=e.data,r=e.msg;200===a?t.defalutStaffData=n.slice(0,10):t.$message.error(r)}))},distributeSuccess:function(e){this.currentCustomId=e,this.searchSaleStaffInfo(),this.distributeDialogVisible=!0},queryStaffBtn:function(){this.searchSaleStaffInfo(this.queryStaffName)},distributeSheBtn:function(e,t){var a=this;this.$confirm("是否要将此客户分配给售后服务人员"+e,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["b"])(a.currentCustomId,t).then((function(e){var t=e.code,n=e.msg;200===t?(a.$message.success(n),a.distributeDialogVisible=!1,a.getAllComplaints()):a.$message.error(n)}))})).catch((function(){a.$message({type:"info",message:"已取消删除"})}))}},components:{feedbackSearch:i["a"],Pagination:s["a"]}},u=l,f=(a("ea24"),a("2877")),d=Object(f["a"])(u,n,r,!1,null,"334838e3",null);t["default"]=d.exports},"109a":function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a("06f4"),r={data:function(){return{searchForm:{},feedFormData:[],currentPage:1,total:null,per_page:null,loading:!1}},created:function(){this.getAllComplaints(this.searchForm)},methods:{getAllComplaints:function(e){var t=this;this.loading=!0,Object(n["c"])(e).then((function(e){var a=e.code,n=e.data,r=e.msg;console.log(n),200===a?(t.feedFormData=n.data,console.log(t.feedFormData),t.currentPage=n.current_page,t.total=n.total,t.per_page=n.per_page,t.loading=!1):(t.$message.error(r),t.loading=!0)}))}}}},"159f":function(e,t,a){"use strict";var n=a("2b0e");new n["default"]},"199f":function(e,t,a){"use strict";var n=a("33cc"),r=a.n(n);r.a},"1dde":function(e,t,a){var n=a("d039"),r=a("b622"),i=a("2d00"),s=r("species");e.exports=function(e){return i>=51||!n((function(){var t=[],a=t.constructor={};return a[s]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"33cc":function(e,t,a){},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var n=a("1d80"),r=a("5899"),i="["+r+"]",s=RegExp("^"+i+i+"*"),c=RegExp(i+i+"*$"),o=function(e){return function(t){var a=String(n(t));return 1&e&&(a=a.replace(s,"")),2&e&&(a=a.replace(c,"")),a}};e.exports={start:o(1),end:o(2),trim:o(3)}},7156:function(e,t,a){var n=a("861d"),r=a("d2bb");e.exports=function(e,t,a){var i,s;return r&&"function"==typeof(i=t.constructor)&&i!==a&&n(s=i.prototype)&&s!==a.prototype&&r(e,s),e}},8418:function(e,t,a){"use strict";var n=a("c04e"),r=a("9bf2"),i=a("5c6c");e.exports=function(e,t,a){var s=n(t);s in e?r.f(e,s,i(0,a)):e[s]=a}},"948d":function(e,t,a){},a15b:function(e,t,a){"use strict";var n=a("23e7"),r=a("44ad"),i=a("fc6a"),s=a("a640"),c=[].join,o=r!=Object,l=s("join",",");n({target:"Array",proto:!0,forced:o||!l},{join:function(e){return c.call(i(this),void 0===e?",":e)}})},a640:function(e,t,a){"use strict";var n=a("d039");e.exports=function(e,t){var a=[][e];return!!a&&n((function(){a.call(null,t||function(){throw 1},1)}))}},a653:function(e,t,a){},a9e3:function(e,t,a){"use strict";var n=a("83ab"),r=a("da84"),i=a("94ca"),s=a("6eeb"),c=a("5135"),o=a("c6b6"),l=a("7156"),u=a("c04e"),f=a("d039"),d=a("7c73"),p=a("241c").f,h=a("06cf").f,m=a("9bf2").f,b=a("58a8").trim,g="Number",v=r[g],y=v.prototype,_=o(d(y))==g,k=function(e){var t,a,n,r,i,s,c,o,l=u(e,!1);if("string"==typeof l&&l.length>2)if(l=b(l),t=l.charCodeAt(0),43===t||45===t){if(a=l.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(l.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+l}for(i=l.slice(2),s=i.length,c=0;c<s;c++)if(o=i.charCodeAt(c),o<48||o>r)return NaN;return parseInt(i,n)}return+l};if(i(g,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var S,w=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof w&&(_?f((function(){y.valueOf.call(a)})):o(a)!=g)?l(new v(k(t)),a,w):k(t)},C=n?p(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;C.length>x;x++)c(v,S=C[x])&&!c(w,S)&&m(w,S,h(v,S));w.prototype=y,y.constructor=w,s(r,g,w)}},c1ce:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{staticClass:"pagination"},[a("el-col",{attrs:{span:7}},[a("el-pagination",{attrs:{"current-page":e.currentpage,"page-size":e.perpages,layout:"prev, pager, next, jumper",total:e.totalNumber},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentpage=t},"update:current-page":function(t){e.currentpage=t}}})],1)],1)},r=[],i=(a("a9e3"),a("159f"),{name:"Pagination",props:{currentPage:{type:Number,default:1},perpage:{type:Number,default:10},total:{type:Number,default:null}},data:function(){return{currentpage:null,perpages:null,totalNumber:null}},computed:{screenWidth:function(){return this.$store.state.screenWidth-240+"px"}},watch:{currentPage:function(e){this.currentpage=e},perpage:function(e){this.perpages=e},total:function(e){this.totalNumber=e}},methods:{handleCurrentChange:function(e){this.$emit("handlecurrentchange",e)}}}),s=i,c=(a("199f"),a("2877")),o=Object(c["a"])(s,n,r,!1,null,"4533357c",null);t["a"]=o.exports},e5db:function(e,t,a){"use strict";var n=a("a653"),r=a.n(n);r.a},e8b5:function(e,t,a){var n=a("c6b6");e.exports=Array.isArray||function(e){return"Array"==n(e)}},ea24:function(e,t,a){"use strict";var n=a("948d"),r=a.n(n);r.a},f415:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"feedback-search"},[a("el-card",{staticClass:"search-wrap"},[a("el-form",{ref:"searchForm",attrs:{size:"small",inline:!0,model:e.feedbacksearchForm}},[a("el-row",[a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"name"}},[a("el-input",{attrs:{size:"mini",placeholder:"投诉人姓名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.feedbacksearchForm.name,callback:function(t){e.$set(e.feedbacksearchForm,"name",t)},expression:"feedbacksearchForm.name"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"mobile"}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入客户手机号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.feedbacksearchForm.mobile,callback:function(t){e.$set(e.feedbacksearchForm,"mobile",t)},expression:"feedbacksearchForm.mobile"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",[a("el-select",{attrs:{size:"mini",placeholder:"分配状态"},on:{change:e.searchBtn},model:{value:e.is_assign,callback:function(t){e.is_assign=t},expression:"is_assign"}},[a("el-option",{attrs:{label:"已分配",value:"1"}}),a("el-option",{attrs:{label:"未分配",value:"0"}})],1)],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",[a("el-select",{attrs:{placeholder:"处理状态",size:"mini"},on:{change:e.searchBtn},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[a("el-option",{attrs:{label:"已解决",value:"1"}}),a("el-option",{attrs:{label:"未解决",value:"0"}})],1)],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",[a("el-date-picker",{staticClass:"select-date",staticStyle:{width:"250px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",size:"mini"},on:{change:e.searchBtn},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-col",{attrs:{span:11,offset:2}},[a("el-form-item",{staticClass:"handle"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.searchBtn}},[e._v("搜索")])],1)],1),a("el-col",{attrs:{span:10}},[a("el-form-item",[a("el-button",{attrs:{icon:"el-icon-delete"},on:{click:e.clearBtn}},[e._v("清除")])],1)],1)],1)],1)],1)],1)],1)},r=[],i=(a("a15b"),a("159f"),{name:"feedbackSearch",data:function(){return{feedbacksearchForm:{name:"",mobile:"",create_time:""},is_assign:"",status:"",time:[]}},methods:{clearBtn:function(){this.feedbacksearchForm={name:"",mobile:"",create_time:""},this.is_assign="",this.status="",this.time=[],this.searchBtn()},searchBtn:function(){""!==this.is_assign&&(this.feedbacksearchForm.is_assign=this.is_assign),""!==this.status&&(this.feedbacksearchForm.status=this.status),this.feedbacksearchForm.create_time=this.time?this.time.join(","):"",this.$emit("searchBtn",this.feedbacksearchForm)}}}),s=i,c=(a("e5db"),a("2877")),o=Object(c["a"])(s,n,r,!1,null,"61c152ec",null);t["a"]=o.exports},fb6a:function(e,t,a){"use strict";var n=a("23e7"),r=a("861d"),i=a("e8b5"),s=a("23cb"),c=a("50c4"),o=a("fc6a"),l=a("8418"),u=a("b622"),f=a("1dde"),d=a("ae40"),p=f("slice"),h=d("slice",{ACCESSORS:!0,0:0,1:2}),m=u("species"),b=[].slice,g=Math.max;n({target:"Array",proto:!0,forced:!p||!h},{slice:function(e,t){var a,n,u,f=o(this),d=c(f.length),p=s(e,d),h=s(void 0===t?d:t,d);if(i(f)&&(a=f.constructor,"function"!=typeof a||a!==Array&&!i(a.prototype)?r(a)&&(a=a[m],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return b.call(f,p,h);for(n=new(void 0===a?Array:a)(g(h-p,0)),u=0;p<h;p++,u++)p in f&&l(n,u,f[p]);return n.length=u,n}})}}]);
//# sourceMappingURL=chunk-31530b8d.ebff83a0.js.map