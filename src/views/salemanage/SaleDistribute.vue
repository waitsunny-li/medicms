<template>
  <div class="sale-distribute">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <feedback-search @searchBtn="searchBtn"></feedback-search>

        <el-card class="table-content" :style="{height: screenHeight}">
          <!-- 表单 -->
          <el-table :data="feedFormData" style="width: 100%" border class="user-table-wrap" :height="scrollHeight">
            <el-table-column prop="name" align="center" label="客户姓名" width="180"></el-table-column>
            <el-table-column align="center" prop="mobile" label="联络电话" width="180">
              <template slot-scope="scope">
                <i class="el-icon-phone" style="color: red"></i>
                {{scope.row.mobile}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="time" label="时间" width="180"></el-table-column>
            <el-table-column align="center" prop="content" :show-overflow-tooltip="true" label="投诉事件"></el-table-column>
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
    <el-dialog title="分配" :visible.sync="distributeDialogVisible" width="450px" center>
      <div class="content">
        <el-input
          size="mini"
          placeholder="请输入要分配的员工姓名"
          v-model="queryStaffName"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="queryStaffBtn"></el-button>
        </el-input>
        <!-- 返回查询结果 -->
        <el-table
          class="queryStaffTable"
          :data="defalutStaffData"
          style="width: 100%"
          :highlight-current-row="true"
        >
          <el-table-column align="center" prop="number" label="编号" width="90"></el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="90"></el-table-column>
          <el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button @click="distributeSheBtn(scope.row.name)" size="mini">分配给他</el-button>
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
export default {
  name: "SaleDistribute",
  data() {
    return {
      // 这里应该是未分配的投诉
      feedFormData: [
        {
          id: "1",
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

      // 要查询的员工姓名
      queryStaffName: "",
      distributeDialogVisible: false,
      // 默认数据
      defalutStaffData: [
        {
          number: "2332",
          name: "天猫精灵",
          mobile: "13955877889",
        },
      ],
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
    searchBtn(searchForm) {
      console.log("分派", searchForm)
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 分配
    distributeSuccess(id) {
      console.log(id);
      this.distributeDialogVisible = true;
    },

    // 点击搜索按钮事件
    queryStaffBtn() {
      console.log(this.queryStaffName);
    },

    // 分配给他
    distributeSheBtn() {},
  },
  components: {
    feedbackSearch,
    Pagination
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
.queryStaffTable {
  margin-top: 50px;
}
</style>
