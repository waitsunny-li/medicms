<template>
  <div class="feedback">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <feedback-search @searchBtn="searchBtn"></feedback-search>

        <!-- 表单 -->
        <el-card class="table-content" :style="{height: screenHeight}">
          <!-- 公共操作 -->
          <el-row>
            <el-col :span="24">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="addFeedbackBtn">新增投诉</el-button>
            </el-col>
          </el-row>
          <!-- 表单 -->
          <el-table
            :data="feedFormData"
            style="width: 100%"
            border
            class="user-table-wrap"
            :height="scrollHeight"
            v-loading="loading"
          >
            <el-table-column prop="name" align="center" label="客户姓名" width="180"></el-table-column>
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
            <el-table-column align="center" prop="is_status" label="是否解决" width="180">
              <template slot-scope="scope">
                <div v-if="scope.row.is_status">
                  <i style="color:#67C23A; font-size: 28px" class="el-icon-success"></i>
                </div>
                <div v-else>
                  <i style="color:#F56C6C; font-size: 28px" class="el-icon-circle-close"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="is_assign" label="是否分配" width="180">
              <template slot-scope="scope">
                <div v-if="scope.row.is_assign">已分配</div>
                <div v-else>未分配</div>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-popconfirm
                  confirmButtonText="好的"
                  cancelButtonText="不用了"
                  icon="el-icon-info"
                  iconColor="red"
                  title="你确定要删除该投诉吗？"
                  @onConfirm="deleteSuccess(scope.row.id)"
                >
                  <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete"></el-button>
                </el-popconfirm>
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

    <!-- 新增投诉 -->
    <el-dialog
      title="新增投诉"
      :visible.sync="addFeedDialogVisible"
      @close="addFeedDialogClose"
      width="500px"
      center
    >
      <!-- 表单 -->
      <el-form ref="form" :rules="addFeedRules" :model="form" label-width="80px">
        <el-form-item label="日期" prop="complaint_time">
          <el-date-picker
            v-model="form.complaint_time"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            style="width:180px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input style="width: 120px" size="mini" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input style="width: 200px" size="mini" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="投诉内容" prop="content">
          <el-input type="textarea" size="mini" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addFeedDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveComplaintInfo">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import feedbackSearch from "components/common/search/feedbackSearch";
import Pagination from "components/common/pagination/Pagination";
import { saveComplaint, getComplaint, deleteComplaint } from "network/feedbackRequest";
export default {
  name: "Feedback",
  data() {
    return {
      feedFormData: [
      ],

      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 是否加载
      loading: false,
      // 显示新增投诉框
      addFeedDialogVisible: false,
      // 新增投诉
      addFeedForm: {
        name: "",
        mobile: "",
        complaint_time: "",
        content: "",
      },

      form: {},

      /**
       * 添加投诉验证
       */
      addFeedRules: {
        name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4个字符", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度应为11位", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入您要投诉的内容", trigger: "blur" },
        ],
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
    // 获取投诉列表
    getAllComplaints() {
      this.loading = true
      getComplaint().then((res) => {
        let { code, data, msg } = res;
        console.log(data)
        if (code === 200) {
          // 获取客户数据
          this.feedFormData = data.data;
          // 页数赋值
          this.currentPage = data.current_page;
          // 总数据条数
          this.total = data.total;
          // 每页的条
          this.per_page = data.per_page;
          this.loading = false;
        } else {
          this.$message.error(msg);
          this.loading = true
        }
      });
    },
    // 搜索按钮
    searchBtn(searchForm) {
      console.log("客户反馈", searchForm);
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 添加投诉
    addFeedbackBtn() {
      this.form = this.addFeedForm;
      // 获取当前时间
      this.addFeedForm.complaint_time = new Date()
        .toLocaleString("chinese", { hour12: false })
        .replace(/\//g, "-");

      this.addFeedDialogVisible = true;
    },

    // 保存
    saveComplaintInfo() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveComplaint(this.addFeedForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.addFeedDialogVisible = false
              this.getAllComplaints()
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 添加投诉框的关闭事件
    addFeedDialogClose() {
      this.$refs.form.resetFields();
    },

    // 删除
    deleteSuccess(id) {
      console.log(id);
      deleteComplaint(id).then(res => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.getAllComplaints();
        } else {
          this.$message.error(msg);
        }
      })
    },
  },
  components: {
    feedbackSearch,
    Pagination,
  },
  created() {
    this.getAllComplaints()
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
        overflow-x: hidden;

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
</style>
