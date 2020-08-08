<template>
  <div class="feedback">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <feedback-search></feedback-search>

        <!-- 表单 -->
        <el-card class="table-content">
          <!-- 公共操作 -->
          <el-row>
            <el-col :span="24">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="addFeedbackBtn">新增投诉</el-button>
            </el-col>
          </el-row>
          <!-- 表单 -->
          <el-table :data="feedFormData" style="width: 100%" border class="user-table-wrap">
            <el-table-column prop="name" align="center" label="客户姓名" width="180"></el-table-column>
            <el-table-column align="center" prop="mobile" label="联络电话" width="180">
              <template slot-scope="scope">
                <i class="el-icon-phone" style="color: red"></i>
                {{scope.row.mobile}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="time" label="时间" width="180"></el-table-column>
            <el-table-column align="center" prop="content" label="投诉事件"></el-table-column>
            <el-table-column align="center" prop="is_solved" label="是否解决" width="180">
              <template slot-scope="scope">
                <div v-if="scope.row.is_solved">
                  <i style="color:#67C23A; font-size: 28px" class="el-icon-success"></i>
                </div>
                <div v-else>
                  <i style="color:#F56C6C; font-size: 28px" class="el-icon-circle-close"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="is_dispatch" label="是否分配" width="180">
              <template slot-scope="scope">
                <div v-if="scope.row.is_dispatch">已分配</div>
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
        <el-form-item label="日期" prop="time">
          <el-date-picker
            v-model="form.time"
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
        <el-button size="mini" type="primary" @click="addFeedDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import feedbackSearch from "components/common/search/feedbackSearch";
export default {
  name: "Feedback",
  data() {
    return {
      feedFormData: [
        {
          id: '1',
          name: "小红时",
          mobile: "13955844668",
          time: "2020-05-12",
          is_dispatch: false,
          is_solved: false, // 是否解决
          content: "你们家的阿姨态度恶劣，鸠占鹊巢！",
        },
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
        time: "",
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
  computed: {},
  watch: {},
  methods: {
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 添加投诉
    addFeedbackBtn() {
      // 获取当前时间
      this.addFeedForm.time = new Date()
        .toLocaleString("chinese", { hour12: false })
        .replace(/\//g, "-");
      this.addFeedDialogVisible = true;
    },

    // 添加投诉框的关闭事件
    addFeedDialogClose() {
      this.$refs.form.resetFields();
    },

    // 删除
    deleteSuccess(id) {
      console.log(id)
    }
  },
  components: {
    feedbackSearch,
  },
  created() {
    this.form = this.addFeedForm;
  },
};
</script>

<style lang="less" scoped>
.table-content {
  margin-top: 20px;
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
