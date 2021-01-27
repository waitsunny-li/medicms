(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-863e81a2"],{"06f4":function(e,t,a){"use strict";a.d(t,"c",(function(){return n})),a.d(t,"f",(function(){return s})),a.d(t,"a",(function(){return l})),a.d(t,"g",(function(){return i})),a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return c})),a.d(t,"e",(function(){return u}));var r=a("1bab");function n(e){return Object(r["a"])({url:"/complaint/index",method:"get",params:e})}function s(e){return Object(r["a"])({url:"/complaint/save",method:"post",data:e})}function l(e){return Object(r["a"])({url:"/complaint/delete",method:"get",params:{id:e}})}function i(e){return Object(r["a"])({url:"user/sale",method:"get",params:{keyword:e}})}function o(e,t){return Object(r["a"])({url:"complaint/match",method:"post",data:{complaint_id:e,assign_user_id:t}})}function c(e){return Object(r["a"])({url:"complaint/state",method:"post",data:e})}function u(e){return Object(r["a"])({url:"/complaint/deal_with",method:"post",data:e})}},"109a":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a("06f4"),n={data:function(){return{searchForm:{},feedFormData:[],currentPage:1,total:null,per_page:null,loading:!1}},created:function(){this.getAllComplaints(this.searchForm)},methods:{getAllComplaints:function(e){var t=this;this.loading=!0,Object(r["c"])(e).then((function(e){var a=e.code,r=e.data,n=e.msg;console.log(r),200===a?(t.feedFormData=r.data,console.log(t.feedFormData),t.currentPage=r.current_page,t.total=r.total,t.per_page=r.per_page,t.loading=!1):(t.$message.error(n),t.loading=!0)}))}}}},"159f":function(e,t,a){"use strict";var r=a("2b0e");new r["default"]},1949:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"handle"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("feedback-search",{on:{searchBtn:e.searchBtn}}),a("el-card",{staticClass:"table-content",style:{height:e.screenHeight}},[a("el-table",{staticClass:"user-table-wrap",staticStyle:{width:"100%"},attrs:{data:e.feedFormData,border:"",height:e.scrollHeight}},[a("el-table-column",{attrs:{prop:"name",align:"center",label:"客户姓名",width:"100"}}),a("el-table-column",{attrs:{align:"center",prop:"mobile",label:"联络电话",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{staticClass:"el-icon-phone",staticStyle:{color:"red"}}),e._v(" "+e._s(t.row.mobile)+" ")]}}])}),a("el-table-column",{attrs:{align:"center",prop:"complaint_time",label:"时间",width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"content",label:"投诉事件","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{align:"center",prop:"status",label:"是否解决",width:"100"},scopedSlots:e._u([{key:"default",fn:function(e){return[e.row.status?a("div",[a("i",{staticClass:"el-icon-success",staticStyle:{color:"#67C23A","font-size":"28px"}})]):a("div",[a("i",{staticClass:"el-icon-circle-close",staticStyle:{color:"#F56C6C","font-size":"28px"}})])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"is_assign",label:"是否分配",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.is_assign?a("div",[e._v("已分配")]):a("div",[e._v("未分配")])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"assign_user_id",label:"售后服务人员",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.username?a("p",[e._v(" "+e._s(t.row.username)+" ")]):a("p",[e._v("暂无")])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"result",label:"处理结果"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.result?a("p",[e._v(" "+e._s(t.row.result)+" ")]):a("p",[e._v(" 暂无结果 ")])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"rate",width:"160",label:"客户满意度"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.status?a("p",[a("el-rate",{attrs:{disabled:!0,value:t.row.star,texts:e.texts,colors:e.colors}})],1):a("p",[e._v("暂无评价")])]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center","min-width":"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.star?a("el-button",{directives:[{name:"has-power",rawName:"v-has-power",value:{limitList:[1,4],role_id:e.$store.state.userInfo.role_id},expression:"{limitList: [1, 4], role_id: $store.state.userInfo.role_id}"}],attrs:{type:"success",size:"mini"},on:{click:function(a){return e.rateBtn(t.row.id,t.row.result)}}},[e._v("评价")]):e._e(),t.row.result?e._e():a("el-button",{directives:[{name:"has-power",rawName:"v-has-power",value:{limitList:[8],role_id:e.$store.state.userInfo.role_id},expression:"{limitList: [8,], role_id: $store.state.userInfo.role_id}"}],attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.handleRsultBtn(t.row.id)}}},[e._v("处理")])]}}])})],1)],1)],1)],1),a("pagination",{attrs:{currentPage:e.currentPage,perpage:e.per_page,total:e.total},on:{handlecurrentchange:e.handleCurrentChange}}),a("el-dialog",{attrs:{title:"评价",visible:e.rateDialogVisible,width:"450px",center:""},on:{"update:visible":function(t){e.rateDialogVisible=t},close:e.rateClose}},[a("el-form",{ref:"rateForm",attrs:{rules:e.rateFormRules,model:e.rateForm,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"评分",prop:"star"}},[a("el-rate",{staticStyle:{"margin-top":"10px"},attrs:{colors:e.colors,texts:e.texts,"show-text":""},model:{value:e.rateForm.star,callback:function(t){e.$set(e.rateForm,"star",t)},expression:"rateForm.star"}})],1),a("el-form-item",{attrs:{label:"评价内容",prop:"evaluation"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.rateForm.evaluation,callback:function(t){e.$set(e.rateForm,"evaluation",t)},expression:"rateForm.evaluation"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.rateDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.saveRateBtn}},[e._v("保 存")])],1)],1),a("el-dialog",{attrs:{title:"处理结果上报",visible:e.resultDialogVisible,width:"450px",center:""},on:{"update:visible":function(t){e.resultDialogVisible=t},close:e.resultClose}},[a("el-form",{ref:"handleResultForm",attrs:{rules:e.handleResultFormRules,model:e.handleResultForm,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"处理结果",prop:"result"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.handleResultForm.result,callback:function(t){e.$set(e.handleResultForm,"result",t)},expression:"handleResultForm.result"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.resultDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.saveHandleResultBtn}},[e._v("保 存")])],1)],1)],1)},n=[],s=a("f415"),l=a("c1ce"),i=a("109a"),o=a("06f4"),c={name:"Handle",mixins:[i["a"]],data:function(){return{texts:["极差","失望","一般","满意","非常满意"],colors:["#99A9BF","#F7BA2A","#FF9900"],rateDialogVisible:!1,rateForm:{complaint_id:"",evaluation:"",star:null},rateFormRules:{evaluation:[{required:!0,message:"请输入评价内容",trigger:"blur"}],start:[{required:!0,message:"请输入满意度",trigger:"blur"}]},handleResultFormRules:{rsult:[{required:!0,message:"请输入处理结果",trigger:"blur"}]},handleResultForm:{complaint_id:"",result:""},resultDialogVisible:!1}},computed:{screenHeight:function(){return this.$store.state.screenHeight-210+"px"},scrollHeight:function(){return this.$store.state.screenHeight-230+"px"}},watch:{},methods:{searchBtn:function(e){this.searchForm=e,this.getAllComplaints(this.searchForm)},handleCurrentChange:function(e){this.searchForm.page=e,this.getAllComplaints(this.searchForm)},rateBtn:function(e,t){t?(this.rateDialogVisible=!0,this.rateForm.complaint_id=e):this.$message.error("该投诉还没有处理！请先处理！")},saveHandleResultBtn:function(){var e=this;this.$refs.handleResultForm.validate((function(t){if(!t)return!1;Object(o["e"])(e.handleResultForm).then((function(t){var a=t.code,r=t.msg;200===a?(e.$message.success(r),e.resultDialogVisible=!1,e.getAllComplaints()):e.$message.error(r)}))}))},resultClose:function(){this.$refs.handleResultForm.resetFields()},handleRsultBtn:function(e){this.resultDialogVisible=!0,this.handleResultForm.complaint_id=e},rateClose:function(){this.$refs.rateForm.resetFields()},saveRateBtn:function(){var e=this;this.$refs.rateForm.validate((function(t){if(!t)return!1;Object(o["d"])(e.rateForm).then((function(t){var a=t.code,r=t.msg;200===a?(e.$message.success(r),e.rateDialogVisible=!1,e.getAllComplaints()):e.$message.error(r)}))}))}},mounted:function(){},components:{feedbackSearch:s["a"],Pagination:l["a"]}},u=c,d=(a("68d8"),a("2877")),f=Object(d["a"])(u,r,n,!1,null,"6179234a",null);t["default"]=f.exports},"199f":function(e,t,a){"use strict";var r=a("33cc"),n=a.n(r);n.a},"25b8":function(e,t,a){"use strict";var r=a("e93b"),n=a.n(r);n.a},"33cc":function(e,t,a){},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var r=a("1d80"),n=a("5899"),s="["+n+"]",l=RegExp("^"+s+s+"*"),i=RegExp(s+s+"*$"),o=function(e){return function(t){var a=String(r(t));return 1&e&&(a=a.replace(l,"")),2&e&&(a=a.replace(i,"")),a}};e.exports={start:o(1),end:o(2),trim:o(3)}},"68d8":function(e,t,a){"use strict";var r=a("81bf"),n=a.n(r);n.a},7156:function(e,t,a){var r=a("861d"),n=a("d2bb");e.exports=function(e,t,a){var s,l;return n&&"function"==typeof(s=t.constructor)&&s!==a&&r(l=s.prototype)&&l!==a.prototype&&n(e,l),e}},"81bf":function(e,t,a){},a15b:function(e,t,a){"use strict";var r=a("23e7"),n=a("44ad"),s=a("fc6a"),l=a("a640"),i=[].join,o=n!=Object,c=l("join",",");r({target:"Array",proto:!0,forced:o||!c},{join:function(e){return i.call(s(this),void 0===e?",":e)}})},a640:function(e,t,a){"use strict";var r=a("d039");e.exports=function(e,t){var a=[][e];return!!a&&r((function(){a.call(null,t||function(){throw 1},1)}))}},a9e3:function(e,t,a){"use strict";var r=a("83ab"),n=a("da84"),s=a("94ca"),l=a("6eeb"),i=a("5135"),o=a("c6b6"),c=a("7156"),u=a("c04e"),d=a("d039"),f=a("7c73"),p=a("241c").f,m=a("06cf").f,h=a("9bf2").f,b=a("58a8").trim,g="Number",v=n[g],_=v.prototype,F=o(f(_))==g,k=function(e){var t,a,r,n,s,l,i,o,c=u(e,!1);if("string"==typeof c&&c.length>2)if(c=b(c),t=c.charCodeAt(0),43===t||45===t){if(a=c.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(c.charCodeAt(1)){case 66:case 98:r=2,n=49;break;case 79:case 111:r=8,n=55;break;default:return+c}for(s=c.slice(2),l=s.length,i=0;i<l;i++)if(o=s.charCodeAt(i),o<48||o>n)return NaN;return parseInt(s,r)}return+c};if(s(g,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var w,y=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof y&&(F?d((function(){_.valueOf.call(a)})):o(a)!=g)?c(new v(k(t)),a,y):k(t)},x=r?p(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;x.length>C;C++)i(v,w=x[C])&&!i(y,w)&&h(y,w,m(v,w));y.prototype=_,_.constructor=y,l(n,g,y)}},c1ce:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{staticClass:"pagination"},[a("el-col",{attrs:{span:7}},[a("el-pagination",{attrs:{"current-page":e.currentpage,"page-size":e.perpages,layout:"prev, pager, next, jumper",total:e.totalNumber},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentpage=t},"update:current-page":function(t){e.currentpage=t}}})],1)],1)},n=[],s=(a("a9e3"),a("159f"),{name:"Pagination",props:{currentPage:{type:Number,default:1},perpage:{type:Number,default:10},total:{type:Number,default:null}},data:function(){return{currentpage:null,perpages:null,totalNumber:null}},computed:{screenWidth:function(){return this.$store.state.screenWidth-240+"px"}},watch:{currentPage:function(e){this.currentpage=e},perpage:function(e){this.perpages=e},total:function(e){this.totalNumber=e}},methods:{handleCurrentChange:function(e){this.$emit("handlecurrentchange",e)}}}),l=s,i=(a("199f"),a("2877")),o=Object(i["a"])(l,r,n,!1,null,"4533357c",null);t["a"]=o.exports},e93b:function(e,t,a){},f415:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"feedback-search"},[a("el-card",{staticClass:"search-wrap"},[a("el-form",{ref:"searchForm",attrs:{size:"small",inline:!0,model:e.feedbacksearchForm}},[a("el-row",[a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"name"}},[a("el-input",{attrs:{size:"mini",placeholder:"投诉人姓名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.feedbacksearchForm.name,callback:function(t){e.$set(e.feedbacksearchForm,"name",t)},expression:"feedbacksearchForm.name"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"mobile"}},[a("el-input",{attrs:{size:"mini",placeholder:"投诉人手机号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.feedbacksearchForm.mobile,callback:function(t){e.$set(e.feedbacksearchForm,"mobile",t)},expression:"feedbacksearchForm.mobile"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",[a("el-select",{attrs:{size:"mini",placeholder:"分配状态"},on:{change:e.searchBtn},model:{value:e.is_assign,callback:function(t){e.is_assign=t},expression:"is_assign"}},[a("el-option",{attrs:{label:"已分配",value:"1"}}),a("el-option",{attrs:{label:"未分配",value:"0"}})],1)],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",[a("el-select",{attrs:{placeholder:"处理状态",size:"mini"},on:{change:e.searchBtn},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[a("el-option",{attrs:{label:"已解决",value:"1"}}),a("el-option",{attrs:{label:"未解决",value:"0"}})],1)],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",[a("el-date-picker",{staticClass:"select-date",staticStyle:{width:"250px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",size:"mini"},on:{change:e.searchBtn},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-col",{attrs:{span:11,offset:2}},[a("el-form-item",{staticClass:"handle"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.searchBtn}},[e._v("搜索")])],1)],1),a("el-col",{attrs:{span:10}},[a("el-form-item",[a("el-button",{attrs:{icon:"el-icon-delete"},on:{click:e.clearBtn}},[e._v("清除")])],1)],1)],1)],1)],1)],1)],1)},n=[],s=(a("a15b"),a("159f"),{name:"feedbackSearch",data:function(){return{feedbacksearchForm:{name:"",mobile:"",create_time:""},is_assign:"",status:"",time:[]}},methods:{clearBtn:function(){this.feedbacksearchForm={name:"",mobile:"",create_time:""},this.is_assign="",this.status="",this.time=[],this.searchBtn()},searchBtn:function(){""!==this.is_assign&&(this.feedbacksearchForm.is_assign=this.is_assign),""!==this.status&&(this.feedbacksearchForm.status=this.status),this.feedbacksearchForm.create_time=this.time?this.time.join(","):"",this.$emit("searchBtn",this.feedbacksearchForm)}}}),l=s,i=(a("25b8"),a("2877")),o=Object(i["a"])(l,r,n,!1,null,"2d2b0b04",null);t["a"]=o.exports}}]);
//# sourceMappingURL=chunk-863e81a2.df47514f.js.map