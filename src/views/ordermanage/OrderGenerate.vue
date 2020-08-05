<template>
  <div class="order-generate">
    <el-row>
      <el-col :spanl="24">
        <!-- 搜索框 -->
        <customer-search></customer-search>

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
                    <span>{{ scope.row. demand_experience }}</span>
                  </el-form-item>

                  <el-form-item label="工资待遇">
                    <span>12000 / 26天</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="id" label="订单号" width="100"></el-table-column>
            <el-table-column align="center" prop="name" label="名字" width="100">
              <template slot-scope="scope">
                <div class="name-wrap">
                  <el-popover placement="bottom-start" width="800" trigger="click">
                    <!-- 内容 -->
                    <el-tabs>
                      <el-tab-pane label="面试记录">
                        <!-- 表单 -->
                        <el-table
                          stripe
                          :data="interviewFormData"
                          style="width: 100%"
                          height="200px"
                        >
                          <el-table-column
                            prop="interviewer_number"
                            align="center"
                            label="面试人员编号"
                            width="120"
                          ></el-table-column>
                          <el-table-column align="center" label="姓名" width="100" prop="name"></el-table-column>
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
                          <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                              <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                            </template>
                          </el-table-column>
                        </el-table>

                        <!-- 添加事件 -->
                        <div class="option-wrap">
                          <i class="el-icon-folder-add"></i> 添加面试
                        </div>
                        <!-- 表单 -->
                        <el-form ref="form" class="eventForm" label-width="80px">
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="面试人员编号"></el-form-item>
                            </el-col>
                          </el-row>
                        </el-form>
                        <!-- 保存按钮 -->
                        <el-row>
                          <el-col :span="5" :offset="20">
                            <el-button size="mini" type="primary" round>保存</el-button>
                          </el-col>
                        </el-row>
                      </el-tab-pane>
                      <el-tab-pane label="跟进记录">
                        <!-- 表单 -->
                        <el-table stripe style="width: 100%">
                          <el-table-column prop="time" align="center" label="日期" width="180"></el-table-column>
                          <el-table-column align="center" label="跟单记录情况" width="180"></el-table-column>
                          <el-table-column align="center" label="推荐面试人员" width="180">></el-table-column>
                          <el-table-column align="center" label="面试情况"></el-table-column>
                          <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                              <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                            </template>
                          </el-table-column>
                        </el-table>

                        <!-- 添加事件 -->
                        <div class="option-wrap">
                          <i class="el-icon-folder-add"></i> 添加跟进
                        </div>
                        <!-- 表单 -->
                        <el-form
                          ref="form"
                          :model="addFollowUpForm"
                          class="eventForm"
                          label-width="80px"
                        >
                          <el-form-item label="日期" prop="time">
                            <el-date-picker
                              v-model="addFollowUpForm.time"
                              type="date"
                              size="mini"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                            ></el-date-picker>
                          </el-form-item>
                        </el-form>
                        <!-- 保存按钮 -->
                        <el-row>
                          <el-col :span="5" :offset="20">
                            <el-button size="mini" type="primary" round>保存</el-button>
                          </el-col>
                        </el-row>
                      </el-tab-pane>
                    </el-tabs>
                    <!-- 按钮显示 -->
                    <el-button type="text" id="popoPlus" slot="reference" icon="el-icon-s-fold"></el-button>
                  </el-popover>

                  <span style="margin-left: 10px">{{scope.row.name}}</span>
                </div>
              </template>
            </el-table-column>
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
            <el-table-column align="center" prop="is_success" label="是否完成">
              <template slot-scope="scope">
                <div v-if="scope.row.is_success">
                  <i style="color:#67C23A; font-size: 28px" class="el-icon-success"></i>
                </div>
                <div v-else>
                  <el-button
                    size="mini"
                    class="el-icon-s-claim"
                    type="info"
                    @click="addSuccessOrder(scope.row.id)"
                    circle
                  ></el-button>
                </div>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="140px">
              <template slot-scope="scope">
                <el-popconfirm
                  confirmButtonText="好的"
                  cancelButtonText="不用了"
                  icon="el-icon-info"
                  iconColor="red"
                  title="您确定要永久删除该订单吗？"
                  @onConfirm="formDeleteBtn(scope.row.id)"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
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

    <!-- 调出家政员的基本信息 -->
    <el-dialog title="家政员的基本信息" :visible.sync="staffInfoDialogVisible" width="870px" center>
      <div class="staff-content" v-loading="staffInfoLoading">
        <el-row class="expand-row">
          <el-col :span="4">
            <span class="label-text">手机号</span>
            <span class="content-text">{{staffInfo.mobile}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">工资要求</span>
            <span class="content-text">{{staffInfo.salary}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">英语水平</span>
            <span class="content-text">{{staffInfo.english}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">计算机水平</span>
            <span class="content-text">{{staffInfo.computer}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">政治面貌</span>
            <span class="content-text">{{staffInfo.political_status}}</span>
          </el-col>
        </el-row>

        <el-row class="expand-row">
          <el-col :span="4">
            <span class="label-text">工资待遇</span>
            <span class="content-text">12000 / 26天</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">休假要求</span>
            <span class="content-text">{{staffInfo.salary}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">户口地址</span>
            <span
              class="content-text"
            >{{staffInfo.census_p_text}}{{staffInfo.cnnsus_c_text}}{{staffInfo.cnnsus_d_text}}{{staffInfo.census_address_desc}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">户口类型</span>
            <span class="content-text">{{staffInfo.census_type}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">入职时间</span>
            <span class="content-text">{{staffInfo.in_time}}</span>
          </el-col>
        </el-row>

        <el-row class="expand-row">
          <el-col :span="4">
            <span class="label-text">学历</span>
            <span class="content-text">{{staffInfo.education}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">现居住地</span>
            <span
              class="content-text"
            >{{staffInfo.now_p_text}}{{staffInfo.now_c_text}}{{staffInfo.now_d_text}}{{staffInfo.now_address_desc}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">服务技能</span>
            <span
              class="content-text"
              v-for="(item, index) in staffInfo.service_skills"
              :key="index"
            >{{item}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">家用电器</span>
            <span
              class="content-text"
              v-for="(item, index) in staffInfo.device"
              :key="index"
            >{{item}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">入职来源</span>
            <span class="content-text">{{staffInfo.recruiters_name}}：{{staffInfo.recruiters_mobile}}</span>
          </el-col>
        </el-row>

        <el-row class="expand-row">
          <el-col :span="4">
            <span class="label-text">血型</span>
            <span class="content-text">{{staffInfo.blood}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">健康状况</span>
            <span class="content-text">{{staffInfo.health}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">婚姻状况</span>
            <span class="content-text">{{staffInfo.marital_status}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">员工状态</span>
            <span class="content-text">{{staffInfo.person_state}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">保险</span>
            <span class="content-text">{{staffInfo.agreement_amount}}</span>
          </el-col>
        </el-row>

        <el-row class="expand-row">
          <el-col :span="4">
            <span class="label-text">身高</span>
            <span class="content-text">{{staffInfo.height}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">体重</span>
            <span class="content-text">{{staffInfo.weight}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">籍贯</span>
            <span class="content-text">{{staffInfo.census}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">生日</span>
            <span class="content-text">{{staffInfo.birthday}}</span>
          </el-col>
          <el-col :span="5">
            <span class="label-text">语言能力</span>
            <span
              class="content-text"
              v-for="(item, index) in staffInfo.language"
              :key="index"
            >{{item}}</span>
          </el-col>
        </el-row>

        <el-row class="expand-row">
          <el-col :span="4">
            <span class="label-text">录入人</span>
            <span class="content-text">{{staffInfo.salary}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label-text">家庭紧急联系</span>
            <span class="content-text">{{staffInfo.urgent_name}}：{{staffInfo.urgent_mobile}}</span>
          </el-col>
          <el-col :span="8">
            <span class="label-text">安置协议</span>
            <span class="content-text">{{staffInfo.agreement_amount}}</span>
          </el-col>
        </el-row>

        <el-row class="expand-row">
          <el-col :span="12" style="display: flex">
            <span class="label-text">工作经历</span>
            <div
              class="content-text"
              v-for="(item, index) in staffInfo.work_experience"
              :key="index"
            >
              <el-col :span="24">{{item.job}}</el-col>
              <el-col :span="24">{{item.time.join('~')}}</el-col>
              <el-col :span="24">{{item.address}}</el-col>
              <el-col :span="24">{{item.content}}</el-col>
            </div>
          </el-col>
          <el-col :span="12" style="display: flex">
            <span class="label-text">家庭成员</span>
            <div class="content-text" v-for="(item, index) in staffInfo.family_member" :key="index">
              <el-col :span="24">{{item.name}}</el-col>
              <el-col :span="24">{{item.relation}}</el-col>
              <el-col :span="24">{{item.current_situation}}</el-col>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!-- 完成订单时添加员工姓名和编号 -->
    <el-dialog
      title="添加首次服务员工"
      :visible.sync="addFirstDialogVisible"
      width="400px"
      @close="addFirstDialogClose"
      center
    >
      <!-- 内容 -->
      <div class="content">
        <el-form ref="orderSuccessForm" :model="orderSuccessForm">
          <el-form-item label="是否完成" prop="is_success" label-width="70px">
            <el-switch size="mini" active-color="#13ce66" v-model="orderSuccessForm.is_success"></el-switch>
          </el-form-item>
          <el-form-item label-width="40px" label="编号" prop="number">
            <el-input size="mini" v-model="orderSuccessForm.number"></el-input>
          </el-form-item>
          <el-form-item label-width="40px" label="姓名" prop="name">
            <el-input size="mini" v-model="orderSuccessForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addFirstDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addFirstDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CustomerSearch from "components/common/search/CustomerSearch";
import { getOneStraffInfo } from "network/detail";
export default {
  name: "OrderGenerate",
  data() {
    return {
      // 订单列表
      orderList: [
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

          // 订单是否完成
          is_success: true,
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
      // 是否显示家政员的dialogvisible
      staffInfoDialogVisible: true,
      // 是否加载
      loading: false,

      // 家政员工的基本信息
      staffInfo: {},
      staffInfoLoading: false,

      // 添加首次服务员工
      addFirstDialogVisible: false,
      // 订单完成表单
      orderSuccessForm: {
        is_success: false,
        staff_number: "",
        name: "",
      },

      // 面试管理数据
      interviewFormData: [
        {
          interviewer_number: "AF1002",
          name: "张小明",
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: false,
        },
        {
          interviewer_number: "AF1002",
          name: "张小红",
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: true,
        },
        {
          interviewer_number: "AF1002",
          name: "张小红",
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: true,
        },
        {
          interviewer_number: "AF1002",
          name: "张小红",
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: true,
        },
      ],

      // 添加跟进
      addFollowUpForm: {
        time: "",
      },
    };
  },
  computed: {
    language() {
      return this.staffInfo.language;
    },
  },
  watch: {},
  methods: {
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 是否删除该订单
    formDeleteBtn(id) {
      console.log(id);
    },

    // 添加完成订单
    addSuccessOrder(id) {
      console.log(id);
      // 显示添加界面
      this.addFirstDialogVisible = true;
    },

    // 添加完成订单关闭回调
    addFirstDialogClose() {
      console.log("jjj");
      this.$refs.orderSuccessForm.resetFields();
    },
  },
  components: {
    CustomerSearch,
  },
  created() {
    // 默认显示单个员工的
    getOneStraffInfo(32).then((res) => {
      this.staffInfoLoading = true;
      if (res.code === 200) {
        this.staffInfoLoading = false;
        this.staffInfo = res.data;
      } else {
        this.$message.error(res.msg);
      }
    });
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
    color: rgb(185, 185, 185);
    font-size: 12px;
    margin-right: 10px;
  }

  .content-text {
    font-size: 12px;
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
  /dee/.el-table__body-wrapper::-webkit-scrollbar {
    width: 3px;
    height: 10px;
  }
}
</style>
