<template>
  <div class="order-query">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>

        <!-- 表单 -->
        <el-card class="table-content">
          <!-- 表单内容 -->
          <!-- 表单 -->
          <el-table
            :data="orderList"
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
                    <span>{{ scope.row.demand_service_skill.join(',') }}</span>
                  </el-form-item>
                  <el-form-item label="厨艺">
                    <span>{{ scope.row.demand_cooking }}</span>
                  </el-form-item>
                  <el-form-item label="家政从业经验">
                    <span>{{ scope.row.demand_experience }}</span>
                  </el-form-item>

                  <el-form-item label="工资待遇">
                    <span>12000 / 26天</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="id" label="订单号" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="orderInfoBtn(scope.row.name, scope.row.id)"
                >{{scope.row.id}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="名字" width="100"></el-table-column>
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
            <el-table-column
              align="center"
              prop="service_other"
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
            ></el-table-column>
            <el-table-column align="center" prop="source" label="来源" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column align="center" prop="state" label="状态" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column align="center" prop="is_success" label="是否完成">
              <template slot-scope="scope">
                <div v-if="scope.row.is_success">
                  <i style="color:#67C23A; font-size: 28px" class="el-icon-success"></i>
                </div>
                <div v-else>
                  <i style="color:#F56C6C; font-size: 28px" class="el-icon-circle-close"></i>
                </div>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column fixed="right" label="操作" align="center" width="140px">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  :enterable="false"
                  effect="dark"
                  content="面试记录"
                  placement="top"
                >
                  <el-button
                    @click="interviewDisplayBtn(scope.row.id)"
                    circle
                    size="mini"
                    icon="el-icon-camera"
                    type="primary"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  :enterable="false"
                  effect="dark"
                  content="查看跟进"
                  placement="top"
                >
                  <el-button
                    @click="lookFollowUp(scope.row.id)"
                    circle
                    size="mini"
                    icon="el-icon-date"
                    type="primary"
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

    <!-- 面试记录 -->
    <el-dialog :title="interviewTitle" :visible.sync="interviewDialogVisible" width="870px" center>
      <div class="interview-content">
        <el-table stripe :data="interviewFormData" style="width: 100%" height="400px">
          <el-table-column prop="time" align="center" label="面试时间" width="100"></el-table-column>
          <el-table-column prop="interviewer_number" align="center" label="面试人员编号" width="120"></el-table-column>
          <el-table-column align="center" label="姓名" width="100" prop="name">
            <template slot-scope="scope">
              <el-button
                @click="staffInfoBtn(scope.row.staff_info.name, scope.row.staff_info.id)"
                type="text"
              >{{scope.row.staff_info.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号" prop="tel"></el-table-column>
          <el-table-column align="center" label="面试内容" prop="interviewer_content"></el-table-column>
          <el-table-column align="center" label="是否面试完成" prop="is_success">
            <template slot-scope="scope">
              <p v-if="scope.row.is_success">
                <i
                  class="el-icon-success"
                  style="font-size: 18px; color: #67C23A;vertical-align: middle;"
                ></i>
                已通过
              </p>
              <p v-else>
                <i
                  style="font-size: 18px; color: #F56C6C;vertical-align: middle;"
                  class="el-icon-error"
                ></i> 未通过
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 查看跟进记录 -->
    <el-dialog :title="followUpTitle" :visible.sync="followUpDialogVisible" width="870px" center>
      <div class="followup-content">
        <el-table :data="followUpFormData" stripe style="width: 100%" height="400px">
          <el-table-column prop="time" align="center" label="日期" width="120"></el-table-column>
          <el-table-column prop="record" align="center" label="跟单记录情况" width="180"></el-table-column>
          <el-table-column prop="state" align="center" label="需求状态"></el-table-column>
          <el-table-column prop="recommend" align="center" label="推荐面试人员" width="110">
            <template slot-scope="scope">
              <el-button
                @click="staffInfoBtn(scope.row.recommend.name, scope.row.recommend.id)"
                type="text"
              >{{scope.row.recommend.name}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="interview_content" align="center" label="面试情况"></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 员工详情记录 -->
    <el-dialog
      :title="staffInfoTitle"
      :visible.sync="staffInfoDialogVisible"
      width="870px"
      center
      append-to-body
    >
      <staff-info :staffInfo="staffInfo" :staffInfoLoading="staffInfoLoading"></staff-info>
    </el-dialog>

    <!-- 订单详情 -->
    <el-dialog
      :title="orderInfoTitle"
      :visible.sync="orderInfoDialogVisible"
      width="870px"
      center
      append-to-body
    >
      <order-info :orderInfo="orderInfo" :orderInfoLoading="orderInfoLoading"></order-info>
    </el-dialog>
  </div>
</template>

<script>
import CustomerSearch from "components/common/search/CustomerSearch";
import StaffInfo from "components/common/table/StaffInfo";
import OrderInfo from "components/common/table/OrderInfo";
export default {
  name: "OrderQuery",
  data() {
    return {
      orderList: [
        {
          id: "1",
          name: "徐子真",
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

          // 订单是否完成
          is_success: true,
        },
        {
          id: "2",
          name: "胡大侠",
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
          demand_zodiac: "12000 / 26天",
          demand_experience: "2-3年",
          demand_census: "不限",
          demand_cooking: "川菜",
          demand_service_skill: [],
          mobile: "13695604265",
          state: "0",
          source: "来源",
          // 订单是否完成
          is_success: false,
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

      // 订单的面试记录显示
      interviewDialogVisible: false,
      interviewTitle: "",
      interviewFormData: [
        {
          id: "1",
          interviewer_number: "AF1002",
          staff_info: {
            id: "1",
            name: "张小明",
          },
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: false,
        },
        {
          id: "2",
          interviewer_number: "AF1002",
          staff_info: {
            id: "1",
            name: "张小红",
          },
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: true,
        },
        {
          id: "3",
          interviewer_number: "AF1002",
          staff_info: {
            id: "19",
            name: "张小爱",
          },
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: true,
        },
        {
          id: "4",
          interviewer_number: "AF1002",
          staff_info: {
            id: "15",
            name: "小爱同学",
          },
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: true,
        },
        {
          id: "6",
          interviewer_number: "AF1002",
          staff_info: {
            id: "10",
            name: "小明同学",
          },
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: false,
        },
        {
          id: "7",
          interviewer_number: "AF1002",
          staff_info: {
            id: "125",
            name: "小白同学",
          },
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: false,
        },
      ],

      // 员工信息显示
      staffInfoDialogVisible: false,
      staffInfoLoading: false,
      staffInfoTitle: "",
      staffInfo: {},

      // 订单的基本详情
      orderInfoDialogVisible: false,
      orderInfoTitle: "",
      orderInfoLoading: false,
      orderInfo: {
        id: "1",
        name: "徐子真",
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
        service_content: "",
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

        // 订单是否完成
        is_success: true,
      },

      // 跟进查看
      followUpDialogVisible: false,
      followUpTitle: "",
      followUpFormData: [
        {
          time: "2019-12-12",
          record: "jjj",
          recommend: {},
          state: "跟进中",
          interview_content: "",
        },
        {
          time: "2019-02-12",
          record: "jjj",
          recommend: {
            id: "1",
            name: "李只想",
          },
          state: "换人",
          interview_content: "不合格呀",
        },
        {
          time: "2019-02-12",
          record: "jjj",
          recommend: {
            id: "1",
            name: "李用想",
          },
          state: "换人",
          interview_content: "合格啊",
        },
        {
          time: "2019-02-12",
          record: "jjj",
          recommend: {},
          state: "跟进中",
          interview_content: "",
        },
        {
          time: "2019-02-12",
          record: "jjj",
          recommend: {
            id: "1",
            name: "李美丽",
          },
          state: "换人",

          interview_content: "不合格呀",
        },
        {
          time: "2019-02-12",
          record: "jjj",
          recommend: {},
          state: "换人",
          interview_content: "合格呀",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 搜索按钮
    searchBtn(searchForm) {
      console.log(searchForm)
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 面试记录按钮事件
    interviewDisplayBtn(id) {
      this.interviewTitle = `订单号（${id}）的面试记录`
      this.interviewDialogVisible = true;
    },

    // 查看单人的信息
    staffInfoBtn(name, id) {
      console.log(name, id);
      this.staffInfoTitle = `家政员（${name}）的基本信息`;
      this.staffInfoDialogVisible = true;
    },
    // 查看订单详情
    orderInfoBtn(name, id) {
      console.log(name, id);
      // 发送请求
      this.orderInfoTitle = `（${name}）订单的基本信息`;
      this.orderInfoDialogVisible = true;
    },

    // 查看跟进
    lookFollowUp(id) {
      this.followUpTitle = `订单号（${id}）的跟进情况`;
      this.followUpDialogVisible = true;
    },
  },
  components: {
    CustomerSearch,
    StaffInfo,
    OrderInfo,
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

/deep/.expand-row {
  border-bottom: 1px solid #f1f1f1;
  padding: 10px 0;

  .label-text {
    color: #585656;
    font-size: 13px;
    margin-right: 10px;
  }

  .content-text {
    font-size: 13px;
    color: #999999;
  }
}

.option-wrap {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}

.name-wrap {
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    width: 3px;
    height: 10px;
  }
}

.interview-content {
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}

.followup-content {
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
