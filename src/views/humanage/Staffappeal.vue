<template>
  <div class="staff-appeal">
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
            <el-table-column prop="num" width="100" align="center" label="编号"></el-table-column>
            <el-table-column prop="name" width="100" align="center" label="姓名"></el-table-column>
            <el-table-column align="center" width="80" prop="sex" label="性别">
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
                  @click="lookAppealBtn(scope.row.id, scope.row.name)"
                >查看申诉</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  @click="addAppealBtn(scope.row.id)"
                ></el-button>
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

    <!-- 添加操作 -->
    <el-dialog title="添加申诉内容" :visible.sync="addDialogVisible" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="申诉内容">
          <el-input v-model="form.content" type="textarea" style="height
          100px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveAppealInfo">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 查看培训记录 -->
    <el-dialog
      :title="staff_name + '的申诉记录'"
      :visible.sync="assessDialogVisible"
      width="800px"
      center
    >
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
          <template slot-scope="scope">{{scope.row.create_time}}</template>
        </el-table-column>
        <el-table-column prop="content" :show-overflow-tooltip="true" align="center" label="事件内容"></el-table-column>
        <el-table-column align="center" label="状态" width="180">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 0">
              <el-tag size="mini" type="info" effect="dark">未审核</el-tag>
            </p>
            <p v-if="scope.row.status == 1">
              <i style="color:#67C23A; font-size: 22px; margin-right: 5px" class="el-icon-success"></i>通过
            </p>
            <p v-if="scope.row.status == 2">
              <i
                style="color:#F56C6C; font-size: 22px;margin-right: 5px"
                class="el-icon-circle-close"
              ></i>拒绝
            </p>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <div v-if="1">
              <el-button type="primary" size="mini" @click="appealOperation(scope.row.id)">审核</el-button>
            </div>
            <div v-else>已审核完成</div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 审核操作 -->
    <el-dialog
      center
      width="30%"
      title="审核"
      :visible.sync="changeAppealVisible"
      append-to-body
      @close="evaluateVisibleClose"
    >
      <!-- 表单 -->
      <el-form ref="appealChangeForm" :model="appealChangeForm" label-width="80px">
        <el-form-item label="是否通过" prop="status">
          <el-radio v-model="appealChangeForm.status" label="1">通过</el-radio>
          <el-radio v-model="appealChangeForm.status" label="2">未通过</el-radio>
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
  searchAppointStaff,
  getEventInfo,
  getAppeal,
  saveAppeal,
  changeAppeal,
} from "network/humanageRequest";
export default {
  name: "Staffappeal",
  data() {
    return {
      searchForm: { person_state: 5 },
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
      // 培训记录等待
      showTrainLoading: false,
      // 查看
      assessDialogVisible: false,

      // 显示修改状态内容
      changeAppealVisible: false,
      // 是否显示评价操作
      evaluateVisible: false,
      // 员工名字
      staff_name: "",
      currentStaffId: "",

      // 添加申诉
      addDialogVisible: false,
      addAppealForm: {
        staff_id: "",
        content: "",
      },
      form: {},

      // 显示培训记录
      assessData: [],
      appealChangeForm: {
        id: "",
        status: "",
      },
    };
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

    // 定义一个获取当前用户所有的事件记录
    getAllAppealData(staff_id) {
      this.showTrainLoading = true;
      // 先请求数据
      getAppeal(staff_id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.assessData = data;
          this.showTrainLoading = false;
        } else {
          this.$message.error(msg);
          this.showTrainLoading = false;
        }
      });
    },

    // 添加申诉
    addAppealBtn(staff_id) {
      this.addDialogVisible = true;
      this.form = this.addAppealForm;
      this.form.staff_id = staff_id;
    },

    // 查看申诉记录按钮
    lookAppealBtn(id, name) {
      this.staff_name = name;
      this.assessDialogVisible = true;
      this.currentStaffId = id;
      // 先请求数据
      this.getAllAppealData(id);
    },

    // 保存申诉
    saveAppealInfo() {
      if (this.addAppealForm.content.trim() == "") {
        this.$message.error("请输入申述内容！");
      } else {
        saveAppeal(this.addAppealForm).then((res) => {
          let { code, msg } = res;
          if (code === 200) {
            this.$message.success(msg);
            this.addDialogVisible = false;
          } else {
            this.$message.error(msg);
          }
        });
      }
    },

    // 修改申诉状态操作评价显示
    appealOperation(id) {
      this.appealChangeForm.id = id;
      this.changeAppealVisible = true;
    },

    // 保存改变后的状态
    saveEvaluate() {
      if (this.appealChangeForm.status != "") {
        changeAppeal(this.appealChangeForm).then((res) => {
          let { code, msg } = res;
          if (code === 200) {
            this.$message.success(msg);
            // 关闭评价框
            this.changeAppealVisible = false;
            this.getAllAppealData(this.currentStaffId);
            this.getStaffData();
          } else {
            this.$message.error(msg);
          }
        });
      } else {
        this.$message.error("请输入状态！");
      }
    },
    // 评价框关闭自动回调
    evaluateVisibleClose() {
      this.appealChangeForm.status = "";
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
</style>
