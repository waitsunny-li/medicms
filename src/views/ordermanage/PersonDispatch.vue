<template>
  <div class="person-dispatch">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>

        <!-- 表单 -->
        <el-card class="table-content">
          <!-- 表单 -->
          <el-table :data="customerListData" style="width: 100%" border class="user-table-wrap">
            <el-table-column prop="name" align="center" label="客户姓名" width="180"></el-table-column>
            <el-table-column align="center" prop="mobile" label="联络电话" width="180">
              <template slot-scope="scope">
                <i class="el-icon-phone" style="color: red"></i>
                {{scope.row.mobile}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="family_address" label="地址" width="180"></el-table-column>
            <el-table-column align="center" prop="service_type" label="服务类型" width="180">
              <template slot-scope="scope">
                <p v-if="scope.row.service_type == 1">长期</p>
                <p v-if="scope.row.service_type == 2">短期</p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="family_people" label="家庭成员">
              <template
                slot-scope="scope"
              >{{scope.row.family_people.children}}小孩，{{scope.row.family_people.adlut}}成人，{{scope.row.family_people.old}}老人</template>
            </el-table-column>
            <el-table-column align="center" prop="state" label="状态"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="printDispatchBtn">打印派出单</el-button>
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
import CustomerSearch from "components/common/search/CustomerSearch";
export default {
  name: "PersonDispatch",
  data() {
    return {
      // 客户订单
      customerListData: [
        {
          id: "1",
          name: "客户",
          family_area: "100.25",
          family_hometown: "安徽安庆",
          family_address: "家庭住址",
          service_type: "1",
          service_other: "其他内容",
          family_people: {
            children: 1,
            old: 2,
            adlut: 3,
          },
          service_content: [],
          demand_age: "20-30",
          demand_sex: 0,
          demand_education: "高中",
          demand_job: ["育婴师", "管家"],
          demand_zodiac: "牛",
          demand_experience: "2-3年",
          demand_census: "不限",
          demand_cooking: "川菜",
          demand_service_skill: [],
          mobile: "13695604265",
          state: "已完成",
          source: "来源",
        },
      ],
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 搜索按钮点击
    searchBtn(searchForm) {
      console.log('人员派出', searchForm)
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 打印派出单
    printDispatchBtn() {
      this.$confirm("是否打印派出单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "打印成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
  components: {
    CustomerSearch,
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
