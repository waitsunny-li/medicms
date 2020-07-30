<template>
  <div class="assessment">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <search></search>

        <!-- 表单 -->
        <el-card class="table-content">
          <el-table :data="staffList" v-loading="loading" border style="width: 100%" height="550px" class="user-table-wrap">
            <el-table-column prop="name" align="center" label="姓名"></el-table-column>
            <el-table-column align="center" prop="sex" label="性别">
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
                  @click="lookAssessBtn(scope.row.id, scope.row.name)"
                >查看考核</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 查看培训记录 -->
          <el-dialog
            :title="staff_name + '的考核记录'"
            :visible.sync="assessDialogVisible"
            width="70%"
            center
          >
            <!-- 表单内容 -->
            <el-table
              height="500"
              :data="assessData"
              class="looktraining"
              stripe
              style="width: 100%;"
            >
              <el-table-column prop="start_end" align="center" label="日期" width="180"></el-table-column>
              <el-table-column prop="training_program" align="center" label="培训项目" width="180"></el-table-column>
              <el-table-column
                prop="content"
                :show-overflow-tooltip="true"
                align="center"
                label="培训内容"
              ></el-table-column>
              <el-table-column prop="address" align="center" label="地址"></el-table-column>
              <el-table-column prop="address" align="center" label="考核评价"></el-table-column>
              <!-- 操作 -->
              <el-table-column label="操作" fixed="right" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="assessOperation(scope.row.content)"
                  >考核评价</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>

          <!-- 评价操作 -->
          <el-dialog center width="30%" title="评价" :visible.sync="evaluateVisible" append-to-body>
            <!-- 表单 -->
            <el-form ref="evaluateForm" :model="evaluateForm" label-width="80px">
              <el-form-item label="评价内容">
                <el-input type="textarea" v-model="evaluateForm.content"></el-input>
              </el-form-item>
              <el-form-item label="员工状态" prop="person_state" class="person_state">
                <el-select size="mini" v-model="evaluateForm.person_state" placeholder="员工状态">
                  <el-option label="培训" value="1"></el-option>
                  <el-option label="待岗" value="3"></el-option>
                  <el-option label="离职" value="4"></el-option>
                  <el-option label="黑名单" value="5"></el-option>
                  <el-option label="在岗" value="6"></el-option>
                  <el-option label="离职（下单）" value="7"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="evaluateVisible = false" size="mini">取 消</el-button>
              <el-button size="mini" type="primary" @click="evaluateVisible = true">保 存</el-button>
            </div>
          </el-dialog>

          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="per_page"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "components/common/search/Search";
import { requestUserListDate } from "network/detail";
export default {
  name: "Assessment",
  data() {
    return {
      // 加载中
      loading: true,
      staffList: [],
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 评价表单
      evaluateForm: {
        train_id: "",
        content: "",
        person_state: "1",
      },

      // 显示考核内容
      assessDialogVisible: false,
      // 是否显示评价操作
      evaluateVisible: false,
      // 员工名字
      staff_name: "",

      // 显示培训记录
      assessData: [
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: "安徽合肥市",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
      ],
    };
  },
  computed: {},
  components: {
    Search,
  },
  watch: {},
  methods: {
    // 定义请求用户列表数据
    getStaffData() {
      this.loading = true;
      requestUserListDate()
        .then((res) => {
          if (res.code === 200) {
            this.staffList = res.data.data;
            this.currentPage = res.data.current_page;
            this.total = parseInt(res.data.total);
            this.per_page = res.data.per_page;
            // 关闭等待
            this.loading = false;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          return;
        });
    },

    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      console.log(currentpage);
    },

    // 查看培训记录按钮
    lookAssessBtn(id, name) {
      // 先请求数据
      // getTrainingsData(id).thenl(res => {
      //   console.log(res)
      // })
      this.staff_name = name;
      this.assessDialogVisible = true;
    },

    // 考核操作保存
    assessOperation(id) {
      console.log(id);
      this.evaluateVisible = true;
    },
  },
  created() {
    this.getStaffData();
  },
};
</script>

<style lang="less" scoped>
.assessment {
  .table-content {
    margin-top: 20px;
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
      overflow-x: hidden;

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
