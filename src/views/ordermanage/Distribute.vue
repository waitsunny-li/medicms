<template>
  <div class="distribute">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>

        <!-- 客户表单 -->
        <el-card class="table-content">
          <!-- 表单 -->
          <el-table
            :data="customers"
            class="user-table-wrap"
            style="width: 100%"
            height="550"
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
                    <span>{{ scope.row.demand_age }}</span>
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
                    <span>{{ scope.row.demand_service_skill }}</span>
                  </el-form-item>
                  <el-form-item label="生肖">
                    <span>{{ scope.row.demand_zodiac }}</span>
                  </el-form-item>
                  <el-form-item label="家政从业经验">
                    <span>{{ scope.row.demand_experience }}</span>
                  </el-form-item>
                  <el-form-item label="厨艺">
                    <span>{{ scope.row.demand_cooking }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="family_hometown" label="家庭成员籍贯"></el-table-column>
            <el-table-column
              class="identify"
              align="center"
              prop="service_type"
              label="服务类型"
              :show-overflow-tooltip="true"
              width="100"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.service_type == 1">长期</p>
                <p v-if="scope.row.service_type == 2">短期</p>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="service_other" label="需要服务"></el-table-column>
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
            ></el-table-column>
            <el-table-column align="center" prop="source" label="来源" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column align="center" prop="state" label="状态" :show-overflow-tooltip="true"></el-table-column>
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

    <!-- 显示分配员工列表 -->
    <el-dialog title="分配" :visible.sync="distributeDialogVisible" width="580px" center>
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
          <el-table-column align="center" prop="person_state" label="状态">
            <template slot-scope="scope">
              <p v-if="scope.row.person_state == 1">培训</p>
              <p v-else-if="scope.row.person_state == 2">考核</p>
              <p v-else-if="scope.row.person_state == 3">待岗</p>
              <p v-else-if="scope.row.person_state == 4">离职</p>
              <p v-else-if="scope.row.person_state == 5">黑名单</p>
              <p v-else-if="scope.row.person_state == 6">在岗</p>
              <p v-else-if="scope.row.person_state == 7">离职(下单)</p>
              <p v-else>错误</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button @click="distributeSheBtn" size="mini" v-if="scope.row.sex == 1">分配给他</el-button>
              <el-button @click="distributeSheBtn(scope.row.name)" v-else size="mini">分配给她</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomerSearch from "components/common/search/CustomerSearch";
import {} from "network/detail";
export default {
  name: "Distribute",
  data() {
    return {
      customers: [
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
          state: "0",
          source: "来源",
        },
        {
          id: "2",
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
          state: "0",
          source: "来源",
        },
      ],
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

      // 默认查询员工数据
      defalutStaffData: [
        {
          id: "12",
          number: "13648",
          name: "王张红",
          mobile: "13955877669",
          person_state: 3,
        },
        {
          id: "21",
          number: "13648",
          name: "王红",
          mobile: "13955877669",
          person_state: 3,
        },
        {
          id: "31",
          number: "13648",
          name: "李菲菲",
          mobile: "13955877669",
          person_state: 3,
        },
        {
          id: "41",
          number: "13648",
          name: "张小燕",
          mobile: "13955877669",
          person_state: 3,
        },
      ],
      queryStaffName: "",
      // 选中的员工
      currentSelectStaff: {
        id: "1",
        number: "",
        name: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 搜索按钮点击
    searchBtn(searchForm) {
      console.log('手工分配', searchForm)
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 表单中分配按钮
    distributeBtn(id) {
      this.currentCustomId = id;
      this.distributeDialogVisible = true;
    },

    // 点击搜索按钮事件
    queryStaffBtn() {
      console.log(this.queryStaffName);
    },

    // 分配给他
    distributeSheBtn(name) {
      this.$confirm("是否要将此客户分配给" + name, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "分配成功!",
          });
          // 关闭分配弹框
          this.distributeDialogVisible = false
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

.queryStaffTable {
  margin-top: 50px;
}

.distribute {
  /deep/.el-table .current-row-class {
    background: #75cbf4;
  }
}

/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row > td {
  background-color: #f19944 !important;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f19944;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
</style>
