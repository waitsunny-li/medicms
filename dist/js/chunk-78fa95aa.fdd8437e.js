(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78fa95aa"],{"17ab":function(e,t,a){"use strict";var s=a("f443"),r=a.n(s);r.a},6959:function(e,t,a){"use strict";var s=a("c22e"),r=a.n(s);r.a},bb6f:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"assessment"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("search",{on:{searchbtn:e.searchBtn}}),a("el-card",{staticClass:"table-content",style:{height:e.screenHeight}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"user-table-wrap",staticStyle:{width:"100%"},attrs:{data:e.userList,border:"",height:e.scrollHeight}},[a("el-table-column",{attrs:{prop:"id",width:"100",align:"center",label:"编号"}}),a("el-table-column",{attrs:{prop:"name",width:"100",align:"center",label:"姓名"}}),a("el-table-column",{attrs:{align:"center",width:"80",prop:"sex",label:"性别"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.sex?a("span",[e._v("男")]):2==t.row.sex?a("span",[e._v("女")]):e._e()]}}])}),a("el-table-column",{attrs:{align:"center",prop:"mobile",width:"160px",label:"手机号"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("i",{staticClass:"el-icon-phone",staticStyle:{color:"red"}}),e._v(" "+e._s(t.row.mobile)+" ")]}}])}),a("el-table-column",{staticClass:"identify",attrs:{align:"center",prop:"identity",label:"身份证","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{align:"center",prop:"address",label:"地址","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.now_p_text)+e._s(t.row.now_c_text)+e._s(t.row.now_d_text)+e._s(t.row.now_address_desc))]}}])}),a("el-table-column",{attrs:{prop:"in_time",align:"center",label:"入职日期",width:"180"}}),a("el-table-column",{attrs:{width:"80",align:"center",prop:"person_state",label:"人员状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.person_state?a("p",[e._v("培训")]):2==t.row.person_state?a("p",[e._v("考核")]):3==t.row.person_state?a("p",[e._v("待岗")]):4==t.row.person_state?a("p",[e._v("离职")]):5==t.row.person_state?a("p",[e._v("黑名单")]):6==t.row.person_state?a("p",[e._v("在岗")]):7==t.row.person_state?a("p",[e._v("离职(下单)")]):a("p",[e._v("错误")])]}}])}),a("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return e.lookAssessBtn(t.row.id,t.row.name)}}},[e._v("查看考核")])]}}])})],1)],1)],1)],1),a("pagination",{attrs:{currentPage:e.currentPage,perpage:e.per_page,total:e.total},on:{handlecurrentchange:e.handleCurrentChange}}),a("el-dialog",{attrs:{title:e.staff_name+"的考核记录",visible:e.assessDialogVisible,width:"70%",center:""},on:{"update:visible":function(t){e.assessDialogVisible=t}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.showTrainLoading,expression:"showTrainLoading"}],staticClass:"looktraining",staticStyle:{width:"100%"},attrs:{height:"500",data:e.assessData,stripe:""}},[a("el-table-column",{attrs:{prop:"start_end",align:"center",label:"日期",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.time.join(" ~ ")))]}}])}),a("el-table-column",{attrs:{prop:"project",align:"center",label:"培训项目",width:"180"}}),a("el-table-column",{attrs:{prop:"content","show-overflow-tooltip":!0,align:"center",label:"培训内容"}}),a("el-table-column",{attrs:{prop:"address",align:"center",label:"地址"}}),a("el-table-column",{attrs:{prop:"address",align:"center",label:"考核评价"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.is_by?a("div",[e._v("未审核")]):1==t.row.is_by?a("div",[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:t.row.assess_content,placement:"top"}},[a("i",{staticClass:"el-icon-success",staticStyle:{color:"#67C23A","font-size":"28px"}})])],1):a("div",[a("i",{staticClass:"el-icon-circle-close",staticStyle:{color:"#F56C6C","font-size":"28px"}})])]}}])}),a("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.is_by?a("div",[a("el-button",{directives:[{name:"has-power",rawName:"v-has-power",value:{limitList:[1,4,17],role_id:e.$store.state.userInfo.role_id},expression:"{limitList: [1, 4, 17], role_id: $store.state.userInfo.role_id}"}],attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.assessOperation(t.row.id,t.row.staff_id)}}},[e._v("考核评价")])],1):a("div",[e._v("已审核完成")])]}}])})],1)],1),a("el-dialog",{attrs:{center:"",width:"30%",title:"评价",visible:e.evaluateVisible,"append-to-body":""},on:{"update:visible":function(t){e.evaluateVisible=t},close:e.evaluateVisibleClose}},[a("el-form",{ref:"evaluateForm",attrs:{rules:e.evaluateFormRules,model:e.evaluateForm,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"是否通过",prop:"is_by"}},[a("el-radio",{attrs:{label:"1"},model:{value:e.evaluateForm.is_by,callback:function(t){e.$set(e.evaluateForm,"is_by",t)},expression:"evaluateForm.is_by"}},[e._v("通过")]),a("el-radio",{attrs:{label:"2"},model:{value:e.evaluateForm.is_by,callback:function(t){e.$set(e.evaluateForm,"is_by",t)},expression:"evaluateForm.is_by"}},[e._v("未通过")])],1),a("el-form-item",{attrs:{label:"评价内容",prop:"assess_content"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.evaluateForm.assess_content,callback:function(t){e.$set(e.evaluateForm,"assess_content",t)},expression:"evaluateForm.assess_content"}})],1),a("el-form-item",{staticClass:"person_state",attrs:{label:"员工状态",prop:"status"}},[a("el-select",{attrs:{size:"mini",placeholder:"员工状态"},model:{value:e.evaluateForm.status,callback:function(t){e.$set(e.evaluateForm,"status",t)},expression:"evaluateForm.status"}},[a("el-option",{attrs:{label:"培训",value:"1"}}),a("el-option",{attrs:{label:"待岗",value:"3"}}),a("el-option",{attrs:{label:"离职",value:"4"}}),a("el-option",{attrs:{label:"黑名单",value:"5"}})],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.evaluateVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.saveEvaluate}},[e._v("保 存")])],1)],1)],1)},r=[],l=a("e34d"),n=a("c1ce"),o=a("9c37"),i={name:"Assessment",data:function(){return{searchForm:{person_state:1},loading:!0,userList:[],currentPage:1,total:null,per_page:null,evaluateForm:{id:"",is_by:"",assess_content:"",status:"1"},showTrainLoading:!1,assessDialogVisible:!1,evaluateVisible:!1,staff_name:"",currentStaffId:"",assessData:[],evaluateFormRules:{assess_content:[{required:!0,message:"请输入评价内容",trigger:"blur"}],is_by:[{required:!0,message:"请输入是否通过",trigger:"blur"}]}}},computed:{screenHeight:function(){return this.$store.state.screenHeight-210+"px"},scrollHeight:function(){return this.$store.state.screenHeight-290+"px"}},components:{Search:l["a"],Pagination:n["a"]},watch:{},methods:{searchAppointData:function(e){var t=this;Object(o["v"])(e).then((function(e){e.code;var a=e.data;e.msg;200===e.code?(t.userList=a.data,t.currentPage=a.current_page,t.total=a.total,t.per_page=a.per_page,t.loading=!1):t.$message.error(e.msg)}))},searchBtn:function(e){this.searchForm=e,this.searchAppointData(this.searchForm)},getStaffData:function(){this.loading=!0,this.searchAppointData(this.searchForm)},handleCurrentChange:function(e){this.searchForm.page=e,this.searchAppointData(this.searchForm)},getAllTrainingsData:function(e){var t=this;this.showTrainLoading=!0,Object(o["o"])(e).then((function(e){var a=e.code,s=e.data,r=e.msg;200===a?(t.assessData=s,t.showTrainLoading=!1):(t.$message.error(r),t.showTrainLoading=!1)}))},lookAssessBtn:function(e,t){this.staff_name=t,this.assessDialogVisible=!0,this.getAllTrainingsData(e)},assessOperation:function(e,t){this.evaluateForm.id=e,this.currentStaffId=t,this.evaluateVisible=!0},saveEvaluate:function(){var e=this;this.$refs.evaluateForm.validate((function(t){if(!t)return!1;Object(o["q"])(e.evaluateForm).then((function(t){var a=t.code,s=t.msg;200===a?(e.$message.success(s),e.evaluateVisible=!1,e.getAllTrainingsData(e.currentStaffId),e.getStaffData()):e.$message.error(s)}))}))},evaluateVisibleClose:function(){this.$refs.evaluateForm.resetFields()}},created:function(){this.getStaffData()},destroyed:function(){}},c=i,u=(a("17ab"),a("2877")),p=Object(u["a"])(c,s,r,!1,null,"4c3f7ec3",null);t["default"]=p.exports},c22e:function(e,t,a){},e34d:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"search"},[a("el-card",{staticClass:"search-wrap"},[a("el-form",{ref:"searchForm",attrs:{size:"small",inline:!0,model:e.searchForm}},[a("el-row",[a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"name"}},[a("el-input",{attrs:{size:"mini",placeholder:"姓名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.searchForm.name,callback:function(t){e.$set(e.searchForm,"name",t)},expression:"searchForm.name"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"mobile"}},[a("el-input",{attrs:{size:"mini",placeholder:"手机号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.searchForm.mobile,callback:function(t){e.$set(e.searchForm,"mobile",t)},expression:"searchForm.mobile"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"identity"}},[a("el-input",{attrs:{size:"mini",placeholder:"身份证号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.searchForm.identity,callback:function(t){e.$set(e.searchForm,"identity",t)},expression:"searchForm.identity"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"person_state"}},[a("el-select",{attrs:{size:"mini",placeholder:"员工状态"},on:{change:e.searchBtn},model:{value:e.searchForm.person_state,callback:function(t){e.$set(e.searchForm,"person_state",t)},expression:"searchForm.person_state"}},[a("el-option",{attrs:{label:"培训",value:"1"}}),a("el-option",{attrs:{label:"待岗",value:"3"}}),a("el-option",{attrs:{label:"离职",value:"4"}}),a("el-option",{attrs:{label:"黑名单",value:"5"}}),a("el-option",{attrs:{label:"在岗",value:"6"}}),a("el-option",{attrs:{label:"离职（下单）",value:"7"}})],1)],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",[a("el-date-picker",{staticClass:"select-date",staticStyle:{width:"250px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",size:"mini"},on:{change:e.searchBtn},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"handle"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.searchBtn}},[e._v("搜索")])],1)],1),a("el-col",{attrs:{span:10}},[a("el-form-item",[a("el-button",{attrs:{icon:"el-icon-delete"},on:{click:e.clearBtn}},[e._v("清除")])],1)],1)],1)],1)],1)],1)],1)},r=[],l=(a("a15b"),a("159f"),{name:"Search",data:function(){return{searchForm:{name:"",mobile:"",identity:"",person_state:"",create_time:""},time:[]}},methods:{clearBtn:function(){this.$refs.searchForm.resetFields(),this.time=[],this.searchBtn()},searchBtn:function(){this.searchForm.create_time=this.time.join(","),console.log(this.searchForm),this.$emit("searchbtn",this.searchForm)}},created:function(){}}),n=l,o=(a("6959"),a("2877")),i=Object(o["a"])(n,s,r,!1,null,"4300a9da",null);t["a"]=i.exports},f443:function(e,t,a){}}]);
//# sourceMappingURL=chunk-78fa95aa.fdd8437e.js.map