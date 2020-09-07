<template>
  <div class="login">
    <div class="login-wrap">
      <div class="title">家政大数据管理系统</div>
      <div class="login-content-wrap">
        <div class="login-content">
          <div class="head">用户登录</div>
          <div class="input-wrap">
            <el-form
              :model="loginForm"
              status-icon
              :rules="loginRules"
              ref="loginForm"
              class="loginForm"
            >
              <!-- 用户名 -->
              <el-form-item prop="username">
                <el-input
                  type="text"
                  v-model="loginForm.username"
                  prefix-icon="el-icon-s-custom"
                  class="login-input"
                ></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  prefix-icon="el-icon-lock"
                  show-password
                  @keyup.native.enter="enterClick"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="remember-wrap">
            <div class="remember">
              <!-- <el-checkbox v-model="loginForm.remember" class="remember-text">记住密码</el-checkbox>
              <div class="forget">忘记密码?</div>-->
            </div>
          </div>

          <div class="submit-wrap">
            <el-button type="primary" @click="loginBtn" class="loginBtn">登录</el-button>
          </div>

          <!-- 角 -->
          <img class="topleft" src="~assets/img/topleft.png" alt />
          <img class="topright" src="~assets/img/topright.png" alt />
          <img class="bottomleft" src="~assets/img/bottomleft.png" alt />
          <img class="bottomright" src="~assets/img/bottomright.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        // remember: false
      },
      // 密码验证
      loginRules: {
        username: [
          { required: true, message: "请输入您的用户名", trigger: "blur" },
          { min: 5, max: 20, message: "用户名长度5~12字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度3~12字符", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    loginBtn() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          this.$message.error("出现错误了");
        }
        // 请求
        this.$request({
          url: "/login",
          method: "post",
          data: this.loginForm,
        })
          .then((res) => {
            if (res.code === 200) {
              console.log(res);
              // 本地存储
              window.localStorage.setItem("username", res.data.username);
              // 本窗口存储用户的基本信息
              this.$store.commit("saveUserInfo", {
                userToken: res.data.Authorization,
                username: res.data.username,
                last_login_time: res.data.last_login_time,
                ip: res.data.ip,
                role_id: res.data.role_id,
              });
              // 存储菜单
              let navlist = this.navListData(res.data.role_id);
              let asidelist = this.asideNavListData(res.data.role_id);
              this.$store.commit("changeNavList", navlist);
              this.$store.commit("changeAsideNavList", asidelist);
              this.$message.success(res.msg);
              this.$router.replace("/welcome");
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err);
          });
      });
    },

    navListData(role_id) {
      if (role_id == 2) {
        return [
          { navname: "订单管理", path: "/home/demand" },
          { navname: "报表管理", path: "/home/customquery" },
        ];
      }
      if (role_id == 5) {
        return [
          { navname: "人力管理", path: "/home/datainput" },
          { navname: "订单管理", path: "/home/demand" },
          { navname: "报表管理", path: "/home/customquery" },
        ];
      }
      if (role_id == 6) {
        return [
          { navname: "人力管理", path: "/home/training" },
          { navname: "报表管理", path: "/home/staffquery" },
        ];
      }
      if (role_id == 8) {
        return [{ navname: "售后管理", path: "/home/feedback" }];
      }
      if (role_id == 1 || role_id == 4) {
        return [
          { navname: "人力管理", path: "/home/datainput" },
          { navname: "订单管理", path: "/home/demand" },
          { navname: "售后管理", path: "/home/feedback" },
          { navname: "报表管理", path: "/home/customquery" },
          { navname: "系统管理", path: "/home/sysmanage" },
        ];
      }
      if (role_id == 16) {
        return [{ navname: "人力管理", path: "/home/datainput" }];
      }
      if (role_id == 17) {
        return [
          { navname: "人力管理", path: "/home/assessment" },
          { navname: "报表管理", path: "/home/staffquery" },
        ];
      }

      // return [
      //   { navname: "人力管理", path: "/home/datainput" },
      //   { navname: "订单管理", path: "/home/demand" },
      //   { navname: "售后管理", path: "/home/feedback" },
      //   { navname: "报表管理", path: "/home/customquery" },
      //   { navname: "系统管理", path: "/home/sysmanage" },
      // ];
    },
    asideNavListData(role_id) {
      if (role_id == 2) {
        return [
          [
            {
              navname: "客户需求",
              path: "/home/demand",
              icon: "el-icon-document",
            },
          ],
          [
            {
              navname: "客户查询",
              path: "/home/customquery",
              icon: "el-icon-s-custom",
            },
          ],
        ];
      }
      if (role_id == 5) {
        return [
          [
            {
              navname: "资料录入",
              path: "/home/datainput",
              icon: "el-icon-edit-outline",
            },
          ],
          [
            {
              navname: "客户需求",
              path: "/home/demand",
              icon: "el-icon-document",
            },
            {
              navname: "订单列表",
              path: "/home/ordergenerate",
              icon: "el-icon-s-order",
            },
            {
              navname: "订单延期",
              path: "/home/orderdelay",
              icon: "el-icon-date",
            },
          ],
          [
            {
              navname: "客户查询",
              path: "/home/customquery",
              icon: "el-icon-s-custom",
            },
            {
              navname: "订单查询",
              path: "/home/orderquery",
              icon: "el-icon-tickets",
            },
          ],
        ];
      }
      if (role_id == 6) {
        return [
          [
            {
              navname: "培训记录",
              path: "/home/training",
              icon: "el-icon-timer",
            },
          ],
          [
            {
              navname: "员工查询",
              path: "/home/staffquery",
              icon: "el-icon-s-check",
            },
          ],
        ];
      }
      if (role_id == 8) {
        return [
          [
            {
              navname: "客户反馈",
              path: "/home/feedback",
              icon: "el-icon-phone-outline",
            },
            {
              navname: "处理结果",
              path: "/home/handle",
              icon: "el-icon-finished",
            },
            {
              navname: "客户回访",
              path: "/home/review",
              icon: "el-icon-sort",
            },
          ],
        ];
      }
      if (role_id == 1 || role_id == 4) {
        return [
          [
            {
              navname: "资料录入",
              path: "/home/datainput",
              icon: "el-icon-edit-outline",
            },
            {
              navname: "培训记录",
              path: "/home/training",
              icon: "el-icon-timer",
            },
            {
              navname: "考核评价",
              path: "/home/assessment",
              icon: "el-icon-notebook-2",
            },
            {
              navname: "员工申诉",
              path: "/home/staffappeal",
              icon: "el-icon-notebook-2",
            },
          ],
          [
            {
              navname: "客户需求",
              path: "/home/demand",
              icon: "el-icon-document",
            },
            {
              navname: "手工分配",
              path: "/home/distribute",
              icon: "el-icon-coin",
            },
            {
              navname: "订单列表",
              path: "/home/ordergenerate",
              icon: "el-icon-s-order",
            },
            {
              navname: "人员派出",
              path: "/home/persondispatch",
              icon: "el-icon-place",
            },
            // {
            //   navname: "销售回访",
            //   path: "/home/salesvisit",
            //   icon: "el-icon-refresh",
            // },
            {
              navname: "订单延期",
              path: "/home/orderdelay",
              icon: "el-icon-date",
            },
            // {
            //   navname: "订单续签",
            //   path: "/home/orderrenewal",
            //   icon: "el-icon-finished",
            // },
          ],
          [
            {
              navname: "客户反馈",
              path: "/home/feedback",
              icon: "el-icon-phone-outline",
            },
            {
              navname: "手工分配",
              path: "/home/saledistribute",
              icon: "el-icon-coin",
            },
            {
              navname: "处理结果",
              path: "/home/handle",
              icon: "el-icon-finished",
            },
            {
              navname: "客户回访",
              path: "/home/review",
              icon: "el-icon-sort",
            },
          ],
          [
            {
              navname: "客户查询",
              path: "/home/customquery",
              icon: "el-icon-s-custom",
            },
            {
              navname: "员工查询",
              path: "/home/staffquery",
              icon: "el-icon-s-check",
            },
            {
              navname: "订单查询",
              path: "/home/orderquery",
              icon: "el-icon-tickets",
            },
            {
              navname: "投诉查询",
              path: "/home/complaintquery",
              icon: "el-icon-notebook-2",
            },
          ],
          [
            {
              navname: "系统设置",
              path: "/home/sysmanage",
              icon: "el-icon-setting",
            },
          ],
        ];
      }
      if (role_id == 16) {
        return [
          [
            {
              navname: "资料录入",
              path: "/home/datainput",
              icon: "el-icon-edit-outline",
            },
          ],
        ];
      }
      if (role_id == 17) {
        return [
          [
            {
              navname: "考核评价",
              path: "/home/assessment",
              icon: "el-icon-notebook-2",
            },
          ],
          [
            {
              navname: "员工查询",
              path: "/home/staffquery",
              icon: "el-icon-s-check",
            },
          ],
        ];
      }
    },

    enterClick() {
      this.loginBtn();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../assets/img/login-bg.png") no-repeat;
  background-size: bottom center;

  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 700px;
    // background-color: red;

    .title {
      width: 100%;
      height: 200px;
      line-height: 200px;
      text-align: center;
      font-size: 45px;
      letter-spacing: 0.2rem;
      color: #fff;
      font-family: SimSun;
    }

    .login-content-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      height: 430px;

      .login-content {
        position: relative;
        width: 450px;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.2);

        .head {
          width: 100%;
          height: 120px;
          line-height: 110px;
          text-align: center;
          font-size: 30px;
          color: #fff;
          font-family: SimSun;
        }

        .input-wrap {
          width: 100%;
          display: flex;
          justify-content: center;

          .loginForm {
            width: 350px;

            .login-input {
              margin-bottom: 10px;
            }
          }
        }

        // 记住密码
        .remember-wrap {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: center;

          .remember {
            width: 350px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .remember-text {
              color: #fff;
            }

            .forget {
              cursor: pointer;
              font-size: 14px;
              color: #00a1f6;
            }
          }
        }

        // 登录
        .submit-wrap {
          margin-top: 30px;
          width: 100%;
          display: flex;
          justify-content: center;

          .loginBtn {
            width: 350px;
          }
        }

        // 四个角
        .topleft {
          position: absolute;
          width: 39px;
          height: 38px;
          top: 0;
          left: 0;
        }
        .topright {
          position: absolute;
          width: 39px;
          height: 38px;
          top: 0;
          right: 0;
        }
        .bottomleft {
          position: absolute;
          width: 39px;
          height: 38px;
          bottom: 0;
          left: 0;
        }
        .bottomright {
          position: absolute;
          width: 39px;
          height: 38px;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
}
</style>