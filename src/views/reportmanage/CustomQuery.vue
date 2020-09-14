<template>
  <div class="custom-query">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>

        <!-- 客户表单 -->
        <el-card class="table-content" :style="{height: screenHeight}">
          <!-- 表单 -->
          <el-table
            :data="customers"
            class="user-table-wrap"
            style="width: 100%"
            :height="scrollHeight"
            v-loading="loading"
            border
            :default-sort="{prop: 'create_time', order: 'descending'}"
          >
            <!-- 选择 -->
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- 展示 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <p class="title-need">
                  <el-button type="text">
                    对家政员的需求
                    <i class="el-icon-bottom"></i>
                  </el-button>
                </p>
                <el-form label-position="center" inline class="demo-table-expand">
                  <el-form-item label="年龄">
                    <span>{{ scope.row.demand_age }}岁以下</span>
                  </el-form-item>
                  <el-form-item label="籍贯">
                    <span>{{ scope.row.demand_census }}</span>
                  </el-form-item>

                  <el-form-item label="性别">
                    <span v-if="scope.row.demand_sex == 0">不限</span>
                    <span v-if="scope.row.demand_sex == 1">女</span>
                    <span v-if="scope.row.demand_sex == 2">男</span>
                  </el-form-item>
                  <el-form-item label="岗位要求">
                    <span>{{ scope.row.demand_job.join('，') }}</span>
                  </el-form-item>

                  <el-form-item label="学历">
                    <span>{{ scope.row.demand_education }}</span>
                  </el-form-item>
                  <el-form-item label="服务技能">
                    <span>{{ scope.row.demand_service_skill.join('，') }}</span>
                  </el-form-item>
                  <el-form-item label="工资">
                    <span>{{scope.row.demand_salary}} / 月</span>
                  </el-form-item>
                  <el-form-item label="家政从业经验">
                    <span>{{ scope.row.demand_experience }}</span>
                  </el-form-item>
                  <el-form-item label="厨艺">
                    <span>{{ scope.row.demand_cooking.join('，') }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="num" label="编号" width="100"></el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="family_hometown" label="家庭成员籍贯" min-width="110"></el-table-column>
            <el-table-column
              class="identify"
              align="center"
              prop="service_type"
              label="服务类型"
              :show-overflow-tooltip="true"
              width="100"
            >
              <template slot-scope="scope">
                <div v-for="item in service_types" :key="item.id">
                  <p v-if="scope.row.service_type == item.id">{{item.name}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="service_content"
              :show-overflow-tooltip="true"
              label="需要服务"
            ></el-table-column>
            <el-table-column width="180" align="center" label="家庭成员">
              <template
                slot-scope="scope"
              >{{scope.row.family_people.children}}小孩，{{scope.row.family_people.adlut}}成人，{{scope.row.family_people.old}}老人</template>
            </el-table-column>
            <el-table-column align="center" prop="mobile" width="100px" label="手机号">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.mobile" placement="top">
                  <i class="el-icon-phone" style="color: red; font-size: 20px"></i>
                </el-tooltip> 
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="family_address"
              label="现居住地址"
              min-width="120"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="source_id"
              label="来源"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-for="item in source" :key="item.id">
                  <div
                    style="overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap; height: 30px"
                    v-if="scope.row.source_id == item.id"
                  >{{item.name}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="state" label="状态" :show-overflow-tooltip="true">
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
            <el-table-column
              width="130px"
              :show-overflow-tooltip="true"
              align="center"
              sortable
              prop="create_time"
              label="录入时间"
            ></el-table-column>
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
import { searchCustomerInfo } from "network/orderRequest";
import { getAllSource, getJob } from "network/select";
export default {
  name: "CustomQuery",
  data() {
    return {
      searchForm: {},
      customers: [],
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 等待加载
      loading: false,
      // 来源
      source: [],
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
    this.getAllCustomerInfo();

    // 获取需求来源
    getAllSource().then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        this.source = data;
      } else {
        this.$message.error(msg);
      }
    });

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
      searchCustomerInfo(options).then((res) => {
        if (res.code === 200) {
          // 获取客户数据
          this.customers = res.data.data;
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
      });
    },
    // 定义获取客户需求信息
    getAllCustomerInfo() {
      this.loading = true;
      this.getSearchInfoData(this.searchForm);
    },
    searchBtn(val) {
      this.searchForm = val;
      this.getSearchInfoData(this.searchForm);
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      this.searchForm.page = currentpage;
      this.getSearchInfoData(this.searchForm);
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
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
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
</style>
