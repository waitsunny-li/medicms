<template>
  <div class="sale-distribute">
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
              :show-overflow-tooltip="true"
              label="投诉事件"
            ></el-table-column>
            <el-table-column align="center" prop="status" label="是否解决" width="180">
              <template slot-scope="scope">
                <div v-if="scope.row.status">
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

            <el-table-column align="center" prop="assign_user_id" label="售后服务人员" width="180">
              <template slot-scope="scope">
                <p v-if="scope.row.assign_user_id">
                  {{scope.row.assign_user_id}}
                </p>
                <p v-else>暂无</p> 
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="分配" placement="top">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-thumb"
                    @click="distributeSuccess(scope.row.id)"
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

    <!-- 显示分配给公司员工列表 -->
    <el-dialog title="分配" :visible.sync="distributeDialogVisible" width="550px" center>
      <div class="content">
        <el-input
          size="mini"
          placeholder="请输入要分配的售后人员姓名"
          v-model="queryStaffName"
          class="input-with-select"
          @keyup.native.enter="queryStaffBtn"
        >
          <el-button slot="append" icon="el-icon-search" @click="queryStaffBtn"></el-button>
        </el-input>
        <!-- 返回查询结果 -->
        <el-table
          class="queryStaffTable"
          :data="defalutStaffData"
          style="width: 100%"
          :highlight-current-row="true"
          height="260"
        >
          <el-table-column align="center" prop="id" label="编号" width="90"></el-table-column>
          <el-table-column align="center" prop="create_time" label="录入时间"></el-table-column>
          <el-table-column align="center" prop="username" label="姓名" width="90"></el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button
                @click="distributeSheBtn(scope.row.username, scope.row.id)"
                size="mini"
              >分配给他</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import feedbackSearch from "components/common/search/feedbackSearch";
import Pagination from "components/common/pagination/Pagination";
import { feedMixin } from "common/promixin";
import {
  searchNameSaleStaff,
  distributeSalesStaff,
} from "network/feedbackRequest";
export default {
  name: "SaleDistribute",
  mixins: [feedMixin],
  data() {
    return {
      // 显示新增投诉框
      addFeedDialogVisible: false,
      // 新增投诉
      addFeedForm: {
        name: "",
        mobile: "",
        time: "",
        content: "",
      },
      currentCustomId: "",

      // 要查询的员工姓名
      queryStaffName: "",
      distributeDialogVisible: false,
      // 默认数据
      defalutStaffData: [],
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
      this.searchForm = val;
      this.getAllComplaints(this.searchForm);
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
      this.searchForm.page = currentpage;
      this.getAllComplaints(this.searchForm);
    },

    // 自定义搜索匹配老师数据
    searchSaleStaffInfo(name) {
      searchNameSaleStaff(this.queryStaffName).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          console.log(res);
          this.defalutStaffData = data.slice(0, 10);
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 分配
    distributeSuccess(id) {
      this.currentCustomId = id;
      this.searchSaleStaffInfo();
      this.distributeDialogVisible = true;
    },

    // 点击搜索按钮事件
    queryStaffBtn() {
      console.log(this.queryStaffName);
      this.searchSaleStaffInfo(this.queryStaffName);
    },

    // 分配给他
    distributeSheBtn(name, user_id) {
      this.$confirm("是否要将此客户分配给售后服务人员" + name, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          distributeSalesStaff(this.currentCustomId, user_id).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              // 关闭分配弹框
              this.distributeDialogVisible = false;
              this.getAllComplaints();
            } else {
              this.$message.error(msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
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
