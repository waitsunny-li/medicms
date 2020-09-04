<template>
  <div class="staff-query">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <search @searchbtn="searchBtn"></search>

        <!-- 表单 -->
        <el-card class="user-table-card" :style="{height: screenHeight}">
          <!-- 表格 -->
          <el-table
            :data="userList"
            class="user-table-wrap"
            style="width: 100%"
            :height="scrollHeight"
            v-loading="loading"
            border
          >
            <!-- 展示 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row class="expand-row">
                  <el-col :span="4">
                    <span class="label-text">手机号</span>
                    <span class="content-text">{{scope.row.mobile}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">工资要求</span>
                    <span class="content-text">{{scope.row.salary}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">英语水平</span>
                    <span class="content-text">{{scope.row.english}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">计算机水平</span>
                    <span class="content-text">{{scope.row.computer}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">政治面貌</span>
                    <span class="content-text">{{scope.row.political_status}}</span>
                  </el-col>
                </el-row>

                <el-row class="expand-row">
                  <el-col :span="4">
                    <span class="label-text">生肖</span>
                    <span class="content-text">{{scope.row.zodiac}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">休假要求</span>
                    <span class="content-text">{{scope.row.salary}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">户口地址</span>
                    <span
                      class="content-text"
                    >{{scope.row.census_p_text}}{{scope.row.cnnsus_c_text}}{{scope.row.cnnsus_d_text}}{{scope.row.census_address_desc}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">户口类型</span>
                    <span class="content-text">{{scope.row.census_type}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">入职时间</span>
                    <span class="content-text">{{scope.row.in_time}}</span>
                  </el-col>
                </el-row>

                <el-row class="expand-row">
                  <el-col :span="4">
                    <span class="label-text">学历</span>
                    <span class="content-text">{{scope.row.education}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">现居住地</span>
                    <span
                      class="content-text"
                    >{{scope.row.now_p_text}}{{scope.row.now_c_text}}{{scope.row.now_d_text}}{{scope.row.now_address_desc}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">服务技能</span>
                    <span class="content-text">{{scope.row.service_skills.join('，')}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">家用电器</span>
                    <span class="content-text">{{scope.row.device.join('，')}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">入职来源</span>
                    <span
                      class="content-text"
                    >{{scope.row.recruiters_name}}：{{scope.row.recruiters_mobile}}</span>
                  </el-col>
                </el-row>

                <el-row class="expand-row">
                  <el-col :span="4">
                    <span class="label-text">血型</span>
                    <span class="content-text">{{scope.row.blood}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">健康状况</span>
                    <span class="content-text">{{scope.row.health}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">婚姻状况</span>
                    <span class="content-text">{{scope.row.marital_status}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">员工状态</span>
                    <span class="content-text" v-if="scope.row.person_state == 1">培训</span>
                    <span class="content-text" v-else-if="scope.row.person_state == 2">考核</span>
                    <span class="content-text" v-else-if="scope.row.person_state == 3">待岗</span>
                    <span class="content-text" v-else-if="scope.row.person_state == 4">离职</span>
                    <span class="content-text" v-else-if="scope.row.person_state == 5">黑名单</span>
                    <span class="content-text" v-else-if="scope.row.person_state == 6">在岗</span>
                    <span class="content-text" v-else-if="scope.row.person_state == 7">离职(下单)</span>
                    <span class="content-text" v-else>错误</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">保险</span>
                    <span class="content-text">{{scope.row.agreement_amount}}</span>
                  </el-col>
                </el-row>

                <el-row class="expand-row">
                  <el-col :span="4">
                    <span class="label-text">身高</span>
                    <span class="content-text">{{scope.row.height}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">体重</span>
                    <span class="content-text">{{scope.row.weight}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">籍贯</span>
                    <span class="content-text">{{scope.row.census}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">生日</span>
                    <span class="content-text">{{scope.row.birthday}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">语言能力</span>
                    <span class="content-text">{{scope.row.language.join('，')}}</span>
                  </el-col>
                </el-row>

                <el-row class="expand-row">
                  <el-col :span="4">
                    <span class="label-text">录入人</span>
                    <span class="content-text">{{scope.row.salary}}</span>
                  </el-col>
                  <el-col :span="5">
                    <span class="label-text">家庭紧急联系</span>
                    <span class="content-text">{{scope.row.urgent_name}}：{{scope.row.urgent_mobile}}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="label-text">安置协议</span>
                    <span class="content-text">{{scope.row.agreement_amount}}</span>
                  </el-col>
                  <el-col :span="7">
                    <span class="label-text">自我评价</span>
                    <span class="content-text">{{scope.row.self_evaluation}}</span>
                  </el-col>
                </el-row>

                <el-row class="expand-row">
                  <el-col :span="12" style="display: flex">
                    <span class="label-text">工作经历</span>
                    <div
                      class="content-text"
                      v-for="(item, index) in scope.row.work_experience"
                      :key="index"
                    >
                      <el-col :span="24">{{item.job}}</el-col>
                      <el-col :span="24">{{item.time.join('~')}}</el-col>
                      <el-col :span="24">{{item.address}}</el-col>
                      <el-col :span="24">{{item.content}}</el-col>
                    </div>
                  </el-col>
                  <el-col :span="12" style="display: flex">
                    <span class="label-text">家庭成员</span>
                    <div
                      class="content-text"
                      v-for="(item, index) in scope.row.family_member"
                      :key="index"
                    >
                      <el-col :span="24">{{item.name}}</el-col>
                      <el-col :span="24">{{item.relation}}</el-col>
                      <el-col :span="24">{{item.current_situation}}</el-col>
                    </div>
                  </el-col>
                </el-row>

                <el-row class="expand-row">
                  <el-col :span="12" style="display: flex">
                    <span class="label-text">培训经历</span>
                    <div class="content-text" v-for="(item, index) in scope.row.train" :key="index">
                      <el-col :span="24">{{item.project}}</el-col>
                      <el-col
                        :span="24"
                      >{{timestampToTime(item.start_time)}}~{{timestampToTime(item.end_time)}}</el-col>
                      <el-col :span="24">{{item.address}}</el-col>
                      <el-col :span="24">{{item.content}}</el-col>
                    </div>
                  </el-col>
                  <el-col :span="12" style="display: flex">
                    <span class="label-text">考核评价</span>
                    <div class="content-text" v-for="(item, index) in scope.row.train" :key="index">
                      <el-col :span="24">{{item.project}}</el-col>
                      <el-col
                        :span="24"
                      >{{timestampToTime(item.start_time)}}~{{timestampToTime(item.end_time)}}</el-col>
                      <el-col :span="24">{{item.is_by?'通过':'没有通过'}}</el-col>
                      <el-col :span="24">{{item.assess_content}}</el-col>
                    </div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="sex" label="性别" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.sex == 1">男</span>
                <span v-else-if="scope.row.sex == 2">女</span>
              </template>
            </el-table-column>
            <el-table-column
              class="identify"
              align="center"
              prop="identity"
              label="身份证"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column width="80" align="center" prop="age" label="年龄"></el-table-column>
            <el-table-column align="center" prop="mobile" width="160px" label="手机号">
              <template slot-scope="scope">
                <i class="el-icon-phone" style="color: red"></i>
                {{scope.row.mobile}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="address"
              label="现居住地址"
              min-width="180"
              :show-overflow-tooltip="true"
            >
              <template
                slot-scope="scope"
              >{{scope.row.now_p_text}}{{scope.row.now_c_text}}{{scope.row.now_d_text}}{{scope.row.now_address_desc}}</template>
            </el-table-column>
            <el-table-column width="80" align="center" prop="person_state" label="人员状态">
              <template slot-scope="scope">
                <p v-if="scope.row.person_state == 1">培训</p>
                <p v-else-if="scope.row.person_state == 2">考核</p>
                <p v-else-if="scope.row.person_state == 3">待岗</p>
                <p v-else-if="scope.row.person_state == 4">离职</p>
                <p v-else-if="scope.row.person_state == 5">黑名单</p>
                <p v-else-if="scope.row.person_state == 6">在岗</p>
                <p v-else-if="scope.row.person_state == 7">离职(下单)</p>
                <p v-else>错误</p>
              </template>
            </el-table-column>
            <el-table-column width="180" align="center" prop="in_time" label="入职时间"></el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="140px">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="查看全部订单"
                  :enterable="false"
                  placement="top"
                >
                  <el-button
                    icon="el-icon-s-order"
                    size="mini"
                    type="primary"
                    circle
                    @click="orderDisplayBtn(scope.row.name, scope.row.id)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <pagination
      :currentPage="currentPage"
      :perpage="per_page"
      :total="total"
      @handlecurrentchange="handleCurrentChange"
    />

    <!-- 查看员工的所有订单 -->
    <el-dialog
      :title="staffOrderTitle"
      :visible.sync="staffOrderDialogVisible"
      width="770px"
      center
    >
      <el-tabs>
        <el-tab-pane class="interview" label="已面试的">
          <el-table
            stripe
            :data="interviewFormData"
            style="width: 100%"
            height="400px"
            v-loading="interviewedLoading"
          >
            <el-table-column align="center" label="面试日期" prop="interview_time" width="150px"></el-table-column>
            <el-table-column align="center" label="订单号" prop="customer_id">
              <template slot-scope="scope">
                <el-button
                  @click="showOrderInfo(scope.row.customer_id)"
                  type="text"
                >{{scope.row.customer_id}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="客户名" prop="cust_name"></el-table-column>
            <el-table-column align="center" label="面试内容" prop="content"></el-table-column>
            <el-table-column align="center" label="是否面试完成">
              <template slot-scope="scope">
                <p v-if="scope.row.status == 0">面试中</p>
                <p v-if="scope.row.status == 1">
                  <i
                    class="el-icon-success"
                    style="font-size: 18px; color: #67C23A;vertical-align: middle; margin-right: 5px"
                  ></i>通过
                </p>
                <p v-if="scope.row.status == 2">
                  <i
                    style="font-size: 18px; color: #F56C6C;vertical-align: middle;margin-right: 5px"
                    class="el-icon-error"
                  ></i>不通过
                </p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane label="已服务的">
          <el-table stripe :data="serviceDFormData" style="width: 100%" height="400px">
            <el-table-column align="center" label="时间起止" prop="start_end" width="180"></el-table-column>
            <el-table-column align="center" label="订单号" prop="order_number">
              <template slot-scope="scope">
                <el-button
                  @click="showOrderInfo(scope.row.order_number)"
                  type="text"
                >{{scope.row.order_number}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="客户名" prop="customer_name"></el-table-column>
            <el-table-column align="center" label="合同总周期" prop="service_cycle">
              <template slot-scope="scope">{{scope.row.service_cycle}}天</template>
            </el-table-column>
            <el-table-column align="center" label="状态" prop="state">
              <template slot-scope="scope">
                <p v-if="scope.row.state === '服务完成'">
                  <el-tag effect="dark" type="success">{{scope.row.state}}</el-tag>
                </p>
                <p v-else-if="scope.row.state === '正在服务'">
                  <el-tag effect="dark">{{scope.row.state}}</el-tag>
                </p>
                <p v-else-if="scope.row.state === '服务终止'">
                  <el-tag effect="dark" type="danger">{{scope.row.state}}</el-tag>
                </p>
                <p v-else-if="scope.row.state === '服务换人'">
                  <el-tag effect="dark" type="warning">{{scope.row.state}}</el-tag>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>-->
      </el-tabs>
    </el-dialog>

    <!-- 显示点击的订单详情 -->
    <el-dialog :title="orderInfoTitle" :visible.sync="orderInfoDialogVisible" width="870px" center>
      <order-info :orderInfo="orderInfo" :orderInfoLoading="orderInfoLoading"></order-info>
    </el-dialog>
  </div>
</template>

<script>
import Search from "components/common/search/Search";
import OrderInfo from "components/common/table/OrderInfo";
import Pagination from "components/common/pagination/Pagination";
import eventVue from "common/eventVue";
import {
  requestUserListDate,
  searchAppointStaff,
} from "network/humanageRequest";
import { getInterviewInfo, getOneCustomerInfo } from "network/orderRequest";
export default {
  name: "StaffQuery",
  data() {
    return {
      searchForm: {},
      // 用户列表数据
      userList: [],
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 是否显示等待加载
      loading: true,

      // 显示员工的订单
      staffOrderDialogVisible: false,
      staffOrderTitle: "",

      // 已面试过的
      interviewFormData: [],
      interviewedLoading: false,
      // 已服务过的
      serviceDFormData: [
        {
          id: "1",
          start_end: "2020-01-02~2021-01-01",
          order_number: "AF12548",
          customer_name: "姬大德",
          service_cycle: "360",
          state: "服务完成",
        },
        {
          id: "2",
          start_end: "2020-02-02~2021-02-01",
          order_number: "AF12569",
          customer_name: "姬小德",
          service_cycle: "360",
          state: "正在服务",
        },
        {
          id: "3",
          start_end: "2019-01-02~2020-01-01",
          order_number: "AF14478",
          customer_name: "楚风",
          service_cycle: "360",
          state: "服务终止",
        },
        {
          id: "4",
          start_end: "2020-05-02~2021-05-01",
          order_number: "AF12548",
          customer_name: "哪吒",
          service_cycle: "360",
          state: "服务换人",
        },
      ],

      // 订单详情
      orderInfoLoading: false,
      orderInfoDialogVisible: false,
      orderInfoTitle: "",
      orderInfo: {
        id: "1",
        name: "徐子真",
        family_area: "100.25",
        family_hometown: "安徽安庆",
        family_address: "家庭住址",
        service_type: "1",
        service_other: "其他内容",
        family_people: {
          children: 1,
          old: 2,
          adlut: 3,
        },
        service_content: "",
        demand_age: "20-30",
        demand_sex: 0,
        demand_education: "高中",
        demand_job: ["育婴师", "管家"],
        demand_zodiac: "牛",
        demand_experience: "2-3年",
        demand_census: "不限",
        demand_cooking: "川菜",
        demand_service_skill: [],
        mobile: "13695604265",
        state: "0",
        source: "来源",

        // 订单是否完成
        is_success: true,
      },
    };
  },
  computed: {
    screenHeight() {
      return this.$store.state.screenHeight - 210 + "px";
    },
    scrollHeight() {
      return this.$store.state.screenHeight - 290 + "px";
    },
  },
  watch: {},
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
    // 定义搜索数据函数
    searchAppointData(options) {
      searchAppointStaff(options).then((res) => {
        let { code, data, msg } = res;
        if (res.code === 200) {
          this.userList = data.data;
          this.currentPage = data.current_page;
          this.total = data.total;
          this.per_page = data.per_page;

          // 关闭等待
          this.loading = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 搜索按钮
    searchBtn(val) {
      this.searchForm = val;
      this.searchAppointData(this.searchForm);
    },
    // 定义请求用户列表数据
    getUserData() {
      this.loading = true;
      this.searchAppointData(this.searchForm);
    },

    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      this.searchForm.page = currentpage;
      this.searchAppointData(this.searchForm);
    },

    // 定义获取该员工所有的面试记录
    getAllStaffInterviewInfo(staff_id) {
      this.interviewedLoading = true;
      getInterviewInfo({ staff_id: staff_id }).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          console.log(data ? data : []);
          this.interviewFormData = data ? data : [];
          // 关闭等待
          this.interviewedLoading = false;
        } else {
          this.$message.error(res.msg);
          this.interviewedLoading = true;
        }
      });
    },

    // 显示该员工的所有订单
    orderDisplayBtn(name, id) {
      this.staffOrderTitle = `（${name}）的全部订单`;
      this.staffOrderDialogVisible = true;

      this.getAllStaffInterviewInfo(id);
    },

    // 展示该订单号
    showOrderInfo(customer_id) {
      this.orderInfoLoading = true;
      getOneCustomerInfo(customer_id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          console.log(data);
          this.orderInfo = data;

          this.orderInfoTitle = `（${data.name}）订单的基本信息`;
          this.orderInfoDialogVisible = true;
          this.orderInfoLoading = false;
        } else {
          this.$message.error(msg);
          this.orderInfoLoading = false;
        }
      });
    },
  },
  components: {
    Search,
    OrderInfo,
    Pagination,
  },
  created() {
    this.getUserData();
  },
};
</script>

<style  lang="less" scoped>
.staff-query {
  .user-table-card {
    margin-top: 10px;

    .el-card__body {
      .user-table-wrap {
        margin-top: 20px;

        /deep/.el-table__body-wrapper {
          /deep/.expand-row {
            border-bottom: 1px solid #f1f1f1;
            padding: 10px 0;
          }
        }

        /deep/.el-table__body-wrapper::-webkit-scrollbar {
          width: 3px;
          height: 10px;
        }

        /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 20px;
        }
      }
    }
  }
}
.user-table-card {
  position: relative;
  height: 700px;

  .pagination {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .label-text {
    color: rgb(185, 185, 185);
    font-size: 12px;
    margin-right: 10px;
  }

  .content-text {
    font-size: 12px;
    color: #999999;
  }
}

.user-table-card {
  border-top: 2px solid #75cbf4;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
}
.box-border {
  height: 200px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;

  .title-picture {
    color: #000;
    font-size: 18px;
    height: 30px;

    span {
      margin-left: 20px;
    }
  }

  .upload {
    display: flex;
    height: 150px;
    justify-content: center;
    overflow-y: auto;
  }
}

.interview {
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}
</style>
