<template>
  <div class="person-dispatch">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>
        <!-- 表单 -->
        <el-card class="table-content" :style="{ height: screenHeight }">
          <!-- 表单 -->
          <el-table
            :data="customers"
            style="width: 100%"
            border
            class="user-table-wrap"
            :height="scrollHeight"
            v-loading="loading"
          >
            <el-table-column
              align="center"
              prop="num"
              label="编号"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="客户姓名"
              width="100"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="mobile"
              label="联络电话"
              width="180"
            >
              <template slot-scope="scope">
                <i class="el-icon-phone" style="color: red"></i>
                {{ scope.row.mobile }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="family_address"
              label="地址"
              width="180"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="service_type"
              label="服务类型"
              width="150"
            >
              <template slot-scope="scope">
                <div v-for="item in service_types" :key="item.id">
                  <p v-if="scope.row.service_type == item.id">
                    {{ item.name }}
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="family_people"
              label="家庭成员"
            >
              <template slot-scope="scope"
                >{{ scope.row.family_people.children }}小孩，{{
                  scope.row.family_people.adlut
                }}成人，{{ scope.row.family_people.old }}老人</template
              >
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
            <el-table-column align="center" label="操作" width="160px">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="dispatchBtn(scope.row.id, scope.row.name)"
                  >派出单</el-button
                >
                <el-button
                  type="warning"
                  size="mini"
                  @click="printDispatchBtn(scope.row.id)"
                  
                  >派出</el-button
                >
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

    <!-- 派出单 -->
    <el-dialog
      title="派出单"
      :visible.sync="dispathDialogVisible"
      @close="dispathClose"
      width="500px"
      center
    >
      <el-form
        :model="dispathForm"
        :rules="dispathFormRules"
        ref="dispathForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-form-item label-width="100px" label="姓名" size="mini">
            <el-select
              v-if="orderInterviewer.length == 0"
              v-model="dispathForm.staff_id"
              placeholder="请选择指定人员姓名"
              disabled
              :key="0"
            >
              <el-option label="没有指定人员" :value="0"></el-option>
            </el-select>

            <el-select
              v-else
              v-model="dispathForm.staff_id"
              placeholder="请选择指定人员姓名"
              :key="1"
            >
              <el-option
                v-for="item in orderInterviewer"
                :key="item.id"
                :label="item.staff.name"
                :value="item.staff_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-form-item label="上单日期" prop="stime">
          <el-date-picker
            v-model="dispathForm.stime"
            type="datetime"
            placeholder="选择日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            size="mini"
            style="width: 180px"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="注意事项" prop="attention">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="dispathForm.attention"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dispathDialogVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="saveDispath"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 查看派出单 -->
    <el-dialog
      :title="dispathTitle"
      :visible.sync="lookDispathDialogVisible"
      width="890px"
      center
      class="dispathDialog"
    >
      <div class="interview-content">
        <el-table
          stripe
          :data="lookDispathFormData"
          style="width: 100%"
          height="400px"
          v-loading="lookDispathFormload"
        >
          <el-table-column
            align="center"
            label="指派人员"
            prop="name"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            align="center"
            label="联系电话"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="time"
            align="center"
            label="上单日期"
            width="150px"
          ></el-table-column>
          <el-table-column
            align="center"
            label="服务内容"
            prop="service_content"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            label="地址"
            prop="family_address"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            label="注意事项"
            prop="desc"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            align="center"
            label="指派老师"
            prop="user"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="lookOldDispath(scope.row.url)"
              >
                查看派出单
              </el-button>
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
  dispatchOrder,
  lookTotalDispath,
  getInterviewInfo,
} from "network/orderRequest";
import { getJob } from "network/select";
import download from "downloadjs";
export default {
  name: "PersonDispatch",
  data() {
    return {
      // 订单的所有面试人员
      orderInterviewer: [],

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

      dispathDialogVisible: false,
      dispathForm: {
        customer_id: "",
        stime: "",
        attention: "",
        staff_id: "",
      },
      dispathFormRules: {
        stime: [
          { required: true, message: "请选择上单日期", trigger: "change" },
        ],
        attention: [
          { required: true, message: "请填写注意事项", trigger: "blur" },
        ],
      },

      // 查看派出单
      dispathTitle: "",
      lookDispathDialogVisible: false,
      lookDispathFormData: [{}],
      lookDispathLoading: false,
      lookDispathFormload: false
    };
  },
  computed: {
    screenHeight() {
      return this.$store.state.screenHeight - 210 + "px";
    },
    scrollHeight() {
      return this.$store.state.screenHeight - 230 + "px";
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
    // 当前客户获取指定员工的派出单
    lookOldDispath(url) {
      var a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      a.setAttribute("download", "");
      a.setAttribute("id", "js_a");
      //防止反复添加
      if (document.getElementById("js_a")) {
        document.body.removeChild(document.getElementById("js_a"));
      }
      document.body.appendChild(a);
      a.click();
    },
    // 定义搜索获取信息
    getSearchInfoData(options) {
      searchCustomerInfo(options)
        .then((res) => {
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
    printDispatchBtn(order_id) {
      this.dispathForm.customer_id = order_id;
      this.dispathForm.staff_id = "";
      
      this.dispathForm.user_id = this.$store.state.userInfo.user_id
      this.dispathDialogVisible = true;

      getInterviewInfo({ customer_id: order_id }).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          if (data) {
            this.orderInterviewer = data;
          } else {
            this.orderInterviewer = [];
            this.$message.error("无面试人员！请添加！");
          }
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 关闭回调
    dispathClose() {
      this.$refs.dispathForm.resetFields();
    },

    // 保存
    saveDispath() {
      
      this.$refs.dispathForm.validate((valid) => {
        if (valid) {
          dispatchOrder(this.dispathForm).then((res) => {
            let { code, data, msg } = res;
            if (code === 200) {
              var a = document.createElement("a");
              a.setAttribute("href", data.url);
              a.setAttribute("target", "_blank");
              a.setAttribute("download", "");
              a.setAttribute("id", "js_a");
              // //防止反复添加
              if (document.getElementById("js_a")) {
                document.body.removeChild(document.getElementById("js_a"));
              }
              document.body.appendChild(a);
              a.click();
              this.dispathDialogVisible = false;
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 派出
    dispatchBtn(customer_id, name) {
      this.dispathTitle = name;
      this.lookDispathFormload = true
      this.lookDispathDialogVisible = true;
      
      lookTotalDispath({ customer_id: customer_id }).then((res) => {
        this.lookDispathFormload = false
        let datas = res.data.data;
        this.lookDispathFormData = datas;
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
      margin-top: 0px;

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

.dispathDialog {
  /deep/.el-dialog__body {
    height: 400px;
    // overflow: hidden;
    overflow-y: auto;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}
</style>
