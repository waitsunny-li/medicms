(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5cf9ca85"],{"159f":function(t,e,n){"use strict";var a=n("2b0e");new a["default"]},"199f":function(t,e,n){"use strict";var a=n("33cc"),o=n.n(a);o.a},"33cc":function(t,e,n){},3620:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"order-query"},[n("el-row",[n("el-col",{attrs:{span:24}},[n("customer-search",{on:{searchBtn:t.searchBtn}}),n("el-card",{staticClass:"table-content",style:{height:t.screenHeight}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"user-table-wrap",staticStyle:{width:"100%"},attrs:{data:t.customers,height:t.scrollHeight,border:""}},[n("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("p",{staticClass:"title-need"},[n("el-button",{attrs:{type:"text"}},[t._v(" 对家政员的需求 "),n("i",{staticClass:"el-icon-bottom"})])],1),n("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"center",inline:""}},[n("el-form-item",{attrs:{label:"年龄"}},[n("span",[t._v(t._s(e.row.demand_age))])]),n("el-form-item",{attrs:{label:"籍贯"}},[n("span",[t._v(t._s(e.row.demand_census))])]),n("el-form-item",{attrs:{label:"性别"}},[0==e.row.demand_sex?n("span",[t._v("不限")]):t._e(),1==e.row.demand_sex?n("span",[t._v("女")]):t._e(),2==e.row.demand_sex?n("span",[t._v("男")]):t._e()]),n("el-form-item",{attrs:{label:"岗位要求"}},[n("span",[t._v(t._s(e.row.demand_job.join("，")))])]),n("el-form-item",{attrs:{label:"学历"}},[n("span",[t._v(t._s(e.row.demand_education))])]),n("el-form-item",{attrs:{label:"服务技能"}},[n("span",[t._v(t._s(e.row.demand_service_skill.join(",")))])]),n("el-form-item",{attrs:{label:"厨艺"}},[n("span",[t._v(t._s(e.row.demand_cooking))])]),n("el-form-item",{attrs:{label:"家政从业经验"}},[n("span",[t._v(t._s(e.row.demand_experience))])]),n("el-form-item",{attrs:{label:"工资待遇"}},[n("span",[t._v("12000 / 26天")])])],1)]}}])}),n("el-table-column",{attrs:{align:"center",prop:"id",label:"订单号",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.orderInfoBtn(e.row.name,e.row.id)}}},[t._v(t._s(e.row.id))])]}}])}),n("el-table-column",{attrs:{align:"center",prop:"name",label:"名字",width:"100"}}),n("el-table-column",{attrs:{align:"center",prop:"family_hometown","min-width":"120",label:"家庭成员籍贯"}}),n("el-table-column",{staticClass:"identify",attrs:{align:"center",prop:"service_type",label:"服务类型","show-overflow-tooltip":!0,width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(t.service_types,(function(a){return n("div",{key:a.id},[e.row.service_type==a.id?n("p",[t._v(t._s(a.name))]):t._e()])}))}}])}),n("el-table-column",{attrs:{align:"center",prop:"service_content","show-overflow-tooltip":!0,label:"需要服务"}}),n("el-table-column",{attrs:{width:"180",align:"center",label:"家庭成员"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.family_people.children)+"小孩，"+t._s(e.row.family_people.adlut)+"成人，"+t._s(e.row.family_people.old)+"老人")]}}])}),n("el-table-column",{attrs:{align:"center",prop:"mobile",width:"100px",label:"手机号"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.mobile,placement:"top"}},[n("i",{staticClass:"el-icon-phone",staticStyle:{color:"red","font-size":"20px"}})])]}}])}),n("el-table-column",{attrs:{align:"center",prop:"family_address",label:"现居住地址","min-width":"180","show-overflow-tooltip":!0}}),n("el-table-column",{attrs:{align:"center",prop:"source_id",label:"来源","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(t.source,(function(a){return n("div",{key:a.id},[e.row.source_id==a.id?n("div",{staticStyle:{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",height:"30px"}},[t._v(t._s(a.name))]):t._e()])}))}}])}),n("el-table-column",{attrs:{align:"center",prop:"state",label:"状态","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.state?n("p",[t._v("审核中")]):t._e(),1==e.row.state?n("p",[t._v("待进行")]):t._e(),2==e.row.state?n("p",[t._v("跟进中")]):t._e(),3==e.row.state?n("p",[t._v("已完成")]):t._e(),4==e.row.state?n("p",[t._v("已取消")]):t._e(),5==e.row.state?n("p",[t._v("暂停中")]):t._e(),6==e.row.state?n("p",[t._v("重新恢复")]):t._e()]}}])}),n("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"170px"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-tooltip",{staticClass:"item",attrs:{enterable:!1,effect:"dark",content:"面试记录",placement:"top"}},[n("el-button",{attrs:{circle:"",size:"mini",icon:"el-icon-camera",type:"primary"},on:{click:function(n){return t.interviewDisplayBtn(e.row.id)}}})],1),n("el-tooltip",{staticClass:"item",attrs:{enterable:!1,effect:"dark",content:"查看跟进",placement:"top"}},[n("el-button",{attrs:{circle:"",size:"mini",icon:"el-icon-date",type:"primary"},on:{click:function(n){return t.lookFollowUp(e.row.id)}}})],1),n("el-tooltip",{staticClass:"item",attrs:{enterable:!1,effect:"dark",content:"查看保险",placement:"top"}},[n("el-button",{attrs:{circle:"",size:"mini",icon:"el-icon-document",type:"success"},on:{click:function(n){return t.lookInsurance(e.row.id)}}})],1),n("el-tooltip",{staticClass:"item",attrs:{enterable:!1,effect:"dark",content:"查看换人记录",placement:"top"}},[n("el-button",{attrs:{circle:"",size:"mini",icon:"el-icon-tickets",type:"warning"},on:{click:function(n){return t.lookChangeStaff(e.row.id,e.row.name)}}})],1)]}}])})],1)],1)],1)],1),n("pagination",{attrs:{currentPage:t.currentPage,perpage:t.per_page,total:t.total},on:{handlecurrentchange:t.handleCurrentChange}}),n("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.interviewedLoading,expression:"interviewedLoading"}],attrs:{title:t.interviewTitle,visible:t.interviewDialogVisible,width:"870px",center:""},on:{"update:visible":function(e){t.interviewDialogVisible=e}}},[n("div",{staticClass:"interview-content"},[n("el-table",{staticStyle:{width:"100%"},attrs:{stripe:"",data:t.interviewFormData,height:"400px"}},[n("el-table-column",{attrs:{prop:"interview_time",align:"center",label:"面试时间",width:"150px"}}),n("el-table-column",{attrs:{prop:"staff_id",align:"center",label:"面试人员编号",width:"120"}}),n("el-table-column",{attrs:{align:"center",label:"姓名",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.staffInfoBtn(e.row.staff)}}},[t._v(t._s(e.row.staff.name))])]}}])}),n("el-table-column",{attrs:{align:"center",label:"手机号",prop:"tel"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.staff.mobile))]}}])}),n("el-table-column",{attrs:{align:"center",label:"面试内容",prop:"content"}}),n("el-table-column",{attrs:{align:"center",label:"是否面试完成",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?n("p",[t._v("面试中")]):t._e(),1==e.row.status?n("p",[n("i",{staticClass:"el-icon-success",staticStyle:{"font-size":"18px",color:"#67C23A","vertical-align":"middle","margin-right":"5px"}}),t._v("通过 ")]):t._e(),2==e.row.status?n("p",[n("i",{staticClass:"el-icon-error",staticStyle:{"font-size":"18px",color:"#F56C6C","vertical-align":"middle","margin-right":"5px"}}),t._v("不通过 ")]):t._e()]}}])})],1)],1)]),n("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.followupLoading,expression:"followupLoading"}],attrs:{title:t.followUpTitle,visible:t.followUpDialogVisible,width:"800px",center:""},on:{"update:visible":function(e){t.followUpDialogVisible=e}}},[n("div",{staticClass:"followup-content"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.followUpFormData,stripe:"",height:"400px"}},[n("el-table-column",{attrs:{prop:"start_time",align:"center",label:"日期",width:"150"}}),n("el-table-column",{attrs:{prop:"total_time",align:"center",label:"时长",width:"180"}}),n("el-table-column",{attrs:{prop:"recommend",align:"center",label:"当前服务人员",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){return t.staffInfoBtn(e.row.staff)}}},[t._v(t._s(e.row.staff.name))])]}}])}),n("el-table-column",{attrs:{prop:"content",align:"center","show-overflow-tooltip":!0,label:"跟单记录情况"}})],1)],1)]),n("el-dialog",{attrs:{title:t.staffInfoTitle,visible:t.staffInfoDialogVisible,width:"870px",center:"","append-to-body":""},on:{"update:visible":function(e){t.staffInfoDialogVisible=e}}},[n("staff-info",{attrs:{staffInfo:t.staffInfo,staffInfoLoading:t.staffInfoLoading}})],1),n("el-dialog",{attrs:{title:t.orderInfoTitle,visible:t.orderInfoDialogVisible,width:"870px",center:"","append-to-body":""},on:{"update:visible":function(e){t.orderInfoDialogVisible=e}}},[n("order-info",{attrs:{orderInfo:t.orderInfo,orderInfoLoading:t.orderInfoLoading}})],1),n("el-dialog",{attrs:{title:"该订单全部保险记录",visible:t.lookInsuranceDialogVisible,width:"600px",center:""},on:{"update:visible":function(e){t.lookInsuranceDialogVisible=e}}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.insuracneFormData,height:"350px"}},[n("el-table-column",{attrs:{align:"center",prop:"safety_no",label:"保险单号"}}),n("el-table-column",{attrs:{width:"180",align:"center",prop:"time",label:"起止时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.time.join(" ~ ")))]}}])}),n("el-table-column",{attrs:{align:"center",prop:"content",label:"保险内容"}})],1)],1),n("el-dialog",{attrs:{title:t.changeTitle,visible:t.lookChangeDialogVisible,width:"600px",center:""},on:{"update:visible":function(e){t.lookChangeDialogVisible=e}}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.changeStaffData,height:"350px"}},[n("el-table-column",{attrs:{align:"center",prop:"create_time",label:"时间",width:"160"}}),n("el-table-column",{attrs:{align:"center",prop:"staff.id",label:"员工编号"}}),n("el-table-column",{attrs:{align:"center",label:"姓名"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.staff?e.row.staff.name:"无"))]}}])}),n("el-table-column",{attrs:{align:"center",label:"员工状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.staff?n("div",[1==e.row.staff.person_state?n("span",{staticClass:"content-text"},[t._v("培训")]):2==e.row.staff.person_state?n("span",{staticClass:"content-text"},[t._v("考核")]):3==e.row.staff.person_state?n("span",{staticClass:"content-text"},[t._v("待岗")]):4==e.row.staff.person_state?n("span",{staticClass:"content-text"},[t._v("离职")]):5==e.row.staff.person_state?n("span",{staticClass:"content-text"},[t._v("黑名单")]):6==e.row.staff.person_state?n("span",{staticClass:"content-text"},[t._v("在岗")]):7==e.row.staff.person_state?n("span",{staticClass:"content-text"},[t._v("离职(下单)")]):t._e()]):n("div")]}}])}),n("el-table-column",{attrs:{align:"center",prop:"content",label:"换人原因"},scopedSlots:t._u([{key:"default",fn:function(e){return[""==e.row.content?n("div",[t._v("首位服务人员")]):n("div",[t._v(t._s(e.row.content))])]}}])})],1)],1)],1)},o=[],r=(n("b0c0"),n("30d1")),i=n("ee19"),l=n("c1ce"),s=n("2f08"),c=n("ed50"),f=n("e7a1"),u={name:"OrderQuery",data:function(){return{changeTitle:"",changeStaffData:[],lookChangeDialogVisible:!1,insuracneFormData:[],lookInsuranceDialogVisible:!1,searchForm:{},customers:[],currentPage:1,total:null,per_page:null,loading:!1,source:[],interviewDialogVisible:!1,interviewedLoading:!1,interviewTitle:"",interviewFormData:[],staffInfoDialogVisible:!1,staffInfoLoading:!1,staffInfoTitle:"",staffInfo:{},orderInfoDialogVisible:!1,orderInfoTitle:"",orderInfoLoading:!1,orderInfo:{},followUpDialogVisible:!1,followupLoading:!1,followUpTitle:"",followUpFormData:[],service_types:[]}},computed:{screenHeight:function(){return this.$store.state.screenHeight-210+"px"},scrollHeight:function(){return this.$store.state.screenHeight-290+"px"}},watch:{},created:function(){var t=this;this.getAllCustomerInfo(),Object(f["b"])().then((function(e){var n=e.code,a=e.data,o=e.msg;200===n?t.source=a:t.$message.error(o)})),Object(f["h"])().then((function(e){200===e.code?t.service_types=e.data:t.$message.waraing("获取岗位失败！")}))},methods:{lookChangeStaff:function(t,e){var n=this;this.changeTitle="".concat(e,"的换人记录"),Object(c["o"])(t).then((function(t){var e=t.code,a=t.data,o=t.msg;200===e?(console.log(a),n.changeStaffData=a.data,n.lookChangeDialogVisible=!0):n.$message.error(o)}))},getOrderInsurance:function(t){var e=this;Object(c["q"])(t).then((function(t){var n=t.code,a=t.data,o=t.msg;200===n?(e.insuracneFormData=a,e.lookInsuranceDialogVisible=!0):e.$message.error(o)}))},lookInsurance:function(t){this.getOrderInsurance(t)},getSearchInfoData:function(t){var e=this;Object(c["B"])(t).then((function(t){200===t.code?(e.customers=t.data.data,console.log(t.data.data),e.currentPage=t.data.current_page,e.total=t.data.total,e.per_page=t.data.per_page,e.loading=!1):(e.$message.error(t.msg),e.loading=!1)}))},getAllCustomerInfo:function(){this.loading=!0,this.getSearchInfoData(this.searchForm)},getAllStaffInterviewInfo:function(t){var e=this;this.interviewedLoading=!0,Object(c["k"])({customer_id:t}).then((function(t){var n=t.code,a=t.data;t.msg;200===n?(e.interviewFormData=a||[],e.interviewedLoading=!1):(e.$message.error(t.msg),e.interviewedLoading=!0)}))},getAllFollowUpInfo:function(t){var e=this;this.followupLoading=!0,Object(c["j"])({customer_id:t}).then((function(t){var n=t.code,a=t.data,o=t.msg;200===n?(console.log(t),e.followUpFormData=a,e.followupLoading=!1):(e.$message.error(o),e.followupLoading=!1)}))},searchBtn:function(t){this.searchForm=t,this.getSearchInfoData(this.searchForm)},handleCurrentChange:function(t){this.searchForm.page=t,this.getSearchInfoData(this.searchForm)},interviewDisplayBtn:function(t){this.getAllStaffInterviewInfo(t),this.interviewTitle="订单号（".concat(t,"）的面试记录"),this.interviewDialogVisible=!0},staffInfoBtn:function(t){this.staffInfo=t,this.staffInfoTitle="家政员（".concat(t.name,"）的基本信息"),this.staffInfoDialogVisible=!0},orderInfoBtn:function(t,e){var n=this;this.orderInfoLoading=!0,Object(c["l"])(e).then((function(e){var a=e.code,o=e.data,r=e.msg;200===a?(console.log(o),n.orderInfo=o,n.orderInfoTitle="（".concat(t,"）订单的基本信息"),n.orderInfoDialogVisible=!0,n.orderInfoLoading=!1):(n.$message.error(r),n.orderInfoLoading=!1)}))},lookFollowUp:function(t){this.getAllFollowUpInfo(t),this.followUpTitle="订单号（".concat(t,"）的跟进情况"),this.followUpDialogVisible=!0}},components:{CustomerSearch:r["a"],StaffInfo:i["a"],OrderInfo:s["a"],Pagination:l["a"]}},p=u,d=(n("a89f"),n("2877")),g=Object(d["a"])(p,a,o,!1,null,"0ce89010",null);e["default"]=g.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var a=n("1d80"),o=n("5899"),r="["+o+"]",i=RegExp("^"+r+r+"*"),l=RegExp(r+r+"*$"),s=function(t){return function(e){var n=String(a(e));return 1&t&&(n=n.replace(i,"")),2&t&&(n=n.replace(l,"")),n}};t.exports={start:s(1),end:s(2),trim:s(3)}},7156:function(t,e,n){var a=n("861d"),o=n("d2bb");t.exports=function(t,e,n){var r,i;return o&&"function"==typeof(r=e.constructor)&&r!==n&&a(i=r.prototype)&&i!==n.prototype&&o(t,i),t}},a15b:function(t,e,n){"use strict";var a=n("23e7"),o=n("44ad"),r=n("fc6a"),i=n("a640"),l=[].join,s=o!=Object,c=i("join",",");a({target:"Array",proto:!0,forced:s||!c},{join:function(t){return l.call(r(this),void 0===t?",":t)}})},a640:function(t,e,n){"use strict";var a=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&a((function(){n.call(null,e||function(){throw 1},1)}))}},a89f:function(t,e,n){"use strict";var a=n("d41e"),o=n.n(a);o.a},a9e3:function(t,e,n){"use strict";var a=n("83ab"),o=n("da84"),r=n("94ca"),i=n("6eeb"),l=n("5135"),s=n("c6b6"),c=n("7156"),f=n("c04e"),u=n("d039"),p=n("7c73"),d=n("241c").f,g=n("06cf").f,m=n("9bf2").f,h=n("58a8").trim,b="Number",w=o[b],_=w.prototype,v=s(p(_))==b,I=function(t){var e,n,a,o,r,i,l,s,c=f(t,!1);if("string"==typeof c&&c.length>2)if(c=h(c),e=c.charCodeAt(0),43===e||45===e){if(n=c.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:a=2,o=49;break;case 79:case 111:a=8,o=55;break;default:return+c}for(r=c.slice(2),i=r.length,l=0;l<i;l++)if(s=r.charCodeAt(l),s<48||s>o)return NaN;return parseInt(r,a)}return+c};if(r(b,!w(" 0o1")||!w("0b1")||w("+0x1"))){for(var y,x=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof x&&(v?u((function(){_.valueOf.call(n)})):s(n)!=b)?c(new w(I(e)),n,x):I(e)},k=a?d(w):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;k.length>C;C++)l(w,y=k[C])&&!l(x,y)&&m(x,y,g(w,y));x.prototype=_,_.constructor=x,i(o,b,x)}},c1ce:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",{staticClass:"pagination"},[n("el-col",{attrs:{span:7}},[n("el-pagination",{attrs:{"current-page":t.currentpage,"page-size":t.perpages,layout:"prev, pager, next, jumper",total:t.totalNumber},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentpage=e},"update:current-page":function(e){t.currentpage=e}}})],1)],1)},o=[],r=(n("a9e3"),n("159f"),{name:"Pagination",props:{currentPage:{type:Number,default:1},perpage:{type:Number,default:10},total:{type:Number,default:null}},data:function(){return{currentpage:null,perpages:null,totalNumber:null}},computed:{screenWidth:function(){return this.$store.state.screenWidth-240+"px"}},watch:{currentPage:function(t){this.currentpage=t},perpage:function(t){this.perpages=t},total:function(t){this.totalNumber=t}},methods:{handleCurrentChange:function(t){this.$emit("handlecurrentchange",t)}}}),i=r,l=(n("199f"),n("2877")),s=Object(l["a"])(i,a,o,!1,null,"4533357c",null);e["a"]=s.exports},d41e:function(t,e,n){}}]);
//# sourceMappingURL=chunk-5cf9ca85.475f6d9e.js.map