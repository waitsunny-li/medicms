<template>
  <div class="order-generate">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <customer-search @searchBtn="searchBtn"></customer-search>

        <!-- 表单 -->
        <el-card class="table-content" :style="{ height: screenHeight }">
          <!-- 表单内容 -->
          <!-- 表单 -->
          <el-table
            :data="customers"
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
                    <el-form
                      label-position="center"
                      inline
                      class="demo-table-expand"
                    >
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
                        <span>{{ scope.row.demand_job.join("，") }}</span>
                      </el-form-item>

                      <el-form-item label="学历">
                        <span>{{ scope.row.demand_education }}</span>
                      </el-form-item>
                      <el-form-item label="服务技能">
                        <span>{{
                          scope.row.demand_service_skill.join(",")
                        }}</span>
                      </el-form-item>
                      <el-form-item label="厨艺">
                        <span>{{ scope.row.demand_cooking.join("，") }}</span>
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
                      height="350px"
                      v-loading="interviewLoading"
                    >
                      <el-table-column
                        align="center"
                        label="面试日期"
                        prop="interview_time"
                      ></el-table-column>

                      <el-table-column
                        align="center"
                        label="姓名"
                        width="100"
                        prop="staff"
                      >
                        <template slot-scope="scope">
                          <el-button
                            @click="staffInfoBtn(scope.row.staff)"
                            type="text"
                            size="mini"
                            >{{
                              scope.row.staff ? scope.row.staff.name : seatData
                            }}</el-button
                          >
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="电话"
                        prop="staff.mobile"
                      ></el-table-column>
                      <el-table-column align="center" label="人员状态">
                        <template slot-scope="scope">
                          <!-- <p v-if="scope.row.status == 0">面试中</p>
                          <p v-if="scope.row.status == 1">进行中</p>

                          <p v-if="scope.row.status == 3">结束</p>
                          <p v-if="scope.row.status == 4">取消</p>-->
                          <p v-if="scope.row.staff.person_state == 1">培训</p>
                          <p v-else-if="scope.row.staff.person_state == 2">
                            考核
                          </p>
                          <p v-else-if="scope.row.staff.person_state == 3">
                            待岗
                          </p>
                          <p v-else-if="scope.row.staff.person_state == 4">
                            离职
                          </p>
                          <p v-else-if="scope.row.staff.person_state == 5">
                            黑名单
                          </p>
                          <p v-else-if="scope.row.staff.person_state == 6">
                            在岗
                          </p>
                          <p v-else-if="scope.row.staff.person_state == 7">
                            离职(下单)
                          </p>
                          <p v-else>错误</p>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        label="面试内容"
                        prop="content"
                      ></el-table-column>
                      <el-table-column
                        align="center"
                        label="是否面试完成"
                        prop="status"
                      >
                        <template slot-scope="scope">
                          <p v-if="scope.row.status == 1">
                            <i
                              class="el-icon-success"
                              style="
                                font-size: 18px;
                                color: #67c23a;
                                vertical-align: middle;
                              "
                            ></i>
                            已通过
                          </p>
                          <p v-else-if="scope.row.status == 0">
                            <i
                              style="
                                font-size: 18px;
                                color: #409eff;
                                vertical-align: middle;
                              "
                              class="el-icon-loading"
                            ></i>
                            面试中
                          </p>
                          <p v-else>
                            <i
                              style="
                                font-size: 18px;
                                color: #f56c6c;
                                vertical-align: middle;
                              "
                              class="el-icon-error"
                            ></i>
                            未通过
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
                            @click="editInterview(scope.row.id)"
                            style="margin-right: 5px"
                            v-has-power="{
                              limitList: [1, 4, 5],
                              role_id: $store.state.userInfo.role_id,
                            }"
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
                              v-has-power="{
                                limitList: [1, 4, 5],
                                role_id: $store.state.userInfo.role_id,
                              }"
                            ></el-button>
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>

                    <div class="add-wrap" style="margin-top: 20px">
                      <el-row>
                        <el-col :span="2" :offset="11">
                          <el-button
                            type="primary"
                            size="mini"
                            @click="addInterviewBtn(scope.row.id)"
                            v-has-power="{
                              limitList: [1, 4, 5],
                              role_id: $store.state.userInfo.role_id,
                            }"
                            >添加面试</el-button
                          >
                        </el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane
                    v-has-power="{
                      limitList: [1, 4, 5],
                      role_id: $store.state.userInfo.role_id,
                    }"
                    label="跟进记录"
                    name="third"
                  >
                    <!-- 表单 -->
                    <el-table
                      :data="followUpFormData"
                      stripe
                      style="width: 100%"
                      height="250px"
                      v-loading="followupLoading"
                    >
                      <el-table-column
                        prop="create_time"
                        align="center"
                        label="开始时间"
                      ></el-table-column>
                      <el-table-column
                        align="center"
                        label="服务人员"
                        width="180"
                      >
                        <template slot-scope="scope">
                          <i class="el-icon-user-solid"></i>
                          {{
                            scope.row.staff ? scope.row.staff.name : seatData
                          }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="total_time"
                        align="center"
                        label="时长"
                        width="180"
                      >
                        <template slot-scope="scope"
                          >{{ scope.row.total_time }}h</template
                        >
                      </el-table-column>
                      <el-table-column
                        prop="content"
                        align="center"
                        label="跟单记录情况"
                        width="180"
                      ></el-table-column>

                      <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                          <el-popconfirm
                            confirmButtonText="确定"
                            cancelButtonText="不用了"
                            icon="el-icon-info"
                            iconColor="red"
                            title="这一段跟进确定删除吗？"
                            @onConfirm="followUpDeleteBtn(scope.row.id)"
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
                        <el-col :span="8">
                          <el-form-item
                            label="开始时间"
                            prop="time"
                            label-width="100px"
                          >
                            <el-date-picker
                              v-model="addFollowUpForm.start_time"
                              type="datetime"
                              size="mini"
                              placeholder="选择日期"
                              format="yyyy-MM-dd HH:mm:ss"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              style="width: 180px"
                              class="followDate"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label-width="100px"
                            label="当前服务人员"
                          >
                            <div v-if="scope.row.staff_id == 0">
                              <el-tag type="danger" effect="dark"
                                >暂无服务人员</el-tag
                              >
                            </div>
                            <div v-else>
                              <!-- <el-input size="mini" disabled v-model="scope.row.staff"></el-input> -->
                              <el-tag type="info" effect="dark">{{
                                scope.row.staff
                                  ? scope.row.staff.name
                                  : "已被删除的用户"
                              }}</el-tag>
                            </div>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="时长" prop="total_time">
                            <el-input
                              size="mini"
                              v-model="addFollowUpForm.total_time"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="17" :offset="1">
                          <el-form-item
                            label="跟单记录情况"
                            label-width="110px"
                            prop="content"
                          >
                            <el-input
                              type="textarea"
                              style="width: 400px"
                              v-model="addFollowUpForm.content"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <!-- 保存按钮 -->
                    <el-row>
                      <el-col :span="3" :offset="21">
                        <div v-if="scope.row.staff_id == 0">
                          <el-button disabled size="mini" type="primary" round
                            >保 存</el-button
                          >
                        </div>
                        <div v-else>
                          <el-button
                            size="mini"
                            type="primary"
                            round
                            @click="saveFollowUp(scope.row.id)"
                            >保 存</el-button
                          >
                        </div>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane label="保险" name="four">
                    <el-table
                      :data="scope.row.safety"
                      height="350px"
                      style="width: 100%"
                    >
                      <el-table-column
                        align="center"
                        prop="safety_no"
                        label="保险单号"
                      ></el-table-column>
                      <el-table-column
                        width="200"
                        align="center"
                        prop="time"
                        label="起止时间"
                      >
                        <template slot-scope="scope">{{
                          scope.row.time.join(" ~ ")
                        }}</template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="content"
                        label="保险内容"
                      ></el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="num" label="编号" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="orderInfoBtn(scope.row.name, scope.row.id)"
                  >{{ scope.row.num }}</el-button
                >
              </template>
            </el-table-column>
            <el-table-column align="center" label="名字">
              <template slot-scope="scope">
                <div class="name-wrap">
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="mobile" label="手机号">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.mobile"
                  placement="top"
                >
                  <i
                    class="el-icon-phone"
                    style="color: red; font-size: 20px"
                  ></i>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="family_hometown"
              label="家庭成员籍贯"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              class="identify"
              align="center"
              prop="service_type"
              label="服务类型"
              :show-overflow-tooltip="true"
              width="100"
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
              prop="service_content"
              :show-overflow-tooltip="true"
              label="需要服务"
            ></el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              align="center"
              label="家庭成员"
            >
              <template slot-scope="scope"
                >{{ scope.row.family_people.children }}小孩，{{
                  scope.row.family_people.adlut
                }}成人，{{ scope.row.family_people.old }}老人</template
              >
            </el-table-column>

            <el-table-column
              align="center"
              prop="family_address"
              label="现居住地址"
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
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      height: 30px;
                    "
                    v-if="scope.row.source_id == item.id"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="state"
              label="状态"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <div
                  v-has-power="{
                    limitList: [1, 4, 5],
                    role_id: $store.state.userInfo.role_id,
                  }"
                >
                  <p v-if="scope.row.state == 0">审核中</p>
                  <p v-if="scope.row.state == 1">待进行</p>
                  <p v-if="scope.row.state == 2">跟进中</p>
                  <p v-if="scope.row.state == 3">已完成</p>
                  <p v-if="scope.row.state == 4">已取消</p>
                  <p v-if="scope.row.state == 5">暂停中</p>
                  <p v-if="scope.row.state == 6">重新恢复</p>
                </div>
                <span v-if="![1, 4, 5].includes($store.state.userInfo.role_id)"
                  >无权限查看</span
                >
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="create_time"
              label="录入时间"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column align="center" prop="staff_id" label="是否完成">
              <template slot-scope="scope">
                <div v-if="scope.row.staff_id != 0">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.row.staff ? scope.row.staff.name : seatData"
                    placement="top"
                  >
                    <i
                      style="color: #67c23a; font-size: 28px"
                      class="el-icon-success"
                    ></i>
                  </el-tooltip>
                </div>
                <div v-else>未完成</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="保险购买"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.safety.length == 0">无</span>
                <span v-else>有</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="当前服务人员">
              <template slot-scope="scope">
                {{ scope.row.staff ? scope.row.staff.name : seatData }}
                <div v-if="scope.row.staff_id != 0">
                  <el-popover
                    placement="right"
                    style="width: 80px !import"
                    trigger="hover"
                  >
                    <el-button
                      @click="
                        lookInsuranceBtn(
                          scope.row.staff_id,
                          scope.row.staff.name
                        )
                      "
                      type="success"
                      size="mini"
                      >查看</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="buyInsuranceBtn(scope.row.id)"
                      v-has-power="{
                        limitList: [1, 4, 5],
                        role_id: $store.state.userInfo.role_id,
                      }"
                      >购买保险</el-button
                    >
                    <el-button type="text" size="mini" slot="reference"
                      >保 险</el-button
                    >
                  </el-popover>
                </div>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="跟单老师"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">{{
                scope.row.match ? scope.row.match.username : "无"
              }}</template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column label="操作" width="110px" align="center">
              <template slot-scope="scope">
                <el-popover
                  v-if="scope.row.state != 4"
                  placement="left"
                  trigger="click"
                >
                  <div class="click-content">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :enterable="false"
                      content="指定员工"
                      placement="top"
                      v-if="[1, 2, 6].includes(scope.row.state)"
                    >
                      <el-button
                        @click="
                          addSuccessOrder(scope.row.staff_id, scope.row.id)
                        "
                        size="mini"
                        type="primary"
                        class="el-icon-user"
                        circle
                        style="margin-left: 5px"
                        v-has-power="{
                          limitList: [1, 4, 5],
                          role_id: $store.state.userInfo.role_id,
                        }"
                      ></el-button>
                    </el-tooltip>

                    <el-tooltip
                      class="item"
                      effect="dark"
                      :enterable="false"
                      content="编辑合同"
                      placement="top"
                      v-if="[1, 2, 6].includes(scope.row.state)"
                    >
                      <el-button
                        @click="
                          editBtn(
                            scope.row.name,
                            scope.row.id,
                            scope.row.contract
                          )
                        "
                        size="mini"
                        type="info"
                        class="el-icon-edit"
                        circle
                        style="margin-right: 5px"
                        v-has-power="{
                          limitList: [1, 4, 5],
                          role_id: $store.state.userInfo.role_id,
                        }"
                      ></el-button>
                    </el-tooltip>

                    <span
                      v-has-power="{
                        limitList: [1, 4],
                        role_id: $store.state.userInfo.role_id,
                      }"
                    >
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :enterable="false"
                        content="取消订单"
                        placement="top"
                        v-if="[0, 1, 2, 5, 6].includes(scope.row.state)"
                      >
                        <el-popconfirm
                          confirmButtonText="好的"
                          cancelButtonText="不用了"
                          icon="el-icon-info"
                          iconColor="red"
                          title="您确定要取消该订单吗？"
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
                      </el-tooltip>

                      <el-popover
                        placement="bottom"
                        trigger="hover"
                        style="min-width: 60px"
                        class="prople"
                      >
                        <el-form
                          ref="pauseOrderForm"
                          :model="pauseOrderForm"
                          label-width="80px"
                        >
                          <el-row>
                            <el-col :span="18">
                              <el-form-item label="暂停日期">
                                <el-date-picker
                                  v-model="pauseOrderForm.pause_time"
                                  type="date"
                                  placeholder="选择日期"
                                  format="yyyy-MM-dd"
                                  value-format="yyyy-MM-dd"
                                  size="mini"
                                  style="width: 130px"
                                ></el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col
                              :span="5"
                              :offset="1"
                              style="margin-top: 8px"
                            >
                              <el-button
                                @click="savePauseOrderInfo"
                                type="primary"
                                size="mini"
                                >保 存</el-button
                              >
                            </el-col>
                          </el-row>
                        </el-form>
                        <el-tooltip
                          class="item"
                          effect="dark"
                          :enterable="false"
                          content="暂停"
                          placement="top"
                          slot="reference"
                          v-if="[1, 2, 6].includes(scope.row.state)"
                        >
                          <el-button
                            @click="stopBtn(scope.row.id)"
                            size="mini"
                            type="warning"
                            class="el-icon-video-pause"
                            circle
                            style="margin-left: 5px"
                          ></el-button>
                        </el-tooltip>
                      </el-popover>
                      <!-- 
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :enterable="false"
                        content="恢复"
                        placement="top"
                        v-if="[5].includes(scope.row.state)"
                      >
                        <el-button
                          @click="restoreBtn(scope.row.id)"
                          size="mini"
                          type="success"
                          class="el-icon-refresh"
                          circle
                          style="margin-left: 5px"
                        ></el-button>
                      </el-tooltip>-->

                      <el-tooltip
                        class="item"
                        effect="dark"
                        :enterable="false"
                        content="审核"
                        placement="top"
                        v-if="[0].includes(scope.row.state)"
                      >
                        <el-button
                          @click="examineBtn(scope.row.id)"
                          size="mini"
                          type="success"
                          class="el-icon-finished"
                          circle
                          style="margin-left: 5px"
                        ></el-button>
                      </el-tooltip>

                      <el-tooltip
                        class="item"
                        effect="dark"
                        :enterable="false"
                        content="完成"
                        placement="top"
                        v-if="[1, 2, 6].includes(scope.row.state)"
                      >
                        <el-button
                          @click="completeBtn(scope.row.id)"
                          size="mini"
                          type="primary"
                          class="el-icon-s-claim"
                          circle
                          style="margin-left: 5px"
                        ></el-button>
                      </el-tooltip>

                      <el-tooltip
                        class="item"
                        effect="dark"
                        :enterable="false"
                        content="续签"
                        placement="top"
                        v-if="[3].includes(scope.row.state)"
                      >
                        <el-button
                          @click="copyBtn(scope.row.id)"
                          size="mini"
                          type="success"
                          class="el-icon-copy-document"
                          circle
                          style="margin-left: 5px"
                        ></el-button>
                      </el-tooltip>
                    </span>
                    <!-- <span v-else></span> -->
                  </div>
                  <el-button
                    slot="reference"
                    size="mini"
                    type="primary"
                    icon="el-icon-s-operation"
                    plain
                    >功能</el-button
                  >
                </el-popover>
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

    <!-- 查看当前保险 -->
    <el-dialog
      :title="currenInsurTitle"
      :visible.sync="lookInsuranceDialogVisible"
      width="600px"
      center
    >
      <el-table :data="insuracneFormData" height="350px" style="width: 100%">
        <el-table-column
          align="center"
          prop="safety_no"
          label="保险单号"
        ></el-table-column>
        <el-table-column
          width="180"
          align="center"
          prop="time"
          label="起止时间"
        >
          <template slot-scope="scope">{{
            scope.row.time.join(" ~ ")
          }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="content"
          label="保险内容"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editInsuranceBtn(scope.row.id)"
              circle
              style="margin-right: 10px"
              v-has-power="{
                limitList: [1, 4, 5],
                role_id: $store.state.userInfo.role_id,
              }"
            ></el-button>
            <el-popconfirm
              confirmButtonText="好的"
              cancelButtonText="不用了"
              icon="el-icon-info"
              iconColor="red"
              title="您确定要删除该保险吗？"
              @onConfirm="deleteInsuranceBtn(scope.row.id, scope.row.staff_id)"
              v-has-power="{
                limitList: [1, 4, 5],
                role_id: $store.state.userInfo.role_id,
              }"
            >
              <el-button
                slot="reference"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加保险 -->
    <el-dialog
      :title="addInsurTile"
      :visible.sync="buyInsurDialogVisible"
      width="500px"
      center
      @close="buyInsuranceClose"
      append-to-body
    >
      <el-form
        ref="insuracneForm"
        :rules="insuracneFormRules"
        :model="insuracneForm"
        label-width="80px"
      >
        <el-row>
          <el-col :span="14">
            <el-form-item label="保险单号" prop="safety_no">
              <el-input
                size="mini"
                v-model="insuracneForm.safety_no"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="起止时间" prop="time">
          <el-date-picker
            v-model="insuracneForm.time"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="合同内容" prop="content">
          <el-input
            size="mini"
            type="textarea"
            v-model="insuracneForm.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="buyInsurDialogVisible = false"
          >取 消</el-button
        >
        <el-button
          v-if="isaddIns"
          size="mini"
          type="primary"
          @click="saveInsurance"
          >保 存</el-button
        >
        <el-button v-else size="mini" type="primary" @click="saveEditInsurance"
          >编 辑</el-button
        >
      </span>
    </el-dialog>

    <!-- 调出家政员的基本信息 -->
    <el-dialog
      :title="staffInfoTitle"
      :visible.sync="staffInfoDialogVisible"
      width="1000px"
      center
    >
      <staff-info
        :staffInfo="staffInfo"
        :staffInfoLoading="staffInfoLoading"
      ></staff-info>
    </el-dialog>

    <!-- 调出订单的基本详情 -->
    <el-dialog
      :title="orderInfoTitle"
      :visible.sync="orderInfoDialogVisible"
      width="870px"
      center
    >
      <order-info
        :orderInfo="orderInfo"
        :orderInfoLoading="orderInfoLoading"
      ></order-info>
    </el-dialog>

    <!-- 完成订单时添加员工姓名和编号 -->
    <el-dialog
      title="指定服务员工"
      :visible.sync="addFirstDialogVisible"
      width="500px"
      @close="addFirstDialogClose"
      center
    >
      <!-- 内容 -->
      <div class="content">
        <el-form ref="orderSuccessForm" :model="orderSuccessForm">
          <el-row>
            <el-form-item label-width="80px" label="姓名" prop="name">
              <el-select
                v-if="orderInterviewer.length == 0"
                v-model="orderSuccessForm.staff_id"
                placeholder="请选择面试人员姓名"
                disabled
                :key="0"
              >
                <el-option label="没有面试人员" :value="0"></el-option>
              </el-select>

              <el-select
                v-else
                v-model="orderSuccessForm.staff_id"
                placeholder="请选择面试人员姓名"
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
          <el-row>
            <el-form-item label="更换原因" label-width="80px" prop="content">
              <el-input
                type="textarea"
                v-model="orderSuccessForm.content"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addFirstDialogVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="saveFirstStaff"
          >保 存</el-button
        >
      </span>
    </el-dialog>

    <!-- 编辑合同 -->
    <el-dialog
      :title="editCustomerTitle"
      :visible.sync="editDialogVisible"
      @close="editDialogClose"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <div class="content">
        <el-form
          :inline="true"
          ref="form"
          :model="editForm"
          :rules="formRules"
          class="add-user-form"
        >
          <!-- 主体 -->
          <div class="content-wrap">
            <el-row>
              <el-col :span="6" :offset="1">
                <el-form-item label="身份证" prop="identity">
                  <el-input
                    size="mini"
                    v-model="editForm.identity"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同号" prop="num">
                  <el-input
                    size="mini"
                    v-model="editForm.num"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item
                  label="合同起止"
                  class="registration_address"
                  prop="start_time"
                >
                  <el-date-picker
                    style="width: 290px"
                    size="mini"
                    v-model="editForm.start_time"
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
              <el-col :span="4" :offset="1">
                <el-form-item label="合同费" prop="spend">
                  <el-input size="mini" v-model="editForm.spend"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="保险单位" prop="is_insurance">
                  <el-select v-model="editForm.is_insurance" size="mini">
                    <el-option label="有" :value="1"></el-option>
                    <el-option label="无" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="现在工资" prop="now_salary">
                  <el-input
                    size="mini"
                    v-model="editForm.now_salary"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-col :span="24">
                  <el-form-item
                    label="家政员提成"
                    prop="commission"
                    style="width: 170px"
                  >
                    <el-input
                      size="mini"
                      v-model="editForm.commission"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6" :offset="1">
                <el-form-item label="上班地址" prop="work_address">
                  <el-input
                    size="mini"
                    v-model="editForm.work_address"
                    placeholder="请输入上班地址"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-col :span="12">
                  <el-form-item label="第二联系人" prop="name">
                    <el-input
                      size="mini"
                      v-model="editForm.name"
                      placeholder="请输入姓名"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="第二联系人电话"
                    prop="phone"
                    class="contract_wages"
                  >
                    <el-input size="mini" v-model="editForm.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label="签合同时工资"
                  prop="sign_salary"
                  style="width: 190px"
                  class="contract_wages"
                >
                  <el-input
                    size="mini"
                    v-model="editForm.sign_salary"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6" :offset="1">
                <el-form-item
                  label="工作时间"
                  class="registration_address"
                  prop="work_time"
                >
                  <el-input size="mini" v-model="editForm.work_time"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item
                  label="家庭情况备注"
                  class="registration_address"
                  prop="remark"
                >
                  <el-input
                    style="width: 512px"
                    size="mini"
                    v-model="editForm.remark"
                    type="textarea"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editDialogVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="saveEditContractInfo"
          >保 存</el-button
        >
      </span>
    </el-dialog>

    <!-- 添加面试 -->
    <el-dialog
      title="添加面试"
      :visible.sync="addInterviewDialogVisible"
      width="800px"
      center
      @close="inaterviewhide"
      append-to-body
      :close-on-click-modal="false"
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
          <el-col :span="24">
            <el-form-item label="面试时间" prop="interview_time">
              <el-date-picker
                v-model="interviewForm.interview_time"
                type="datetime"
                size="mini"
                placeholder="选择日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否通过" prop="status">
              <el-radio-group v-model="interviewForm.status">
                <el-radio :label="0">面试中</el-radio>
                <el-radio :label="1">通过</el-radio>
                <el-radio :label="2">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="110px" label="面试人员姓名" prop="name">
              <el-autocomplete
                v-model="interviewForm.name"
                :fetch-suggestions="querySearchAsync"
                size="mini"
                placeholder="请输入面试人员姓名"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="mobile">
              <el-input
                disabled
                v-model="interviewForm.mobile"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="面试记录" prop="content">
              <el-input
                v-model="interviewForm.content"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addInterviewDialogVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="saveInterviewInfo"
          >保 存</el-button
        >
      </span>
    </el-dialog>

    <!-- 编辑状态 -->
    <el-dialog
      title="面试结果"
      :visible.sync="editInterviewDialogVisible"
      width="30%"
      center
    >
      <el-form ref="editInterviewState" :model="editInterviewState">
        <el-form-item label="是否通过" prop="status">
          <el-radio-group v-model="editInterviewState.status">
            <el-radio :label="0">面试中</el-radio>
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面试记录" prop="content">
          <el-input
            v-model="editInterviewState.content"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editInterviewDialogVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="saveEditInterview"
          >确 定</el-button
        >
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
  searchStaffNmae,
  searchCustomerInfo,
  deleteOrderInfo,
  saveFisrstStaff,
  deleteInterview,
  getInterviewInfo,
  saveInterview,
  getFollowUpInfo,
  saveFollowUpInfo,
  getOneCustomerInfo,
  getOneInterview,
  updateOneInterview,
  deleteFollowUp,
  saveEditContract,
  spassOrder,
  pauseOrder,
  completeOrder,
  copyOrder,
  restoreOrder,
  saveInsuranceInfo,
  lookStaffInsurance,
  lookOneInsurance,
  updateOneInsurance,
  deleteInsurance,
} from "network/orderRequest";
import { getAllSource, getJob } from "network/select";
export default {
  name: "OrderGenerate",
  data() {
    return {
      // 保险
      buyInsurDialogVisible: false,
      insuracneForm: {
        customer_id: "",
        safety_no: "",
        time: [],
        content: "",
      },
      isaddIns: false,

      // 保险验证
      addInsurTile: "",
      insuracneFormRules: {
        safety_no: [
          { required: true, message: "请输入保险单号", trigger: "blur" },
        ],
        time: [
          { required: true, message: "请输入保险起止时间", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入保险内容", trigger: "blur" },
        ],
      },
      // 查看当前保险
      lookInsuranceDialogVisible: false,
      currenInsurTitle: "",
      insuracneFormData: [],

      seatData: "无",
      searchForm: {},
      // 订单列表
      customers: [],
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

      service_types: [],

      // 订单的基本详情
      orderInfoDialogVisible: false,
      orderInfoLoading: false,
      orderInfoData: {},
      orderInfoTitle: "",

      // 编辑订单内容
      editDialogVisible: false,
      editCustomerTitle: "",
      editForm: {
        customer_id: "",
        identity: "",
        start_time: [],
        work_time: "",
        work_address: "",
        spend: "",
        num: "",
        is_insurance: "",
        now_salary: "",
        commission: "",
        sign_salary: "",
        remark: "",
        name: "",
        phone: "",
      },
      formRules: {
        // identity: [
        //   { required: true, message: "请输入身份证", trigger: "blur" },
        // ],
        num: [{ required: true, message: "请输入合同号", trigger: "blur" }],
        work_address: [
          { required: true, message: "请输入上班地址", trigger: "blur" },
        ],
        start_time: [
          { required: true, message: "请输入合同起止", trigger: "blur" },
        ],
        work_time: [
          { required: true, message: "请输入工作时间", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入第二联系人", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入第二联系人电话", trigger: "blur" },
        ],
      },

      // 添加首次服务员工
      addFirstDialogVisible: false,
      // 订单的所有面试人员
      orderInterviewer: [],
      // 订单完成表单
      orderSuccessForm: {
        staff_id: "",
        customer_id: "",
        content: "",
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
      // 暂停订单时间
      pauseOrderForm: {
        customer_id: "",
        pause_time: "",
      },

      // 面试管理数据
      interviewFormData: [],
      interviewLoading: false,

      // 添加面试
      addInterviewDialogVisible: false,
      interviewForm: {
        customer_id: "",
        staff_id: "",
        content: "",
        status: "",
        interview_time: "",
        name: "",
      },
      editInterviewState: {
        id: "",
        content: "",
        status: "",
      },
      editInterviewDialogVisible: false,
      interviewFormRules: {
        status: [
          { required: true, message: "请输入是否通过", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入员工姓名", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入面试内容", trigger: "blur" },
        ],
      },

      searchRults: [],

      /**
       * 跟进
       */
      // 获取跟进列表
      followUpFormData: [],
      followupLoading: false,
      // 添加跟进
      addFollowUpForm: {
        customer_id: "",
        start_time: "",
        content: "",
        total_time: "",
      },
      addFollowUpFormRules: {
        content: [
          { required: true, message: "请输入跟进记录", trigger: "blur" },
        ],
        total_time: [
          { required: true, message: "请输入时长", trigger: "blur" },
        ],
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
      return this.$store.state.screenHeight - 230 + "px";
    },
  },
  watch: {},
  methods: {
    // 删除保险
    deleteInsuranceBtn(insruance_id, staff_id) {
      deleteInsurance(insruance_id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.getOneStaffInsuranceInfo(staff_id);
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 保存编辑保险
    saveEditInsurance() {
      updateOneInsurance(this.insuracneForm).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.getOneStaffInsuranceInfo(this.insuracneForm.staff_id);

          this.buyInsurDialogVisible = false;
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 编辑
    editInsuranceBtn(id) {
      this.isaddIns = false;
      lookOneInsurance(id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.insuracneForm.customer_id = data.customer_id;
          this.insuracneForm.safety_no = data.safety_no;
          this.insuracneForm.time = data.time;
          this.insuracneForm.content = data.content;
          this.insuracneForm.staff_id = data.staff_id;
          this.insuracneForm.id = data.id;

          this.addInsurTile = `编辑保险`;
          this.buyInsurDialogVisible = true;
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 查看当前服务人员的订单
    lookInsuranceBtn(staff_id, name) {
      this.currenInsurTitle = `查看当前服务人员（${name}）的保险`;
      // 发送请求
      this.getOneStaffInsuranceInfo(staff_id);
    },
    // 定义保险列表函数
    getOneStaffInsuranceInfo(staff_id) {
      lookStaffInsurance(staff_id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.insuracneFormData = data;
          this.lookInsuranceDialogVisible = true;
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 购买保险按钮 saveInsuranceInfo
    buyInsuranceBtn(order_id) {
      this.insuracneForm.customer_id = order_id;
      this.addInsurTile = `添加保险`;
      this.buyInsurDialogVisible = true;
      this.isaddIns = true;
    },
    // 关闭回调
    buyInsuranceClose() {
      this.$refs.insuracneForm.resetFields();
      this.insuracneForm = {
        customer_id: "",
        safety_no: "",
        time: [],
        content: "",
      };
    },
    // 保存保险
    saveInsurance() {
      this.$refs.insuracneForm.validate((valid) => {
        if (valid) {
          saveInsuranceInfo(this.insuracneForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.buyInsurDialogVisible = false;
              this.getSearchInfoData(this.searchForm);
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 定义搜索获取信息
    getSearchInfoData(options) {
      searchCustomerInfo(options).then((res) => {
        if (res.code === 200) {
          // 获取客户数据
          this.customers = res.data.data;
          console.log(this.customers);
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

    // 是否删除该订单
    formDeleteBtn(id) {
      deleteOrderInfo(id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          // 重新获取所有订单
          this.getAllOrderInfo();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 暂停
    stopBtn(order_id) {
      this.pauseOrderForm.customer_id = order_id;
      this.pauseOrderForm.pause_time = new Date()
        .toLocaleDateString()
        .replace(/\//g, "-");
    },

    // 恢复订单
    restoreBtn(order_id) {
      restoreOrder(order_id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          // 重新获取所有订单
          this.getAllOrderInfo();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 续签订单
    copyBtn(order_id) {
      copyOrder(order_id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          // 重新获取所有订单
          this.getAllOrderInfo();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 完成订单
    completeBtn(order_id) {
      completeOrder(order_id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          // 重新获取所有订单
          this.getAllOrderInfo();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 保存暂停时间
    savePauseOrderInfo() {
      pauseOrder(this.pauseOrderForm).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          // 重新获取所有订单
          this.getAllOrderInfo();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 审核是否完成
    examineBtn(order_id) {
      this.$confirm("该订单是否确认通过？", "审核订单", {
        distinguishCancelAndClose: true,
        cancelButtonText: "不通过",
        confirmButtonText: "通过",
      })
        .then(() => {
          spassOrder(order_id).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.getAllOrderInfo();
            } else {
              this.$message.error(msg);
            }
          });
        })
        .catch((action) => {
          deleteOrderInfo(order_id).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              // 重新获取所有订单
              this.getAllOrderInfo();
            } else {
              this.$message.error(msg);
            }
          });
        });
    },

    // 编辑显示
    editBtn(name, id, contract) {
      if (contract) {
        this.editForm.customer_id = contract.customer_id;
        this.editForm.identity = contract.identity;
        this.editForm.start_time = contract.start_time;
        this.editForm.work_time = contract.work_time;
        this.editForm.work_address = contract.work_address;
        this.editForm.spend = contract.spend;
        this.editForm.num = contract.num;
        this.editForm.is_insurance = contract.is_insurance;
        this.editForm.now_salary = contract.now_salary;
        this.editForm.commission = contract.commission;
        this.editForm.sign_salary = contract.sign_salary;
        this.editForm.remark = contract.remark;
        this.editForm.name = contract.name;
        this.editForm.phone = contract.phone;
      }
      this.editCustomerTitle = `编辑客户（${name}）的合同`;
      this.editDialogVisible = true;
      this.editForm.customer_id = id;
    },

    // 保存编辑订单
    saveEditContractInfo() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveEditContract(this.editForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.editDialogVisible = false;
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

    // 显示面试和跟进
    expandShow(row, expandedRows) {
      if (expandedRows.length == 0) return;
      // 赋值当前点击展开的订单号
      this.currentOrderId = row.id;
      this.addFollowUpForm.customer_id = row.id;

      // // 获取面试记录
      this.getAllInterviewInfo(row.id);
      // // 获取跟进记录
      this.getAllFollowUpInfo(row.id);
    },

    // 搜索选中
    handleSelect(item) {},

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
          this.orderInfo = data;
          this.orderInfoLoading = false;
        } else {
          this.$message.error(msg);
          this.orderInfoLoading = false;
        }
      });
    },

    // 员工基本详情
    staffInfoBtn(staff) {
      this.staffInfoTitle = `家政员（${staff.name}）的基本信息`;
      this.staffInfoDialogVisible = true;
      this.staffInfo = staff;
    },

    // 添加完成订单
    addSuccessOrder(staff_id, order_id) {
      // 显示添加界面
      this.addFirstDialogVisible = true;
      this.orderSuccessForm.customer_id = order_id;
      this.orderSuccessForm.staff_id = staff_id ? staff_id : "";

      getInterviewInfo({ customer_id: order_id }).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          console.log(data);
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

    // 添加完成订单关闭回调
    addFirstDialogClose() {
      this.$refs.orderSuccessForm.resetFields();
      this.orderSuccessForm.staff_id = "";
      this.orderSuccessForm.customer_id = "";
      this.orderSuccessForm.content = "";
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
        if (code === 200) {
          this.interviewFormData = data;
          console.log(this.interviewFormData);
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
      getFollowUpInfo({ customer_id: id }).then((res) => {
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

    // 编辑面试显示
    editInterview(id) {
      getOneInterview(id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.editInterviewState.id = data.id;
          this.editInterviewState.content = data.content;
          this.editInterviewState.status = data.status;

          this.editInterviewDialogVisible = true;
        } else {
          this.$message.error(msg);
        }
      });
    },

    // tabs点击回调
    tabsClick() {},

    // 展开面试是回调(展示时开始获取所有面试，和所有跟进)
    interviewShow(id) {
      // this.getAllInterviewInfo(id)
    },
    inaterviewhide() {
      this.$refs.interviewform.resetFields();
      this.$refs.addFollowUpForm.resetFields();
    },
    // 搜索面试人员
    querySearchAsync(queryString, cb) {
      // 先清空
      this.searchRults = [];
      // if (!queryString.trim()) {
      //   getInterviewInfo({ customer_id: this.addFollowUpForm.customer_id }).then((res) => {
      //     let { code, data, msg } = res;
      //     if (code === 200) {
      //       if (!data) return;
      //       data.forEach((item) => {
      //         let obj = {};
      //         obj.value = item.name;
      //         obj.mobile = item.mobile;
      //         obj.id = item.id;
      //         this.searchRults.push(obj);
      //       });
      //       cb(this.searchRults);
      //     } else {
      //       this.$message.error(msg);
      //     }
      //   });
      // }
      searchStaffNmae(queryString).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          if (!data) return;
          data.forEach((item) => {
            let obj = {};
            obj.value = item.name;
            obj.mobile = item.mobile;
            obj.id = item.id;
            this.searchRults.push(obj);
          });
          cb(this.searchRults.slice(0,10));
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 处理面试人员编号框选择事件
    handleSelect(item) {
      this.interviewForm.name = item.value;
      this.interviewForm.mobile = item.mobile;
      this.interviewForm.staff_id = item.id;

      // this.orderSuccessForm.name = item.value;
      // this.orderSuccessForm.mobile = item.mobile;
      // this.orderSuccessForm.staff_id = item.id;
    },

    // 显示添加面试按钮
    addInterviewBtn(customer_id) {
      // 清除搜索操作残留
      this.interviewForm.name = "";
      this.interviewForm.mobile = "";
      this.interviewForm.staff_id = "";
      this.addInterviewDialogVisible = true;
      this.interviewForm.customer_id = customer_id;
      // 获取当前时间
      this.interviewForm.interview_time = new Date()
        .toLocaleString("chinese", { hour12: false })
        .replace(/\//g, "-");
    },

    // 面试删除记录
    interViewDeleteBtn(id) {
      deleteInterview(id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.getAllInterviewInfo(this.currentOrderId);
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 保存编辑
    saveEditInterview() {
      updateOneInterview(this.editInterviewState).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.getAllInterviewInfo(this.currentOrderId);
          this.editInterviewDialogVisible = false;
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 保存面试记录
    saveInterviewInfo() {
      let interviewData = {};
      interviewData.customer_id = this.interviewForm.customer_id;
      interviewData.staff_id = this.interviewForm.staff_id;
      interviewData.interview_time = this.interviewForm.interview_time;
      interviewData.status = this.interviewForm.status;
      interviewData.content = this.interviewForm.content;

      this.$refs.interviewform.validate((valid) => {
        if (valid) {
          saveInterview(interviewData).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.getAllInterviewInfo(this.currentOrderId);
              this.addInterviewDialogVisible = false;
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
    saveFollowUp(id) {
      this.$refs.addFollowUpForm.validate((valid) => {
        if (valid) {
          saveFollowUpInfo(this.addFollowUpForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
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
    // 跟进删除
    followUpDeleteBtn(id) {
      deleteFollowUp(id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.getAllFollowUpInfo(this.currentOrderId);
        } else {
          this.$message.error(msg);
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

    // 获取当前时间
    this.addFollowUpForm.start_time = new Date()
      .toLocaleString("chinese", { hour12: false })
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
  height: 500px;

  .el-card__body {
    .user-table-wrap {
      margin-top: 0px;

      /deep/.staffInfo-wrap {
        margin-left: 70px;
      }

      /deep/.el-table__body-wrapper {
        /deep/.expand-row {
          border-bottom: 1px solid #f1f1f1;
          padding: 10px 0;
        }

        /deep/.el-popover {
          min-width: 60px;
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
