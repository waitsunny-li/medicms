(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c7d1fc6"],{"159f":function(e,t,r){"use strict";var n=r("2b0e");new n["default"]},"199f":function(e,t,r){"use strict";var n=r("33cc"),a=r.n(n);a.a},"30d1":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"search"},[r("el-card",{staticClass:"search-wrap"},[r("el-form",{ref:"searchForm",attrs:{size:"small",inline:!0,model:e.CustomerSearchForm}},[r("el-row",[r("el-col",{attrs:{span:3}},[r("el-form-item",{attrs:{prop:"num"}},[r("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"订单编号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.CustomerSearchForm.num,callback:function(t){e.$set(e.CustomerSearchForm,"num",t)},expression:"CustomerSearchForm.num"}})],1)],1),r("el-col",{attrs:{span:3}},[r("el-form-item",{attrs:{prop:"name"}},[r("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"客户姓名",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.CustomerSearchForm.name,callback:function(t){e.$set(e.CustomerSearchForm,"name",t)},expression:"CustomerSearchForm.name"}})],1)],1),r("el-col",{attrs:{span:3}},[r("el-form-item",{attrs:{prop:"mobile"}},[r("el-input",{attrs:{placeholder:"客户手机号",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.searchBtn(t)}},model:{value:e.CustomerSearchForm.mobile,callback:function(t){e.$set(e.CustomerSearchForm,"mobile",t)},expression:"CustomerSearchForm.mobile"}})],1)],1),r("el-col",{attrs:{span:3}},[r("el-form-item",{attrs:{prop:"source_id"}},[r("el-select",{attrs:{placeholder:"需求来源"},on:{change:e.searchBtn},model:{value:e.CustomerSearchForm.source_id,callback:function(t){e.$set(e.CustomerSearchForm,"source_id",t)},expression:"CustomerSearchForm.source_id"}},e._l(e.source,(function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),r("el-col",{attrs:{span:3}},[r("el-form-item",{attrs:{prop:"state"}},[r("el-select",{attrs:{placeholder:"订单状态"},on:{change:e.searchBtn},model:{value:e.CustomerSearchForm.state,callback:function(t){e.$set(e.CustomerSearchForm,"state",t)},expression:"CustomerSearchForm.state"}},[r("el-option",{attrs:{label:"审核中",value:"0"}}),r("el-option",{attrs:{label:"待进行",value:"1"}}),r("el-option",{attrs:{label:"订单进行中",value:"2"}}),r("el-option",{attrs:{label:"已完成",value:"3"}}),r("el-option",{attrs:{label:"已取消",value:"4"}}),r("el-option",{attrs:{label:"暂停中",value:"5"}}),r("el-option",{attrs:{label:"重新恢复",value:"6"}})],1)],1)],1),r("el-col",{attrs:{span:5}},[r("el-form-item",[r("el-date-picker",{staticClass:"select-date",staticStyle:{width:"250px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.searchBtn},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}})],1)],1),r("el-col",{attrs:{span:4}},[r("el-col",{attrs:{span:10,offset:2}},[r("el-form-item",{staticClass:"handle"},[r("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.searchBtn}},[e._v("搜索")])],1)],1),r("el-col",{attrs:{span:10}},[r("el-form-item",[r("el-button",{attrs:{icon:"el-icon-delete"},on:{click:e.clearBtn}},[e._v("清除查询")])],1)],1)],1)],1)],1)],1)],1)},a=[],o=(r("a15b"),r("b0c0"),r("159f"),r("e7a1")),c={name:"Search",data:function(){return{CustomerSearchForm:{num:"",name:"",mobile:"",source_id:"",create_time:[],state:""},source:[],time:[]}},mounted:function(){var e=this;Object(o["b"])().then((function(t){var r=t.code,n=t.data,a=t.msg;200===r?e.source=n:e.$message.error(a)}))},methods:{clearBtn:function(){this.$refs.searchForm.resetFields(),this.time=[],this.searchBtn()},searchBtn:function(){if(this.CustomerSearchForm.create_time=this.time?this.time.join(","):"",this.CustomerSearchForm.state)this.$emit("searchBtn",this.CustomerSearchForm);else{var e={};e.name=this.CustomerSearchForm.name,e.mobile=this.CustomerSearchForm.mobile,e.source_id=this.CustomerSearchForm.source_id,e.create_time=this.CustomerSearchForm.create_time,e.num=this.CustomerSearchForm.num,console.log("else: ",e),this.$emit("searchBtn",e)}}},created:function(){}},s=c,l=(r("c05a"),r("2877")),i=Object(l["a"])(s,n,a,!1,null,"0af13fd3",null);t["a"]=i.exports},"33cc":function(e,t,r){},"4b20":function(e,t,r){"use strict";var n=r("c315"),a=r.n(n);a.a},5748:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"order-renewal"},[r("el-row",[r("el-col",{attrs:{span:24}},[r("customer-search",{on:{searchBtn:e.searchBtn}}),r("el-card",{staticClass:"table-content",style:{height:e.screenHeight}},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"user-table-wrap",staticStyle:{width:"100%"},attrs:{data:e.orderList,height:e.scrollHeight,border:""}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("p",{staticClass:"title-need"},[r("el-button",{attrs:{type:"text"}},[e._v(" 对家政员的需求 "),r("i",{staticClass:"el-icon-bottom"})])],1),r("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"center",inline:""}},[r("el-form-item",{attrs:{label:"年龄"}},[r("span",[e._v(e._s(t.row.demand_age))])]),r("el-form-item",{attrs:{label:"籍贯"}},[r("span",[e._v(e._s(t.row.demand_census))])]),r("el-form-item",{attrs:{label:"性别"}},[0==t.row.demand_sex?r("span",[e._v("不限")]):e._e(),1==t.row.demand_sex?r("span",[e._v("女")]):e._e(),2==t.row.demand_sex?r("span",[e._v("男")]):e._e()]),r("el-form-item",{attrs:{label:"岗位要求"}},[r("span",[e._v(e._s(t.row.demand_job.join("，")))])]),r("el-form-item",{attrs:{label:"学历"}},[r("span",[e._v(e._s(t.row.demand_education))])]),r("el-form-item",{attrs:{label:"服务技能"}},[r("span",[e._v(e._s(t.row.demand_service_skill.join(",")))])]),r("el-form-item",{attrs:{label:"厨艺"}},[r("span",[e._v(e._s(t.row.demand_cooking))])]),r("el-form-item",{attrs:{label:"家政从业经验"}},[r("span",[e._v(e._s(t.row.demand_experience))])]),r("el-form-item",{attrs:{label:"工资待遇"}},[r("span",[e._v("12000 / 26天")])])],1)]}}])}),r("el-table-column",{attrs:{align:"center",prop:"num",label:"编号",width:"100"}}),r("el-table-column",{attrs:{align:"center",prop:"name",label:"名字",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"name-wrap"},[r("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])])]}}])}),r("el-table-column",{attrs:{align:"center",prop:"family_hometown",label:"家庭成员籍贯",width:"120"}}),r("el-table-column",{staticClass:"identify",attrs:{align:"center",prop:"service_type",label:"服务类型","show-overflow-tooltip":!0,width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.service_type?r("p",[e._v("长期")]):e._e(),2==t.row.service_type?r("p",[e._v("短期")]):e._e()]}}])}),r("el-table-column",{attrs:{align:"center",prop:"service_other",label:"需要服务","show-overflow-tooltip":!0}}),r("el-table-column",{attrs:{width:"180",align:"center",label:"家庭成员"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.family_people.children)+"小孩，"+e._s(t.row.family_people.adlut)+"成人，"+e._s(t.row.family_people.old)+"老人")]}}])}),r("el-table-column",{attrs:{align:"center",prop:"mobile",width:"150px",label:"手机号"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("i",{staticClass:"el-icon-phone",staticStyle:{color:"red"}}),e._v(" "+e._s(t.row.mobile)+" ")]}}])}),r("el-table-column",{attrs:{align:"center",prop:"family_address",label:"现居住地址","show-overflow-tooltip":!0,width:"120px"}}),r("el-table-column",{attrs:{align:"center",prop:"source",label:" 现役服务员",width:"100px","show-overflow-tooltip":!0}}),r("el-table-column",{attrs:{align:"center",prop:"state",label:"状态","show-overflow-tooltip":!0}}),r("el-table-column",{attrs:{align:"center",prop:"is_success",label:"是否完成"},scopedSlots:e._u([{key:"default",fn:function(e){return[e.row.is_success?r("div",[r("i",{staticClass:"el-icon-success",staticStyle:{color:"#67C23A","font-size":"28px"}})]):r("div")]}}])}),r("el-table-column",{attrs:{label:"操作",align:"center",width:"140px",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",enterable:!1,content:"续签",placement:"top"}},[r("el-button",{attrs:{size:"mini",type:"success",icon:"el-icon-s-claim",circle:""},on:{click:e.renewalBtn}})],1)]}}])})],1)],1)],1)],1),r("pagination",{attrs:{currentPage:e.currentPage,perpage:e.per_page,total:e.total},on:{handlecurrentchange:e.handleCurrentChange}})],1)},a=[],o=r("30d1"),c=r("c1ce"),s={name:"OrderRenewal",data:function(){return{orderList:[{id:"1",name:"徐子真",family_area:"100.25",family_hometown:"安徽安庆",family_address:"家庭住址",service_type:"1",service_other:"其他内容",family_people:{children:1,old:2,adlut:3},service_content:[],demand_age:"20-30",demand_sex:0,demand_education:"高中",demand_job:["育婴师","管家"],demand_zodiac:"牛",demand_experience:"2-3年",demand_census:"不限",demand_cooking:"川菜",demand_service_skill:[],mobile:"13695604265",state:"0",source:"来源",is_success:!0},{id:"2",name:"胡大侠",family_area:"100.25",family_hometown:"安徽安庆",family_address:"家庭住址",service_type:"1",service_other:"其他内容",family_people:{children:1,old:2,adlut:3},service_content:[],demand_age:"20-30",demand_sex:0,demand_education:"高中",demand_job:["育婴师","管家"],demand_zodiac:"12000 / 26天",demand_experience:"2-3年",demand_census:"不限",demand_cooking:"川菜",demand_service_skill:[],mobile:"13695604265",state:"0",source:"来源",is_success:!1}],currentPage:1,total:null,per_page:null,staffInfoDialogVisible:!1,loading:!1}},computed:{screenHeight:function(){return this.$store.state.screenHeight-210+"px"},scrollHeight:function(){return this.$store.state.screenHeight-240+"px"}},watch:{},methods:{searchBtn:function(e){console.log("订单续签",e)},handleCurrentChange:function(e){console.log(e)},renewalBtn:function(){var e=this;this.$confirm("是否确认续签？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$message({type:"success",message:"续签成功!"})})).catch((function(){e.$message({type:"info",message:"已取消续签"})}))}},components:{CustomerSearch:o["a"],Pagination:c["a"]}},l=s,i=(r("4b20"),r("2877")),u=Object(i["a"])(l,n,a,!1,null,"fe8d5a00",null);t["default"]=u.exports},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var n=r("1d80"),a=r("5899"),o="["+a+"]",c=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),l=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(c,"")),2&e&&(r=r.replace(s,"")),r}};e.exports={start:l(1),end:l(2),trim:l(3)}},7156:function(e,t,r){var n=r("861d"),a=r("d2bb");e.exports=function(e,t,r){var o,c;return a&&"function"==typeof(o=t.constructor)&&o!==r&&n(c=o.prototype)&&c!==r.prototype&&a(e,c),e}},a15b:function(e,t,r){"use strict";var n=r("23e7"),a=r("44ad"),o=r("fc6a"),c=r("a640"),s=[].join,l=a!=Object,i=c("join",",");n({target:"Array",proto:!0,forced:l||!i},{join:function(e){return s.call(o(this),void 0===e?",":e)}})},a640:function(e,t,r){"use strict";var n=r("d039");e.exports=function(e,t){var r=[][e];return!!r&&n((function(){r.call(null,t||function(){throw 1},1)}))}},a9e3:function(e,t,r){"use strict";var n=r("83ab"),a=r("da84"),o=r("94ca"),c=r("6eeb"),s=r("5135"),l=r("c6b6"),i=r("7156"),u=r("c04e"),m=r("d039"),d=r("7c73"),p=r("241c").f,f=r("06cf").f,h=r("9bf2").f,_=r("58a8").trim,b="Number",g=a[b],v=g.prototype,y=l(d(v))==b,w=function(e){var t,r,n,a,o,c,s,l,i=u(e,!1);if("string"==typeof i&&i.length>2)if(i=_(i),t=i.charCodeAt(0),43===t||45===t){if(r=i.charCodeAt(2),88===r||120===r)return NaN}else if(48===t){switch(i.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+i}for(o=i.slice(2),c=o.length,s=0;s<c;s++)if(l=o.charCodeAt(s),l<48||l>a)return NaN;return parseInt(o,n)}return+i};if(o(b,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var C,x=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof x&&(y?m((function(){v.valueOf.call(r)})):l(r)!=b)?i(new g(w(t)),r,x):w(t)},S=n?p(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;S.length>k;k++)s(g,C=S[k])&&!s(x,C)&&h(x,C,f(g,C));x.prototype=v,v.constructor=x,c(a,b,x)}},b0c0:function(e,t,r){var n=r("83ab"),a=r("9bf2").f,o=Function.prototype,c=o.toString,s=/^\s*function ([^ (]*)/,l="name";n&&!(l in o)&&a(o,l,{configurable:!0,get:function(){try{return c.call(this).match(s)[1]}catch(e){return""}}})},c05a:function(e,t,r){"use strict";var n=r("caf5"),a=r.n(n);a.a},c1ce:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-row",{staticClass:"pagination"},[r("el-col",{attrs:{span:7}},[r("el-pagination",{attrs:{"current-page":e.currentpage,"page-size":e.perpages,layout:"prev, pager, next, jumper",total:e.totalNumber},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentpage=t},"update:current-page":function(t){e.currentpage=t}}})],1)],1)},a=[],o=(r("a9e3"),r("159f"),{name:"Pagination",props:{currentPage:{type:Number,default:1},perpage:{type:Number,default:10},total:{type:Number,default:null}},data:function(){return{currentpage:null,perpages:null,totalNumber:null}},computed:{screenWidth:function(){return this.$store.state.screenWidth-240+"px"}},watch:{currentPage:function(e){this.currentpage=e},perpage:function(e){this.perpages=e},total:function(e){this.totalNumber=e}},methods:{handleCurrentChange:function(e){this.$emit("handlecurrentchange",e)}}}),c=o,s=(r("199f"),r("2877")),l=Object(s["a"])(c,n,a,!1,null,"4533357c",null);t["a"]=l.exports},c315:function(e,t,r){},caf5:function(e,t,r){},e7a1:function(e,t,r){"use strict";r.d(t,"k",(function(){return a})),r.d(t,"c",(function(){return o})),r.d(t,"f",(function(){return c})),r.d(t,"j",(function(){return s})),r.d(t,"g",(function(){return l})),r.d(t,"d",(function(){return i})),r.d(t,"e",(function(){return u})),r.d(t,"l",(function(){return m})),r.d(t,"h",(function(){return d})),r.d(t,"i",(function(){return p})),r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return h}));r("bc3a");var n=r("1bab");function a(){return Object(n["a"])({url:"/region/province",method:"get"})}function o(e){return Object(n["a"])({url:"/region/city",method:"get",params:{parent_id:e}})}function c(e){return Object(n["a"])({url:"/region/district",method:"get",params:{parent_id:e}})}function s(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:1}})}function l(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:2}})}function i(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:3}})}function u(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:4}})}function m(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:5}})}function d(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:6}})}function p(){return Object(n["a"])({url:"/information/index",method:"get",params:{category_id:7}})}function f(){return Object(n["a"])({url:"/customer/create",method:"get"})}function h(){return Object(n["a"])({url:"/source/index",method:"get"})}}}]);
//# sourceMappingURL=chunk-1c7d1fc6.d25bb11f.js.map