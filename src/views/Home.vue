<template>
  <div class="home">
    <el-container :style="{height: screenHeight + 'px'}">
      <!-- 侧边栏 -->

      <el-aside class="aside-wrap" style="position: relative">
        <!-- -->
        <div class="display-wrap">
          <i v-show="isopened" @click="colseBtn" class="el-icon-d-arrow-left"></i>
          <i v-show="!isopened" @click="colseBtn" class="el-icon-d-arrow-right"></i>
        </div>

        <el-menu
          class="el-menu-vertical-demo"
          router
          :collapse="isCollapse"
          background-color="#2d373f"
          text-color="#909399"
          :collapse-transition="false"
          ref="elmenu"
        >
          <div class="icon-wrap">
            <div class="img-wrap">
              <img class="biglogol" v-show="isshowlogo" src="~assets/logo1.png" alt />
              <img class="smalllogol" v-show="!isshowlogo" src="~assets/logo.png" alt="">
            </div>
          </div>
          <!-- 功能栏 -->
          <div class="aside">
            <aside-main-nav :asideNavList="asideNavList" />
          </div>
        </el-menu>
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

            <div class="username">用户名：{{$store.state.userInfo.username}}</div>
            <div class="login-time">
              <span>当前时间：{{currentDate}}</span>
            </div>

            <div class="home-wrap">
              <el-button
                type="text"
                icon="el-icon-monitor"
                class="home"
                @click="homeBtn"
                v-has-permission="{powers:{
                '/class/add': true,
                '/class/edit': false
                }, curpower: '/class/add'}"
              >主页</el-button>

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
        <el-footer class="footer" height="50px">
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
import eventVue from "common/eventVue";
export default {
  name: "Home",
  data() {
    return {
      // logo变换
      isshowlogo: true,
      isopened: true,
      currentDate: "",
      isCollapse: false,
      // navList: [
      //   { navname: "人力管理", path: "/home/datainput" },
      //   { navname: "订单管理", path: "/home/demand" },
      //   { navname: "售后管理", path: "/home/feedback" },
      //   { navname: "报表管理", path: "/home/customquery" },
      //   { navname: "系统管理", path: "/home/sysmanage" },
      // ],
      // asideNavList: [
      //   [
      //     {
      //       navname: "资料录入",
      //       path: "/home/datainput",
      //       icon: "el-icon-edit-outline",
      //     },
      //     {
      //       navname: "培训记录",
      //       path: "/home/training",
      //       icon: "el-icon-timer",
      //     },
      //     {
      //       navname: "考核评价",
      //       path: "/home/assessment",
      //       icon: "el-icon-notebook-2",
      //     },
      //     {
      //       navname: "员工申诉",
      //       path: "/home/staffappeal",
      //       icon: "el-icon-notebook-2",
      //     },
      //   ],
      //   [
      //     {
      //       navname: "客户需求",
      //       path: "/home/demand",
      //       icon: "el-icon-document",
      //     },
      //     {
      //       navname: "手工分配",
      //       path: "/home/distribute",
      //       icon: "el-icon-coin",
      //     },
      //     {
      //       navname: "订单列表",
      //       path: "/home/ordergenerate",
      //       icon: "el-icon-s-order",
      //     },
      //     {
      //       navname: "人员派出",
      //       path: "/home/persondispatch",
      //       icon: "el-icon-place",
      //     },
      //     // {
      //     //   navname: "销售回访",
      //     //   path: "/home/salesvisit",
      //     //   icon: "el-icon-refresh",
      //     // },
      //     {
      //       navname: "订单延期",
      //       path: "/home/orderdelay",
      //       icon: "el-icon-date",
      //     },
      //     // {
      //     //   navname: "订单续签",
      //     //   path: "/home/orderrenewal",
      //     //   icon: "el-icon-finished",
      //     // },
      //   ],
      //   [
      //     {
      //       navname: "客户反馈",
      //       path: "/home/feedback",
      //       icon: "el-icon-phone-outline",
      //     },
      //     {
      //       navname: "手工分配",
      //       path: "/home/saledistribute",
      //       icon: "el-icon-coin",
      //     },
      //     {
      //       navname: "处理结果",
      //       path: "/home/handle",
      //       icon: "el-icon-finished",
      //     },
      //     {
      //       navname: "客户回访",
      //       path: "/home/review",
      //       icon: "el-icon-sort",
      //     },
      //   ],
      //   [
      //     {
      //       navname: "客户查询",
      //       path: "/home/customquery",
      //       icon: "el-icon-s-custom",
      //     },
      //     {
      //       navname: "员工查询",
      //       path: "/home/staffquery",
      //       icon: "el-icon-s-check",
      //     },
      //     {
      //       navname: "订单查询",
      //       path: "/home/orderquery",
      //       icon: "el-icon-tickets",
      //     },
      //     {
      //       navname: "投诉查询",
      //       path: "/home/complaintquery",
      //       icon: "el-icon-notebook-2",
      //     },
      //   ],
      //   [
      //     {
      //       navname: "系统设置",
      //       path: "/home/sysmanage",
      //       icon: "el-icon-setting",
      //     },
      //   ],
      // ],
      // selectAsides: null,
    };
  },
  components: {
    MainNav,
    AsideMainNav,
    Pagination,
  },
  computed: {
    screenHeight() {
      return this.$store.state.screenHeight;
    },
    navList() {
      return this.$store.state.navList;
    },
    asideNavList() {
      return this.$store.state.asideNavList;
    },
  },
  created() {

  },
  mounted() {
    // 初始化操作
    this.$store.commit("changeWidthHeight", {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    // 窗口改变时获取窗口的高度
    window.onresize = () => {
      console.log(window.innerHeight - 40);
      this.$store.commit("changeWidthHeight", {
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    let _this = this;
    this.timer = setInterval(() => {
      _this.currentDate = new Date().toLocaleString(); // 修改数据date
    }, 1000);
  },
  methods: {
    // 关闭功能
    colseBtn() {
      if (this.isopened) {
        this.isopened = false;
        this.isCollapse = true;
        this.isshowlogo = false
      } else {
        this.isopened = true;
        this.isCollapse = false;
        this.isshowlogo = true
      }
    },
    // currentSelect(index) {
    //   let currentIndex = parseInt(index);
    //   this.selectAsides = this.asideNavList[currentIndex];
    // },
    // 退出登录
    logoutBtn() {
      // token为空
      window.sessionStorage.clear();
      window.localStorage.removeItem("username")
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
  width: auto !important;
  background: #2d373f;
  overflow: hidden;

  /deep/.el-menu {
    border: none;

    .el-menu-item {
      i {
        // color: #fff;
      }
    }
  }

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
    width: 505px;
    display: flex;
    justify-content: space-between;

    .username {
      width: 120px;
      height: 40px;
      line-height: 40px;
      margin-right: 20px;
      color: #fff;
    }

    .login-time {
      width: 250px;
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
      width: 135px;
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

    .biglogol {
      width: 160px;
      height: 50px;
    }

    .smalllogol {
      width: 40px;
      height: 40px;
    }
  }
}

.footer {
  background-color: #fff;
}

.display-wrap {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;

  i {
    font-size: 20px;
    color: #fff;
  }
}
</style>