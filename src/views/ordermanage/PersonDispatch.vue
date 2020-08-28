<template>
  <div class="person-dispatch">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>
        <!-- 表单 -->
        <el-card class="table-content" :style="{height: screenHeight}">
          <!-- 表单 -->
          <el-table
            :data="customers"
            style="width: 100%"
            border
            class="user-table-wrap"
            :height="scrollHeight"
            v-loading="loading"
          >
            <el-table-column prop="name" align="center" label="客户姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="mobile" label="联络电话" width="180">
              <template slot-scope="scope">
                <i class="el-icon-phone" style="color: red"></i>
                {{scope.row.mobile}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="family_address" label="地址" width="180"></el-table-column>
            <el-table-column align="center" prop="service_type" label="服务类型" width="150">
              <template slot-scope="scope">
                <div v-for="item in service_types" :key="item.id">
                  <p v-if="scope.row.service_type == item.id">{{item.name}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="family_people" label="家庭成员">
              <template
                slot-scope="scope"
              >{{scope.row.family_people.children}}小孩，{{scope.row.family_people.adlut}}成人，{{scope.row.family_people.old}}老人</template>
            </el-table-column>
            <el-table-column align="center" prop="state" label="状态">
              <template slot-scope="scope">
                <p v-if="scope.row.state == 0">审核中</p>
                <p v-if="scope.row.state == 1">待进行</p>
                <p v-if="scope.row.state == 2">订单进行中</p>
                <p v-if="scope.row.state == 3">已完成</p>
                <p v-if="scope.row.state == 4">已取消</p>
                <p v-if="scope.row.state == 5">暂停中</p>
                <p v-if="scope.row.state == 6">重新恢复</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="printDispatchBtn(scope.row.id)">查看派出单</el-button>
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
  </div>
</template>

<script>
import CustomerSearch from "components/common/search/CustomerSearch";
import Pagination from "components/common/pagination/Pagination";
import { searchCustomerInfo, dispatchOrder } from "network/orderRequest";
import { getJob } from "network/select";
import download from "downloadjs";
export default {
  name: "PersonDispatch",
  data() {
    return {
      searchForm: {},
      // 客户订单
      customers: [],
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      loading: false,

      // 服务类型
      service_types: [],
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
  created() {
    this.getAllOrderInfo();

    // 服务类型
    getJob().then((res) => {
      if (res.code === 200) {
        this.service_types = res.data;
      } else {
        this.$message.waraing("获取岗位失败！");
      }
    });
  },
  methods: {
    // 定义搜索获取信息
    getSearchInfoData(options) {
      searchCustomerInfo(options)
        .then((res) => {
          if (res.code === 200) {
            // 获取客户数据
            this.customers = res.data.data;
            console.log(res.data.data);
            // 页数赋值
            this.currentPage = res.data.current_page;
            // 总数据条数
            this.total = res.data.total;
            // 每页的条
            this.per_page = res.data.per_page;
            this.loading = false;
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        })
        .catch((err) => {
          this.$message.error("服务器炸了！");
        });
    },
    // 定义获取客户需求信息
    getAllOrderInfo() {
      this.loading = true;
      this.getSearchInfoData(this.searchForm);
    },
    // 搜索按钮点击
    searchBtn(val) {
      this.searchForm = val;
      this.getSearchInfoData(this.searchForm);
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      this.searchForm.page = currentpage;
      this.getSearchInfoData(this.searchForm);
    },

    // 打印派出单
    printDispatchBtn(oarder_id) {
      this.$confirm("是否打印派出单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          dispatchOrder(oarder_id).then((res) => {
            let { code, data, msg } = res;
            if (code === 200) {
              // console.log(data.url);
              // var a = document.createElement("a");
              // a.setAttribute("href", data.url);
              // a.setAttribute("target", "_blank");
              // a.setAttribute("download", "");
              // a.setAttribute("id", "js_a");
              // //防止反复添加
              // if (document.getElementById("js_a")) {
              //   document.body.removeChild(document.getElementById("js_a"));
              // }
              // document.body.appendChild(a);
              download(data.url)
              a.click();
            } else {
              this.$message.error(msg);
            }
          });
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
        overflow-x: hidden;

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
</style>
