<template>
  <div class="home">
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
        <router-view name="content" />
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "components/content/mainnav/MainNav";
import AsideMainNav from "components/content/mainnav/AsideMainNav";
export default {
  name: "Home",
  data() {
    return {
      navList: [
        { navname: "人力管理", path: "/home/datainput" },
        { navname: "订单管理", path: "/home/demand" },
        { navname: "售后管理", path: "/home/feedback" },
        { navname: "报表管理", path: "/home/customquery" }
      ],
      asideNavList: [
        [
          { navname: "资料录入", path: "/home/datainput" },
          { navname: "培训记录", path: "/home/training" },
          { navname: "考核评价", path: "/home/assessment" }
        ],
        [
          { navname: "客户需求", path: "/home/demand" },
          { navname: "手工分配", path: "/home/distribute" },
          { navname: "订单生成", path: "/home/ordergenerate" },
          { navname: "人员派出", path: "/home/persondispatch" },
          { navname: "销售回访", path: "/home/salesvisit" },
          { navname: "订单延期", path: "/home/orderdelay" },
          { navname: "订单续签", path: "/home/orderrenewal" }
        ],
        [
          { navname: "客户反馈", path: "/home/feedback" },
          { navname: "手工分配", path: "/home/saledistribute" },
          { navname: "处理结果", path: "/home/handle" },
          { navname: "客户回访", path: "/home/review" }
        ],
        [
          { navname: "客户查询", path: "/home/customquery" },
          { navname: "员工查询", path: "/home/staffquery" },
          { navname: "订单查询", path: "/home/orderquery" },
          { navname: "投诉查询", path: "/home/complaintquery" }
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

<style scoped>
.home {
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