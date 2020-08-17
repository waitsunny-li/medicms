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
          <span class="content-text">{{orderInfo.family_hometown}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">服务类型</span>
          <span class="content-text">
            <span v-if="orderInfo.service_type == 0">{{orderInfo.service_other}}</span>
            <span v-if="orderInfo.service_type == 1">全日住家型</span>
            <span v-if="orderInfo.service_type == 2">日间照料型</span>
            <span v-if="orderInfo.service_type == 3">计时收费型</span>
          </span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">需要服务</span>
          <span class="content-text">{{orderInfo.service_content}}</span>
        </el-col>
      </el-row>
      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">身份证</span>
          <span class="content-text"></span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">状态</span>
          <span class="content-text">
            <span v-if="orderInfo.state == 0">面试中</span>
            <span v-if="orderInfo.state == 1">进行中</span>
            <span v-if="orderInfo.state == 3">结束</span>
            <span v-if="orderInfo.state == 4">取消</span>
          </span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">合同起止</span>
          <span class="content-text"></span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">首次服务人员</span>
          <span class="content-text"></span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">保险单位</span>
          <span class="content-text"></span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">合同号</span>
          <span class="content-text"></span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">创建日期</span>
          <span class="content-text">{{orderInfo.create_time}}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">现服务人员</span>
          <span class="content-text">听飞扬</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">现在工资</span>
          <span class="content-text"></span>
        </el-col>

        <el-col :span="7">
          <span class="label-text">家政员提成</span>
          <span class="content-text"></span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">签合同时工资</span>
          <span class="content-text">12000 / 月</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">入职来源</span>
          <span class="content-text">
            <span v-for="item in source" :key="item.id">
              <span v-if="orderInfo.source_id == item.id">{{item.name}}</span>
            </span>
          </span>
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
          >{{children}}小孩，{{adult}}成人，{{old}}老人</span>
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
import { getAllSource } from "network/select";
export default {
  name: "OrderInfo",
  data() {
    return {
      source: []
    };
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
  computed: {
    children() {
      return this.orderInfo.family_people ? this.orderInfo.family_people.children : ''
    },
    adult() {
      return this.orderInfo.family_people ? this.orderInfo.family_people.adult : ''
    },
    old() {
      return this.orderInfo.family_people ? this.orderInfo.family_people.old : ''
    },
  },
  created() {
     // 获取需求来源
    getAllSource().then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        this.source = data;
      } else {
        this.$message.error(msg);
      }
    });
  }
};
</script>

<style lang='less' scoped>
/deep/.expand-row {
  border-bottom: 1px solid #f1f1f1;
  padding: 15px 0;
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