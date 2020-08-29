<template>
  <div class="demand">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>
        <!-- 客户表单 -->
        <el-card class="table-content" :style="{height: screenHeight}">
          <!-- 公共操作 -->
          <el-row>
            <el-col :span="22">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="addCustomerBtn" 
              v-has-power="{limitList: [1, 2, 4, 5], role_id: $store.state.userInfo.role_id}">新增需求</el-button>
              <el-button
                v-has-power="{limitList: [1, 4], role_id: $store.state.userInfo.role_id}"
                type="danger"
                icon="el-icon-delete"
                @click="selectDeleteBtn"
                size="mini"
              >取消</el-button>
            </el-col>
            <el-col :span="2">
              <el-tooltip class="item" effect="dark" content="增删改查" placement="top">
                <el-button
                  v-has-power="{limitList: [1, 4], role_id: $store.state.userInfo.role_id}"
                  icon="el-icon-takeaway-box"
                  size="mini"
                  @click="sourceListBtn"
                  type="primary"
                >来源</el-button>
              </el-tooltip>
            </el-col>
          </el-row>

          <!-- 表单 -->
          <el-table
            :data="customers"
            @selection-change="handleSelectionChange"
            class="user-table-wrap"
            style="width: 100%"
            :height="scrollHeight"
            v-loading="loading"
            border
            :default-sort="{prop: 'create_time', order: 'descending'}"
          >
            <!-- 选择 -->
            <el-table-column
              class="select"
              type="selection"
              :show-overflow-tooltip="false"
              width="35"
            ></el-table-column>

            <el-table-column align="center" prop="name" label="姓名" width="80"></el-table-column>
            <el-table-column align="center" prop="family_hometown" label="家庭成员籍贯" min-width="110"></el-table-column>
            <el-table-column
              class="identify"
              align="center"
              prop="service_type"
              label="服务类型"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div v-for="item in service_types" :key="item.id">
                  <p v-if="scope.row.service_type == item.id">{{item.name}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="service_content"
              :show-overflow-tooltip="true"
              label="需要服务"
            ></el-table-column>
            <el-table-column align="center" label="家庭成员" :show-overflow-tooltip="true">
              <template
                slot-scope="scope"
              >{{scope.row.family_people.children}}小孩，{{scope.row.family_people.adlut}}成人，{{scope.row.family_people.old}}老人</template>
            </el-table-column>
            <el-table-column align="center" prop="mobile" label="手机号">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.mobile" placement="top">
                  <i class="el-icon-phone" style="color: red; font-size: 20px"></i>
                </el-tooltip>
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
                <p v-if="scope.row.state == 0">审核中</p>
                <p v-if="scope.row.state == 1">待进行</p>
                <p v-if="scope.row.state == 2">订单进行中</p>
                <p v-if="scope.row.state == 3">已完成</p>
                <p v-if="scope.row.state == 4">已取消</p>
                <p v-if="scope.row.state == 5">暂停中</p>
                <p v-if="scope.row.state == 6">重新恢复</p>
              </template>
            </el-table-column>
            <el-table-column
              width="130px"
              :show-overflow-tooltip="true"
              align="center"
              sortable
              prop="create_time"
              label="录入时间"
            ></el-table-column>
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
            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="140px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="customerEditBtn(scope.row.name, scope.row.id)"
                  circle
                  v-has-power="{limitList: [1, 2, 4, 5], role_id: $store.state.userInfo.role_id}"
                ></el-button>
                <el-popconfirm
                  confirmButtonText="好的"
                  cancelButtonText="不用了"
                  icon="el-icon-info"
                  iconColor="red"
                  title="您确定要取消该客户订单吗？"
                  @onConfirm="DeleteFormBtn(scope.row.id)"
                >
                  <el-button
                    v-has-power="{limitList: [1, 4], role_id: $store.state.userInfo.role_id}"
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

    <!-- 添加客户需求表单 -->
    <el-dialog
      :title="addEditFormTitle"
      @close="formDialogClose"
      :visible.sync="addCustomerDialogVisible"
      class="addFormDialog"
      width="850px"
      center
    >
      <!-- 表单内容 -->
      <el-form
        ref="form"
        :rules="formRules"
        :model="form"
        label-width="80px"
        v-loading="addEditFormLoading"
      >
        <el-row>
          <el-col :span="24" class="title-home">
            <el-col :span="15">
              <i class="el-icon-s-home"></i> 家庭情况
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户姓名" prop="name">
              <el-input size="mini" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户手机" prop="mobile">
              <el-input size="mini" v-model="form.mobile"></el-input>
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
                <el-option
                  v-for="item in service_types"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="家庭面积" prop="family_area">
              <el-input size="mini" v-model="form.family_area"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="来源" prop="source_id">
              <el-select size="mini" v-model="form.source_id" placeholder="请选择">
                <el-option
                  v-for="item in source"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item
              label-width="90"
              label="其他服务类型"
              prop="service_other"
              style="display: flex"
            >
              <el-input size="mini" v-model="form.service_other"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" class="family-people">
            <el-col :span="8" style="display: flex">
              <el-form-item label="家庭人口" prop="family_people.old">
                <el-input size="mini" v-model="form.family_people.old" placeholder="老人几位？"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="display: flex">
              <el-form-item class="adult" prop="family_people.adult">
                <el-input size="mini" v-model="form.family_people.adult" placeholder="成人几位？"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="display: flex">
              <el-form-item class="children" prop="family_people.children">
                <el-input size="mini" v-model="form.family_people.children" placeholder="小孩几位？"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="12">
            <el-form-item class="address" label="详细地址" prop="family_address">
              <el-input size="mini" v-model="form.family_address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 服务内容 -->
        <el-row v-if="isAddForm">
          <el-col :sapn="24">
            <el-form-item label="服务内容">
              <el-checkbox-group @change="checkboxChange" v-model="selectSericeList">
                <el-checkbox name="name" :label="0">
                  做
                  <input class="small-line-input" v-model="cookNumber" size="mini" />人饭菜
                </el-checkbox>
                <el-checkbox :label="1">买菜</el-checkbox>
                <el-checkbox :label="2">
                  手洗
                  <input class="small-line-input" v-model="handWashing" size="mini" />人衣服
                </el-checkbox>
                <el-checkbox :label="3">
                  机洗
                  <input class="small-line-input" v-model="autoWashing" size="mini" />人衣服
                </el-checkbox>
                <el-checkbox :label="4">
                  照看
                  <input class="small-line-input" v-model="lookAfter" size="mini" />小孩
                </el-checkbox>
                <el-checkbox :label="5">
                  带
                  <input class="small-line-input" v-model="sleep" size="mini" />小孩睡觉
                </el-checkbox>
                <el-checkbox :label="6">
                  接送
                  <input class="small-line-input" v-model="goSchool" size="mini" />岁小孩上学
                </el-checkbox>
                <el-checkbox :label="7">
                  其他
                  <input class="small-line-input2" v-model="otherContent" size="mini" />
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="24">
            <el-form-item label="服务内容" prop="service_content">
              <el-input type="textarea" size="mini" v-model="form.service_content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 以下对家政员的需求 -->
        <el-row>
          <el-col :span="24" class="title-home">
            <i class="el-icon-s-check"></i> 对家政员的需求
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="年龄" prop="demand_age">
              <el-select size="mini" v-model="form.demand_age" placeholder="请选择">
                <el-option label="无" value="0"></el-option>
                <el-option label="40岁以下" value="40"></el-option>
                <el-option label="45岁以下" value="45"></el-option>
                <el-option label="50岁以下" value="50"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="岗位" prop="demand_job">
              <el-select multiple size="mini" v-model="form.demand_job" placeholder="请选择">
                <el-option
                  v-for="item in jobs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="籍贯" prop="demand_census">
              <el-input size="mini" v-model="form.demand_census"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" prop="demand_sex">
              <el-select size="mini" v-model="form.demand_sex" placeholder="请选择">
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="2"></el-option>
                <el-option label="不限" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="学历" prop="demand_education">
              <el-select size="mini" v-model="form.demand_education" placeholder="请选择学历">
                <el-option label="无" value="无"></el-option>
                <el-option label="小学" value="小学"></el-option>
                <el-option label="初中" value="初中"></el-option>
                <el-option label="高中" value="高中"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="研究生" value="研究生"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生肖" prop="demand_zodiac">
              <el-select size="mini" v-model="form.demand_zodiac" placeholder="请选择">
                <el-option label="无" value="无"></el-option>
                <el-option
                  v-for="item in zodiacs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="厨艺" prop="demand_cooking">
              <el-select size="mini" v-model="form.demand_cooking" placeholder="请选择" multiple>
                <el-option
                  v-for="item in cookings"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="语言" prop="demand_language">
              <el-select size="mini" multiple v-model="form.demand_language" placeholder="请选择">
                <el-option
                  v-for="item in languages"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="服务技能" prop="demand_service_skill">
              <el-select size="mini" multiple v-model="form.demand_service_skill" placeholder="请选择">
                <el-option
                  v-for="item in skills"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="9">
            <el-form-item
              style="margin-left: 20px"
              label="家政从业经验"
              prop="demand_experience"
              label-width="100"
            >
              <el-select
                style="width: 150px"
                size="mini"
                v-model="form.demand_experience"
                placeholder="请选择"
              >
                <el-option label="2~3年" value="2~3"></el-option>
                <el-option label="3~5年" value="3~5"></el-option>
                <el-option label="5~10年" value="5~10"></el-option>
                <el-option label="10~20年" value="10~20"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="工资">
              <el-col :span="10">
                <el-input size="mini" v-model="wages_start"></el-input>
              </el-col>
              <el-col :span="2" :offset="1">~</el-col>
              <el-col :span="10">
                <el-input size="mini" v-model="wages_end"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="其他要求" prop="service_other_content">
              <el-input size="mini" type="textarea" v-model="form.service_other_content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addCustomerDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveCustomerInfo" v-if="isAddForm">保 存</el-button>
        <el-button size="mini" v-else type="primary" @click="saveEditCustomerInfo">编 辑</el-button>
      </span>
    </el-dialog>

    <el-dialog title="来源列表" :visible.sync="sourceDialogVisible" width="600px" center>
      <el-table class="sourceList" :data="sourceListData" style="width: 100%" height="400">
        <el-table-column align="center" prop="id" label="编号" width="180"></el-table-column>
        <el-table-column align="center" prop="name" label="名称" width="180"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editSource(scope.row.id, scope.row.name)"
              circle
              style="margin-right: 5px"
            ></el-button>

            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="不用了"
              icon="el-icon-info"
              iconColor="red"
              title="你确定要删除吗？"
              @onConfirm="deleteSource(scope.row.id)"
            >
              <el-button type="danger" size="mini" icon="el-icon-delete" circle slot="reference"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="sourceDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addSource">新 增</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import eventVue from "common/eventVue";
import CustomerSearch from "components/common/search/CustomerSearch";
import Pagination from "components/common/pagination/Pagination";
import {
  addSourceData,
  editSourceData,
  deleteSourceData,
} from "network/humanageRequest";
import { getAllSelects, getAllSource, getJob } from "network/select";
import {
  searchCustomerInfo,
  saveCustomerInfo,
  getOneCustomerInfo,
  deleteCustomer,
  updateCustomer,
} from "network/orderRequest";
export default {
  name: "Demand",
  data() {
    return {
      // 来源增删改查
      sourceDialogVisible: false,
      sourceListData: [],

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
      // 是否显示添加需求的弹框
      addCustomerDialogVisible: false,
      // 添加等待
      addEditFormLoading: false,

      // 添加编辑表单
      form: null,
      // 添加编辑头部
      addEditFormTitle: "",
      // 添加需求
      addCustomerForm: {
        name: "",
        family_area: "",
        family_hometown: "",
        family_address: "",
        service_type: "",
        service_other: "",
        family_people: {
          children: "",
          old: "",
          adult: "",
        },
        service_content: "",
        service_other_content: "",
        demand_age: "",
        demand_sex: "",
        demand_education: "",
        demand_zodiac: [],
        demand_experience: "",
        demand_job: [],
        demand_census: "",
        demand_cooking: [],
        demand_language: [],
        demand_service_skill: [],
        demand_salary: "",
        mobile: "",
        state: "",
        source_id: "",
      },
      // 工资起止
      wages_start: "",
      wages_end: "",

      // 岗位
      jobs: null,
      // 厨艺水平
      cookings: null,
      // 服务技能
      skills: null,
      languages: null,
      zodiacs: null,
      source: null,
      // 服务类型
      service_types: [],

      // 多选框
      selectSericeList: [],
      // 人数
      cookNumber: "",
      handWashing: "",
      autoWashing: "",
      lookAfter: "",
      sleep: "",
      goSchool: "",
      otherContent: "",

      selectSerice: [
        {
          content: "做" + this.cookNumberf + "人饭菜",
        },
        {
          content: "买菜",
        },
        {
          content: "手洗" + this.handWashing + "人衣服",
        },

        {
          content: "机洗" + this.autoWashing + "人衣服",
        },
        {
          content: "照看" + this.lookAfter + "小孩",
        },
        {
          content: "带" + this.sleep + "小孩睡觉",
        },
        {
          content: "接送" + this.goSchool + "岁小孩上学",
        },
        {
          content: this.otherContent,
        },
      ],
      cookNumber: "",
      // 编辑表单
      editCustomerForm: {},

      // 是否是添加客户服务弹框
      isAddForm: true,
      // 多选中
      selected: [],

      /**
       * 验证规则
       */
      formRules: {
        name: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
          { min: 2, max: 3, message: "长度在 2 到 3 个字符", trigger: "blur" },
        ],
        family_hometown: [
          { required: true, message: "请输入客户籍贯", trigger: "blur" },
        ],
        family_address: [
          { required: true, message: "请输入家庭地址", trigger: "blur" },
        ],
        family_area: [
          { required: true, message: "请输入家庭面积", trigger: "blur" },
        ],
        demand_age: [
          { required: true, message: "请输入员工年龄", trigger: "blur" },
        ],
        demand_job: [
          { required: true, message: "请输入员工岗位", trigger: "blur" },
        ],
        demand_experience: [
          { required: true, message: "请输入员工从业经验", trigger: "blur" },
        ],
        demand_census: [
          { required: true, message: "请输入员工籍贯", trigger: "blur" },
        ],
        demand_service_skill: [
          { required: true, message: "请输入服务技能", trigger: "blur" },
        ],
        demand_sex: [
          { required: true, message: "请输入员工性别", trigger: "blur" },
        ],
        demand_cooking: [
          { required: true, message: "请输入员工厨艺", trigger: "blur" },
        ],

        mobile: [
          { required: true, message: "请输入家庭手机号", trigger: "blur" },
        ],
        source_id: [{ required: true, message: "请输入来源", trigger: "blur" }],
        state: [{ required: true, message: "请输入状态", trigger: "blur" }],
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
  watch: {
    cookNumber(value) {
      this.selectSerice[0].content = "做" + value + "人饭菜";
      this.checkboxChange();
    },
    handWashing(value) {
      this.selectSerice[2].content = "手洗" + value + "人衣服";
      this.checkboxChange();
    },
    autoWashing(value) {
      this.selectSerice[3].content = "机洗" + value + "人衣服";
      this.checkboxChange();
    },
    lookAfter(value) {
      this.selectSerice[4].content = "照看" + value + "小孩";
      this.checkboxChange();
    },
    sleep(value) {
      this.selectSerice[5].content = "带" + value + "小孩睡觉";
      this.checkboxChange();
    },
    goSchool(value) {
      this.selectSerice[6].content = "接送" + value + "岁小孩上学";
      this.checkboxChange();
    },
    otherContent(value) {
      this.selectSerice[7].content = value;
      this.checkboxChange();
    },
  },
  created() {
    // 创建完成后赋值
    this.form = this.addCustomerForm;

    // 获取客户数据
    this.getAllCustomerInfo();

    // 获取需求选择
    getAllSelects().then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        let { language, cooking, service_skill, job, zodiac } = data;
        this.languages = language;
        this.cookings = cooking;
        this.skills = service_skill;
        this.jobs = job;
        this.zodiacs = zodiac;
      } else {
        this.$message.error(msg);
      }
    });

    // 服务类型
    getJob().then((res) => {
      if (res.code === 200) {
        this.service_types = res.data;
      } else {
        this.$message.waraing("获取岗位失败！");
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
  },
  methods: {
    // 定义来源列表
    getAllSourceList() {
      getAllSource().then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.sourceListData = data;
          console.log(res);
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 来源按钮
    sourceListBtn() {
      this.getAllSourceList();
      this.sourceDialogVisible = true;
    },

    // 新增来源
    addSource() {
      this.$prompt("请输入要增加的来源名", "新增", {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          addSourceData(value).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.getAllSourceList();
            } else {
              this.$message.error(msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 编辑来源
    editSource(source_id, name) {
      this.$prompt("请输入更改后的来源名", "编辑", {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
        inputValue: name,
      })
        .then(({ value }) => {
          editSourceData(source_id, value).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.getAllSourceList();
            } else {
              this.$message.error(msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    // 删除来源
    deleteSource(source_id) {
      deleteSourceData(source_id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.getAllSourceList();
        } else {
          this.$message.error(msg);
        }
      });
    },

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
      this.searchForm.page = currentpage;
      this.getSearchInfoData(this.searchForm);
    },

    // 添加客户需求
    addCustomerBtn() {
      this.addEditFormTitle = `新增客户`;
      // 表单赋值
      this.form = this.addCustomerForm;
      // 修改添加服务内容的显示
      this.isAddForm = true;
      // 显示添加表单
      this.addCustomerDialogVisible = true;
      this.addEditFormLoading = false;
    },

    // 保存客户需求数据
    saveCustomerInfo() {
      // 更新需求工工资
      this.addCustomerForm.demand_salary =
        this.wages_start + "~" + this.wages_end;

      this.$refs.form.validate((valid) => {
        if (valid) {
          saveCustomerInfo(this.addCustomerForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.addCustomerDialogVisible = false;
              this.getAllCustomerInfo();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 编辑客户需求
    customerEditBtn(name, id) {
      this.addEditFormTitle = `编辑客户（${name}）`;
      this.addEditFormLoading = true;
      // 获取要展示的客户信息
      getOneCustomerInfo(id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.editCustomerForm = data;
          console.log(this.editCustomerForm);
          let wage = this.editCustomerForm.demand_salary.split("~");
          this.wages_start = wage[0];
          this.wages_end = wage[1];
          // 表单赋值
          this.form = this.editCustomerForm;
          this.addEditFormLoading = false;
          this.getAllCustomerInfo();
        } else {
          this.$message.error(msg);
          this.addEditFormLoading = false;
        }
      });
      // 修改添加服务内容的显示
      this.isAddForm = false;
      // 显示添加表单
      this.addCustomerDialogVisible = true;
    },

    // 保存编辑
    saveEditCustomerInfo() {
      // 更新需求工工资
      this.editCustomerForm.demand_salary =
        this.wages_start + "~" + this.wages_end;

      this.$refs.form.validate((valid) => {
        if (valid) {
          updateCustomer(this.editCustomerForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.addCustomerDialogVisible = false;
              this.getAllCustomerInfo();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 选择删除
    selectDeleteBtn() {
      this.$confirm("此操作将取消客户订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.selected.length == 0) {
            this.$message.error("请选择要取消的客户订单");
          } else {
            deleteCustomer(this.selected).then((res) => {
              let { code, msg } = res;
              if (code === 200) {
                this.$message.success(msg);
                this.getAllCustomerInfo();
              } else {
                this.$message.error(msg);
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 表格删除
    DeleteFormBtn(id) {
      deleteCustomer(id).then((res) => {
        let { code, msg } = res;
        console.log(res);
        if (code === 200) {
          this.$message.success(msg);
          this.getAllCustomerInfo();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 添加和编辑表单关闭回调
    formDialogClose() {
      this.$refs.form.resetFields();
      this.clearService();
    },

    // 每次选择服务内容改变
    checkboxChange() {
      let serviceContent = this.selectSericeList.map((item) => {
        return this.selectSerice[item].content;
      });
      this.form.service_content = serviceContent.join(",");
    },

    // 处理选择
    handleSelectionChange(selectedArry) {
      // 清除操作
      this.selected = [];
      selectedArry.forEach((obj) => {
        this.selected.push(obj.id);
      });
    },

    // 清除添加客户是的服务内容状态
    clearService() {
      this.selectSericeList = [];
      this.cookNumber = "";
      this.handWashing = "";
      this.autoWashing = "";
      this.lookAfter = "";
      this.sleep = "";
      this.goSchool = "";
      this.otherContent = "";

      // 清除
      this.addCustomerForm.demand_salary = "";
      this.wages_start = "";
      this.wages_end = "";
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
  height: 50px;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 700;
  color: #75cbf4;
  border-bottom: 1px solid #dcdfe6;
}

.family-people {
  /deep/.el-input__inner {
    width: 90px;
  }

  .adult {
    /deep/.el-input__inner {
      margin-left: -20px;
    }
  }
  .children {
    /deep/.el-input__inner {
      margin-left: -40px;
    }
  }
}

.address {
  margin-left: 20px;
}

.small-line-input {
  width: 20px;
  border: none;
  text-align: center;
  border-bottom: 1px solid #dcdfe6;
}
.small-line-input2 {
  width: 300px;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  padding-left: 10px;
}

.addFormDialog {
  /deep/.el-dialog__body {
    height: 500px;
    overflow-y: auto;
  }

  /deep/.el-dialog__body::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  /deep/.el-dialog__body::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}

/deep/.el-table-column--selection {
  padding-right: 0;

  /deep/.cell {
    padding-right: 0;
  }
}
.sourceList {
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
