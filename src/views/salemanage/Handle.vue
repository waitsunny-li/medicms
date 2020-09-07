<template>
  <div class="handle">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <feedback-search @searchBtn="searchBtn"></feedback-search>

        <el-card class="table-content" :style="{height: screenHeight}">
          <!-- 表单 -->
          <el-table
            :data="feedFormData"
            style="width: 100%"
            border
            class="user-table-wrap"
            :height="scrollHeight"
          >
            <el-table-column prop="name" align="center" label="客户姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="mobile" label="联络电话" width="180">
              <template slot-scope="scope">
                <i class="el-icon-phone" style="color: red"></i>
                {{scope.row.mobile}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="complaint_time" label="时间" width="180"></el-table-column>
            <el-table-column
              align="center"
              prop="content"
              label="投诉事件"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column align="center" prop="status" label="是否解决" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.status">
                  <i style="color:#67C23A; font-size: 28px" class="el-icon-success"></i>
                </div>
                <div v-else>
                  <i style="color:#F56C6C; font-size: 28px" class="el-icon-circle-close"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="is_assign" label="是否分配" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.is_assign">已分配</div>
                <div v-else>未分配</div>
              </template>
            </el-table-column>
            
            <el-table-column align="center" prop="assign_user_id" label="售后服务人员" width="180">
              <template slot-scope="scope">
                <p v-if="scope.row.assign_user_id">
                  {{scope.row.assign_user_id}}
                </p>
                <p v-else>暂无</p> 
              </template>
            </el-table-column>

            <el-table-column align="center" prop="result" label="处理结果">
              <template slot-scope="scope">
                <p v-if="scope.row.result">
                  {{scope.row.result}}
                </p>
                <p v-else>
                  暂无结果
                </p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="rate" width="160" label="客户满意度">
              <template slot-scope="scope">
                <p v-if="scope.row.status">
                  <el-rate
                    :disabled="true"
                    :value="scope.row.star"
                    :texts="texts"
                    :colors="colors"
                  ></el-rate>
                </p>
                <p v-else>暂无评价</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="80px">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.star == 0"
                  @click="rateBtn(scope.row.id, scope.row.result)"
                  type="success"
                  size="mini"
                  v-has-power="{limitList: [1, 4], role_id: $store.state.userInfo.role_id}"
                >评价</el-button>
                <el-button
                  v-has-power="{limitList: [8,], role_id: $store.state.userInfo.role_id}"
                  @click="handleRsultBtn(scope.row.id)"
                  type="primary"
                  size="mini"
                  v-if="!scope.row.result" 
                >处理</el-button>
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

    <!-- 显示评价框 -->
    <el-dialog title="评价" :visible.sync="rateDialogVisible" width="450px" center @close="rateClose">
      <el-form ref="rateForm" :rules="rateFormRules" :model="rateForm" label-width="80px">
        <el-form-item label="评分" prop="star">
          <el-rate
            v-model="rateForm.star"
            :colors="colors"
            :texts="texts"
            show-text
            style="margin-top: 10px"
          ></el-rate>
        </el-form-item>
        <el-form-item label="评价内容" prop="evaluation">
          <el-input v-model="rateForm.evaluation" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="rateDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveRateBtn">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 显示处理框 -->
    <el-dialog
      title="处理结果上报"
      :visible.sync="resultDialogVisible"
      width="450px"
      center
      @close="resultClose"
    >
      <el-form
        ref="handleResultForm"
        :rules="handleResultFormRules"
        :model="handleResultForm"
        label-width="80px"
      >
        <el-form-item label="处理结果" prop="result">
          <el-input v-model="handleResultForm.result" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="resultDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveHandleResultBtn">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import feedbackSearch from "components/common/search/feedbackSearch";
import Pagination from "components/common/pagination/Pagination";
import { feedMixin } from "common/promixin";
import { handleComplaint, handleResult } from "network/feedbackRequest";
export default {
  name: "Handle",
  mixins: [feedMixin],
  data() {
    return {
      // 评分颜色和辅助文字
      texts: ["极差", "失望", "一般", "满意", "非常满意"],
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],

      // 显示评价框内容
      rateDialogVisible: false,
      rateForm: {
        complaint_id: "",
        evaluation: "",
        star: null,
      },
      // 规则
      rateFormRules: {
        evaluation: [
          { required: true, message: "请输入评价内容", trigger: "blur" },
        ],
        start: [{ required: true, message: "请输入满意度", trigger: "blur" }],
      },

      handleResultFormRules: {
        rsult: [{ required: true, message: "请输入处理结果", trigger: "blur" }],
      },

      handleResultForm: {
        complaint_id: "",
        result: "",
      },
      resultDialogVisible: false,
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
    // 搜索按钮
    searchBtn(val) {
      this.searchForm = val
      this.getAllComplaints(this.searchForm)
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
      this.searchForm.page = currentpage
      this.getAllComplaints(this.searchForm)
    },
    // 评价按钮
    rateBtn(id, result) {
      if(result) {
        this.rateDialogVisible = true;
        this.rateForm.complaint_id = id;
      }else {
        this.$message.error('该投诉还没有处理！请先处理！')
      }
    },
    // 保存处理结果
    saveHandleResultBtn() {
      this.$refs.handleResultForm.validate((valid) => {
        if (valid) {
          console.log(this.handleResultForm);
          handleResult(this.handleResultForm).then((res) => {
            let { code, msg } = res;
            console.log(res);
            if (code === 200) {
              this.$message.success(msg);
              this.resultDialogVisible = false;
              this.getAllComplaints();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    resultClose() {
      this.$refs.handleResultForm.resetFields();
    },
    // 处理
    handleRsultBtn(id) {
      this.resultDialogVisible = true;
      this.handleResultForm.complaint_id = id;
    },
    // 评价框关闭事件
    rateClose() {
      this.$refs.rateForm.resetFields();
    },
    // 保存按钮
    saveRateBtn() {
      console.log(this.rateForm);
      this.$refs.rateForm.validate((valid) => {
        if (valid) {
          handleComplaint(this.rateForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.rateDialogVisible = false;
              this.getAllComplaints();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {},
  components: {
    feedbackSearch,
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
.queryStaffTable {
  margin-top: 50px;
}
</style>
