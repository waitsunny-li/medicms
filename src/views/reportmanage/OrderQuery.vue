<template>
  <div class="order-query">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>

        <!-- 表单 -->
        <el-card class="table-content" :style="{ height: screenHeight }">
          <!-- 表单内容 -->
          <!-- 表单 -->
          <el-table
            :data="customers"
            class="user-table-wrap"
            style="width: 100%"
            :height="scrollHeight"
            v-loading="loading"
            border
          >
            <!-- 展示 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <p class="title-need">
                  <el-button type="text">
                    对家政员的需求
                    <i class="el-icon-bottom"></i>
                  </el-button>
                </p>
                <el-form
                  label-position="center"
                  inline
                  class="demo-table-expand"
                >
                  <el-form-item label="年龄">
                    <span>{{ scope.row.demand_age }}</span>
                  </el-form-item>
                  <el-form-item label="籍贯">
                    <span>{{ scope.row.demand_census }}</span>
                  </el-form-item>

                  <el-form-item label="性别">
                    <span v-if="scope.row.demand_sex == 0">不限</span>
                    <span v-if="scope.row.demand_sex == 1">女</span>
                    <span v-if="scope.row.demand_sex == 2">男</span>
                  </el-form-item>
                  <el-form-item label="岗位要求">
                    <span>{{ scope.row.demand_job.join("，") }}</span>
                  </el-form-item>

                  <el-form-item label="学历">
                    <span>{{ scope.row.demand_education }}</span>
                  </el-form-item>
                  <el-form-item label="服务技能">
                    <span>{{ scope.row.demand_service_skill.join(",") }}</span>
                  </el-form-item>
                  <el-form-item label="厨艺">
                    <span>{{ scope.row.demand_cooking }}</span>
                  </el-form-item>
                  <el-form-item label="家政从业经验">
                    <span>{{ scope.row.demand_experience }}</span>
                  </el-form-item>

                  <el-form-item label="工资待遇">
                    <span>12000 / 26天</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="num" label="编号" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="orderInfoBtn(scope.row.name, scope.row.id)"
                  >{{ scope.row.num }}</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="名字"
              width="100"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="family_hometown"
              min-width="120"
              label="家庭成员籍贯"
            ></el-table-column>
            <el-table-column
              class="identify"
              align="center"
              prop="service_type"
              label="服务类型"
              :show-overflow-tooltip="true"
              width="100"
            >
              <template slot-scope="scope">
                <div v-for="item in service_types" :key="item.id">
                  <p v-if="scope.row.service_type == item.id">
                    {{ item.name }}
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="service_content"
              :show-overflow-tooltip="true"
              label="需要服务"
            ></el-table-column>
            <el-table-column width="180" align="center" label="家庭成员">
              <template slot-scope="scope"
                >{{ scope.row.family_people.children }}小孩，{{
                  scope.row.family_people.adlut
                }}成人，{{ scope.row.family_people.old }}老人</template
              >
            </el-table-column>
            <el-table-column
              align="center"
              prop="mobile"
              width="100px"
              label="手机号"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.mobile"
                  placement="top"
                >
                  <i
                    class="el-icon-phone"
                    style="color: red; font-size: 20px"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="family_address"
              label="现居住地址"
              min-width="180"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="source_id"
              label="来源"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-for="item in source" :key="item.id">
                  <div
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      height: 30px;
                    "
                    v-if="scope.row.source_id == item.id"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="state"
              label="状态"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.state == 0">审核中</p>
                <p v-if="scope.row.state == 1">待进行</p>
                <p v-if="scope.row.state == 2">跟进中</p>
                <p v-if="scope.row.state == 3">已完成</p>
                <p v-if="scope.row.state == 4">已取消</p>
                <p v-if="scope.row.state == 5">暂停中</p>
                <p v-if="scope.row.state == 6">重新恢复</p>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="210px"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  :enterable="false"
                  effect="dark"
                  content="面试记录"
                  placement="top"
                >
                  <el-button
                    @click="interviewDisplayBtn(scope.row.id, scope.row.num)"
                    circle
                    size="mini"
                    icon="el-icon-camera"
                    type="primary"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  :enterable="false"
                  effect="dark"
                  content="查看跟进"
                  placement="top"
                >
                  <el-button
                    @click="lookFollowUp(scope.row.id)"
                    circle
                    size="mini"
                    icon="el-icon-date"
                    type="primary"
                  ></el-button>
                </el-tooltip>

                <el-tooltip
                  class="item"
                  :enterable="false"
                  effect="dark"
                  content="查看保险"
                  placement="top"
                >
                  <el-button
                    @click="lookInsurance(scope.row.id)"
                    circle
                    size="mini"
                    icon="el-icon-document"
                    type="success"
                  ></el-button>
                </el-tooltip>

                <el-tooltip
                  class="item"
                  :enterable="false"
                  effect="dark"
                  content="查看换人记录"
                  placement="top"
                >
                  <el-button
                    @click="lookChangeStaff(scope.row.id, scope.row.name)"
                    circle
                    size="mini"
                    icon="el-icon-tickets"
                    type="warning"
                  ></el-button>
                </el-tooltip>
                <!-- 查看投诉记录 -->
                <el-tooltip
                  class="item"
                  :enterable="false"
                  effect="dark"
                  content="投诉记录"
                  placement="top"
                >
                  <el-button
                    @click="lookComplaints(scope.row.id, scope.row.name)"
                    circle
                    size="mini"
                    icon="el-icon-document-copy"
                    type="primary"
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

    <!-- 面试记录 -->
    <el-dialog
      :title="interviewTitle"
      :visible.sync="interviewDialogVisible"
      width="870px"
      center
    >
      <div class="interview-content">
        <el-table
          stripe
          :data="interviewFormData"
          style="width: 100%"
          height="400px"
          v-loading="interviewedLoading"
        >
          <el-table-column
            prop="interview_time"
            align="center"
            label="面试时间"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="staff.num"
            align="center"
            label="面试人员编号"
            width="120"
          ></el-table-column>
          <el-table-column align="center" label="姓名" width="100">
            <template slot-scope="scope">
              <el-button @click="staffInfoBtn(scope.row.staff)" type="text">{{
                scope.row.staff.name
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号" prop="tel">
            <template slot-scope="scope">{{ scope.row.staff.mobile }}</template>
          </el-table-column>
          <el-table-column
            align="center"
            label="面试内容"
            prop="content"
          ></el-table-column>
          <el-table-column align="center" label="是否面试完成" prop="status">
            <template slot-scope="scope">
              <p v-if="scope.row.status == 0">面试中</p>
              <p v-if="scope.row.status == 1">
                <i
                  class="el-icon-success"
                  style="
                    font-size: 18px;
                    color: #67c23a;
                    vertical-align: middle;
                    margin-right: 5px;
                  "
                ></i
                >通过
              </p>
              <p v-if="scope.row.status == 2">
                <i
                  style="
                    font-size: 18px;
                    color: #f56c6c;
                    vertical-align: middle;
                    margin-right: 5px;
                  "
                  class="el-icon-error"
                ></i
                >不通过
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 查看跟进记录 -->
    <el-dialog
      :title="followUpTitle"
      :visible.sync="followUpDialogVisible"
      width="800px"
      center
    >
      <div class="followup-content">
        <el-table
          :data="followUpFormData"
          stripe
          style="width: 100%"
          height="400px"
          v-loading="followupLoading"
        >
          <el-table-column
            prop="start_time"
            align="center"
            label="日期"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="total_time"
            align="center"
            label="时长"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="recommend"
            align="center"
            label="当前服务人员"
            width="110"
          >
            <template slot-scope="scope">
              <el-button @click="staffInfoBtn(scope.row.staff)" type="text">{{
                scope.row.staff.name
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            align="center"
            :show-overflow-tooltip="true"
            label="跟单记录情况"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 员工详情记录 -->
    <el-dialog
      :title="staffInfoTitle"
      :visible.sync="staffInfoDialogVisible"
      width="870px"
      center
      append-to-body
    >
      <staff-info
        :staffInfo="staffInfo"
        :staffInfoLoading="staffInfoLoading"
      ></staff-info>
    </el-dialog>

    <!-- 订单详情 -->
    <el-dialog
      :title="orderInfoTitle"
      :visible.sync="orderInfoDialogVisible"
      width="950px"
      center
      append-to-body
    >
      <order-info
        :orderInfo="orderInfo"
        :orderInfoLoading="orderInfoLoading"
      ></order-info>
    </el-dialog>

    <!-- 查看当前保险 -->
    <el-dialog
      title="该订单全部保险记录"
      :visible.sync="lookInsuranceDialogVisible"
      width="600px"
      center
    >
      <el-table :data="insuracneFormData" height="350px" style="width: 100%">
        <el-table-column
          align="center"
          prop="safety_no"
          label="保险单号"
        ></el-table-column>
        <el-table-column
          width="180"
          align="center"
          prop="time"
          label="起止时间"
        >
          <template slot-scope="scope">{{
            scope.row.time.join(" ~ ")
          }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="content"
          label="保险内容"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 查看换人记录 -->
    <el-dialog
      :title="changeTitle"
      :visible.sync="lookChangeDialogVisible"
      width="600px"
      center
    >
      <el-table :data="changeStaffData" height="350px" style="width: 100%">
        <el-table-column
          align="center"
          prop="create_time"
          label="时间"
          width="160"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="staff.id"
          label="员工编号"
        ></el-table-column>
        <el-table-column align="center" label="姓名">
          <template slot-scope="scope">{{
            scope.row.staff ? scope.row.staff.name : "无"
          }}</template>
        </el-table-column>
        <el-table-column align="center" label="员工状态">
          <template slot-scope="scope">
            <!-- {{scope.row.staff}} -->
            <div v-if="scope.row.staff">
              <span
                class="content-text"
                v-if="scope.row.staff.person_state == 1"
                >培训</span
              >
              <span
                class="content-text"
                v-else-if="scope.row.staff.person_state == 2"
                >考核</span
              >
              <span
                class="content-text"
                v-else-if="scope.row.staff.person_state == 3"
                >待岗</span
              >
              <span
                class="content-text"
                v-else-if="scope.row.staff.person_state == 4"
                >离职</span
              >
              <span
                class="content-text"
                v-else-if="scope.row.staff.person_state == 5"
                >黑名单</span
              >
              <span
                class="content-text"
                v-else-if="scope.row.staff.person_state == 6"
                >在岗</span
              >
              <span
                class="content-text"
                v-else-if="scope.row.staff.person_state == 7"
                >离职(下单)</span
              >
            </div>
            <div v-else></div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="content" label="换人原因">
          <template slot-scope="scope">
            <div v-if="scope.row.content == ''">首位服务人员</div>
            <div v-else>{{ scope.row.content }}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 投诉记录 -->
    <el-dialog
      :title="complaintTitle"
      :visible.sync="complaintDialogVisible"
      width="870px"
      center
    >
      <div class="interview-content">
        <el-table
          :data="feedFormData"
          style="width: 100%"
          border
          class="user-table-wrap"
          :height="scrollHeight"
          v-loading="complaintLoading"
        >
          <el-table-column
            prop="name"
            align="center"
            label="客户姓名"
            width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="mobile"
            label="联络电话"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-phone" style="color: red"></i>
              {{ scope.row.mobile }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="complaint_time"
            label="时间"
            width="180"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="content"
            label="投诉事件"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="status"
            label="是否解决"
            width="100"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.status">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.evaluation"
                  placement="top"
                >
                  <i
                    style="color: #67c23a; font-size: 28px"
                    class="el-icon-success"
                  ></i>
                </el-tooltip>
              </div>
              <div v-else>
                <i
                  style="color: #f56c6c; font-size: 28px"
                  class="el-icon-circle-close"
                ></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="is_assign"
            label="是否分配"
            width="100"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.is_assign">已分配</div>
              <div v-else>未分配</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="star" width label="客户满意度">
            <template slot-scope="scope">
              <p v-if="scope.row.status">
                <el-rate
                  :disabled="true"
                  :value="scope.row.star"
                  :texts="texts"
                  :colors="colors"
                  show-text
                ></el-rate>
              </p>
              <p v-else>处理中</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomerSearch from "components/common/search/CustomerSearch";
import StaffInfo from "components/common/table/StaffInfo";
import Pagination from "components/common/pagination/Pagination";
import OrderInfo from "components/common/table/OrderInfo";
import { getComplaint } from "network/feedbackRequest";
import {
  getInterviewInfo,
  getOneCustomerInfo,
  searchCustomerInfo,
  getFollowUpInfo,
  lookOrderInsurance,
  lookChageStaffInfo,
} from "network/orderRequest";
import { getAllSource, getJob } from "network/select";
export default {
  name: "OrderQuery",
  data() {
    return {
      // 换人记录
      changeTitle: "",
      changeStaffData: [],
      lookChangeDialogVisible: false,
      // 保险
      insuracneFormData: [],
      lookInsuranceDialogVisible: false,

      searchForm: {},
      customers: [],
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 是否加载
      loading: false,
      source: [],

      // 订单的面试记录显示
      interviewDialogVisible: false,
      interviewedLoading: false,
      interviewTitle: "",
      interviewFormData: [],

      // 投诉记录
      complaintDialogVisible: true,
      complaintLoading: false,
      complaintTitle: "",
      feedFormData: [],
      // 评分颜色和辅助文字
      texts: ["极差", "失望", "一般", "满意", "非常满意"],
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],

      // 员工信息显示
      staffInfoDialogVisible: false,
      staffInfoLoading: false,
      staffInfoTitle: "",
      staffInfo: {},

      // 订单的基本详情
      orderInfoDialogVisible: false,
      orderInfoTitle: "",
      orderInfoLoading: false,
      orderInfo: {},

      // 跟进查看
      followUpDialogVisible: false,
      followupLoading: false,
      followUpTitle: "",
      followUpFormData: [],

      service_types: [],
    };
  },

  created() {
    this.getAllCustomerInfo();

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
  methods: {
    // 查看投诉记录
    lookComplaints(lookComplaints, name) {
      this.complaintTitle = `${name}的投诉记录`;
      this.complaintLoading = true
      getComplaint(option).then((res) => {
        let { code, data, msg } = res;
        console.log(data);
        if (code === 200) {
          // 获取客户数据
          this.feedFormData = data.data;
          console.log(this.feedFormData);
          this.complaintLoading = false;
        } else {
          this.$message.error(msg);
          this.complaintLoading = false;
        }
      });
    },
    // 查看换人记录
    lookChangeStaff(order_id, name) {
      this.changeTitle = `${name}的换人记录`;
      lookChageStaffInfo(order_id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.changeStaffData = data.data;
          this.lookChangeDialogVisible = true;
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 查看订单保险列表
    getOrderInsurance(order_id) {
      lookOrderInsurance(order_id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.insuracneFormData = data;
          this.lookInsuranceDialogVisible = true;
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 查看保险
    lookInsurance(order_id) {
      this.getOrderInsurance(order_id);
    },
    // 定义搜索获取信息
    getSearchInfoData(options) {
      searchCustomerInfo(options).then((res) => {
        if (res.code === 200) {
          // 获取客户数据
          this.customers = res.data.data;
          // 页数赋值
          this.currentPage = res.data.current_page;
          // 总数据条数
          this.total = res.data.total;
          // 每页的条
          this.per_page = res.data.per_page;
          this.loading = false;
        } else {
          this.$message.error(res.msg);
          this.loading = false;
        }
      });
    },
    // 定义获取客户需求信息
    getAllCustomerInfo() {
      this.loading = true;
      this.getSearchInfoData(this.searchForm);
    },

    // 定义获取该订单所有的面试记录
    getAllStaffInterviewInfo(customer_id) {
      this.interviewedLoading = true;
      getInterviewInfo({ customer_id: customer_id }).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.interviewFormData = data ? data : [];
          // 关闭等待
          this.interviewedLoading = false;
        } else {
          this.$message.error(res.msg);
          this.interviewedLoading = true;
        }
      });
    },

    // 定义获取所有跟进记录的函数
    getAllFollowUpInfo(customer_id) {
      this.followupLoading = true;
      getFollowUpInfo({ customer_id: customer_id }).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.followUpFormData = data;
          this.followupLoading = false;
        } else {
          this.$message.error(msg);
          this.followupLoading = false;
        }
      });
    },

    // 搜索按钮点击
    searchBtn(val) {
      this.searchForm = val;
      this.getSearchInfoData(this.searchForm);
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      this.searchForm.page = currentpage;
      this.getSearchInfoData(this.searchForm);
    },

    // 面试记录按钮事件
    interviewDisplayBtn(id, num) {
      this.getAllStaffInterviewInfo(id);
      this.interviewTitle = `编号（${num}）的面试记录`;
      this.interviewDialogVisible = true;
    },

    // 查看单人的信息
    staffInfoBtn(staffInfo) {
      this.staffInfo = staffInfo;
      this.staffInfoTitle = `家政员（${staffInfo.name}）的基本信息`;
      this.staffInfoDialogVisible = true;
    },
    // 查看订单详情
    orderInfoBtn(name, id) {
      this.orderInfoLoading = true;

      // 发送请求
      getOneCustomerInfo(id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.orderInfo = data;

          this.orderInfoTitle = `（${name}）订单的基本信息`;
          this.orderInfoDialogVisible = true;
          this.orderInfoLoading = false;
        } else {
          this.$message.error(msg);
          this.orderInfoLoading = false;
        }
      });
    },

    // 查看跟进
    lookFollowUp(id) {
      this.getAllFollowUpInfo(id);
      this.followUpTitle = `订单号（${id}）的跟进情况`;
      this.followUpDialogVisible = true;
    },
  },
  computed: {
    screenHeight() {
      return this.$store.state.screenHeight - 210 + "px";
    },
    scrollHeight() {
      return this.$store.state.screenHeight - 250 + "px";
    },
  },
  components: {
    CustomerSearch,
    StaffInfo,
    OrderInfo,
    Pagination,
  },
};
</script>

<style lang="less" scoped>
.table-content {
  margin-top: 10px;
  border-top: 2px solid #75cbf4;
  box-shadow: 0 0 3px 0 rgba(3, 3, 3, 0.1);
  position: relative;
  height: 700px;

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
        width: 5px;
        height: 10px;
      }

      /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 20px;
      }

      .title-need {
        padding: 10px 0;
      }

      .demo-table-expand {
        font-size: 0;
      }
      /deep/.demo-table-expand label {
        width: 100px;
        color: #99a9bf;
      }
      .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }

  .pagination {
    position: absolute;
    bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

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

.option-wrap {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}

.name-wrap {
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    width: 3px;
    height: 10px;
  }
}

.interview-content {
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}

.followup-content {
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
