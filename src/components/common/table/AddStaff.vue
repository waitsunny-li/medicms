<template>
  <div class="addstaff-wrap">
    
  </div>
</template>

<script>
import eventVue from "common/eventVue";
import {
  saveStaffInfo,
  getOneStraffInfo,
  updateStraffInfo,
} from "network/humanageRequest";
import {
  getProvince,
  getCity,
  getDistrict,
  getLanguage,
  getEnglish,
  getComputer,
  getCooking,
  getWiring,
  getJob,
  getKills,
} from "network/select";
export default {
  name: "AddStaff",
  data() {
    return {
      
    };
  },
  created() {




    // 监听新增员工事件（改变入职时间）
    // 注意该监听函数，必须是该组件已经创建过一次，才能监听到，否则，gameover
    eventVue.$on("addstaffevent", (val) => {
      
    });

    // 监听编辑按钮发送的事件
    eventVue.$on("editstaffevent", (id) => {
      
    });
  },
  methods: {
    
  },
  watch: {},
  computed: {
    
  },
};
</script>

<style lang='less' scoped>
.add-staff {
  width: 100%;

  /deep/.add-user-form {
    width: 100%;
    overflow-y: auto;
    height: 450px;

    .header-wrap {
      width: 100%;
      // height: 40px;
      border-bottom: 1px solid rgb(235, 232, 232);

      /deep/.el-form-item {
        // width: 200px;
        display: flex;
        margin-bottom: 10px;

        /deep/.el-form-item__label {
          font-size: 12px;
          width: 80px;
        }

        /deep/.el-input {
          width: 130px;
        }

        /deep/.in_time {
          width: 170px;
        }
      }

      /deep/.in-time-label {
        width: 230px;
      }

      // 员工状态
      /deep/.person_state {
        width: 180px;

        /deep/.el-input {
          width: 110px;
        }
      }

      // 入职来源
      /deep/.recruiters {
        width: 300px;

        /deep/.el-input {
          width: 80px;
        }

        /deep/.telphone {
          width: 120px;
        }
      }
    }

    // 主体
    .content-wrap {
      margin-top: 20px;
      /deep/.el-form-item {
        // width: 140px;
        display: flex;
        margin-bottom: 10px;

        /deep/.el-form-item__label {
          font-size: 12px;
          width: 80px;
        }

        /deep/.el-input {
          width: 100px;
        }
      }

      .urgent-name {
        /deep/.el-form-item__label {
          font-size: 12px;
          width: 90px;
        }
      }

      // 详细地址
      /deep/.registration_address {
        width: 350px;

        /deep/.el-cascader {
          width: 150px;

          /deep/.el-input {
            width: 100%;
          }
        }
      }

      // 婚姻
      /deep/.marital {
        // width: 200px;

        /deep/.el-form-item__label {
          width: 80px;
        }

        /deep/.el-select {
          width: 100px;

          /deep/.el-input {
            width: 100%;
          }
        }
      }

      // 添加工作经历
      .work-family {
        margin-top: 20px;
      }

      .work {
        margin-top: 20px;
        padding-top: 10px;
        border: 1px solid rgb(235, 232, 232);

        /deep/.workdata {
          // width: 200px;

          /deep/.el-form-item__label {
            // width: 100px;
          }

          /deep/.el-range-editor {
            width: 200px;
          }
        }
        /deep/.work-content {
          /deep/.el-form-item__label {
            width: 90px;
          }
        }

        /deep/.work-add {
          padding: 10px 10px;
          box-sizing: border-box;

          /deep/.add-work {
            width: 100%;
            height: 30px;
          }
        }
      }

      // 家庭成员
      .family-wrap {
        margin-top: 20px;
        padding-top: 10px;
        padding-left: 10px;
        border: 1px solid rgb(235, 232, 232);

        /deep/.family-name {
          width: 70px;
        }

        .family-add {
          padding: 10px 10px 10px 0;
          box-sizing: border-box;
          .add-family {
            width: 100%;
            height: 30px;
          }
        }
      }
    }
  }

  /deep/.add-user-form::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  /deep/.add-user-form::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }

  // 确认按钮
  .dialog-footer {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .adressForm {
    /deep/.el-input {
      /deep/.el-input__inner {
        width: 200px;
      }
    }
  }
}
</style>