<template>
  <div class="assessment">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <search @searchbtn="searchBtn"></search>

        <!-- 表单 -->
        <el-card class="table-content" :style="{height: screenHeight}">
          <el-table
            :data="userList"
            v-loading="loading"
            border
            style="width: 100%"
            :height="scrollHeight"
            class="user-table-wrap"
          >
            <el-table-column prop="id" width="100" align="center" label="编号"></el-table-column>
            <el-table-column prop="name" width="100" align="center" label="姓名"></el-table-column>
            <el-table-column align="center" width="80" prop="sex" label="性别">
              <template slot-scope="scope">
                <span v-if="scope.row.sex == 1">男</span>
                <span v-else-if="scope.row.sex == 2">女</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="mobile" width="160px" label="手机号">
                <template slot-scope="scope">
                  <i class="el-icon-phone" style="color: red"></i>
                  {{scope.row.mobile}}
                </template>
              </el-table-column>
            <el-table-column
              class="identify"
              align="center"
              prop="identity"
              label="身份证"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column align="center" prop="address" label="地址" :show-overflow-tooltip="true">
              <template
                slot-scope="scope"
              >{{scope.row.now_p_text}}{{scope.row.now_c_text}}{{scope.row.now_d_text}}{{scope.row.now_address_desc}}</template>
            </el-table-column>
            <el-table-column prop="in_time" align="center" label="入职日期" width="180"></el-table-column>
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
            <!-- 操作 -->
            <el-table-column label="操作" fixed="right" align="center" width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="lookAssessBtn(scope.row.id, scope.row.name)"
                >查看考核</el-button>
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

    <!-- 查看培训记录 -->
    <el-dialog :title="staff_name + '的考核记录'" :visible.sync="assessDialogVisible" width="70%" center>
      <!-- 表单内容 -->
      <el-table
        height="500"
        :data="assessData"
        class="looktraining"
        stripe
        style="width: 100%;"
        v-loading="showTrainLoading"
      >
        <el-table-column prop="start_end" align="center" label="日期" width="180">
          <template slot-scope="scope">{{scope.row.time.join(' ~ ')}}</template>
        </el-table-column>
        <el-table-column prop="project" align="center" label="培训项目" width="180"></el-table-column>
        <el-table-column prop="content" :show-overflow-tooltip="true" align="center" label="培训内容"></el-table-column>
        <el-table-column prop="address" align="center" label="地址"></el-table-column>
        <el-table-column prop="address" align="center" label="考核评价">
          <template slot-scope="scope">
            <div v-if="scope.row.is_by == 0">未审核</div>
            <div v-else-if="scope.row.is_by == 1">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.assess_content"
                placement="top"
              >
                <i style="color:#67C23A; font-size: 28px" class="el-icon-success"></i>
              </el-tooltip>
            </div>
            <div v-else>
              <i style="color:#F56C6C; font-size: 28px" class="el-icon-circle-close"></i>
            </div>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.is_by == 0">
              <el-button
                type="primary"
                size="mini"
                @click="assessOperation(scope.row.id, scope.row.staff_id)"
                v-has-power="{limitList: [1, 4, 17], role_id: $store.state.userInfo.role_id}"
              >考核评价</el-button>
            </div>
            <div v-else>已审核完成</div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 评价操作 -->
    <el-dialog
      center
      width="30%"
      title="评价"
      :visible.sync="evaluateVisible"
      append-to-body
      @close="evaluateVisibleClose"
    >
      <!-- 表单 -->
      <el-form
        ref="evaluateForm"
        :rules="evaluateFormRules"
        :model="evaluateForm"
        label-width="80px"
      >
        <el-form-item label="是否通过" prop="is_by">
          <el-radio v-model="evaluateForm.is_by" label="1">通过</el-radio>
          <el-radio v-model="evaluateForm.is_by" label="2">未通过</el-radio>
        </el-form-item>
        <el-form-item label="评价内容" prop="assess_content">
          <el-input type="textarea" v-model="evaluateForm.assess_content"></el-input>
        </el-form-item>
        <el-form-item label="员工状态" prop="status" class="person_state">
          <el-select size="mini" v-model="evaluateForm.status" placeholder="员工状态">
            <el-option label="培训" value="1"></el-option>
            <el-option label="待岗" value="3"></el-option>
            <el-option label="离职" value="4"></el-option>
            <el-option label="黑名单" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="evaluateVisible = false" size="mini">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveEvaluate">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from "components/common/search/Search";
import Pagination from "components/common/pagination/Pagination";
import {
  requestUserListDate,
  getTrainingsData,
  saveAssessment,
  searchAppointStaff,
} from "network/humanageRequest";
export default {
  name: "Assessment",
  data() {
    return {
      searchForm: { person_state: 1 },
      // 加载中
      loading: true,
      userList: [],
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 评价表单
      evaluateForm: {
        id: "",
        is_by: "",
        assess_content: "",
        status: "1",
      },
      // 培训记录等待
      showTrainLoading: false,

      // 显示考核内容
      assessDialogVisible: false,
      // 是否显示评价操作
      evaluateVisible: false,
      // 员工名字
      staff_name: "",
      // 当前操作的员工id
      currentStaffId: "",

      // 显示培训记录
      assessData: [],

      /**
       * 以下是验证规则
       */
      evaluateFormRules: {
        assess_content: [
          { required: true, message: "请输入评价内容", trigger: "blur" },
        ],
        is_by: [{ required: true, message: "请输入是否通过", trigger: "blur" }],
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
  components: {
    Search,
    Pagination,
  },
  watch: {},
  methods: {
    // 定义搜索数据函数
    searchAppointData(options) {
      searchAppointStaff(options).then((res) => {
        let { code, data, msg } = res;
        if (res.code === 200) {
          // console.log(res.data);
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

    searchBtn(val) {
      // console.log(val);
      this.searchForm = val;
      this.searchAppointData(this.searchForm);
    },
    // 定义请求用户列表数据
    getStaffData() {
      this.loading = true;
      this.searchAppointData(this.searchForm)
    },

    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      this.searchForm.page = currentpage;
      this.searchAppointData(this.searchForm);
    },

    // 定义一个获取当前用户所有的培训记录
    getAllTrainingsData(staff_id) {
      this.showTrainLoading = true;
      // 先请求数据
      getTrainingsData(staff_id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          // console.log(data);
          this.assessData = data;
          this.showTrainLoading = false;
        } else {
          this.$message.error(msg);
          this.showTrainLoading = false;
        }
      });
    },

    // 查看培训记录按钮
    lookAssessBtn(id, name) {
      this.staff_name = name;
      this.assessDialogVisible = true;
      // 先请求数据
      this.getAllTrainingsData(id);
    },

    // 考核操作评价显示
    assessOperation(id, staff_id) {
      this.evaluateForm.id = id;
      // 赋值当前员工的id
      this.currentStaffId = staff_id;
      this.evaluateVisible = true;
    },

    // 保存评价
    saveEvaluate() {
      this.$refs.evaluateForm.validate((valid) => {
        if (valid) {
          saveAssessment(this.evaluateForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              // 关闭评价框
              this.evaluateVisible = false;
              this.getAllTrainingsData(this.currentStaffId);
              this.getStaffData();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 评价框关闭自动回调
    evaluateVisibleClose() {
      this.$refs.evaluateForm.resetFields();
    },
  },
  created() {
    // 监听查询按钮
    // eventVue.$on("searchbtn", (val) => {});

    this.getStaffData();
  },
  destroyed() {},
};
</script>

<style lang="less" scoped>
.assessment {
  .table-content {
    margin-top: 10px;
    border-top: 2px solid #75cbf4;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    height: 700px;

    .pagination {
      position: absolute;
      bottom: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  .user-table-wrap {
    margin-top: 20px;

    /deep/.el-table__body-wrapper {

      /deep/.expand-row {
        border-bottom: 1px solid #f1f1f1;
        padding: 10px 0;
      }
    }

    /deep/.el-table__body-wrapper::-webkit-scrollbar {
      width: 4px;
      height: 10px;
    }

    /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 20px;
    }
  }
}
</style>
