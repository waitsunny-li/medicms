<template>
  <div class="welcome">
    <div class="header">
      <el-row>
        <el-col :span="5">
          <div class="logo-wrap">
            <div class="headlogo">
              <img src="~assets/img/logohead.png" alt />
            </div>
            <div class="img">
              <img src="~assets/img/logobig.png" alt />
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <!-- 导航 -->
          <div class="nav">
            <span
              v-for="(item, index) in navList"
              :key="index"
              @click="navClick(item.path, index)"
              >{{ item.navname }}</span
            >
          </div>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-col :span="18">
            <!-- 时间-ip -->
            <div class="time-ip-wrap">
              <div class="username">{{ $store.state.userInfo.username }}</div>
              <div class="time">
                <i class="el-icon-time" style="margin-right: 5px"></i
                >{{ currentDate }}
              </div>
              <div class="ip">IP：{{ $store.state.userInfo.ip }}</div>
            </div>
          </el-col>
          <el-col :span="4">
            <!-- 主页退出 -->
            <div class="home-logout">
              <el-button type="text" icon="el-icon-monitor" class="home"
                >主页</el-button
              >

              <el-button
                type="text"
                icon="el-icon-switch-button"
                class="logout-btn"
                @click="logoutBtn"
                >退出</el-button
              >
            </div>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="welcome-body">
      <div
        class="content-wrap"
        v-has-power="{
          limitList: [1],
          role_id: $store.state.userInfo.role_id,
        }"
      >
        <!-- 欢迎来到家政管理系统 -->
        <div class="circle-wrpa" style="background-color: #67c23a">
          <i class="el-icon-s-custom" style="font-size: 45px"></i>
          <div class="right-wrap">
            <p class="title">家政员</p>
            <p class="number">{{ companyData.staff }}</p>
          </div>
        </div>
        <div class="circle-wrpa" style="background-color: #e6a23c">
          <i class="el-icon-s-order" style="font-size: 45px"></i>
          <div class="right-wrap">
            <p class="title">订单数</p>
            <p class="number">{{ companyData.customer }}</p>
          </div>
        </div>
        <div class="circle-wrpa" style="background-color: #f56c6c">
          <i class="el-icon-s-comment" style="font-size: 45px"></i>
          <div class="right-wrap">
            <p class="title">投诉数</p>
            <p class="number">{{ companyData.complaint }}</p>
          </div>
        </div>
        <div class="circle-wrpa" style="background-color: #909399">
          <i class="el-icon-user-solid" style="font-size: 45px"></i>
          <div class="right-wrap">
            <p class="title">员工数</p>
            <p class="number">{{ companyData.user }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setItem } from "../common/utils";
import { request } from "../network/request";
export default {
  name: "Welcome",
  data() {
    return {
      companyData: {
        customer: "",
        staff: "",
        complaint: "",
        user: "",
      },
      currentDate: "",
      beforeUnloadTime: "",
      gapTime: "",
    };
  },
  computed: {
    navList() {
      return this.$store.state.navList;
    },
  },
  created() {
    request({
      url: "/index",
      method: "get",
    }).then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        this.companyData = data;
      } else {
        this.$message.error(msg);
      }
    });
  },
  mounted() {
    // 监听窗口关闭
    // window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
    // window.addEventListener("unload", (e) => this.unloadHandler(e));

    let _this = this;
    this.timer = setInterval(() => {
      _this.currentDate = new Date().toLocaleString(); // 修改数据date
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    // beforeunloadHandler() {
    //   this.beforeUnloadTime = new Date().getTime();
    // },
    // unloadHandler(e) {
    //   this.gapTime = new Date().getTime() - this.beforeUnloadTime;
    //   if (this.gapTime <= 5) {
    //     console.log("jjj");
    //     window.localStorage.removeItem("username");
    //   } else {
    //     console.log("我刷新了！");
    //   }
    // },
    // 退出登录
    logoutBtn() {
      // token为空
      window.sessionStorage.clear();
      // window.localStorage.removeItem("username");
      this.$router.replace("/login");
      this.$message.success("退出成功！");
    },
    navClick(path, index) {
      this.$router.push(path);
      this.$store.commit("changeNavIndex", index);
    },
  },
  destroyed() {
    // window.removeEventListener("beforeunload", (e) =>
    //   this.beforeunloadHandler(e)
    // );
    // window.removeEventListener("unload", (e) => this.unloadHandler(e));
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
      // justify-content: space-around;
      line-height: 60px;

      span {
        cursor: pointer;
        color: #fff;
        padding: 5px 20px;
        font-size: 14px;
        font-family: "微软雅黑";
      }
    }

    // 登陆时间
    .time-ip-wrap {
      width: 500px;
      height: 100%;
      color: #fff;
      display: flex;
      align-content: center;

      .username {
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 14px;
        margin-right: 10px;
      }

      .time {
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 14px;
      }

      .ip {
        margin-left: 10px;
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 14px;
      }
    }

    .home-logout {
      width: 120px;
      height: 60px;
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

  .welcome-body {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;

    .content-wrap {
      width: 1200px;
      height: calc(100vh - 160px);
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #fff;
      letter-spacing: 10px;

      .circle-wrpa {
        width: 250px;
        height: 120px;

        display: flex;
        align-items: center;
        justify-content: space-around;

        .right-wrap {
          .title {
            color: #fff;
            font-size: 16px;
            font-weight: 600;
          }
          .number {
            text-align: center;
            font-size: 40px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>