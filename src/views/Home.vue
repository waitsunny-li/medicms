<template>
  <div class="home">
    <el-container :style="{height: screenHeight + 'px'}">
      <!-- 侧边栏 -->

      <el-aside class="aside-wrap" style="position: relative">
        <!-- -->
        <div class="display-wrap" @click="colseBtn">
          <i v-show="isopened"  class="el-icon-d-arrow-left"></i>
          <i v-show="!isopened"  class="el-icon-d-arrow-right"></i>
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
              <img class="smalllogol" v-show="!isshowlogo" src="~assets/logo.png" alt />
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
            <div class="username">
              <i class="el-icon-user" style="margin-right: 10px"></i>
              {{$store.state.userInfo.username}}
            </div>
            <div class="login-time">
              <span>
                <i class="el-icon-time" style="margin-right: 5px"></i>
                {{currentDate}}
              </span>
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
      beforeUnloadTime: "",
      gapTime: "",
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
  created() {},
  mounted() {
    // 监听窗口关闭
    // window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
    // window.addEventListener("unload", (e) => this.unloadHandler(e));
    // 初始化操作
    this.$store.commit("changeWidthHeight", {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    // 窗口改变时获取窗口的高度
    window.onresize = () => {
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
    // beforeunloadHandler() {
    //   this.beforeUnloadTime = new Date().getTime();
    // },
    // unloadHandler(e) {
    //   this.gapTime = new Date().getTime() - this.beforeUnloadTime;
    //   if (this.gapTime <= 5) {
    //     window.localStorage.removeItem("username");
    //   } else {
    //     console.log("我刷新了！");
    //   }
    // },
    // 关闭功能
    colseBtn() {
      if (this.isopened) {
        this.isopened = false;
        this.isCollapse = true;
        this.isshowlogo = false;
      } else {
        this.isopened = true;
        this.isCollapse = false;
        this.isshowlogo = true;
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
      // window.localStorage.removeItem("username");
      this.$router.replace("/login");
      this.$message.success("退出成功！");
    },
    // 主页按钮
    homeBtn() {
      this.$router.push("/welcome");
    },
  },
  destroyed() {
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
    window.removeEventListener("unload", (e) => this.unloadHandler(e));
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
}

/deep/.el-input__inner {
  // padding: 0 1px;
  padding-right: 12rpx;
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
    width: 460px;
    display: flex;
    justify-content: space-between;

    .username {
      width: 120px;
      height: 40px;
      line-height: 40px;
      color: #fff;
    }

    .login-time {
      width: 190px;
      height: 40px;
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
  height: 60px;
  background-color: #2d373f;

  .img-wrap {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    .biglogol {
      width: 125px;
      height: 40px;
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
  width: 50px;
  text-align: right;
  transform: translateY(-50%);
  cursor: pointer;

  i {
    font-size: 20px;
    color: #c0c4cc;
    transition: 0.4s;
  }

  &:hover {
    i {
      margin-right: 10px;
      color: #fff;
    }
  }
}

/deep/.el-table__body-wrapper {
  overflow: auto;
}

// /deep/.el-table__body-wrapper::-webkit-scrollbar {
//   width: 5px;
//   height: 10px;
// }

// /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
//   background-color: #ccc;
//   border-radius: 20px;
// }

 /deep/.el-table td, .el-table th {
   padding: 6px 0;
 }

 /deep/.el-table .el-tabs__nav-scroll{
   padding-left: 20px;
   padding-right: 20px;
 }
</style>