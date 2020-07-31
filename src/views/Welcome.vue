<template>
  <div class="welcome">
    <div class="header">
      <!-- logo -->
      <div class="logo-wrap">
        <div class="headlogo">
          <img src="~assets/img/logohead.png" alt />
        </div>
        <div class="img">
          <img src="~assets/img/logobig.png" alt />
        </div>
      </div>
      <!-- 导航 -->
      <div class="nav">
        <router-link v-for="(item, index) in navList" :key="index" :to="item.path">{{item.navname}}</router-link>
      </div>
      <!-- 时间-ip -->
      <div class="time-ip-wrap">
        <div class="time">您上次登录时间：{{$store.state.userInfo.last_login_time}}</div>
        <div class="ip">IP：{{$store.state.userInfo.ip}}</div>
      </div>
      <!-- 主页退出 -->
      <div class="home-logout">
        <el-button type="text" icon="el-icon-monitor" class="home">主页</el-button>

        <el-button type="text" icon="el-icon-switch-button" class="logout-btn" @click="logoutBtn">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { setItem } from "../common/utils";
export default {
  name: "Welcome",
  data() {
    return {
      navList: [
        { navname: "人力管理", path: "/home/datainput" },
        { navname: "订单管理", path: "/home/demand" },
        { navname: "售后管理", path: "/home/feedback" },
        { navname: "报表管理", path: "/home/customquery" },
      ],
    };
  },
  methods: {
    // 退出登录
    logoutBtn() {
      // token为空
      window.sessionStorage.clear();
      this.$router.replace("/login");
      this.$message.success("退出成功！");
    },
  },
};
</script>

<style lang='less' scoped>
.welcome {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/img/login-bg.png") no-repeat;
  background-size: bottom center;

  .header {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;

    .logo-wrap {
      width: 275px;
      padding: 20px 10px;
      box-sizing: border-box;
      height: 35px;
      display: flex;
      align-content: center;

      .headlogo {
        width: 35px;
        height: 35px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .img {
        margin-left: 10px;
        width: 100%;
        height: 35px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    // 导航
    .nav {
      color: #fff;
      width: 480px;
      height: 100%;
      display: flex;
      justify-content: space-around;
      line-height: 60px;

      a {
        color: #fff;
        font-size: 14px;
        font-family: "微软雅黑";
      }
    }

    // 登陆时间
    .time-ip-wrap {
      margin-left: 100px;
      width: 500px;
      height: 100%;
      color: #fff;
      display: flex;
      align-content: center;

      .time {
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 14px;
      }

      .ip {
        margin-left: 50px;
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 14px;
      }
    }

    .home-logout {
      width: 120px;
      height: 100%;
      display: flex;
      align-content: center;
      justify-content: center;

      .home {
        color: #fff;

        .home-img {
          width: 15px;
          height: 15px;
        }
        span {
          font-size: 14px;
        }
      }

      .logout-btn {
        color: red;
      }
    }
  }
}
</style>