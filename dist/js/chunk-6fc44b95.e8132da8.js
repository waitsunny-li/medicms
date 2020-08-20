(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fc44b95"],{"29e3":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"training"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("search",{on:{searchbtn:e.searchBtn}}),a("el-card",{staticClass:"table-content",style:{height:e.screenHeight}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"user-table-wrap",staticStyle:{width:"100%"},attrs:{data:e.userList,border:"",height:e.scrollHeight}},[a("el-table-column",{attrs:{type:"index",width:"50",align:"center"}}),a("el-table-column",{attrs:{prop:"name",align:"center",label:"姓名"}}),a("el-table-column",{attrs:{align:"center",prop:"sex",label:"性别"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.sex?a("span",[e._v("男")]):2==t.row.sex?a("span",[e._v("女")]):e._e()]}}])}),a("el-table-column",{staticClass:"identify",attrs:{align:"center",prop:"identity",label:"身份证","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{align:"center",prop:"address",label:"地址","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.now_p_text)+e._s(t.row.now_c_text)+e._s(t.row.now_d_text)+e._s(t.row.now_address_desc))]}}])}),a("el-table-column",{attrs:{prop:"in_time",align:"center",label:"入职日期",width:"180"}}),a("el-table-column",{attrs:{width:"80",align:"center",prop:"person_state",label:"人员状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.person_state?a("p",[e._v("培训")]):2==t.row.person_state?a("p",[e._v("考核")]):3==t.row.person_state?a("p",[e._v("待岗")]):4==t.row.person_state?a("p",[e._v("离职")]):5==t.row.person_state?a("p",[e._v("黑名单")]):6==t.row.person_state?a("p",[e._v("在岗")]):7==t.row.person_state?a("p",[e._v("离职(下单)")]):a("p",[e._v("错误")])]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"180px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return e.lookTrainingBtn(t.row.id,t.row.name)}}},[e._v("查看记录")]),a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:function(a){return e.addTraningBtn(t.row.id,t.row.name)}}})]}}])})],1)],1)],1)],1),a("pagination",{attrs:{currentPage:e.currentPage,perpage:e.per_page,total:e.total},on:{handlecurrentchange:e.handleCurrentChange}}),a("el-dialog",{attrs:{title:e.staff_tranings+"的培训记录",visible:e.traningDialogVisible,width:"70%",center:""},on:{"update:visible":function(t){e.traningDialogVisible=t}}},[a("el-table",{staticClass:"looktraining",staticStyle:{width:"100%"},attrs:{height:"500",data:e.trainings,stripe:""}},[a("el-table-column",{attrs:{prop:"time",align:"center",label:"日期",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(t.row.time.join(" ~ ")))])]}}])}),a("el-table-column",{attrs:{prop:"project",align:"center",label:"培训项目",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"success"}},[e._v(e._s(t.row.project))])]}}])}),a("el-table-column",{attrs:{prop:"content","show-overflow-tooltip":!0,align:"center",label:"培训内容"}}),a("el-table-column",{attrs:{prop:"address",align:"center",label:"地址"}}),a("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(a){return e.editTraningBtn(t.row.id)}}}),a("el-popconfirm",{attrs:{title:"此经历内容确定永远删除吗？"},on:{onConfirm:function(a){return e.deleteTraining(t.row.staff_id,t.row.id)}}},[a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{slot:"reference",type:"danger",size:"mini",icon:"el-icon-delete"},slot:"reference"})],1)]}}])})],1)],1),a("el-dialog",{staticClass:"addDialog",attrs:{title:"为"+e.staff_tranings+"添加培训记录",visible:e.addTraningDialogVisible,width:"700px",center:""},on:{"update:visible":function(t){e.addTraningDialogVisible=t},close:e.addTrainingFormClose}},[a("el-form",{ref:"addTrainingForm",staticClass:"trainings",attrs:{model:e.addTrainingForm,"label-width":"100px",rules:e.editTrainingRules}},[a("el-row",[a("el-col",{staticStyle:{height:"200px","line-height":"200px"},attrs:{span:2,align:"center"}}),a("el-col",{attrs:{span:17}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"培训时间",prop:"time"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",size:"mini"},model:{value:e.addTrainingForm.time,callback:function(t){e.$set(e.addTrainingForm,"time",t)},expression:"addTrainingForm.time"}})],1)],1)],1),a("el-row",[a("el-form-item",{attrs:{label:"地址",prop:"address"}},[a("el-input",{staticClass:"detail-adress-input",attrs:{size:"mini",placeholder:"详细地址"},model:{value:e.addTrainingForm.address,callback:function(t){e.$set(e.addTrainingForm,"address",t)},expression:"addTrainingForm.address"}})],1),a("el-form-item",{attrs:{label:"培训项目",prop:"project"}},[a("el-select",{attrs:{size:"mini",placeholder:"请选择"},model:{value:e.addTrainingForm.project,callback:function(t){e.$set(e.addTrainingForm,"project",t)},expression:"addTrainingForm.project"}},e._l(e.jobs,(function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})})),1)],1),a("el-form-item",{attrs:{label:"培训内容",prop:"content"}},[a("el-input",{staticClass:"content-text",attrs:{type:"textarea",rows:1,placeholder:"请输入内容"},model:{value:e.addTrainingForm.content,callback:function(t){e.$set(e.addTrainingForm,"content",t)},expression:"addTrainingForm.content"}})],1)],1)],1),a("el-col",{staticStyle:{height:"200px","line-height":"200px"},attrs:{span:5}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.addTraningDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.saveTrainingForm}},[e._v("保 存")])],1)],1),a("el-dialog",{attrs:{title:"修改培训记录",visible:e.editTraningDialogVisible,"append-to-body":"",width:"700px",center:""},on:{"update:visible":function(t){e.editTraningDialogVisible=t},close:e.editDialogClose}},[a("el-form",{ref:"editTrainings",staticClass:"trainings",attrs:{model:e.editTrainings,"label-width":"100px",rules:e.editTrainingRules}},[a("el-row",[a("el-col",{staticStyle:{height:"200px","line-height":"200px"},attrs:{span:2,align:"center"}}),a("el-col",{attrs:{span:17}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"培训时间",prop:"time"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",size:"mini"},model:{value:e.editTrainings.time,callback:function(t){e.$set(e.editTrainings,"time",t)},expression:"editTrainings.time"}})],1)],1)],1),a("el-row",[a("el-form-item",{attrs:{label:"地址",prop:"address"}},[a("el-input",{staticClass:"detail-adress-input",attrs:{size:"mini",placeholder:"详细地址"},model:{value:e.editTrainings.address,callback:function(t){e.$set(e.editTrainings,"address",t)},expression:"editTrainings.address"}})],1),a("el-form-item",{attrs:{label:"培训项目",prop:"project"}},[a("el-select",{attrs:{size:"mini",placeholder:"请选择"},model:{value:e.editTrainings.project,callback:function(t){e.$set(e.editTrainings,"project",t)},expression:"editTrainings.project"}},e._l(e.jobs,(function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.name}})})),1)],1),a("el-form-item",{attrs:{label:"培训内容",prop:"content"}},[a("el-input",{staticClass:"content-text",attrs:{type:"textarea",rows:1,placeholder:"请输入内容"},model:{value:e.editTrainings.content,callback:function(t){e.$set(e.editTrainings,"content",t)},expression:"editTrainings.content"}})],1)],1)],1),a("el-col",{staticStyle:{height:"200px","line-height":"200px"},attrs:{span:5}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.editTraningDialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.editSaveTraining}},[e._v("保 存")])],1)],1)],1)},i=[],r=a("e34d"),s=a("c1ce"),o=a("9c37"),l=a("e7a1"),c={name:"Training",data:function(){return{loading:!0,userList:[],currentPage:1,total:null,per_page:null,traningDialogVisible:!1,staff_tranings:"",addTraningDialogVisible:!1,editTraningDialogVisible:!1,jobs:null,trainings:[],addTrainingForm:{staff_id:"",time:[],address:"",project:"",content:""},editTrainings:{staff_id:"",id:"",time:[],address:"",project:"",content:""},editTrainingRules:{time:[{required:!0,message:"请输入日期",trigger:"blur"}],address:[{required:!0,message:"请输详细地址",trigger:"blur"}],project:[{required:!0,message:"请输入培训项",trigger:"blur"}],content:[{required:!0,message:"请输入内容",trigger:"blur"}]}}},computed:{screenHeight:function(){return this.$store.state.screenHeight-210+"px"},scrollHeight:function(){return this.$store.state.screenHeight-290+"px"}},watch:{},methods:{searchBtn:function(e){console.log(e),console.log("培训记录")},getUserData:function(){var e=this;this.loading=!0,Object(o["j"])().then((function(t){200===t.code?(e.userList=t.data.data,e.currentPage=t.data.current_page,e.total=parseInt(t.data.total),e.per_page=t.data.per_page,e.loading=!1):e.$message.error(t.msg)})).catch((function(e){}))},handleCurrentChange:function(e){console.log(e)},getOneStaffTrainingsData:function(e){var t=this;Object(o["i"])(e).then((function(e){200===e.code?t.trainings=e.data:t.$message.error(e.msg)}))},lookTrainingBtn:function(e,t){this.getOneStaffTrainingsData(e),this.staff_tranings=t,this.traningDialogVisible=!0},editTraningBtn:function(e){var t=this;Object(o["h"])(e).then((function(e){if(200===e.code)for(var a in t.editTrainings)t.editTrainings[a]=e.data[a];else t.$message.error(e.msg)})),this.editTraningDialogVisible=!0},addTraningBtn:function(e,t){this.staff_tranings=t,this.addTraningDialogVisible=!0,this.addTrainingForm.staff_id=e},addTrainingFormClose:function(){this.$refs.addTrainingForm.resetFields()},editDialogClose:function(){this.$refs.editTrainings.resetFields()},saveTrainingForm:function(){var e=this;this.$refs["addTrainingForm"].validate((function(t){t&&Object(o["o"])(e.addTrainingForm).then((function(t){200===t.code?(e.$message.success(t.msg),e.addTraningDialogVisible=!1):e.$message.error(t.msg)}))}))},editSaveTraining:function(){var e=this;this.$refs["editTrainings"].validate((function(t){t&&Object(o["r"])(e.editTrainings).then((function(t){200===t.code?(e.$message.success(t.msg),e.editTraningDialogVisible=!1,e.getOneStaffTrainingsData(e.editTrainings.staff_id)):e.$message.error(t.msg)}))}))},deleteTraining:function(e,t){var a=this,n=[t];Object(o["c"])(n).then((function(t){200===t.code?(a.$message.success(t.msg),a.getOneStaffTrainingsData(e)):a.$message.error(t.msg)}))}},components:{Search:r["a"],Pagination:s["a"]},created:function(){var e=this;this.getUserData(),Object(l["h"])().then((function(t){200===t.code?e.jobs=t.data:e.$message.waraing("获取岗位失败！")}))}},d=c,u=(a("ac81"),a("2877")),p=Object(u["a"])(d,n,i,!1,null,"76370c92",null);t["default"]=p.exports},4680:function(e,t,a){},"4ca3":function(e,t,a){},6277:function(e,t,a){"use strict";var n=a("4ca3"),i=a.n(n);i.a},ac81:function(e,t,a){"use strict";var n=a("4680"),i=a.n(n);i.a},e34d:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"search"},[a("el-card",{staticClass:"search-wrap"},[a("el-form",{ref:"searchForm",attrs:{size:"small",inline:!0,model:e.searchForm}},[a("el-row",[a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"name"}},[a("el-input",{attrs:{size:"mini",placeholder:"姓名",clearable:""},model:{value:e.searchForm.name,callback:function(t){e.$set(e.searchForm,"name",t)},expression:"searchForm.name"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"telphone"}},[a("el-input",{attrs:{size:"mini",placeholder:"手机号",clearable:""},model:{value:e.searchForm.telphone,callback:function(t){e.$set(e.searchForm,"telphone",t)},expression:"searchForm.telphone"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{prop:"idcard"}},[a("el-input",{attrs:{size:"mini",placeholder:"身份证号",clearable:""},model:{value:e.searchForm.idcard,callback:function(t){e.$set(e.searchForm,"idcard",t)},expression:"searchForm.idcard"}})],1)],1),a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"state"}},[a("el-select",{attrs:{size:"mini",placeholder:"员工状态"},model:{value:e.searchForm.state,callback:function(t){e.$set(e.searchForm,"state",t)},expression:"searchForm.state"}},[a("el-option",{attrs:{label:"培训",value:"1"}}),a("el-option",{attrs:{label:"待岗",value:"3"}}),a("el-option",{attrs:{label:"离职",value:"4"}}),a("el-option",{attrs:{label:"黑名单",value:"5"}}),a("el-option",{attrs:{label:"在岗",value:"6"}}),a("el-option",{attrs:{label:"离职（下单）",value:"7"}})],1)],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{prop:"join_date"}},[a("el-date-picker",{staticClass:"select-date",staticStyle:{width:"250px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"mini"},model:{value:e.searchForm.join_date,callback:function(t){e.$set(e.searchForm,"join_date",t)},expression:"searchForm.join_date"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"handle"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.searchBtn}},[e._v("搜索")])],1)],1),a("el-col",{attrs:{span:12}},[a("el-form-item",[a("el-button",{attrs:{icon:"el-icon-delete"},on:{click:e.clearBtn}},[e._v("清除查询")])],1)],1)],1)],1)],1)],1)],1)},i=[],r=a("159f"),s={name:"Search",data:function(){return{searchForm:{name:"",telphone:"",idcard:"",state:"",join_date:""}}},methods:{clearBtn:function(){this.$refs.searchForm.resetFields()},searchBtn:function(){r["a"].$emit("searchstaff",this.searchForm),this.$emit("searchbtn",this.searchForm)}},created:function(){}},o=s,l=(a("6277"),a("2877")),c=Object(l["a"])(o,n,i,!1,null,"36d31af5",null);t["a"]=c.exports},e7a1:function(e,t,a){"use strict";a.d(t,"k",(function(){return i})),a.d(t,"c",(function(){return r})),a.d(t,"f",(function(){return s})),a.d(t,"j",(function(){return o})),a.d(t,"g",(function(){return l})),a.d(t,"d",(function(){return c})),a.d(t,"e",(function(){return d})),a.d(t,"l",(function(){return u})),a.d(t,"h",(function(){return p})),a.d(t,"i",(function(){return g})),a.d(t,"a",(function(){return m})),a.d(t,"b",(function(){return f}));a("bc3a");var n=a("1bab");function i(){return Object(n["a"])({url:"/region/province",method:"get"})}function r(e){return Object(n["a"])({url:"/region/city",method:"get",params:{parent_id:e}})}function s(e){return Object(n["a"])({url:"/region/district",method:"get",params:{parent_id:e}})}function o(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:1}})}function l(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:2}})}function c(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:3}})}function d(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:4}})}function u(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:5}})}function p(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:6}})}function g(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:7}})}function m(){return Object(n["a"])({url:"/customer/create",method:"get"})}function f(){return Object(n["a"])({url:"/source/index",method:"get"})}}}]);
//# sourceMappingURL=chunk-6fc44b95.e8132da8.js.map