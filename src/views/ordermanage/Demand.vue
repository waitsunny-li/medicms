<template>
  <div class="demand">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search></customer-search>

        <!-- 客户表单 -->
        <el-card class="table-content">
          <!-- 公共操作 -->
          <el-row>
            <el-col :span="24">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="addCustomerBtn">新增需求</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="selectDeleteBtn" size="mini">删除</el-button>
            </el-col>
          </el-row>

          <!-- 表单 -->
          <el-table
            :data="customers"
            class="user-table-wrap"
            style="width: 100%"
            height="550"
            v-loading="loading"
            border
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
            <el-table-column align="center" prop="name" label="姓名" width="100">
              <template slot-scope="scope">
                <div class="name-wrap">
                  <el-popover placement="bottom-start" width="600" trigger="click">
                    <!-- 内容 -->
                    <el-tabs>
                      <el-tab-pane label="新增事件">
                        <!-- 表单 -->
                        <el-table stripe style="width: 100%">
                          <el-table-column prop="time" align="center" label="日期" width="180"></el-table-column>
                          <el-table-column align="center" label="事件类型" width="180"></el-table-column>
                          <el-table-column align="center" label="事件内容"></el-table-column>
                          <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                              <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                            </template>
                          </el-table-column>
                        </el-table>

                        <!-- 添加事件 -->
                        <div class="option-wrap">增加事件</div>
                        <!-- 表单 -->
                        <el-form ref="form" class="eventForm" label-width="80px"></el-form>
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
            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="140px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                <el-popconfirm
                  confirmButtonText="好的"
                  cancelButtonText="不用了"
                  icon="el-icon-info"
                  iconColor="red"
                  title="您确定要永久删除该员工吗？"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    slot="reference"
                    style="margin: 0 10px"
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

    <!-- 添加客户需求表单 -->
    <el-dialog title="新增客户" :visible.sync="addCustomerDialogVisible" width="300" center>
      <!-- 表单内容 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24" class="title-home">家庭情况</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户姓名" prop="name">
              <el-input size="mini" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="家庭面积" prop="family_area">
              <el-input size="mini" v-model="form.family_area"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="籍贯" prop="family_hometown">
              <el-input size="mini" v-model="form.family_hometown"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="服务类型" prop="service_type">
              <el-select size="mini" v-model="form.service_type" placeholder="请选择">
                <el-option label="长期" value="1"></el-option>
                <el-option label="短期" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-col :span="6" style="display: flex">
              
              <el-form-item label="家庭人口" prop="family_people">
                <el-input size="mini" v-model="form.family_people.old">
                  <template slot="prepend">老人</template>
                  <template slot="append">位</template>
                  </el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCustomerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomerDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import eventVue from "common/eventVue";
import CustomerSearch from "components/common/search/CustomerSearch";
export default {
  name: "Demand",
  data() {
    return {
      customers: [
        {
          name: "客户",
          family_area: "100.25",
          family_hometown: "安徽安庆",
          family_address: "家庭住址",
          service_type: "1",
          service_other: "其他服务类型",
          family_people: {
            children: 1,
            old: 2,
            adlut: 3,
          },
          service_content: "服务内容",
          demand_age: "20-30",
          demand_sex: 0,
          demand_education: "高中",
          demand_job: ["育婴师", "司机"],
          demand_zodiac: "牛",
          demand_experience: "2-3年",
          demand_census: "不限",
          demand_cooking: "川菜",
          demand_service_skill: "服务技能",
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
      // 是否显示添加需求的弹框
      addCustomerDialogVisible: false,

      // 添加编辑表单
      form: null,
      // 添加需求
      addCustomerForm: {
        name: "客户",
        family_area: "100.25",
        family_hometown: "安徽安庆",
        family_address: "家庭住址",
        service_type: "1",
        service_other: "其他服务类型",
        family_people: {
          children: 1,
          old: 2,
          adlut: 3,
        },
        service_content: "服务内容",
        demand_age: "20-30",
        demand_sex: 0,
        demand_education: "高中",
        demand_job: ["育婴师", "司机"],
        demand_zodiac: "牛",
        demand_experience: "2-3年",
        demand_census: "不限",
        demand_cooking: "川菜",
        demand_service_skill: "服务技能",
        mobile: "13695604265",
        state: "0",
        source: "来源",
      },
      // 编辑表单
      editCustomerForm: null,
    };
  },
  created() {
    // 创建完成后赋值
    this.form = this.addCustomerForm;
  },
  methods: {
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 添加客户需求
    addCustomerBtn() {
      // 表单赋值
      this.form = this.addCustomerForm;
      // 显示添加表单
      this.addCustomerDialogVisible = true;
    },

    // 选择删除
    selectDeleteBtn() {},
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
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
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

.title-home {
  padding: 10px 10px;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 700;
  border-bottom: 1px solid #dcdfe6;
}
</style>
