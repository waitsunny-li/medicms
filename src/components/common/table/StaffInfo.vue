<template>
  <div class="staff-info">
    <div class="staff-content" v-loading="staffInfoLoading">
      <el-row class="expand-row">
        <el-col :span="4">
          <span class="label-text">手机号</span>
          <span class="content-text">{{ staffInfo.mobile }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">工资要求</span>
          <span class="content-text">{{ staffInfo.salary }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">英语水平</span>
          <span class="content-text">{{ staffInfo.english }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">计算机水平</span>
          <span class="content-text">{{ staffInfo.computer }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">政治面貌</span>
          <span class="content-text">{{ staffInfo.political_status }}</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="4">
          <span class="label-text">生肖</span>
          <span class="content-text">{{ staffInfo.zodiac }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">休假要求</span>
          <span class="content-text">{{ staffInfo.spare_time }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">户口地址</span>
          <span class="content-text"
            >{{ staffInfo.census_p_text }}{{ staffInfo.cnnsus_c_text
            }}{{ staffInfo.cnnsus_d_text
            }}{{ staffInfo.census_address_desc }}</span
          >
        </el-col>
        <el-col :span="5">
          <span class="label-text">户口类型</span>
          <span class="content-text">{{ staffInfo.census_type }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">入职时间</span>
          <span class="content-text">{{ staffInfo.in_time }}</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="4">
          <span class="label-text">学历</span>
          <span class="content-text">{{ staffInfo.education }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">现居住地</span>
          <span class="content-text"
            >{{ staffInfo.now_p_text }}{{ staffInfo.now_c_text
            }}{{ staffInfo.now_d_text }}{{ staffInfo.now_address_desc }}</span
          >
        </el-col>
        <el-col :span="5">
          <span class="label-text">服务技能</span>
          <span class="content-text">{{
            staffInfo.service_skills.join("，")
          }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">家用电器</span>
          <span class="content-text">{{ staffInfo.device.join("，") }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">入职来源</span>
          <span class="content-text"
            >{{ staffInfo.recruiters_name }}：{{
              staffInfo.recruiters_mobile
            }}</span
          >
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="4">
          <span class="label-text">血型</span>
          <span class="content-text">{{ staffInfo.blood }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">健康状况</span>
          <span class="content-text">{{ staffInfo.health }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">婚姻状况</span>
          <span class="content-text">{{ staffInfo.marital_status }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">员工状态</span>
          <span class="content-text" v-if="staffInfo.person_state == 1"
            >培训</span
          >
          <span class="content-text" v-else-if="staffInfo.person_state == 2"
            >考核</span
          >
          <span class="content-text" v-else-if="staffInfo.person_state == 3"
            >待岗</span
          >
          <span class="content-text" v-else-if="staffInfo.person_state == 4"
            >离职</span
          >
          <span class="content-text" v-else-if="staffInfo.person_state == 5"
            >黑名单</span
          >
          <span class="content-text" v-else-if="staffInfo.person_state == 6"
            >在岗</span
          >
          <span class="content-text" v-else-if="staffInfo.person_state == 7"
            >离职(下单)</span
          >
          <span class="content-text" v-else>错误</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">保险</span>
          <span class="content-text">{{ staffInfo.agreement_amount }}</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="4">
          <span class="label-text">身高</span>
          <span class="content-text">{{ staffInfo.height }}cm</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">体重</span>
          <span class="content-text">{{ staffInfo.weight }}kg</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">籍贯</span>
          <span class="content-text">{{ staffInfo.census }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">生日</span>
          <span class="content-text">{{ staffInfo.birthday }}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">语言能力</span>
          <span class="content-text">{{ staffInfo.language.join("，") }}</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="4">
          <span class="label-text">录入人</span>
          <span class="content-text">{{ staffInfo.user_name }}</span>
        </el-col>
        <el-col :span="8">
          <span class="label-text">家庭紧急联系</span>
          <span class="content-text"
            >{{ staffInfo.urgent_name }}：{{ staffInfo.urgent_mobile }}</span
          >
        </el-col>
        <el-col :span="8">
          <span class="label-text">安置协议</span>
          <span class="content-text">{{ staffInfo.agreement_amount }}</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="12" style="display: flex">
          <span class="label-text">工作经历</span>
          <div class="content_wrap" style="">
            <div
              class="content-text"
              v-for="(item, index) in staffInfo.work_experience"
              :key="index"
            >
              <el-col :span="24">{{ item.job }}</el-col>
              <el-col :span="24">{{ item.time.join("~") }}</el-col>
              <el-col :span="24">{{ item.address }}</el-col>
              <el-col :span="24">{{ item.content }}</el-col>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="display: flex">
          <span class="label-text">家庭成员</span>
          <div
            class="content-text"
            v-for="(item, index) in staffInfo.family_member"
            :key="index"
          >
            <el-col :span="24">{{ item.name }}</el-col>
            <el-col :span="24">{{ item.relation }}</el-col>
            <el-col :span="24">{{ item.current_situation }}</el-col>
          </div>
        </el-col>
      </el-row>

      <!-- 考核评价和培训经历 -->
      <el-row class="expand-row">
        <el-col :span="12" style="display: flex; padding-right: 10px">
          <span class="label-text" style="width: 80px">培训经历</span>
          <div class="train_content_wrap">
            <div
              class="content-text"
              v-for="(item, index) in staffInfo.train"
              :key="index"
            >
              <el-col :span="24">{{ item.project }}</el-col>
              <el-col :span="24"
                >{{ timestampToTime(item.start_time) }}~{{
                  timestampToTime(item.end_time)
                }}</el-col
              >
              <el-col :span="24">{{ item.address }}</el-col>
              <el-col :span="24">{{ item.content }}</el-col>
            </div>
          </div>
        </el-col>
        <el-col :span="12" style="display: flex">
          <span class="label-text" style="width: 80px">考核评价</span>
          <div class="train_content_wrap">
            <div
              class="content-text"
              v-for="(item, index) in staffInfo.train"
              :key="index"
            >
              <el-col :span="24">{{ item.project }}</el-col>
              <el-col :span="24"
                >{{ timestampToTime(item.start_time) }}~{{
                  timestampToTime(item.end_time)
                }}</el-col
              >
              <el-col :span="24">
                <span v-if="item.is_by == 1" style="color: #67c23a">
                  <i class="el-icon-check" style="color: #67c23a"></i> 通过
                </span>
                <span v-else-if="item.is_by == 0" style="color: #e6a23c">
                  <i class="el-icon-loading" style="color: #e6a23c"></i> 审核中
                </span>
                <span v-else style="color: #f56c6c">
                  <i class="el-icon-close" style="color: #f56c6c"></i>
                  没有通过
                </span>
              </el-col>
              <el-col :span="24">
                <span v-if="item.assess_content">{{
                  item.assess_content
                }}</span>
                <span v-else> <i class="el-icon-loading"></i> 审核中 </span>
              </el-col>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "StaffInfo",
  data() {
    return {};
  },
  props: {
    staffInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    staffInfoLoading: {
      type: Boolean,
      default: false,
    },
    staffInfoDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    timestampToTime(times) {
      let date = new Date(parseInt(times) * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      return Y + M + D;
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.expand-row {
  border-bottom: 1px solid #f1f1f1;
  padding: 8px 0;

  .label-text {
    color: #585656;
    font-size: 13px;
    margin-right: 10px;
  }

  .content-text {
    width: 180px;
    font-size: 13px;
    color: #999999;
    margin-bottom: 10px;
  }

  .train_content_wrap {
    flex-wrap: wrap;
    display: flex;
    height: 120px;
    overflow-y: auto;
    width: 500px;
  }
  .train_content_wrap::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  .train_content_wrap::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}
</style>