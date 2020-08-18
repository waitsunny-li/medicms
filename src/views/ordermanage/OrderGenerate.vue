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
            @expand-change="expandShow"
          >
            <!-- 展示 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tabs v-model="activeName" @tab-click="tabsClick">
                  <el-tab-pane label="对家政员的需求" name="first">
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
                        <span>{{ scope.row.demand_service_skill.join(',') }}</span>
                      </el-form-item>
                      <el-form-item label="厨艺">
                        <span>{{ scope.row.demand_cooking.join('，') }}</span>
                      </el-form-item>
                      <el-form-item label="家政从业经验">
                        <span>{{ scope.row.demand_experience }}</span>
                      </el-form-item>

                      <el-form-item label="工资待遇">
                        <span>{{ scope.row.demand_salary }} / 月</span>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="面试记录" name="second">
                    <!-- 表单 -->
                    <el-table
                      stripe
                      :data="interviewFormData"
                      style="width: 100%"
                      height="450px"
                      v-loading="interviewLoading"
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
                            size="mini"
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
                          <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            style="margin-right: 5px"
                            @click="editInterviewBtn(scope.row.id)"
                          ></el-button>
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

                    <div class="add-wrap" style="margin-top: 20px; ">
                      <el-button size="mini">添加面试</el-button>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="跟进记录" name="third">
                    <!-- 表单 -->
                    <el-table
                      :data="followUpFormData"
                      stripe
                      style="width: 100%"
                      height="250px"
                      v-loading="followupLoading"
                    >
                      <el-table-column prop="time" align="center" label="日期" width="120"></el-table-column>
                      <el-table-column prop="record" align="center" label="跟单记录情况" width="180"></el-table-column>
                      <el-table-column prop="recommend" align="center" label="推荐面试人员" width="110"></el-table-column>
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
                      ref="addFollowUpForm"
                      :model="addFollowUpForm"
                      :rules="addFollowUpFormRules"
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
                              class="followDate"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label-width="100px" label="推荐面试人员" prop="recommend">
                            <el-input size="mini" v-model="addFollowUpForm.recommend"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="面试情况" prop="interview_content">
                            <el-input size="mini" v-model="addFollowUpForm.interview_content"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="需求状态" prop="state">
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
                          <el-form-item label="跟单记录情况" label-width="110px" prop="record">
                            <el-input type="textarea" v-model="addFollowUpForm.record"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <!-- 保存按钮 -->
                    <el-row>
                      <el-col :span="5" :offset="22">
                        <el-button size="mini" type="primary" round>保 存</el-button>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane label="合同" name="fourth">合同</el-tab-pane>
                </el-tabs>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="id" label="订单号" width="80">
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
                  <span style="margin-left: 10px">{{scope.row.name}}</span>
                </div>
              </template>
            </el-table-column>

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
                <p v-if="scope.row.service_type == 0">{{scope.row.service_other}}</p>
                <p v-if="scope.row.service_type == 1">全日住家型</p>
                <p v-if="scope.row.service_type == 2">日间照料型</p>
                <p v-if="scope.row.service_type == 3">计时收费型</p>
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
                <p v-if="scope.row.state == 0">面试中</p>
                <p v-if="scope.row.state == 1">进行中</p>
                <p v-if="scope.row.state == 3">结束</p>
                <p v-if="scope.row.state == 4">取消</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="create_time"
              label="录入时间"
              :show-overflow-tooltip="true"
            ></el-table-column>
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
          <el-form-item label-width="40px" label="编号" prop="staff_number">
            <el-input size="mini" v-model="orderSuccessForm.staff_number"></el-input>
          </el-form-item>
          <el-form-item label-width="40px" label="姓名" prop="name">
            <el-input size="mini" v-model="orderSuccessForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addFirstDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveFirstStaff">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 编辑订单 -->
    <el-dialog
      :title="editCustomerTitle"
      :visible.sync="editDialogVisible"
      @close="editDialogClose"
      width="900px"
      center
    >
      <div class="content">
        <el-form :inline="true" ref="form" :model="form" :rules="formRules" class="add-user-form">
          <!-- 主体 -->
          <div class="content-wrap">
            <el-row>
              <el-col :span="4">
                <el-form-item label="状态" prop="state">
                  <el-select size="mini" v-model="form.state" placeholder="请选择">
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
                  <el-form-item label="签合同时工资" prop="contract_wages" class="contract_wages">
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
                  <el-form-item label="第二联系人" prop="second_contacter">
                    <el-input size="mini" v-model="form.second_contacter" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="第二联系人电话" prop="second_contact_tel" class="contract_wages">
                    <el-input size="mini" v-model="form.second_contact_tel"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveEditOrder">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 编辑面试 -->
    <el-dialog
      title="提示"
      :visible.sync="editInterviewDialogVisible"
      width="30%"
      center
      @close="inaterviewhide"
      append-to-body
    >
      <el-form
        ref="interviewform"
        :model="interviewForm"
        :rules="interviewFormRules"
        class="eventForm"
        label-width="80px"
        style="width: 100%; margin-top: 10px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="110px" label="面试人员编号" prop="staff_number">
              <el-autocomplete
                v-model="interviewForm.staff_number"
                :fetch-suggestions="querySearchAsync"
                size="mini"
                placeholder="请输入面试人员编号"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="interviewForm.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="interviewForm.mobile" size="mini"></el-input>
            </el-form-item>
          </el-col>
         
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="是否通过" prop="is_success">
              <el-switch v-model="interviewForm.is_success" active-color="#13ce66"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="面试内容" prop="interviewer_content">
              <el-input v-model="interviewForm.interviewer_content" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editInterviewDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveInterviewInfo">保 存</el-button>
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
import {
  getCustomerInfo,
  saveEditOrderInfo,
  deleteOrderInfo,
  saveFisrstStaff,
  deleteInterview,
  getInterviewInfo,
  saveInterview,
  getFollowUpInfo,
  saveFollowUpInfo,
  getOneCustomerInfo,
} from "network/orderRequest";
import { getAllSource } from "network/select";
export default {
  name: "OrderGenerate",
  data() {
    return {
      // 订单列表
      orderList: [],
      // 单个订单信息
      orderInfo: {},
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
      source: [],
      // 展开默认位置
      activeName: "first",

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
      formRules: {
        state: [{ required: true, message: "请输入状态", trigger: "blur" }],
        identity: [
          { required: true, message: "请输入身份证", trigger: "blur" },
        ],
        contract_number: [
          { required: true, message: "请输入合同号", trigger: "blur" },
        ],
        contrace_start_end: [
          { required: true, message: "请输入合同起止", trigger: "blur" },
        ],
        second_contacter: [
          { required: true, message: "请输入第二联系人", trigger: "blur" },
        ],
        second_contact_tel: [
          { required: true, message: "请输入第二联系人电话", trigger: "blur" },
        ],
      },
      // 默认表单
      form: {},

      // 添加首次服务员工
      addFirstDialogVisible: false,
      // 订单完成表单
      orderSuccessForm: {
        id: "",
        is_success: false,
        staff_number: "",
        name: "",
      },
      // 订单完成规则
      orderSuccessRules: {
        staff_number: [
          { required: true, message: "请输入员工编号", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
      },
      // 当前所点击的订单号id
      currentOrderId: "",

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
      interviewLoading: false,

      // 编辑面试
      editInterviewDialogVisible: true,
      interviewForm: {
        staff_id: "",
        interviewer_content: "",
        status: "",
      },
      interviewFormRules: {
        staff_number: [
          { required: true, message: "请输入员工编号", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入员工电话", trigger: "blur" },
        ],
        interviewer_content: [
          { required: true, message: "请输入面试内容", trigger: "blur" },
        ],
      },

      interStaff: [
        { value: "AF12549", name: "赵小爱", mobile: "13955844778" },
        { value: "AF12365", name: "范进", mobile: "13955844378" },
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
      followupLoading: false,
      // 添加跟进
      addFollowUpForm: {
        time: "",
        record: "",
        recommend: "",
        interview_content: "",
        state: "",
      },
      addFollowUpFormRules: {
        record: [
          { required: true, message: "请输入跟进记录", trigger: "blur" },
        ],
        state: [{ required: true, message: "请输入需求状态", trigger: "blur" }],
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
    // 定义获取客户需求信息
    getAllOrderInfo() {
      this.loading = true;
      getCustomerInfo().then((res) => {
        if (res.code === 200) {
          // 获取客户数据
          this.orderList = res.data.data;
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
    // 搜索按钮点击
    searchBtn(searchForm) {
      console.log("订单列表", searchForm);
    },
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      console.log(currentpage);
    },

    // 是否删除该订单
    formDeleteBtn(id) {
      console.log(id);
      deleteOrderInfo(id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          // 重新获取所有订单
          this.getAllCustomerInfo();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 编辑显示
    editBtn(name, id) {
      this.editCustomerTitle = `编辑客户（${name}）的订单`;
      this.editDialogVisible = true;
    },

    // 保存编辑订单
    saveEditOrder() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveEditOrderInfo(this.form).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.editDialogVisible = false;
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 显示面试和跟进
    expandShow(row, expandedRows) {
      if (expandedRows.length == 0) return;
      // 赋值当前点击展开的订单号
      this.currentOrderId = row.id;
      console.log(row.id);
      // // 获取面试记录
      this.getAllInterviewInfo(row.id);
      // // 获取跟进记录
      // this.getAllFollowUpInfo(id);
    },


    // 搜索选中
    handleSelect(item) {
      console.log(item);
    },

    // 编辑订单弹框的关闭回调
    editDialogClose() {
      this.$refs.form.resetFields();
    },

    // 订单号按钮（显示订单详情）
    orderInfoBtn(name, id) {
      this.orderInfoTitle = `（${name}）订单的基本信息`;
      this.orderInfoDialogVisible = true;
      this.orderInfoLoading = true;
      getOneCustomerInfo(id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          console.log(data);
          this.orderInfo = data;
          this.orderInfoLoading = false;
        } else {
          this.$message.error(msg);
          this.orderInfoLoading = false;
        }
      });
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
      this.orderSuccessForm.id = id;
    },

    // 添加完成订单关闭回调
    addFirstDialogClose() {
      this.$refs.orderSuccessForm.resetFields();
    },

    // 保存首位服务人员
    saveFirstStaff() {
      this.$refs.orderSuccessForm.validate((valid) => {
        if (valid) {
          saveFisrstStaff(this.orderSuccessForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.addFirstDialogVisible = false;
              // 刷新订单
              this.getAllOrderInfo();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    /**
     * 面试管理
     */
    // 定义获取面试记录的函数
    getAllInterviewInfo(id) {
      this.interviewLoading = true;
      getInterviewInfo({ customer_id: id }).then((res) => {
        let { code, data, msg } = res;
        console.log(res);
        if (code === 200) {
          this.interviewFormData = data;
          this.interviewLoading = false;
        } else {
          this.$message.error(msg);
          this.interviewLoading = false;
        }
      });
    },
    // 定义获取所有跟进记录的函数
    getAllFollowUpInfo(id) {
      this.followupLoading = true;
      getFollowUpInfo(id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.followUpFormData = data;
          this.followupLoading = false;
        } else {
          this.$message.error(msg);
          this.followupLoading = false;
        }
      });
    },

    // tabs点击回调
    tabsClick(options) {
      // let { index } = options;
      // if (index == 0) {
      //   this.getAllInterviewInfo(this.currentOrderId);
      // }
      // if (index == 1) {
      //   this.getAllFollowUpInfo(this.currentOrderId);
      // }
    },

    // 展开面试是回调(展示时开始获取所有面试，和所有跟进)
    interviewShow(id) {
      // this.getAllInterviewInfo(id)
    },
    inaterviewhide() {
      console.log("jjj");
      this.$refs.interviewform.resetFields();
      this.$refs.addFollowUpForm.resetFields();
    },
    // 搜索面试人员
    querySearchAsync(queryString, cb) {
      console.log(queryString);
      this.timeout = setTimeout(() => {
        // 返回地一定要是一个数组，并且数组每个对象都要包含value才能显示在选项框中
        cb(this.interStaff);
      }, 3000 * Math.random());
    },
    // 编辑面试显示按钮
    editInterviewBtn(id) {
      this.editInterviewDialogVisible = true;
    },

    // 处理面试人员编号框选择事件
    handleSelect(item) {
      console.log(item);
      this.interviewForm.staff_number = item.value;
      this.interviewForm.name = item.name;
      this.interviewForm.mobile = item.mobile;
    },
    // 面试删除记录
    interViewDeleteBtn(id) {
      deleteInterview(id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 保存面试记录
    saveInterviewInfo() {
      this.$refs.interviewform.validate((valid) => {
        if (valid) {
          saveInterview(this.interviewForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$messagew.success(msg);
              this.getAllInterviewInfo(this.currentOrderId);
              // 完成后清除旧内容
              this.$refs.interviewform.resetFields();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          this.$message.warning("请输入必填字段！");
          return false;
        }
      });
    },

    /**
     * 跟进记录
     */
    // 保存跟进内容
    saveFollowUpInfo() {
      this.$refs.addFollowUpForm.validate((valid) => {
        if (valid) {
          saveFollowUpInfo(this.addFollowUpForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$messagew.success(msg);
              this.getAllFollowUpInfo(this.currentOrderId);
              // 完成后清除旧内容
              this.$refs.addFollowUpForm.resetFields();
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
    StaffInfo,
    OrderInfo,
    Pagination,
  },
  created() {
    this.getAllOrderInfo();
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

    // 获取需求来源
    getAllSource().then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        this.source = data;
      } else {
        this.$message.error(msg);
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

      /deep/.staffInfo-wrap {
        margin-left: 70px;
      }

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
  padding: 15px 0;

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

// 跟进riqi
.followDate {
  /deep/.el-input__inner {
    padding-right: 0;
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
    width: 5px;
    height: 10px;
  }
}

.infollow {
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
