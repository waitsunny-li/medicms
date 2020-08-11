<template>
  <div class="sales-visit">
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
                <el-button
                  type="text"
                  size="mini"
                  @click="lookVisitBtn(scope.row.name, scope.row.id)"
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

    <!-- 查看回访记录 -->
    <el-dialog :title="lookTitle" :visible.sync="visitDialogVisible" width="500px" center>
      <!-- 表单 -->
      <el-row>
        <el-col :span="24">
          <el-table :data="visitListData" border>
            <el-table-column align="center" prop="time" label="日期" width="180px"></el-table-column>
            <el-table-column align="center" prop="content" label="内容"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 添加回访记录 -->
    <el-dialog :title="addTitle" :visible.sync="addVisitDialogVisible" width="500px" center>
      <!-- 表单 -->
      <el-form ref="addVisitForm" :model="addVisitForm" label-width="80px">
        <el-form-item label="时间" prop="time">
          <el-input size="mini" v-model="addVisitForm.time" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="记录" prop="content">
          <el-input type="textarea" size="mini" v-model="addVisitForm.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addVisitDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addVisitDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CustomerSearch from "components/common/search/CustomerSearch";
export default {
  name: "SalesVisit",
  data() {
    return {
      // 客户订单
      customerListData: [
        {
          id: "1",
          name: "李大侠",
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

      // 回访记录数据
      visitListData: [
        {
          time: "第七天",
          content: "我感觉服务人员很是不错，不偷懒",
        },
        {
          time: "第一个月",
          content: "我感觉服务人员很是不错，不偷懒",
        },
        {
          time: "第二个月",
          content: "我感觉服务人员很是不错，不偷懒",
        },
      ],
      // 显示回访记录
      visitDialogVisible: false,
      // 显示目前的查看的客户
      lookTitle: "",

      // 添加回访记录
      addVisitDialogVisible: false,
      // 显示目前的要添加的客户名称
      addTitle: "",
      // 添加回访表单
      addVisitForm: {
        time: "",
        content: "",
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 搜索按钮点击
    searchBtn(searchForm) {
      console.log('销售回访', searchForm)
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 查看回访记录按钮
    lookVisitBtn(name, id) {
      this.lookTitle = `查看客户（${name}）的回访记录`;
      this.visitDialogVisible = true;
    },

    // 添加记录按钮显示事件
    addVisitBtn(name, id) {
      this.addTitle = `为客户（${name}）添加记录`;
      this.addVisitDialogVisible = true;
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
