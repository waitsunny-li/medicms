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
            <span v-for="item in service_types" :key="item.id">
              <p v-if="orderInfo.service_type == item.id">{{item.name}}</p>
            </span>
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
          <span class="content-text">{{orderInfo.identity}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">状态</span>
          <span class="content-text">
            <p v-if="orderInfo.state == 0">审核中</p>
            <p v-if="orderInfo.state == 1">待进行</p>
            <p v-if="orderInfo.state == 2">订单进行中</p>
            <p v-if="orderInfo.state == 3">已完成</p>
            <p v-if="orderInfo.state == 4">已取消</p>
            <p v-if="orderInfo.state == 5">暂停中</p>
            <p v-if="orderInfo.state == 6">重新恢复</p>
          </span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">合同起止</span>
          <span class="content-text" v-if="islen">暂无</span>
          <span
            class="content-text"
            v-else
          >{{timestampToTime(orderInfo.contract[0].start_time)}} ~ {{timestampToTime(orderInfo.contract[0].end_time)}}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">录入人</span>
          <span class="content-text">{{orderInfo.add_user_name}}</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">保险单位</span>
          <span class="content-text" v-if="islen">暂无</span>
          <span class="content-text" v-else>{{orderInfo.contract[0].is_insurance == 1 ? '有':'无'}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">合同号</span>
          <span class="content-text" v-if="islen">暂无</span>
          <span
            class="content-text"
            v-else
          >{{orderInfo.contract[0].num?orderInfo.contract[0].num: ''}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">创建日期</span>
          <span class="content-text">{{orderInfo.create_time}}</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">现服务人员</span>
          <span class="content-text">{{orderInfo.staff_name}}</span>
        </el-col>
      </el-row>

      <el-row class="expand-row">
        <el-col :span="5">
          <span class="label-text">现在工资</span>
          <span class="content-text" v-if="islen">暂无</span>
          <span
            class="content-text"
            v-else
          >{{orderInfo.contract[0].now_salary?orderInfo.contract[0].now_salary: ''}}</span>
        </el-col>

        <el-col :span="7">
          <span class="label-text">家政员提成</span>
          <span class="content-text" v-if="islen">暂无</span>
          <span
            class="content-text"
            v-else
          >{{orderInfo.contract[0].commission?orderInfo.contract[0].commission: ''}}</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">签合同时工资</span>
          <span class="content-text" v-if="islen">暂无</span>
          <span
            class="content-text"
            v-else
          >{{orderInfo.contract[0].sign_salary?orderInfo.contract[0].sign_salary: ''}}</span>
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
          <span class="content-text">{{children}}小孩，{{adult}}成人，{{old}}老人</span>
        </el-col>
        <el-col :span="5">
          <span class="label-text">合同费用</span>
          <span class="content-text" v-if="islen">暂无</span>
          <span
            class="content-text"
            v-else
          >{{orderInfo.contract[0].sign_salary?orderInfo.contract[0].sign_salary: ''}}</span>
        </el-col>
      </el-row>
      <el-row class="expand-row">
        <el-col :span="7">
          <span class="label-text">第二联系人</span>
          <span class="content-text">宋小宝：13955866888</span>
        </el-col>
        <el-col :span="7">
          <span class="label-text">家庭情况备注</span>
          <span class="content-text"></span>
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
import { getAllSource, getJob } from "network/select";
export default {
  name: "OrderInfo",
  data() {
    return {
      source: [],
      service_types: [],
      orderIn: {},
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
  computed: {
    children() {
      return this.orderInfo.family_people
        ? this.orderInfo.family_people.children
        : "";
    },
    adult() {
      return this.orderInfo.family_people
        ? this.orderInfo.family_people.adult
        : "";
    },
    old() {
      return this.orderInfo.family_people
        ? this.orderInfo.family_people.old
        : "";
    },
    islen() {
      console.log(this.orderInfo.contract.length);
      if (this.orderInfo.contract.length === 0) return true;
      return false;
    },
  },
  mounted() {
    console.log(this.orderInfo)
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

    // 服务类型
    getJob().then((res) => {
      if (res.code === 200) {
        this.service_types = res.data;
      } else {
        this.$message.waraing("获取岗位失败！");
      }
    });
  },
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