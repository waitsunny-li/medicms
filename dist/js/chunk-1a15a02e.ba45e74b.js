(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a15a02e"],{"2f08":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order-info"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.orderInfoLoading,expression:"orderInfoLoading"}],staticClass:"staff-content"},[a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("客户姓名")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.name))])]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("家庭成员籍贯")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.family_hometown))])]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("服务类型")]),a("span",{staticClass:"content-text"},[0==t.orderInfo.service_type?a("span",[t._v(t._s(t.orderInfo.service_other))]):t._e(),1==t.orderInfo.service_type?a("span",[t._v("全日住家型")]):t._e(),2==t.orderInfo.service_type?a("span",[t._v("日间照料型")]):t._e(),3==t.orderInfo.service_type?a("span",[t._v("计时收费型")]):t._e()])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("需要服务")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.service_content))])])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("身份证")]),a("span",{staticClass:"content-text"})]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("状态")]),a("span",{staticClass:"content-text"},[0==t.orderInfo.state?a("span",[t._v("面试中")]):t._e(),1==t.orderInfo.state?a("span",[t._v("进行中")]):t._e(),3==t.orderInfo.state?a("span",[t._v("结束")]):t._e(),4==t.orderInfo.state?a("span",[t._v("取消")]):t._e()])]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("合同起止")]),a("span",{staticClass:"content-text"})]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("首次服务人员")]),a("span",{staticClass:"content-text"})])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("保险单位")]),a("span",{staticClass:"content-text"})]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("合同号")]),a("span",{staticClass:"content-text"})]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("创建日期")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.create_time))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("现服务人员")]),a("span",{staticClass:"content-text"},[t._v("听飞扬")])])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("现在工资")]),a("span",{staticClass:"content-text"})]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("家政员提成")]),a("span",{staticClass:"content-text"})]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("签合同时工资")]),a("span",{staticClass:"content-text"},[t._v("12000 / 月")])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("入职来源")]),a("span",{staticClass:"content-text"},t._l(t.source,(function(e){return a("span",{key:e.id},[t.orderInfo.source_id==e.id?a("span",[t._v(t._s(e.name))]):t._e()])})),0)])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("手机号")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.mobile))])]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("现居地")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.family_address))])]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("家庭成员")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.children)+"小孩，"+t._s(t.adult)+"成人，"+t._s(t.old)+"老人")])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("合同费用")]),a("span",{staticClass:"content-text"},[t._v("300元")])])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("第二联系人")]),a("span",{staticClass:"content-text"},[t._v("宋小宝：13955866888")])]),a("el-col",{attrs:{span:7}},[a("span",{staticClass:"label-text"},[t._v("家庭情况备注")]),a("span",{staticClass:"content-text"},[t._v("先生小姐很有钱，就是有点皮")])]),a("el-col",{attrs:{span:7,offset:2}},[a("span",{staticClass:"label-text"},[t._v("服务内容")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.orderInfo.service_content))])])],1)],1)])},n=[],r=a("e7a1"),o={name:"OrderInfo",data:function(){return{source:[]}},props:{orderInfo:{type:Object,default:function(){return{}}},orderInfoLoading:{type:Boolean,default:!1}},computed:{children:function(){return this.orderInfo.family_people?this.orderInfo.family_people.children:""},adult:function(){return this.orderInfo.family_people?this.orderInfo.family_people.adult:""},old:function(){return this.orderInfo.family_people?this.orderInfo.family_people.old:""}},created:function(){var t=this;Object(r["b"])().then((function(e){var a=e.code,s=e.data,n=e.msg;200===a?t.source=s:t.$message.error(n)}))}},c=o,l=(a("7f46"),a("2877")),i=Object(l["a"])(c,s,n,!1,null,"3f535ed2",null);e["a"]=i.exports},"30d1":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search"},[a("el-card",{staticClass:"search-wrap"},[a("el-form",{ref:"searchForm",attrs:{size:"small",inline:!0,model:t.CustomerSearchForm}},[a("el-row",[a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{prop:"name"}},[a("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"请输入客户姓名",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchBtn(e)}},model:{value:t.CustomerSearchForm.name,callback:function(e){t.$set(t.CustomerSearchForm,"name",e)},expression:"CustomerSearchForm.name"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{prop:"mobile"}},[a("el-input",{attrs:{placeholder:"请输入客户手机号",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchBtn(e)}},model:{value:t.CustomerSearchForm.mobile,callback:function(e){t.$set(t.CustomerSearchForm,"mobile",e)},expression:"CustomerSearchForm.mobile"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{prop:"source_id"}},[a("el-select",{attrs:{placeholder:"需求来源"},on:{change:t.searchBtn},model:{value:t.CustomerSearchForm.source_id,callback:function(e){t.$set(t.CustomerSearchForm,"source_id",e)},expression:"CustomerSearchForm.source_id"}},t._l(t.source,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{prop:"state"}},[a("el-select",{attrs:{placeholder:"订单状态"},on:{change:t.searchBtn},model:{value:t.CustomerSearchForm.state,callback:function(e){t.$set(t.CustomerSearchForm,"state",e)},expression:"CustomerSearchForm.state"}},[a("el-option",{attrs:{label:"审核中",value:"0"}}),a("el-option",{attrs:{label:"待进行",value:"1"}}),a("el-option",{attrs:{label:"订单进行中",value:"2"}}),a("el-option",{attrs:{label:"已完成",value:"3"}}),a("el-option",{attrs:{label:"已取消",value:"4"}}),a("el-option",{attrs:{label:"暂停中",value:"5"}}),a("el-option",{attrs:{label:"重新恢复",value:"6"}})],1)],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",[a("el-date-picker",{staticClass:"select-date",staticStyle:{width:"250px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:t.searchBtn},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-col",{attrs:{span:10,offset:2}},[a("el-form-item",{staticClass:"handle"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.searchBtn}},[t._v("搜索")])],1)],1),a("el-col",{attrs:{span:10}},[a("el-form-item",[a("el-button",{attrs:{icon:"el-icon-delete"},on:{click:t.clearBtn}},[t._v("清除查询")])],1)],1)],1)],1)],1)],1)],1)},n=[],r=(a("a15b"),a("b0c0"),a("159f"),a("e7a1")),o={name:"Search",data:function(){return{CustomerSearchForm:{name:"",mobile:"",source_id:"",create_time:[],state:""},source:[],time:[]}},mounted:function(){var t=this;Object(r["b"])().then((function(e){var a=e.code,s=e.data,n=e.msg;200===a?t.source=s:t.$message.error(n)}))},methods:{clearBtn:function(){this.$refs.searchForm.resetFields(),this.time=[],this.searchBtn()},searchBtn:function(){if(this.CustomerSearchForm.create_time=this.time?this.time.join(","):"",this.CustomerSearchForm.state)this.$emit("searchBtn",this.CustomerSearchForm);else{var t={};t.name=this.CustomerSearchForm.name,t.mobile=this.CustomerSearchForm.mobile,t.source_id=this.CustomerSearchForm.source_id,t.create_time=this.CustomerSearchForm.create_time,console.log("else: ",t),this.$emit("searchBtn",t)}}},created:function(){}},c=o,l=(a("ba48"),a("2877")),i=Object(l["a"])(c,s,n,!1,null,"458bb617",null);e["a"]=i.exports},5148:function(t,e,a){},"7f46":function(t,e,a){"use strict";var s=a("5148"),n=a.n(s);n.a},"963d":function(t,e,a){},"9d64":function(t,e,a){},b0c0:function(t,e,a){var s=a("83ab"),n=a("9bf2").f,r=Function.prototype,o=r.toString,c=/^\s*function ([^ (]*)/,l="name";s&&!(l in r)&&n(r,l,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(t){return""}}})},ba48:function(t,e,a){"use strict";var s=a("9d64"),n=a.n(s);n.a},d279:function(t,e,a){"use strict";var s=a("963d"),n=a.n(s);n.a},e7a1:function(t,e,a){"use strict";a.d(e,"k",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"f",(function(){return o})),a.d(e,"j",(function(){return c})),a.d(e,"g",(function(){return l})),a.d(e,"d",(function(){return i})),a.d(e,"e",(function(){return u})),a.d(e,"l",(function(){return f})),a.d(e,"h",(function(){return p})),a.d(e,"i",(function(){return d})),a.d(e,"a",(function(){return _})),a.d(e,"b",(function(){return m}));a("bc3a");var s=a("1bab");function n(){return Object(s["a"])({url:"/region/province",method:"get"})}function r(t){return Object(s["a"])({url:"/region/city",method:"get",params:{parent_id:t}})}function o(t){return Object(s["a"])({url:"/region/district",method:"get",params:{parent_id:t}})}function c(){return Object(s["a"])({url:"/information/index",method:"get",params:{category_id:1}})}function l(){return Object(s["a"])({url:"/information/index",method:"get",params:{category_id:2}})}function i(){return Object(s["a"])({url:"/information/index",method:"get",params:{category_id:3}})}function u(){return Object(s["a"])({url:"/information/index",method:"get",params:{category_id:4}})}function f(){return Object(s["a"])({url:"/information/index",method:"get",params:{category_id:5}})}function p(){return Object(s["a"])({url:"/information/index",method:"get",params:{category_id:6}})}function d(){return Object(s["a"])({url:"/information/index",method:"get",params:{category_id:7}})}function _(){return Object(s["a"])({url:"/customer/create",method:"get"})}function m(){return Object(s["a"])({url:"/source/index",method:"get"})}},ed50:function(t,e,a){"use strict";a.d(e,"D",(function(){return n})),a.d(e,"B",(function(){return r})),a.d(e,"u",(function(){return o})),a.d(e,"l",(function(){return c})),a.d(e,"c",(function(){return l})),a.d(e,"F",(function(){return i})),a.d(e,"C",(function(){return u})),a.d(e,"i",(function(){return f})),a.d(e,"y",(function(){return p})),a.d(e,"r",(function(){return d})),a.d(e,"q",(function(){return _})),a.d(e,"p",(function(){return m})),a.d(e,"G",(function(){return v})),a.d(e,"e",(function(){return x})),a.d(e,"g",(function(){return b})),a.d(e,"w",(function(){return C})),a.d(e,"f",(function(){return h})),a.d(e,"m",(function(){return g})),a.d(e,"H",(function(){return I})),a.d(e,"k",(function(){return y})),a.d(e,"j",(function(){return j})),a.d(e,"z",(function(){return O})),a.d(e,"x",(function(){return w})),a.d(e,"d",(function(){return k})),a.d(e,"v",(function(){return S})),a.d(e,"E",(function(){return F})),a.d(e,"s",(function(){return B})),a.d(e,"t",(function(){return $})),a.d(e,"a",(function(){return E})),a.d(e,"b",(function(){return L})),a.d(e,"n",(function(){return z})),a.d(e,"A",(function(){return D})),a.d(e,"h",(function(){return J})),a.d(e,"o",(function(){return M}));var s=a("1bab");function n(t){return Object(s["a"])({url:"/staff/waiting",method:"get",params:{keyword:t}})}function r(t){return Object(s["a"])({url:"/customer/index",method:"get",params:t})}function o(t){return Object(s["a"])({url:"/customer/save",method:"post",data:t})}function c(t){return Object(s["a"])({url:"/customer/edit",method:"get",params:{id:t}})}function l(t){return Object(s["a"])({url:"/customer/cancel",method:"get",params:{id:t}})}function i(t){return Object(s["a"])({url:"/customer/update",method:"post",data:t})}function u(t){return Object(s["a"])({url:"/user/match_teacher",method:"get",params:{keyword:t}})}function f(t,e){return Object(s["a"])({url:"customer/match",method:"post",data:{customer_id:t,user_id:e}})}function p(t){return Object(s["a"])({url:"/safety/save",method:"post",data:t})}function d(t){return Object(s["a"])({url:"/safety/index",method:"get",params:{staff_id:t}})}function _(t){return Object(s["a"])({url:"/safety/index",method:"get",params:{customer_id:t}})}function m(t){return Object(s["a"])({url:"/safety/edit",method:"get",params:{id:t}})}function v(t){return Object(s["a"])({url:"/safety/update",method:"post",data:t})}function x(t){return Object(s["a"])({url:"/safety/delete",method:"get",params:{id:t}})}function b(t){return Object(s["a"])({url:"/customer/cancel",method:"get",params:{id:t}})}function C(t){return Object(s["a"])({url:"/customer/add_or_replace",method:"post",data:t})}function h(t){return Object(s["a"])({url:"/interview/delete",method:"get",params:{id:t}})}function g(t){return Object(s["a"])({url:"/interview/edit",method:"get",params:{id:t}})}function I(t){return Object(s["a"])({url:"/interview/update",method:"post",data:t})}function y(t){return Object(s["a"])({url:"/interview/index",method:"get",params:{customer_id:t.customer_id?t.customer_id:"",staff_id:t.staff_id?t.staff_id:""}})}function j(t){return Object(s["a"])({url:"/follow_up/index",method:"get",params:{customer_id:t.customer_id?t.customer_id:"",staff_id:t.staff_id?t.staff_id:""}})}function O(t){return Object(s["a"])({url:"/interview/save",method:"post",data:t})}function w(t){return Object(s["a"])({url:"/follow_up/save",method:"post",data:t})}function k(t){return Object(s["a"])({url:"/follow_up/delete",method:"get",params:{id:t}})}function S(t){return Object(s["a"])({url:"/contract/save",method:"post",data:t})}function F(t){return Object(s["a"])({url:"/customer/pass",method:"post",data:{customer_id:t}})}function B(t){return Object(s["a"])({url:"/customer/pause",method:"post",data:t})}function $(t){return Object(s["a"])({url:"/customer/restore",method:"post",data:{customer_id:t}})}function E(t){return Object(s["a"])({url:"/customer/complete",method:"post",data:{customer_id:t}})}function L(t){return Object(s["a"])({url:"/customer/copy",method:"get",params:{customer_id:t}})}function z(t){return Object(s["a"])({url:"/visit/index",method:"get",params:t})}function D(t){return Object(s["a"])({url:"/visit/save",method:"post",data:t})}function J(t){return Object(s["a"])({url:"/dispatch_order/send",method:"get",params:{customer_id:t}})}function M(t){return Object(s["a"])({url:"/change_record/index",method:"get",params:{customer_id:t}})}},ee19:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"staff-info"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.staffInfoLoading,expression:"staffInfoLoading"}],staticClass:"staff-content"},[a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:4}},[a("span",{staticClass:"label-text"},[t._v("手机号")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.mobile))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("工资要求")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.salary))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("英语水平")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.english))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("计算机水平")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.computer))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("政治面貌")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.political_status))])])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:4}},[a("span",{staticClass:"label-text"},[t._v("生肖")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.zodiac))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("休假要求")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.spare_time))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("户口地址")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.census_p_text)+t._s(t.staffInfo.cnnsus_c_text)+t._s(t.staffInfo.cnnsus_d_text)+t._s(t.staffInfo.census_address_desc))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("户口类型")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.census_type))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("入职时间")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.in_time))])])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:4}},[a("span",{staticClass:"label-text"},[t._v("学历")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.education))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("现居住地")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.now_p_text)+t._s(t.staffInfo.now_c_text)+t._s(t.staffInfo.now_d_text)+t._s(t.staffInfo.now_address_desc))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("服务技能")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.service_skills.join("，")))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("家用电器")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.device.join("，")))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("入职来源")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.recruiters_name)+"："+t._s(t.staffInfo.recruiters_mobile))])])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:4}},[a("span",{staticClass:"label-text"},[t._v("血型")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.blood))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("健康状况")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.health))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("婚姻状况")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.marital_status))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("员工状态")]),1==t.staffInfo.person_state?a("span",{staticClass:"content-text"},[t._v("培训")]):2==t.staffInfo.person_state?a("span",{staticClass:"content-text"},[t._v("考核")]):3==t.staffInfo.person_state?a("span",{staticClass:"content-text"},[t._v("待岗")]):4==t.staffInfo.person_state?a("span",{staticClass:"content-text"},[t._v("离职")]):5==t.staffInfo.person_state?a("span",{staticClass:"content-text"},[t._v("黑名单")]):6==t.staffInfo.person_state?a("span",{staticClass:"content-text"},[t._v("在岗")]):7==t.staffInfo.person_state?a("span",{staticClass:"content-text"},[t._v("离职(下单)")]):a("span",{staticClass:"content-text"},[t._v("错误")])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("保险")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.agreement_amount))])])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:4}},[a("span",{staticClass:"label-text"},[t._v("身高")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.height))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("体重")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.weight))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("籍贯")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.census))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("生日")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.birthday))])]),a("el-col",{attrs:{span:5}},[a("span",{staticClass:"label-text"},[t._v("语言能力")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.language.join("，")))])])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{attrs:{span:4}},[a("span",{staticClass:"label-text"},[t._v("录入人")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.user_id))])]),a("el-col",{attrs:{span:8}},[a("span",{staticClass:"label-text"},[t._v("家庭紧急联系")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.urgent_name)+"："+t._s(t.staffInfo.urgent_mobile))])]),a("el-col",{attrs:{span:8}},[a("span",{staticClass:"label-text"},[t._v("安置协议")]),a("span",{staticClass:"content-text"},[t._v(t._s(t.staffInfo.agreement_amount))])])],1),a("el-row",{staticClass:"expand-row"},[a("el-col",{staticStyle:{display:"flex"},attrs:{span:12}},[a("span",{staticClass:"label-text"},[t._v("工作经历")]),t._l(t.staffInfo.work_experience,(function(e,s){return a("div",{key:s,staticClass:"content-text"},[a("el-col",{attrs:{span:24}},[t._v(t._s(e.job))]),a("el-col",{attrs:{span:24}},[t._v(t._s(e.time.join("~")))]),a("el-col",{attrs:{span:24}},[t._v(t._s(e.address))]),a("el-col",{attrs:{span:24}},[t._v(t._s(e.content))])],1)}))],2),a("el-col",{staticStyle:{display:"flex"},attrs:{span:12}},[a("span",{staticClass:"label-text"},[t._v("家庭成员")]),t._l(t.staffInfo.family_member,(function(e,s){return a("div",{key:s,staticClass:"content-text"},[a("el-col",{attrs:{span:24}},[t._v(t._s(e.name))]),a("el-col",{attrs:{span:24}},[t._v(t._s(e.relation))]),a("el-col",{attrs:{span:24}},[t._v(t._s(e.current_situation))])],1)}))],2)],1)],1)])},n=[],r={name:"StaffInfo",data:function(){return{}},props:{staffInfo:{type:Object,default:function(){return{}}},staffInfoLoading:{type:Boolean,default:!1},staffInfoDialogVisible:{type:Boolean,default:!1}},methods:{}},o=r,c=(a("d279"),a("2877")),l=Object(c["a"])(o,s,n,!1,null,"72bead4c",null);e["a"]=l.exports}}]);
//# sourceMappingURL=chunk-1a15a02e.ba45e74b.js.map