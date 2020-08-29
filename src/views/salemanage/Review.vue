<template>
  <div class="sales-visit">
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
            <el-table-column align="center" prop="service_type" label="服务类型" width="100">
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
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="lookVisitBtn(scope.row.name, scope.row.visit)"
                >查看回访记录</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  class="el-icon-plus"
                  @click="addVisitBtn(scope.row.name, scope.row.id)"
                ></el-button>
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

    <!-- 查看回访记录 -->
    <el-dialog :title="lookTitle" :visible.sync="visitDialogVisible" width="500px" center>
      <!-- 表单 -->
      <el-row>
        <el-col :span="24">
          <el-table :data="customerVisitList" border>
            <el-table-column align="center" prop="create_time" label="日期" width="180px"></el-table-column>
            <el-table-column align="center" prop="content" label="内容"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 添加回访记录 -->
    <el-dialog :title="addTitle" :visible.sync="addVisitDialogVisible" width="500px" center>
      <!-- 表单 -->
      <el-form ref="addVisitForm" :rules="addVisitRules" :model="addVisitForm" label-width="80px">
        <el-form-item label="时间" prop="time">
          <el-date-picker
            v-model="addVisitForm.date"
            type="date"
            size="mini"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="记录" prop="content">
          <el-input type="textarea" size="mini" v-model="addVisitForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addVisitDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveVisitInfo">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CustomerSearch from "components/common/search/CustomerSearch";
import Pagination from "components/common/pagination/Pagination";
import { getSalesVisitInfo, searchCustomerInfo, saveSalesVisitInfo } from "network/orderRequest";
import { getJob } from "network/select";

export default {
  name: "Review",
  data() {
    return {
      searchForm: {},
      // 客户订单
      customers: [],
      // 回访记录
      customerVisitList: [],
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      loading: false,

      // 显示回访记录
      visitDialogVisible: false,
      // 显示目前的查看的客户
      lookTitle: "",

      service_types: [],

      // 添加回访记录
      addVisitDialogVisible: false,
      // 显示目前的要添加的客户名称
      addTitle: "",
      // 添加回访表单
      addVisitForm: {
        customer_id: "",
        date: "",
        content: "",
      },
      addVisitRules: {
        content: [
          { required: true, message: "请输入记录内容", trigger: "blur" },
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
  created() {
    this.getAllSaleVisitInfo();

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
      getSalesVisitInfo(options).then((res) => {
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
      }).catch(err => {
        this.$message.error('服务器炸了！')
      });
    },
    // 获取全部回访记录
    getAllSaleVisitInfo() {
      this.loading = true;
      this.getSearchInfoData(this.searchForm)
    },
    // 搜索按钮点击
    searchBtn(val) {
      this.searchForm = val
      this.getSearchInfoData(this.searchForm)
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      this.searchForm.page = currentpage
      this.getSearchInfoData(this.searchForm)
    },

    // 查看回访记录按钮
    lookVisitBtn(name, visit) {
      this.lookTitle = `查看客户（${name}）的回访记录`;
      this.customerVisitList = visit;
      console.log(visit)
      this.visitDialogVisible = true;
    },

    // 添加记录按钮显示事件
    addVisitBtn(name, id) {
      this.addTitle = `为客户（${name}）添加记录`;
      this.addVisitDialogVisible = true;
      this.addVisitForm.customer_id = id;
      // 获取当前时间
      this.addVisitForm.date = new Date()
        .toLocaleDateString()
        .replace(/\//g, "-");
    },

    // 保存记录
    saveVisitInfo() {
      this.$refs.addVisitForm.validate((valid) => {
        if (valid) {
          saveSalesVisitInfo(this.addVisitForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.addVisitDialogVisible = false;
              this.getAllSaleVisitInfo();
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
