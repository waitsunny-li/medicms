(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0833d163"],{"2f08":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"order-info"},[s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.orderInfoLoading,expression:"orderInfoLoading"}],staticClass:"staff-content"},[s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("客户姓名")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.name))])]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("家庭成员籍贯")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.family_hometown))])]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("服务类型")]),s("span",{staticClass:"content-text"},[0==t.orderInfo.service_type?s("span",[t._v(t._s(t.orderInfo.service_other))]):t._e(),1==t.orderInfo.service_type?s("span",[t._v("全日住家型")]):t._e(),2==t.orderInfo.service_type?s("span",[t._v("日间照料型")]):t._e(),3==t.orderInfo.service_type?s("span",[t._v("计时收费型")]):t._e()])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("需要服务")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.service_content))])])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("身份证")]),s("span",{staticClass:"content-text"})]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("状态")]),s("span",{staticClass:"content-text"},[0==t.orderInfo.state?s("span",[t._v("面试中")]):t._e(),1==t.orderInfo.state?s("span",[t._v("进行中")]):t._e(),3==t.orderInfo.state?s("span",[t._v("结束")]):t._e(),4==t.orderInfo.state?s("span",[t._v("取消")]):t._e()])]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("合同起止")]),s("span",{staticClass:"content-text"})]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("首次服务人员")]),s("span",{staticClass:"content-text"})])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("保险单位")]),s("span",{staticClass:"content-text"})]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("合同号")]),s("span",{staticClass:"content-text"})]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("创建日期")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.create_time))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("现服务人员")]),s("span",{staticClass:"content-text"},[t._v("听飞扬")])])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("现在工资")]),s("span",{staticClass:"content-text"})]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("家政员提成")]),s("span",{staticClass:"content-text"})]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("签合同时工资")]),s("span",{staticClass:"content-text"},[t._v("12000 / 月")])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("入职来源")]),s("span",{staticClass:"content-text"},t._l(t.source,(function(e){return s("span",{key:e.id},[t.orderInfo.source_id==e.id?s("span",[t._v(t._s(e.name))]):t._e()])})),0)])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("手机号")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.mobile))])]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("现居地")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.family_address))])]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("家庭成员")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.children)+"小孩，"+t._s(t.adult)+"成人，"+t._s(t.old)+"老人")])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("合同费用")]),s("span",{staticClass:"content-text"},[t._v("300元")])])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("第二联系人")]),s("span",{staticClass:"content-text"},[t._v("宋小宝：13955866888")])]),s("el-col",{attrs:{span:7}},[s("span",{staticClass:"label-text"},[t._v("家庭情况备注")]),s("span",{staticClass:"content-text"},[t._v("先生小姐很有钱，就是有点皮")])]),s("el-col",{attrs:{span:7,offset:2}},[s("span",{staticClass:"label-text"},[t._v("服务内容")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.service_content))])])],1)],1)])},n=[],r=s("e7a1"),o={name:"OrderInfo",data:function(){return{source:[]}},props:{orderInfo:{type:Object,default:function(){return{}}},orderInfoLoading:{type:Boolean,default:!1}},computed:{children:function(){return this.orderInfo.family_people?this.orderInfo.family_people.children:""},adult:function(){return this.orderInfo.family_people?this.orderInfo.family_people.adult:""},old:function(){return this.orderInfo.family_people?this.orderInfo.family_people.old:""}},created:function(){var t=this;Object(r["b"])().then((function(e){var s=e.code,a=e.data,n=e.msg;200===s?t.source=a:t.$message.error(n)}))}},c=o,l=(s("7f46"),s("2877")),i=Object(l["a"])(c,a,n,!1,null,"3f535ed2",null);e["a"]=i.exports},"30d1":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"search"},[s("el-card",{staticClass:"search-wrap"},[s("el-form",{ref:"searchForm",attrs:{size:"small",inline:!0,model:t.CustomerSearchForm}},[s("el-row",[s("el-col",{attrs:{span:3}},[s("el-form-item",{attrs:{prop:"name"}},[s("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"请输入客户姓名",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchBtn(e)}},model:{value:t.CustomerSearchForm.name,callback:function(e){t.$set(t.CustomerSearchForm,"name",e)},expression:"CustomerSearchForm.name"}})],1)],1),s("el-col",{attrs:{span:4}},[s("el-form-item",{attrs:{prop:"mobile"}},[s("el-input",{attrs:{placeholder:"请输入客户手机号",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchBtn(e)}},model:{value:t.CustomerSearchForm.mobile,callback:function(e){t.$set(t.CustomerSearchForm,"mobile",e)},expression:"CustomerSearchForm.mobile"}})],1)],1),s("el-col",{attrs:{span:4}},[s("el-form-item",{attrs:{prop:"source_id"}},[s("el-select",{attrs:{placeholder:"需求来源"},on:{change:t.searchBtn},model:{value:t.CustomerSearchForm.source_id,callback:function(e){t.$set(t.CustomerSearchForm,"source_id",e)},expression:"CustomerSearchForm.source_id"}},t._l(t.source,(function(t){return s("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)],1),s("el-col",{attrs:{span:4}},[s("el-form-item",{attrs:{prop:"state"}},[s("el-select",{attrs:{placeholder:"订单状态"},on:{change:t.searchBtn},model:{value:t.CustomerSearchForm.state,callback:function(e){t.$set(t.CustomerSearchForm,"state",e)},expression:"CustomerSearchForm.state"}},[s("el-option",{attrs:{label:"审核中",value:"0"}}),s("el-option",{attrs:{label:"待进行",value:"1"}}),s("el-option",{attrs:{label:"订单进行中",value:"2"}}),s("el-option",{attrs:{label:"已完成",value:"3"}}),s("el-option",{attrs:{label:"已取消",value:"4"}}),s("el-option",{attrs:{label:"暂停中",value:"5"}})],1)],1)],1),s("el-col",{attrs:{span:5}},[s("el-form-item",[s("el-date-picker",{staticClass:"select-date",staticStyle:{width:"250px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:t.searchBtn},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)],1),s("el-col",{attrs:{span:4}},[s("el-col",{attrs:{span:10,offset:2}},[s("el-form-item",{staticClass:"handle"},[s("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchBtn}},[t._v("搜索")])],1)],1),s("el-col",{attrs:{span:10}},[s("el-form-item",[s("el-button",{attrs:{icon:"el-icon-delete"},on:{click:t.clearBtn}},[t._v("清除查询")])],1)],1)],1)],1)],1)],1)],1)},n=[],r=(s("a15b"),s("b0c0"),s("159f"),s("e7a1")),o={name:"Search",data:function(){return{CustomerSearchForm:{name:"",mobile:"",source_id:"",create_time:[],state:""},source:[],time:[]}},mounted:function(){var t=this;Object(r["b"])().then((function(e){var s=e.code,a=e.data,n=e.msg;200===s?t.source=a:t.$message.error(n)}))},methods:{clearBtn:function(){this.$refs.searchForm.resetFields(),this.time=[],this.searchBtn()},searchBtn:function(){if(this.CustomerSearchForm.create_time=this.time?this.time.join(","):"",this.CustomerSearchForm.state)this.$emit("searchBtn",this.CustomerSearchForm);else{var t={};t.name=this.CustomerSearchForm.name,t.mobile=this.CustomerSearchForm.mobile,t.source_id=this.CustomerSearchForm.source_id,t.create_time=this.CustomerSearchForm.create_time,console.log("else: ",t),this.$emit("searchBtn",t)}}},created:function(){}},c=o,l=(s("625f"),s("2877")),i=Object(l["a"])(c,a,n,!1,null,"878577e6",null);e["a"]=i.exports},5148:function(t,e,s){},"625f":function(t,e,s){"use strict";var a=s("f8c9"),n=s.n(a);n.a},"7f46":function(t,e,s){"use strict";var a=s("5148"),n=s.n(a);n.a},"963d":function(t,e,s){},b0c0:function(t,e,s){var a=s("83ab"),n=s("9bf2").f,r=Function.prototype,o=r.toString,c=/^\s*function ([^ (]*)/,l="name";a&&!(l in r)&&n(r,l,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(t){return""}}})},d279:function(t,e,s){"use strict";var a=s("963d"),n=s.n(a);n.a},e7a1:function(t,e,s){"use strict";s.d(e,"k",(function(){return n})),s.d(e,"c",(function(){return r})),s.d(e,"f",(function(){return o})),s.d(e,"j",(function(){return c})),s.d(e,"g",(function(){return l})),s.d(e,"d",(function(){return i})),s.d(e,"e",(function(){return u})),s.d(e,"l",(function(){return f})),s.d(e,"h",(function(){return p})),s.d(e,"i",(function(){return d})),s.d(e,"a",(function(){return _})),s.d(e,"b",(function(){return m}));s("bc3a");var a=s("1bab");function n(){return Object(a["a"])({url:"/region/province",method:"get"})}function r(t){return Object(a["a"])({url:"/region/city",method:"get",params:{parent_id:t}})}function o(t){return Object(a["a"])({url:"/region/district",method:"get",params:{parent_id:t}})}function c(){return Object(a["a"])({url:"/information/index",method:"get",params:{category_id:1}})}function l(){return Object(a["a"])({url:"/information/index",method:"get",params:{category_id:2}})}function i(){return Object(a["a"])({url:"/information/index",method:"get",params:{category_id:3}})}function u(){return Object(a["a"])({url:"/information/index",method:"get",params:{category_id:4}})}function f(){return Object(a["a"])({url:"/information/index",method:"get",params:{category_id:5}})}function p(){return Object(a["a"])({url:"/information/index",method:"get",params:{category_id:6}})}function d(){return Object(a["a"])({url:"/information/index",method:"get",params:{category_id:7}})}function _(){return Object(a["a"])({url:"/customer/create",method:"get"})}function m(){return Object(a["a"])({url:"/source/index",method:"get"})}},ed50:function(t,e,s){"use strict";s.d(e,"w",(function(){return n})),s.d(e,"u",(function(){return r})),s.d(e,"o",(function(){return o})),s.d(e,"j",(function(){return c})),s.d(e,"c",(function(){return l})),s.d(e,"y",(function(){return i})),s.d(e,"v",(function(){return u})),s.d(e,"g",(function(){return f})),s.d(e,"f",(function(){return p})),s.d(e,"q",(function(){return d})),s.d(e,"e",(function(){return _})),s.d(e,"k",(function(){return m})),s.d(e,"z",(function(){return v})),s.d(e,"i",(function(){return x})),s.d(e,"h",(function(){return C})),s.d(e,"s",(function(){return b})),s.d(e,"r",(function(){return h})),s.d(e,"d",(function(){return I})),s.d(e,"p",(function(){return g})),s.d(e,"x",(function(){return y})),s.d(e,"m",(function(){return w})),s.d(e,"n",(function(){return j})),s.d(e,"a",(function(){return O})),s.d(e,"b",(function(){return k})),s.d(e,"l",(function(){return S})),s.d(e,"t",(function(){return F}));var a=s("1bab");function n(t){return Object(a["a"])({url:"/staff/waiting",method:"get",params:{keyword:t}})}function r(t){return Object(a["a"])({url:"/customer/index",method:"get",params:t})}function o(t){return Object(a["a"])({url:"/customer/save",method:"post",data:t})}function c(t){return Object(a["a"])({url:"/customer/edit",method:"get",params:{id:t}})}function l(t){return Object(a["a"])({url:"/customer/cancel",method:"get",params:{id:t}})}function i(t){return Object(a["a"])({url:"/customer/update",method:"post",data:t})}function u(t){return Object(a["a"])({url:"/user/match_teacher",method:"get",params:{keyword:t}})}function f(t,e){return Object(a["a"])({url:"customer/match",method:"post",data:{customer_id:t,user_id:e}})}function p(t){return Object(a["a"])({url:"/customer/cancel",method:"get",params:{id:t}})}function d(t){return Object(a["a"])({url:"/customer/add_or_replace",method:"post",data:t})}function _(t){return Object(a["a"])({url:"/interview/delete",method:"get",params:{id:t}})}function m(t){return Object(a["a"])({url:"/interview/edit",method:"get",params:{id:t}})}function v(t){return Object(a["a"])({url:"/interview/update",method:"post",data:t})}function x(t){return Object(a["a"])({url:"/interview/index",method:"get",params:{customer_id:t.customer_id?t.customer_id:"",staff_id:t.staff_id?t.staff_id:""}})}function C(t){return Object(a["a"])({url:"/follow_up/index",method:"get",params:{customer_id:t.customer_id?t.customer_id:"",staff_id:t.staff_id?t.staff_id:""}})}function b(t){return Object(a["a"])({url:"/interview/save",method:"post",data:t})}function h(t){return Object(a["a"])({url:"/follow_up/save",method:"post",data:t})}function I(t){return Object(a["a"])({url:"/follow_up/delete",method:"get",params:{id:t}})}function g(t){return Object(a["a"])({url:"/contract/save",method:"post",data:t})}function y(t){return Object(a["a"])({url:"/contract/pass",method:"post",data:{customer_id:t}})}function w(t){return Object(a["a"])({url:"/customer/pause",method:"post",data:t})}function j(t){return Object(a["a"])({url:"/customer/restore",method:"post",data:{customer_id:t}})}function O(t){return Object(a["a"])({url:"/customer/complete",method:"post",data:{customer_id:t}})}function k(t){return Object(a["a"])({url:"/customer/copy",method:"get",params:{customer_id:t}})}function S(t){return Object(a["a"])({url:"/visit/index",method:"get",params:t})}function F(t){return Object(a["a"])({url:"/visit/save",method:"post",data:t})}},ee19:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"staff-info"},[s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.staffInfoLoading,expression:"staffInfoLoading"}],staticClass:"staff-content"},[s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:4}},[s("span",{staticClass:"label-text"},[t._v("手机号")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.mobile))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("工资要求")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.salary))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("英语水平")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.english))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("计算机水平")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.computer))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("政治面貌")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.political_status))])])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:4}},[s("span",{staticClass:"label-text"},[t._v("生肖")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.zodiac))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("休假要求")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.spare_time))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("户口地址")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.census_p_text)+t._s(t.staffInfo.cnnsus_c_text)+t._s(t.staffInfo.cnnsus_d_text)+t._s(t.staffInfo.census_address_desc))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("户口类型")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.census_type))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("入职时间")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.in_time))])])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:4}},[s("span",{staticClass:"label-text"},[t._v("学历")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.education))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("现居住地")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.now_p_text)+t._s(t.staffInfo.now_c_text)+t._s(t.staffInfo.now_d_text)+t._s(t.staffInfo.now_address_desc))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("服务技能")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.service_skills.join("，")))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("家用电器")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.device.join("，")))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("入职来源")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.recruiters_name)+"："+t._s(t.staffInfo.recruiters_mobile))])])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:4}},[s("span",{staticClass:"label-text"},[t._v("血型")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.blood))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("健康状况")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.health))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("婚姻状况")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.marital_status))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("员工状态")]),1==t.staffInfo.person_state?s("span",{staticClass:"content-text"},[t._v("培训")]):2==t.staffInfo.person_state?s("span",{staticClass:"content-text"},[t._v("考核")]):3==t.staffInfo.person_state?s("span",{staticClass:"content-text"},[t._v("待岗")]):4==t.staffInfo.person_state?s("span",{staticClass:"content-text"},[t._v("离职")]):5==t.staffInfo.person_state?s("span",{staticClass:"content-text"},[t._v("黑名单")]):6==t.staffInfo.person_state?s("span",{staticClass:"content-text"},[t._v("在岗")]):7==t.staffInfo.person_state?s("span",{staticClass:"content-text"},[t._v("离职(下单)")]):s("span",{staticClass:"content-text"},[t._v("错误")])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("保险")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.agreement_amount))])])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:4}},[s("span",{staticClass:"label-text"},[t._v("身高")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.height))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("体重")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.weight))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("籍贯")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.census))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("生日")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.birthday))])]),s("el-col",{attrs:{span:5}},[s("span",{staticClass:"label-text"},[t._v("语言能力")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.language.join("，")))])])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{attrs:{span:4}},[s("span",{staticClass:"label-text"},[t._v("录入人")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.user_id))])]),s("el-col",{attrs:{span:8}},[s("span",{staticClass:"label-text"},[t._v("家庭紧急联系")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.urgent_name)+"："+t._s(t.staffInfo.urgent_mobile))])]),s("el-col",{attrs:{span:8}},[s("span",{staticClass:"label-text"},[t._v("安置协议")]),s("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.agreement_amount))])])],1),s("el-row",{staticClass:"expand-row"},[s("el-col",{staticStyle:{display:"flex"},attrs:{span:12}},[s("span",{staticClass:"label-text"},[t._v("工作经历")]),t._l(t.staffInfo.work_experience,(function(e,a){return s("div",{key:a,staticClass:"content-text"},[s("el-col",{attrs:{span:24}},[t._v(t._s(e.job))]),s("el-col",{attrs:{span:24}},[t._v(t._s(e.time.join("~")))]),s("el-col",{attrs:{span:24}},[t._v(t._s(e.address))]),s("el-col",{attrs:{span:24}},[t._v(t._s(e.content))])],1)}))],2),s("el-col",{staticStyle:{display:"flex"},attrs:{span:12}},[s("span",{staticClass:"label-text"},[t._v("家庭成员")]),t._l(t.staffInfo.family_member,(function(e,a){return s("div",{key:a,staticClass:"content-text"},[s("el-col",{attrs:{span:24}},[t._v(t._s(e.name))]),s("el-col",{attrs:{span:24}},[t._v(t._s(e.relation))]),s("el-col",{attrs:{span:24}},[t._v(t._s(e.current_situation))])],1)}))],2)],1)],1)])},n=[],r={name:"StaffInfo",data:function(){return{}},props:{staffInfo:{type:Object,default:function(){return{}}},staffInfoLoading:{type:Boolean,default:!1},staffInfoDialogVisible:{type:Boolean,default:!1}},methods:{}},o=r,c=(s("d279"),s("2877")),l=Object(c["a"])(o,a,n,!1,null,"72bead4c",null);e["a"]=l.exports},f8c9:function(t,e,s){}}]);
//# sourceMappingURL=chunk-0833d163.fa073b8a.js.map