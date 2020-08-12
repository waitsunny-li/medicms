<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="aside-wrap"  :style="{height: screenHeight + 'px', overflow: 'hidden'}">
        <!-- icon -->
        <div class="icon-wrap">
          <div class="img-wrap">
            <img src="~assets/img/logo.png" alt />
          </div>
        </div>
        <!-- 功能栏 -->
        <div class="aside" :style="{height: screenHeight + 'px'}">
          <aside-main-nav :asideNavList="asideNavList" />
        </div>
      </el-aside>
      <!-- 内容 -->
      <el-container>
        <!-- 头部 -->
        <el-header class="header" height="40px">
          <!-- 头部导航 -->
          <div class="head_sec">
            <div class="ip"></div>
            <main-nav :navList="navList" />
          </div>
          <!-- 右侧 -->
          <div class="right-wrap">
            <div class="login-time">
              <span>您上次的登录时间：{{$store.state.userInfo.last_login_time}}</span>
            </div>

            <div class="home-wrap">
              <el-button type="text" icon="el-icon-monitor" class="home" @click="homeBtn">主页</el-button>

              <el-button
                type="text"
                icon="el-icon-switch-button"
                class="logout-btn"
                @click="logoutBtn"
              >退出</el-button>
            </div>
          </div>
        </el-header>
        <el-main :style="{height: screenHeight - 80 + 'px', overflow: 'hidden'}">
          <router-view name="content" />
        </el-main>
        <el-footer class="footer">
          <!-- <pagination /> -->
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainNav from "components/content/mainnav/MainNav";
import AsideMainNav from "components/content/mainnav/AsideMainNav";
import Pagination from "components/common/pagination/Pagination";

export default {
  name: "Home",
  data() {
    return {
      navList: [
        { navname: "人力管理", path: "/home/datainput" },
        { navname: "订单管理", path: "/home/demand" },
        { navname: "售后管理", path: "/home/feedback" },
        { navname: "报表管理", path: "/home/customquery" },
      ],
      asideNavList: [
        [
          {
            navname: "资料录入",
            path: "/home/datainput",
            icon: "icon el-icon-edit-outline",
          },
          {
            navname: "培训记录",
            path: "/home/training",
            icon: "icon el-icon-timer",
          },
          {
            navname: "考核评价",
            path: "/home/assessment",
            icon: "icon el-icon-notebook-2",
          },
        ],
        [
          {
            navname: "客户需求",
            path: "/home/demand",
            icon: "icon el-icon-document",
          },
          {
            navname: "手工分配",
            path: "/home/distribute",
            icon: "icon el-icon-coin",
          },
          {
            navname: "订单列表",
            path: "/home/ordergenerate",
            icon: "icon el-icon-s-order",
          },
          {
            navname: "人员派出",
            path: "/home/persondispatch",
            icon: "icon el-icon-place",
          },
          {
            navname: "销售回访",
            path: "/home/salesvisit",
            icon: "icon el-icon-refresh",
          },
          {
            navname: "订单延期",
            path: "/home/orderdelay",
            icon: "icon el-icon-date",
          },
          {
            navname: "订单续签",
            path: "/home/orderrenewal",
            icon: "icon el-icon-finished",
          },
        ],
        [
          {
            navname: "客户反馈",
            path: "/home/feedback",
            icon: "icon el-icon-phone-outline",
          },
          {
            navname: "手工分配",
            path: "/home/saledistribute",
            icon: "icon el-icon-coin",
          },
          {
            navname: "处理结果",
            path: "/home/handle",
            icon: "icon el-icon-finished",
          },
          {
            navname: "客户回访",
            path: "/home/review",
            icon: "icon el-icon-sort",
          },
        ],
        [
          {
            navname: "客户查询",
            path: "/home/customquery",
            icon: "icon el-icon-s-custom",
          },
          {
            navname: "员工查询",
            path: "/home/staffquery",
            icon: "icon el-icon-s-check",
          },
          {
            navname: "订单查询",
            path: "/home/orderquery",
            icon: "icon el-icon-tickets",
          },
          {
            navname: "投诉查询",
            path: "/home/complaintquery",
            icon: "icon el-icon-notebook-2",
          },
        ],
      ],
      selectAsides: null,
    };
  },
  components: {
    MainNav,
    AsideMainNav,
    Pagination
  },
  computed: {
    screenHeight() {
      return this.$store.state.screenHeight
    }
  },
  mounted() {
    // 初始化操作
    this.$store.commit("changeWidthHeight", {
        width: window.innerWidth,
        height: window.innerHeight
      })
    // 窗口改变时获取窗口的高度
    window.onresize = () => {
      console.log(window.innerHeight - 40)
      this.$store.commit("changeWidthHeight", {
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  },
  methods: {
    currentSelect(index) {
      let currentIndex = parseInt(index);
      this.selectAsides = this.asideNavList[currentIndex];
    },
    // 退出登录
    logoutBtn() {
      // token为空
      window.sessionStorage.clear();
      this.$router.replace("/login");
      this.$message.success("退出成功！");
    },
    // 主页按钮
    homeBtn() {
      console.log("jj");
      this.$router.push("/welcome");
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
}

.aside-wrap {
  background: #2d373f;
  .aside {
    background: #2d373f;
  }
}

.header {
  width: 100%;
  padding: 0;
  height: 40px;
  background: #1f272d;
  display: flex;
  justify-content: space-between;

  .right-wrap {
    width: 420px;
    display: flex;
    justify-content: space-between;

    .login-time {
      width: 350px;
      height: 40px;
      margin-right: 20px;
      span {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 14px;
        font-family: "微软雅黑";
      }
    }

    .home-wrap {
      display: flex;
      justify-content: space-around;
      width: 180px;
      .home {
        color: #fff;
      }
      .logout-btn {
        margin-right: 10px;
        color: rgb(224, 14, 14);
      }
    }
  }
}

.icon-wrap {
  width: 100%;
  height: 80px;
  background-color: #2d373f;

  .img-wrap {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 160px;
      height: 50px;
    }
  }
}
</style>