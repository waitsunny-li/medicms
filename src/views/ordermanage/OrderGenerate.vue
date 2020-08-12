<template>
  <div class="order-generate">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>

        <!-- 表单 -->
        <el-card class="table-content" :style="{height: screenHeight}">
          <!-- 表单内容 -->
          <!-- 表单 -->
          <el-table
            :data="orderList"
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
                          <el-table-column align="center" label="面试日期" prop="time"></el-table-column>
                          <el-table-column
                            prop="interviewer_number"
                            align="center"
                            label="面试人员编号"
                            width="120"
                          ></el-table-column>
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
                          <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                              <el-popconfirm
                                confirmButtonText="确定"
                                cancelButtonText="不用了"
                                icon="el-icon-info"
                                iconColor="red"
                                title="这一段面试确定删除吗？"
                                @onConfirm="interViewDeleteBtn(scope.row.id)"
                              >
                                <el-button
                                  slot="reference"
                                  type="danger"
                                  icon="el-icon-delete"
                                  size="mini"
                                  circle
                                ></el-button>
                              </el-popconfirm>
                            </template>
                          </el-table-column>
                        </el-table>

                        <!-- 添加事件 -->
                        <div class="option-wrap">
                          <i class="el-icon-folder-add"></i> 添加面试
                        </div>
                        <!-- 表单 -->
                        <el-form
                          ref="interviewForm"
                          :model="interviewForm"
                          class="eventForm"
                          label-width="80px"
                          style="width: 100%; margin-top: 10px"
                        >
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label-width="100px" label="面试人员编号">
                                <el-autocomplete
                                  v-model="interviewForm.interviewer_number"
                                  :fetch-suggestions="querySearchAsync"
                                  size="mini"
                                  placeholder="请输入面试人员编号"
                                  @select="handleSelect"
                                ></el-autocomplete>
                              </el-form-item>
                            </el-col>
                            <el-col :span="5">
                              <el-form-item label="姓名">
                                <el-input v-model="interviewForm.name" size="mini"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="手机号">
                                <el-input v-model="interviewForm.tel" size="mini"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="5">
                              <el-form-item label="是否通过">
                                <el-switch
                                  v-model="interviewForm.is_success"
                                  active-color="#13ce66"
                                ></el-switch>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="24">
                              <el-form-item label="面试内容">
                                <el-input
                                  v-model="interviewForm.interviewer_content"
                                  type="textarea"
                                ></el-input>
                              </el-form-item>
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
                        <el-table
                          :data="followUpFormData"
                          stripe
                          style="width: 100%"
                          height="200px"
                        >
                          <el-table-column prop="time" align="center" label="日期" width="120"></el-table-column>
                          <el-table-column prop="record" align="center" label="跟单记录情况" width="180"></el-table-column>
                          <el-table-column
                            prop="recommend"
                            align="center"
                            label="推荐面试人员"
                            width="110"
                          ></el-table-column>
                          <el-table-column prop="interview_content" align="center" label="需求状态"></el-table-column>
                          <el-table-column prop="interview_content" align="center" label="面试情况"></el-table-column>
                          <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                              <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                            </template>
                          </el-table-column>
                        </el-table>

                        <!-- 添加事件 -->
                        <div class="option-wrap">
                          <el-row>
                            <el-col :span="8">
                              <i class="el-icon-folder-add"></i> 添加跟进
                            </el-col>
                          </el-row>
                        </div>
                        <!-- 表单 -->
                        <el-form
                          ref="form"
                          :model="addFollowUpForm"
                          class="eventForm"
                          label-width="80px"
                          style="margin-top: 10px"
                        >
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="日期" prop="time" label-width="50px">
                                <el-date-picker
                                  v-model="addFollowUpForm.time"
                                  type="date"
                                  size="mini"
                                  placeholder="选择日期"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd"
                                  style="width: 150px"
                                ></el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label-width="100px" label="推荐面试人员">
                                <el-input size="mini" v-model="addFollowUpForm.recommend"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="10">
                              <el-form-item label="面试情况">
                                <el-input size="mini" v-model="addFollowUpForm.interview_content"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="需求状态">
                                <el-select
                                  size="mini"
                                  v-model="addFollowUpForm.state"
                                  placeholder="请选择"
                                >
                                  <el-option label="跟进中" value="跟进中"></el-option>
                                  <el-option label="撤销" value="撤销"></el-option>
                                  <el-option label="换人" value="换人"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="17" :offset="1">
                              <el-form-item label="跟单记录情况" label-width="100px">
                                <el-input type="textarea" v-model="addFollowUpForm.record"></el-input>
                              </el-form-item>
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
            <el-table-column fixed="right" label="操作" align="center" width="140px">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :enterable="false"
                  content="编辑订单"
                  placement="top"
                >
                  <el-button
                    @click="editBtn(scope.row.name, scope.row.id)"
                    size="mini"
                    type="primary"
                    class="el-icon-edit"
                    circle
                    style="margin-right: 10px"
                  ></el-button>
                </el-tooltip>

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

    <!-- 调出家政员的基本信息 -->
    <el-dialog :title="staffInfoTitle" :visible.sync="staffInfoDialogVisible" width="870px" center>
      <staff-info :staffInfo="staffInfo" :staffInfoLoading="staffInfoLoading"></staff-info>
    </el-dialog>

    <!-- 调出订单的基本详情 -->
    <el-dialog :title="orderInfoTitle" :visible.sync="orderInfoDialogVisible" width="870px" center>
      <order-info :orderInfo="orderInfo" :orderInfoLoading="orderInfoLoading"></order-info>
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

    <!-- 编辑订单 -->
    <el-dialog :title="editCustomerTitle" :visible.sync="editDialogVisible" width="900px" center>
      <div class="content">
        <el-form :inline="true" ref="form" :model="form" class="add-user-form">
          <!-- 主体 -->
          <div class="content-wrap">
            <el-row>
              <el-col :span="4">
                <el-form-item label="状态" prop="state">
                  <el-select size="mini" multiple v-model="form.state" placeholder="请选择">
                    <el-option label="服务中" value="服务中"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="身份证" prop="identity">
                  <el-input size="mini" v-model="form.identity" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同号" prop="contract_number">
                  <el-input size="mini" v-model="form.contract_number" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="合同起止" class="registration_address" prop="contrace_start_end">
                  <el-date-picker
                    style="width: 310px"
                    size="mini"
                    v-model="form.contrace_start_end"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <el-form-item label="合同费" prop="contract_cost">
                  <el-input size="mini" v-model="form.contract_cost"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="保险单位" prop="insurance_unit">
                  <el-select v-model="form.insurance_unit" size="mini">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="现在工资" prop="now_wages">
                  <el-input size="mini" v-model="form.now_wages"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-col :span="12">
                  <el-form-item label="家政员提成" prop="staff_percentage">
                    <el-input size="mini" v-model="form.staff_percentage"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="签合同时工资" prop="education" class="contract_wages">
                    <el-input size="mini" v-model="form.contract_wages"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="家庭情况备注" class="registration_address" prop="family_remarks">
                  <el-input
                    style="width: 515px"
                    size="mini"
                    v-model="form.family_remarks"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" :offset="3">
                <el-col :span="12">
                  <el-form-item label="第二联系人" prop="staff_percentage">
                    <el-input size="mini" v-model="form.staff_percentage" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="第二联系人电话" prop="education" class="contract_wages">
                    <el-input size="mini" v-model="form.contract_wages"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="editDialogVisible = false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CustomerSearch from "components/common/search/CustomerSearch";
import StaffInfo from "components/common/table/StaffInfo";
import Pagination from "components/common/pagination/Pagination";
import OrderInfo from "components/common/table/OrderInfo";
import { getOneStraffInfo } from "network/humanageRequest";
export default {
  name: "OrderGenerate",
  data() {
    return {
      // 订单列表
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
          service_content: "",
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
      // 单个订单信息
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
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 是否显示家政员的dialogvisible
      staffInfoDialogVisible: false,
      // 是否加载
      loading: false,

      // 家政员工的基本信息
      staffInfo: {},
      staffInfoLoading: false,
      staffInfoTitle: "",

      // 订单的基本详情
      orderInfoDialogVisible: false,
      orderInfoLoading: false,
      orderInfoData: {},
      orderInfoTitle: "",

      // 编辑订单内容
      editDialogVisible: false,
      editCustomerTitle: "",
      editForm: {
        identity: "",
        state: "",
        contract_number: "",
        contrace_start_end: [],
        contrace_period: "", // 合同期可能是计算得出
        contract_cost: "",
        insurance_unit: "", // 保险单位
        second_contacter: "", //
        second_contact_tel: "", //
        staff_percentage: "",
        family_remarks: "",
        now_wages: "",
        contract_wages: "",
      },
      // 默认表单
      form: {},

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
            id: "1",
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
            id: "1",
            name: "小爱同学",
          },
          tel: "13955844668",
          interviewer_content: "是否有洁癖",
          is_success: true,
        },
      ],

      interviewForm: {
        interviewer_number: "",
        name: "",
        tel: "",
        interviewer_content: "",
        is_success: false,
      },

      interff: [
        { value: "1", name: "liweilong" },
        { value: "2", name: "hahah" },
      ],

      /**
       * 跟进
       */
      // 获取跟进列表
      followUpFormData: [
        {
          time: "2019-12-12",
          record: "jjj",
          recommend: "里晓安",
          interview_content: "不合格呀",
        },
        {
          time: "2019-02-12",
          record: "jjj",
          recommend: "李只想",
          interview_content: "不合格呀",
        },
        {
          time: "2019-02-12",
          record: "jjj",
          recommend: "李只想",
          interview_content: "不合格呀",
        },
        {
          time: "2019-02-12",
          record: "jjj",
          recommend: "李只想",
          interview_content: "不合格呀",
        },
      ],
      // 添加跟进
      addFollowUpForm: {
        time: "",
        record: "",
        recommend: "",
        interview_content: "",
        state: "",
      },
    };
  },
  computed: {
    language() {
      return this.staffInfo.language;
    },
    screenHeight() {
      return this.$store.state.screenHeight - 210 + "px";
    },
    scrollHeight() {
      return this.$store.state.screenHeight - 290 + "px";
    },
  },
  watch: {},
  methods: {
    // 搜索按钮点击
    searchBtn(searchForm) {
      console.log("订单列表", searchForm);
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 是否删除该订单
    formDeleteBtn(id) {
      console.log(id);
    },

    // 编辑显示
    editBtn(name, id) {
      this.editCustomerTitle = `编辑客户（${name}）的订单`;
      this.editDialogVisible = true;
    },

    // 订单号按钮（显示订单详情）
    orderInfoBtn(name, id) {
      this.orderInfoTitle = `（${name}）订单的基本信息`;
      this.orderInfoDialogVisible = true;
    },

    // 员工基本详情
    staffInfoBtn(name, id) {
      this.staffInfoTitle = `家政员（${name}）的基本信息`;
      this.staffInfoDialogVisible = true;
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

    /**
     * 面试管理
     */
    // 搜索面试人员
    querySearchAsync(queryString, cb) {
      console.log(queryString);
      this.timeout = setTimeout(() => {
        // 返回地一定要是一个数组，并且数组每个对象都要包含value才能显示在选项框中
        cb(this.interff);
      }, 3000 * Math.random());
    },
    // 处理面试人员编号框选择事件
    handleSelect(item) {
      console.log(item);
    },
    // 面试删除记录
    interViewDeleteBtn(id) {
      console.log(id);
    },

    /**
     * 跟进记录
     */
  },
  components: {
    CustomerSearch,
    StaffInfo,
    OrderInfo,
    Pagination
  },
  created() {
    // 默认赋值
    this.form = this.editForm;
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

    // 获取当前时间
    this.addFollowUpForm.time = new Date()
      .toLocaleDateString()
      .replace(/\//g, "-");
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
</style>
