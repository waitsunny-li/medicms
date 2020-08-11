<template>
  <div class="complaint-query">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <feedback-search @searchBtn="searchBtn"></feedback-search>

        <el-card class="table-content">
          <!-- 表单 -->
          <el-table :data="feedFormData" style="width: 100%" border class="user-table-wrap">
            <el-table-column prop="name" align="center" label="客户姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="mobile" label="联络电话" width="180">
              <template slot-scope="scope">
                <i class="el-icon-phone" style="color: red"></i>
                {{scope.row.mobile}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="time" label="时间" width="180"></el-table-column>
            <el-table-column
              align="center"
              prop="content"
              label="投诉事件"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column align="center" prop="is_solved" label="是否解决" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.is_solved">
                  <i style="color:#67C23A; font-size: 28px" class="el-icon-success"></i>
                </div>
                <div v-else>
                  <i style="color:#F56C6C; font-size: 28px" class="el-icon-circle-close"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="is_dispatch" label="是否分配" width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.is_dispatch">已分配</div>
                <div v-else>未分配</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="rate" width label="客户满意度">
              <template slot-scope="scope">
                <p v-if="scope.row.is_solved">
                  <el-rate
                    :disabled="true"
                    :value="scope.row.rate"
                    :texts="texts"
                    :colors="colors"
                    show-text
                  ></el-rate>
                </p>
                <p v-else>无</p>
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
  </div>
</template>

<script>
import feedbackSearch from "components/common/search/feedbackSearch";
export default {
  name: "ComplainQuery",
  data() {
    return {
      // 这里应该是未分配的投诉
      feedFormData: [
        {
          id: "1",
          name: "小红时",
          mobile: "13955844668",
          time: "2020-05-12",
          is_dispatch: true,
          is_solved: true, // 是否解决
          content: "你们家的阿姨态度恶劣，鸠占鹊巢！",
          rate: 5,
        },
        {
          id: "2",
          name: "小轰鸣",
          mobile: "13955844668",
          time: "2020-08-12",
          is_dispatch: true,
          is_solved: false, // 是否解决
          content: "你们家的阿姨态度恶劣，鸠占鹊巢！",
          rate: 2,
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
      // 评分颜色和辅助文字
      texts: ["极差", "失望", "一般", "满意", "非常满意"],
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 搜索按钮
    searchBtn(searchForm) {
      console.log("投诉查询", searchForm);
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },
  },
  components: {
    feedbackSearch,
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
.queryStaffTable {
  margin-top: 50px;
}
</style>
