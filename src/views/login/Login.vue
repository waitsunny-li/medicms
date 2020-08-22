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
              <el-checkbox v-model="loginForm.remember" class="remember-text">记住密码</el-checkbox>
              <div class="forget">忘记密码?</div>
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
        password: ""
        // remember: false
      },
      // 密码验证
      loginRules: {
        username: [
          { required: true, message: "请输入您的用户名", trigger: "blur" },
          { min: 5, max: 20, message: "用户名长度5~12字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度3~12字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    loginBtn() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          this.$message.error("出现错误了");
        }
        // 请求
        this.$request({
          url: "/login",
          method: "post",
          data: this.loginForm
        })
          .then(res => {
            if (res.code === 200) {
              console.log(res)
              // 本地存储用户的基本信息
              this.$store.commit('saveUserInfo', {
                "userToken": res.data.Authorization,
                "username": res.data.username,
                "last_login_time": res.data.last_login_time,
                "ip": res.data.ip,
                "role_id": res.data.role_id,
              })
              this.$message.success(res.msg)
              this.$router.replace('/welcome')
            }else {
              this.$message.error(res.msg)
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      });
    },

    enterClick() {
      this.loginBtn()
    }
  }
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