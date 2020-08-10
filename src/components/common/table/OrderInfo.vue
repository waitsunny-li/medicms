<template>
  <div class="order-info">
    <div class="staff-content" v-loading="orderInfoLoading">
      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">客户姓名</span>
          <span class="content-text">{{orderInfo.name}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">家庭成员籍贯</span>
          <span class="content-text">{{orderInfo.health}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">服务类型</span>
          <span class="content-text">{{orderInfo.marital_status}}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">需要服务</span>
          <span class="content-text">{{orderInfo.person_state}}</span>
        </el-col>
      </el-row>
      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">身份证</span>
          <span class="content-text">{{orderInfo.mobile}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">状态</span>
          <span class="content-text">{{orderInfo.salary}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">合同起止</span>
          <span class="content-text">2020-02-12~2020-03-15</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">首次服务人员</span>
          <span class="content-text">董魅力</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">保险单位</span>
          <span class="content-text">12000 / 26天</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">合同号</span>
          <span class="content-text">1125684</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">创建日期</span>
          <span class="content-text">2020-01-02</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">现服务人员</span>
          <span class="content-text">听飞扬</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">现在工资</span>
          <span class="content-text">13000 / 月</span>
        </el-col>

        <el-col :span="7">
          <span class="label-text">家政员提成</span>
          <span class="content-text">{{orderInfo.now_p_text}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">签合同时工资</span>
          <span class="content-text">12000 / 月</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">入职来源</span>
          <span class="content-text">{{orderInfo.source}}</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">手机号</span>
          <span class="content-text">{{orderInfo.mobile}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">现居地</span>
          <span class="content-text">{{orderInfo.family_address}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">家庭成员</span>
          <span
            class="content-text"
          >{{orderInfo.family_people.children}}小孩，{{orderInfo.family_people.adlut}}成人，{{orderInfo.family_people.old}}老人</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">合同费用</span>
          <span class="content-text">300元</span>
        </el-col>
      </el-row>
      <el-row class="expand-row">
        <el-col :span="7">
          <span class="label-text">第二联系人</span>
          <span class="content-text">宋小宝：13955866888</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">家庭情况备注</span>
          <span class="content-text">先生小姐很有钱，就是有点皮</span>
        </el-col>
        <el-col :span="7" :offset="2">
          <span class="label-text">服务内容</span>
          <span class="content-text">{{orderInfo.service_content}}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderInfo",
  data() {
    return {};
  },
  props: {
    orderInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    orderInfoLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.expand-row {
  border-bottom: 1px solid #f1f1f1;
  padding: 10px 0;

  .label-text {
    color: #585656;
    font-size: 13px;
    margin-right: 10px;
  }

  .content-text {
    font-size: 13px;
    color: #999999;
  }
}
</style>