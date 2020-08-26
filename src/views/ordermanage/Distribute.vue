<template>
  <div class="distribute">
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
          >
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
            <el-table-column align="center" prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="family_hometown" min-width="110" label="家庭成员籍贯"></el-table-column>
            <el-table-column
              class="identify"
              align="center"
              prop="service_type"
              label="服务类型"
              :show-overflow-tooltip="true"
              width="100"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.service_type == 0">{{scope.row.service_other}}</p>
                <p v-if="scope.row.service_type == 1">全日住家型</p>
                <p v-if="scope.row.service_type == 2">日间照料型</p>
                <p v-if="scope.row.service_type == 3">计时收费型</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="service_content"
              label="需要服务"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column width="180" align="center" label="家庭成员">
              <template
                slot-scope="scope"
              >{{scope.row.family_people.children}}小孩，{{scope.row.family_people.adlut}}成人，{{scope.row.family_people.old}}老人</template>
            </el-table-column>
            <el-table-column align="center" prop="mobile" width="150px" label="手机号">
              <template slot-scope="scope">
                <i class="el-icon-phone" style="color: red"></i>
                {{scope.row.mobile}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="family_address"
              label="现居住地址"
              :show-overflow-tooltip="true"
              min-width="120"
            ></el-table-column>
            <el-table-column align="center" prop="source" label="来源" :show-overflow-tooltip="true">
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
            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="140px">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="分配"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-thumb"
                    size="mini"
                    circle
                    style="margin: 0 10px"
                    @click="distributeBtn(scope.row.id)"
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

    <!-- 显示分配员工列表 -->
    <el-dialog
      title="分配"
      :visible.sync="distributeDialogVisible"
      @close="distributeDislogClose"
      width="580px"
      center
    >
      <div class="dis-content">
        <el-input
          size="mini"
          placeholder="请输入要分配的跟单老师姓名"
          v-model="queryStaffName"
          class="input-with-select"
          @keyup.native.enter="queryStaffBtn"
        >
          <el-button slot="append" icon="el-icon-search" @click="queryStaffBtn"></el-button>
        </el-input>
        <!-- 返回查询结果 -->
        <el-table
          class="queryStaffTable"
          :data="defalutTeacherData"
          style="width: 100%"
          :highlight-current-row="true"
          height="260"
          v-loading="distributeLoading"
        >
          <el-table-column align="center" prop="id" label="编号" width="90"></el-table-column>
          <el-table-column align="center" prop="create_time" label="录入时间"></el-table-column>
          <el-table-column align="center" prop="username" label="姓名" width="90"></el-table-column>

          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button @click="distributeSheBtn(scope.row.username, scope.row.id)" size="mini">分配</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomerSearch from "components/common/search/CustomerSearch";
import Pagination from "components/common/pagination/Pagination";
import {
  searchCustomerInfo,
  distributeTeacher,
  searchNameTeacher,
} from "network/orderRequest";
import { getAllSource } from "network/select";
export default {
  name: "Distribute",
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
      // 显示分配员工列表
      distributeDialogVisible: false,
      // 目前显示的客户id
      currentCustomId: "",
      // 要查询的员工姓名
      queryStaffName: "",
      source: [],

      defalutTeacherData: [],
      distributeLoading: false,
      // 选中的员工
      currentSelectStaff: {
        id: "1",
        number: "",
        name: "",
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
  },
  methods: {
    // 定义搜索获取信息
    getSearchInfoData(options) {
      searchCustomerInfo(options).then((res) => {
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
      });
    },

    // 定义获取客户需求信息
    getAllCustomerInfo() {
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
      this.searchForm.page = currentpage
      this.getSearchInfoData(this.searchForm)
    },

    // 表单中分配按钮
    distributeBtn(id) {
      this.currentCustomId = id;
      this.distributeDialogVisible = true;
      this.searchTeacherInfo();
    },

    // 自定义搜索匹配老师数据
    searchTeacherInfo(name) {
      searchNameTeacher(this.queryStaffName).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          console.log(res)
          this.defalutTeacherData = data.slice(0, 10);
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 点击搜索按钮事件
    queryStaffBtn() {
      console.log(this.queryStaffName);
      this.distributeDialogVisible = true;
      this.searchTeacherInfo(this.queryStaffName);
    },

    // 分配给他
    distributeSheBtn(name, user_id) {
      this.$confirm("是否要将此客户分配给匹配老师" + name, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          distributeTeacher(this.currentCustomId, user_id).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              // 关闭分配弹框
              this.distributeDialogVisible = false;
            } else {
              this.$message.error(msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    // 分配弹框关门回调
    distributeDislogClose() {
      this.queryStaffName = "";
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

.dis-content {
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}

.queryStaffTable {
  margin-top: 50px;
}

.distribute {
  /deep/.el-table .current-row-class {
    background: #75cbf4;
  }
}
</style>
