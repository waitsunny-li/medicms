<template>
  <div id="app">
    <!-- 头部导航 -->
    <div class="head_sec">
      <div class="ip"></div>
      <main-nav :navList="navList" />
    </div>

    <!-- 中间部分（包含侧边栏和内容） -->
    <div class="main">
      <!-- 功能侧边栏 -->
      <div class="aside">
        <aside-main-nav :asideNavList="asideNavList" />
      </div>

      <!-- 内容 -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "components/content/mainnav/MainNav";
import AsideMainNav from "components/content/mainnav/AsideMainNav";
export default {
  name: "App",
  data() {
    return {
      // navList: ["人力管理", "订单管理", "售后管理", "报表管理"],
      navList: [
        {navname: '人力管理', path: '/datainput'},
        {navname: '订单管理', path: '/demand'},
        {navname: '售后管理', path: '/feedback'},
        {navname: '报表管理', path: '/customquery'}
      ],
      asideNavList: [
        [
          { navname: "资料录入", path: "/datainput" },
          { navname: "培训记录", path: "/training" },
          { navname: "考核评价", path: "/assessment" }
        ],
        [
          { navname: "客户需求", path: "/demand" },
          { navname: "手工分配", path: "/distribute" },
          { navname: "订单生成", path: "/ordergenerate" },
          { navname: "人员派出", path: "/persondispatch" },
          { navname: "销售回访", path: "/salesvisit" },
          { navname: "订单延期", path: "/orderdelay" },
          { navname: "订单续签", path: "/orderrenewal" }
        ],
        [
          { navname: "客户反馈", path: "/feedback" },
          { navname: "手工分配", path: "/saledistribute" },
          { navname: "处理结果", path: "/handle" },
          { navname: "客户回访", path: "/review" }
        ],
        [
          { navname: "客户查询", path: "/customquery" },
          { navname: "员工查询", path: "/staffquery" },
          { navname: "订单查询", path: "/orderquery" },
          { navname: "投诉查询", path: "/complaintquery" }
        ]
      ]
    };
  },
  components: {
    MainNav,
    AsideMainNav
  }
};
</script>

<style lang='scss' scoped>
@import "assets/css/normalize.css";
#app {
  width: 1200px;
  margin: 0 auto;
}

.head_sec {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.head_sec .ip {
  width: 700px;
}

.main {
  width: 1200px;
  display: flex;
}

.main .aside {
  width: 200px;
  height: 100%;
}

.main .content {
  width: 1000px;
  height: 600px;
  background-color: royalblue;
}
</style>
