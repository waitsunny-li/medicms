<template>
  <div class="data-input">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <search @searchbtn="searchBtn"></search>

        <!-- 表单 -->
        <div class="user-table">
          <el-card class="user-table-card" :style="{height: screenHeight}">
            <!-- 公共操作 -->
            <el-row>
              <el-col :span="22">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  @click="addStaffBtn"
                  v-has-power="{limitList: [1, 4, 5, 16], role_id: $store.state.userInfo.role_id}"
                >新增</el-button>
                <!-- <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="selectDeleteBtn"
                  size="mini"
                  v-has-power="{limitList: [1,], role_id: $store.state.userInfo.role_id}"
                >删除</el-button>-->
                <el-button
                  type="warning"
                  icon="el-icon-printer"
                  @click="createResumeBtn"
                  size="mini"
                  v-has-power="{limitList: [1, 4, 5, 16], role_id: $store.state.userInfo.role_id}"
                >生成简历</el-button>
              </el-col>

              <el-col :span="2">
                <el-badge :value="birthdayNumber" class="item">
                  <el-button
                    type="success"
                    icon="el-icon-goblet-square-full"
                    @click="birthdayBtn"
                    size="mini"
                  >生日提醒</el-button>
                </el-badge>
              </el-col>
            </el-row>

            <!-- 表格 -->
            <el-table
              ref="userList"
              :data="userList"
              class="user-table-wrap"
              style="width: 100%"
              :height="scrollHeight"
              @selection-change="handleSelectionChange"
              v-loading="loading"
              border
              @expand-change="expandShow"
            >
              <!-- 选择 -->
              <el-table-column type="selection" width="55"></el-table-column>
              <!-- 展示 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-tabs v-model="activeName" class="staffInfo-wrap">
                    <el-tab-pane label="员工详情" name="first">
                      <el-row class="expand-row">
                        <el-col :span="4">
                          <span class="label-text">手机号</span>
                          <span class="content-text">{{scope.row.mobile}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">工资要求</span>
                          <span class="content-text">{{scope.row.salary}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">英语水平</span>
                          <span class="content-text">{{scope.row.english}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">计算机水平</span>
                          <span class="content-text">{{scope.row.computer}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">政治面貌</span>
                          <span class="content-text">{{scope.row.political_status}}</span>
                        </el-col>
                      </el-row>

                      <el-row class="expand-row">
                        <el-col :span="4">
                          <span class="label-text">生肖</span>
                          <span class="content-text">{{scope.row.zodiac}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">休假要求</span>
                          <span class="content-text">{{scope.row.spare_time}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">户口地址</span>
                          <span
                            class="content-text"
                          >{{scope.row.census_p_text}}{{scope.row.cnnsus_c_text}}{{scope.row.cnnsus_d_text}}{{scope.row.census_address_desc}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">户口类型</span>
                          <span class="content-text">{{scope.row.census_type}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">入职时间</span>
                          <span class="content-text">{{scope.row.in_time}}</span>
                        </el-col>
                      </el-row>

                      <el-row class="expand-row">
                        <el-col :span="4">
                          <span class="label-text">学历</span>
                          <span class="content-text">{{scope.row.education}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">现居住地</span>
                          <span
                            class="content-text"
                          >{{scope.row.now_p_text}}{{scope.row.now_c_text}}{{scope.row.now_d_text}}{{scope.row.now_address_desc}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">服务技能</span>
                          <span class="content-text">{{scope.row.service_skills.join('，')}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">家用电器</span>
                          <span class="content-text">{{scope.row.device.join('，')}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">入职来源</span>
                          <span
                            class="content-text"
                          >{{scope.row.recruiters_name}}：{{scope.row.recruiters_mobile}}</span>
                        </el-col>
                      </el-row>

                      <el-row class="expand-row">
                        <el-col :span="4">
                          <span class="label-text">血型</span>
                          <span class="content-text">{{scope.row.blood}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">健康状况</span>
                          <span class="content-text">{{scope.row.health}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">婚姻状况</span>
                          <span class="content-text">{{scope.row.marital_status}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">员工状态</span>
                          <span class="content-text" v-if="scope.row.person_state == 1">培训</span>
                          <span class="content-text" v-else-if="scope.row.person_state == 2">考核</span>
                          <span class="content-text" v-else-if="scope.row.person_state == 3">待岗</span>
                          <span class="content-text" v-else-if="scope.row.person_state == 4">离职</span>
                          <span class="content-text" v-else-if="scope.row.person_state == 5">黑名单</span>
                          <span class="content-text" v-else-if="scope.row.person_state == 6">在岗</span>
                          <span class="content-text" v-else-if="scope.row.person_state == 7">离职(下单)</span>
                          <span class="content-text" v-else>错误</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">保险</span>
                          <span class="content-text">{{scope.row.agreement_amount}}</span>
                        </el-col>
                      </el-row>

                      <el-row class="expand-row">
                        <el-col :span="4">
                          <span class="label-text">身高</span>
                          <span class="content-text">{{scope.row.height}}cm</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">体重</span>
                          <span class="content-text">{{scope.row.weight}}kg</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">籍贯</span>
                          <span class="content-text">{{scope.row.census}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">生日</span>
                          <span class="content-text">{{scope.row.birthday}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">语言能力</span>
                          <span class="content-text">{{scope.row.language.join('，')}}</span>
                        </el-col>
                      </el-row>

                      <el-row class="expand-row">
                        <el-col :span="4">
                          <span class="label-text">录入人</span>
                          <span class="content-text">{{scope.row.user.username}}</span>
                        </el-col>
                        <el-col :span="5">
                          <span class="label-text">家庭紧急联系</span>
                          <span
                            class="content-text"
                          >{{scope.row.urgent_name}}：{{scope.row.urgent_mobile}}</span>
                        </el-col>
                        <el-col :span="8">
                          <span class="label-text">安置协议</span>
                          <span class="content-text">{{scope.row.agreement_amount}}</span>
                        </el-col>
                        <el-col :span="7">
                          <span class="label-text">自我评价</span>
                          <span class="content-text">{{scope.row.self_evaluation}}</span>
                        </el-col>
                      </el-row>

                      <el-row class="expand-row">
                        <el-col :span="12" style="display: flex">
                          <span class="label-text">工作经历</span>
                          <div
                            class="content-text"
                            v-for="(item, index) in scope.row.work_experience"
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
                          <div
                            class="content-text"
                            v-for="(item, index) in scope.row.family_member"
                            :key="index"
                          >
                            <el-col :span="24">{{item.name}}</el-col>
                            <el-col :span="24">{{item.relation}}</el-col>
                            <el-col :span="24">{{item.current_situation}}</el-col>
                          </div>
                        </el-col>
                      </el-row>

                      <el-row class="expand-row">
                        <el-col :span="12" style="display: flex">
                          <span class="label-text">培训经历</span>
                          <div
                            class="content-text"
                            v-for="(item, index) in scope.row.train"
                            :key="index"
                          >
                            <el-col :span="24">{{item.project}}</el-col>
                            <el-col
                              :span="24"
                            >{{timestampToTime(item.start_time)}}~{{timestampToTime(item.end_time)}}</el-col>
                            <el-col :span="24">{{item.address}}</el-col>
                            <el-col :span="24">{{item.content}}</el-col>
                          </div>
                        </el-col>
                        <el-col :span="12" style="display: flex">
                          <span class="label-text">考核评价</span>
                          <div
                            class="content-text"
                            v-for="(item, index) in scope.row.train"
                            :key="index"
                          >
                            <el-col :span="24">{{item.project}}</el-col>
                            <el-col
                              :span="24"
                            >{{timestampToTime(item.start_time)}}~{{timestampToTime(item.end_time)}}</el-col>
                            <el-col :span="24">
                              <span v-if="item.is_by==1" style="color:#67C23A">
                                <i class="el-icon-check" style="color:#67C23A"></i> 通过
                              </span>
                              <span v-else-if="item.is_by==0" style="color:#E6A23C">
                                <i class="el-icon-loading" style="color:#E6A23C"></i> 审核中
                              </span>
                              <span v-else style="color:#F56C6C">
                                <i class="el-icon-close" style="color:#F56C6C"></i>
                                没有通过
                              </span>
                            </el-col>
                            <el-col :span="24">
                              <span v-if="item.assess_content">{{item.assess_content}}</span>
                              <span v-else>
                                <i class="el-icon-loading"></i> 审核中
                              </span>
                            </el-col>
                          </div>
                        </el-col>
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="新增事件" name="second">
                      <!-- 表单 -->
                      <el-table
                        :data="eventData"
                        stripe
                        style="width: 100%"
                        height="250px"
                        :default-sort="{prop: 'create_time', order: 'descending'}"
                      >
                        <el-table-column
                          prop="create_time"
                          align="center"
                          label="日期"
                          width="180"
                          sortable
                        ></el-table-column>
                        <el-table-column prop="event_type" align="center" label="事件类型" width="180">
                          <template slot-scope="scope">
                            <p v-if="scope.row.event_type == 1">
                              <el-tag size="mini" type="info" effect="dark">黑名单</el-tag>
                            </p>
                            <p v-if="scope.row.event_type == 2">
                              <el-tag size="mini" type="success" effect="dark">奖赏</el-tag>
                            </p>
                            <p v-if="scope.row.event_type == 3">
                              <el-tag size="mini" type="danger" effect="dark">处罚</el-tag>
                            </p>
                          </template>
                        </el-table-column>
                        <el-table-column
                          align="center"
                          prop="content"
                          :show-overflow-tooltip="true"
                          label="事件内容"
                        ></el-table-column>
                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-popconfirm
                              confirmButtonText="好的"
                              cancelButtonText="不用了"
                              icon="el-icon-info"
                              iconColor="red"
                              title="这是一段内容确定删除吗？"
                              @onConfirm="deleteEventBtn(scope.row.id, scope.row.staff_id)"
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

                      <!-- 添加事件 -->
                      <div class="option-wrap">
                        <i class="el-icon-folder-add"></i> 增加事件
                      </div>
                      <!-- 表单 -->
                      <el-form
                        ref="eventForm"
                        class="eventForm"
                        :model="eventForm"
                        label-width="80px"
                      >
                        <el-form-item label="事件类型" prop="event_type">
                          <el-select
                            size="mini"
                            v-model="eventForm.event_type"
                            placeholder="请选择事件类型"
                          >
                            <el-option label="黑名单" value="1"></el-option>
                            <el-option label="奖赏" value="2"></el-option>
                            <el-option label="处罚" value="3"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="事件内容" prop="content">
                          <el-input
                            size="mini"
                            type="textarea"
                            :rows="3"
                            v-model="eventForm.content"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                      <!-- 保存按钮 -->
                      <el-row>
                        <el-col :span="5" :offset="20">
                          <el-button size="mini" type="primary" @click="saveEventData" round>保存</el-button>
                        </el-col>
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="经理评价" name="three">
                      <el-row>
                        <el-col :span="4">经理评价内容：</el-col>
                        <el-col :span="20">{{scope.row.evaluation}}</el-col>
                      </el-row>
                      <el-row style="margin-top: 30px" v-if="!scope.row.evaluation">
                        <el-col :span="3">评价：</el-col>
                        <el-col :span="10">
                          <el-input type="textarea" v-model="handleEvaluation"></el-input>
                        </el-col>
                      </el-row>
                      <el-row style="margin-top: 30px" v-if="!scope.row.evaluation">
                        <el-col :span="5" :offset="12">
                          <el-button
                            @click="saveHandleEva(scope.row.id)"
                            type="primary"
                            size="mini"
                          >保 存</el-button>
                        </el-col>
                      </el-row>
                    </el-tab-pane>
                  </el-tabs>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="num" label="编号" width="100"></el-table-column>
              <el-table-column align="center" prop="name" label="姓名" width="100">
                <template slot-scope="scope">
                  <div class="name-wrap">
                    <span>{{scope.row.name}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="sex" label="性别" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.sex == 1">男</span>
                  <span v-else-if="scope.row.sex == 2">女</span>
                </template>
              </el-table-column>
              <el-table-column
                class="identify"
                align="center"
                prop="identity"
                label="身份证"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column width="80" align="center" prop="age" label="年龄"></el-table-column>
              <el-table-column align="center" prop="mobile" width="160px" label="手机号">
                <template slot-scope="scope">
                  <i class="el-icon-phone" style="color: red"></i>
                  {{scope.row.mobile}}
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="address"
                label="现居住地址"
                :show-overflow-tooltip="true"
              >
                <template
                  slot-scope="scope"
                >{{scope.row.now_p_text}}{{scope.row.now_c_text}}{{scope.row.now_d_text}}{{scope.row.now_address_desc}}</template>
              </el-table-column>
              <el-table-column width="80" align="center" prop="person_state" label="人员状态">
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
              <el-table-column
                :show-overflow-tooltip="true"
                align="center"
                prop="in_time"
                label="入职时间"
              >
                <template slot-scope="scope">{{scope.row.in_time.split(' ')[0]}}</template>
              </el-table-column>
              <!-- 操作 -->
              <el-table-column label="操作" align="center" width="170px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="editStaffBtn(scope.row.id, scope.row.name)"
                    circle
                    v-has-power="{limitList: [1, 4, 5, 16], role_id: $store.state.userInfo.role_id}"
                  ></el-button>
                  <!-- <el-popconfirm
                    confirmButtonText="好的"
                    cancelButtonText="不用了"
                    icon="el-icon-info"
                    iconColor="red"
                    title="您确定要永久删除该员工吗？"
                    @onConfirm="formDeleteBtn(scope.row.id)"
                  >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      circle
                      slot="reference"
                      style="margin: 0 10px"
                      v-has-power="{limitList: [1,], role_id: $store.state.userInfo.role_id}"
                    ></el-button>
                  </el-popconfirm>-->

                  <!-- 图片提示 -->
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="图片上传"
                    placement="top"
                    :enterable="false"
                  >
                    <el-button
                      @click="pictureBtn(scope.row.name, scope.row.id)"
                      type="warning"
                      size="mini"
                      icon="el-icon-picture-outline"
                      circle
                      v-has-power="{limitList: [1, 4, 5, 16], role_id: $store.state.userInfo.role_id}"
                    ></el-button>
                  </el-tooltip>
                  <el-popover
                    style="margin-left: 10px"
                    placement="bottom"
                    @show="shareShow(scope.row.id)"
                    width="360"
                    trigger="hover"
                  >
                    <el-row>
                      <el-col :span="16">
                        <el-input class="shareInput" size="mini" disabled v-model="shareLink"></el-input>
                      </el-col>
                      <el-col :span="8">
                        <div style="text-align: right; margin: 0">
                          <button
                            class="copy"
                            @mouseenter.once="copyBtn($event, scope.$index)"
                            @click="copyBtn($event, scope.$index)"
                            :data-clipboard-text="shareLink"
                          >复制</button>
                          <el-button @click="openShareLink" type="primary" size="mini">跳转</el-button>
                        </div>
                      </el-col>
                    </el-row>
                    <el-button
                      type="success"
                      icon="el-icon-share"
                      slot="reference"
                      size="mini"
                      circle
                      v-has-power="{limitList: [1, 4, 5, 16], role_id: $store.state.userInfo.role_id}"
                    ></el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <!-- 图片上传 -->
          <el-dialog
            :title="pictureTitle"
            :visible.sync="pictureDialogVisible"
            @close="picDialogClose"
            width="50%"
            center
            class="picDialog"
          >
            <!-- 内容区域 -->

            <!-- 身份证 -->
            <div class="box-border">
              <p class="title-picture">
                <span>身份证:</span>
              </p>
              <el-upload
                :action="baseurl + 'api/upload'"
                list-type="picture-card"
                :headers="{Authorization: $store.state.userInfo.userToken}"
                :on-preview="handleIdentyPreview"
                :on-remove="handleIdentyRemove"
                :on-exceed="handleIdentyExceed"
                :on-success="handleIdentySuccess"
                multiple
                :limit="2"
                class="upload"
                :file-list="identyimg"
              >
                <i class="el-icon-picture"></i>
              </el-upload>
              <el-dialog append-to-body :visible.sync="dialogIdentyVisible">
                <img width="100%" :src="dialogIdentyImageUrl" alt />
              </el-dialog>
            </div>
            <!-- 体检证件 -->
            <div class="box-border">
              <p class="title-picture">
                <span>体检证件:</span>
              </p>
              <el-upload
                :action="baseurl + 'api/upload'"
                list-type="picture-card"
                :headers="{Authorization: $store.state.userInfo.userToken}"
                :on-preview="handleBodyPreview"
                :on-remove="handleBodyRemove"
                :on-exceed="handleBodyExceed"
                :on-success="handleBodySuccess"
                multiple
                :limit="3"
                class="upload"
                :file-list="Bodyimg"
              >
                <i class="el-icon-picture"></i>
              </el-upload>
              <el-dialog append-to-body :visible.sync="dialogBodyVisible">
                <img width="100%" :src="dialogBodyImageUrl" alt />
              </el-dialog>
            </div>
            <!-- 生活照片 -->
            <div class="box-border">
              <p class="title-picture">
                <span>生活照片:</span>
              </p>
              <el-upload
                :action="baseurl + 'api/upload'"
                list-type="picture-card"
                :headers="{Authorization: $store.state.userInfo.userToken}"
                :on-preview="handleLifePreview"
                :on-remove="handleLifeRemove"
                :on-success="handleLifeSuccess"
                :on-exceed="handleLifeExceed"
                multiple
                :limit="2"
                class="upload"
                :file-list="lifeimg"
              >
                <i class="el-icon-picture"></i>
              </el-upload>
              <el-dialog append-to-body :visible.sync="dialogLifeVisible">
                <img width="100%" :src="dialogLifeImageUrl" alt />
              </el-dialog>
            </div>

            <!-- 技能照片 -->
            <div class="box-border">
              <p class="title-picture">
                <span>技能照片:</span>
              </p>
              <el-upload
                :action="baseurl + 'api/upload'"
                list-type="picture-card"
                :headers="{Authorization: $store.state.userInfo.userToken}"
                :on-preview="handleSkillPreview"
                :on-remove="handleSkillRemove"
                :on-success="handleSkillSuccess"
                :on-exceed="handleSkillExceed"
                multiple
                :limit="8"
                class="upload"
                :file-list="skillimg"
              >
                <i class="el-icon-picture"></i>
              </el-upload>
              <el-dialog append-to-body :visible.sync="dialogSkillVisible">
                <img width="100%" :src="dialogSkillImageUrl" alt />
              </el-dialog>
            </div>

            <!-- 厨艺展示 -->
            <div class="box-border">
              <p class="title-picture">
                <span>厨艺展示:</span>
              </p>
              <el-upload
                :action="baseurl + 'api/upload'"
                list-type="picture-card"
                :headers="{Authorization: $store.state.userInfo.userToken}"
                :on-preview="handleCookingPreview"
                :on-remove="handleCookingRemove"
                :on-success="handleCookingSuccess"
                :on-exceed="handleCookingExceed"
                multiple
                :limit="5"
                class="upload"
                :file-list="cookingimg"
              >
                <i class="el-icon-picture"></i>
              </el-upload>
              <el-dialog append-to-body :visible.sync="dialogCookingVisible">
                <img width="100%" :src="dialogCookingImageUrl" alt />
              </el-dialog>
            </div>

            <!-- 育婴照片 -->
            <div class="box-border">
              <p class="title-picture">
                <span>育婴照片:</span>
              </p>
              <el-upload
                :action="baseurl + 'api/upload'"
                list-type="picture-card"
                :headers="{Authorization: $store.state.userInfo.userToken}"
                :on-preview="handleBadyPreview"
                :on-remove="handleBadyRemove"
                :on-exceed="handleBadyExceed"
                :on-success="handleBadySuccess"
                multiple
                :limit="4"
                class="upload"
                :file-list="Badyimg"
              >
                <i class="el-icon-picture"></i>
              </el-upload>
              <el-dialog append-to-body :visible.sync="dialogBadyVisible">
                <img width="100%" :src="dialogBadyImageUrl" alt />
              </el-dialog>
            </div>

            <!-- 其他照片 -->
            <div class="box-border">
              <p class="title-picture">
                <span>其他照片:</span>
              </p>
              <el-upload
                :action="baseurl + 'api/upload'"
                list-type="picture-card"
                :headers="{Authorization: $store.state.userInfo.userToken}"
                :on-preview="handleOtherPreview"
                :on-remove="handleOtherRemove"
                :on-exceed="handleOtherExceed"
                :on-success="handleOtherSuccess"
                multiple
                :limit="4"
                class="upload"
                :file-list="otherimg"
              >
                <i class="el-icon-picture"></i>
              </el-upload>
              <el-dialog append-to-body :visible.sync="dialogOtherVisible">
                <img width="100%" :src="dialogOtherImageUrl" alt />
              </el-dialog>
            </div>

            <!-- 脚部 -->
            <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="pictureDialogVisible = false">取 消</el-button>
              <el-button size="mini" type="primary" @click="savePicBtn">保 存</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <pagination
      :currentPage="currentPage"
      :perpage="per_page"
      :total="total"
      @handlecurrentchange="handleCurrentChange"
    />

    <!-- 添加用户 -->
    <el-dialog
      :title="title"
      :visible.sync="addUserFormVisible"
      @close="closeAddDialog"
      width="1060px"
    >
      <div class="add-staff">
        <el-form
          :inline="true"
          :rules="addUserRules"
          ref="addForm"
          :model="staffForm"
          class="add-user-form"
        >
          <!-- 头部 -->
          <div class="header-wrap">
            <el-row>
              <el-col :span="6">
                <el-form-item label="入职时间" prop="in_time" class="in-time-label">
                  <el-date-picker
                    size="mini"
                    v-model="staffForm.in_time"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    class="in_time"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="员工状态" prop="person_state" class="person_state">
                  <el-select size="mini" v-model="staffForm.person_state" placeholder="员工状态">
                    <el-option label="培训" value="1"></el-option>
                    <el-option label="待岗" value="3"></el-option>
                    <el-option label="离职" value="4"></el-option>
                    <el-option label="黑名单" value="5"></el-option>
                    <el-option label="在岗" value="6"></el-option>
                    <el-option label="离职（下单）" value="7"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-col :span="12">
                  <el-form-item label="入职来源" prop="recruiters_name">
                    <el-input size="mini" placeholder="姓名" v-model="staffForm.recruiters_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item prop="recruiters_mobile">
                    <el-input size="mini" placeholder="手机号" v-model="staffForm.recruiters_mobile"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </div>

          <!-- 主体 -->
          <div class="content-wrap">
            <el-row>
              <el-col :span="4">
                <el-form-item label="姓名" prop="name">
                  <el-input size="mini" v-model="staffForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="家用电器" prop="device">
                  <el-select size="mini" multiple v-model="staffForm.device" placeholder="请选择">
                    <el-option
                      v-for="item in wirings"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="厨艺" prop="cooking">
                  <el-select size="mini" v-model="staffForm.cooking" placeholder="请选择" multiple>
                    <el-option
                      v-for="item in cookings"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-col :span="15">
                  <el-form-item label="户口地址" class="registration_address" prop="census_id">
                    <el-cascader
                      v-if="isDisplaySave"
                      v-model="staffForm.census_id"
                      size="mini"
                      :props="census_data"
                    ></el-cascader>
                    <el-cascader
                      v-else
                      v-model="staffForm.census_id"
                      size="mini"
                      :props="census_data"
                      :placeholder="staffForm.census_text"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="census_address_desc">
                    <el-input
                      size="mini"
                      class="census_address_desc"
                      v-model="staffForm.census_address_desc"
                      placeholder="详细地址"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <el-form-item label="籍贯" prop="census">
                  <el-input size="mini" v-model="staffForm.census"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="体重" prop="weight">
                  <el-input style="width:80px" type="number" v-model="staffForm.weight" size="mini"></el-input>kg
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="工资要求" prop="salary">
                  <el-select size="mini" v-model="staffForm.salary" placeholder="请选择">
                    <el-option label="3000~5000" value="3000~5000"></el-option>
                    <el-option label="5000~8000" value="5000~8000"></el-option>
                    <el-option label="8000~10000" value="8000~10000"></el-option>
                    <el-option label="10000~13000" value="10000~13000"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-col :span="15">
                  <el-form-item label="现居地址" class="registration_address" prop="now_id">
                    <el-cascader
                      v-if="isDisplaySave"
                      size="mini"
                      v-model="staffForm.now_id"
                      :props="census_data"
                    ></el-cascader>
                    <el-cascader
                      v-else
                      size="mini"
                      v-model="staffForm.now_id"
                      :props="census_data"
                      :placeholder="staffForm.now_text"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="now_address_desc">
                    <el-input
                      size="mini"
                      class="detail_address"
                      v-model="staffForm.now_address_desc"
                      placeholder="详细地址"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <el-form-item label="性别" prop="sex">
                  <el-select size="mini" v-model="staffForm.sex">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="学历" prop="education" class="education">
                  <el-select size="mini" v-model="staffForm.education" placeholder="学历">
                    <el-option label="小学" value="小学"></el-option>
                    <el-option label="初中" value="初中"></el-option>
                    <el-option label="高中" value="高中"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="研究生" value="研究生"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="婚姻状况" class="marital" prop="marital_status">
                  <el-select size="mini" v-model="staffForm.marital_status" placeholder="请选择">
                    <el-option label="未婚" value="未婚"></el-option>
                    <el-option label="已婚" value="已婚"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="英语水平" prop="english">
                  <el-select size="mini" v-model="staffForm.english" placeholder="请选择">
                    <el-option
                      v-for="item in english"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="计算机水平" prop="computer">
                  <el-select size="mini" v-model="staffForm.computer" placeholder="请选择">
                    <el-option
                      v-for="item in computers"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <el-form-item label="电话" prop="mobile">
                  <el-input size="mini" v-model="staffForm.mobile"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="身高" prop="height" class="height">
                  <el-input style="width:80px" v-model="staffForm.height" size="mini" type="number"></el-input>cm
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="政治面貌" prop="political_status">
                  <el-select size="mini" v-model="staffForm.political_status" placeholder="请选择">
                    <el-option label="群众" value="群众"></el-option>
                    <el-option label="团员" value="团员"></el-option>
                    <el-option label="党员" value="党员"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="健康情况" prop="health">
                  <el-select size="mini" v-model="staffForm.health" placeholder="请选择">
                    <el-option label="健康" value="健康"></el-option>
                    <el-option label="亚健康" value="亚健康"></el-option>
                    <el-option label="不好" value="不好"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="服务技能" class="service_skills" prop="service_skills">
                  <el-select
                    size="mini"
                    multiple
                    v-model="staffForm.service_skills"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in skills"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <el-form-item label="民族" prop="nation">
                  <el-input size="mini" v-model="staffForm.nation"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="身份证" prop="identity" class="identity">
                  <el-input v-model="staffForm.identity" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="空余时间" prop="spare_time">
                  <el-input v-model="staffForm.spare_time" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="岗位" prop="job">
                  <el-select size="mini" v-model="staffForm.job" placeholder="请选择">
                    <el-option
                      v-for="item in jobs"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="家政经验" class="work_years" prop="work_years">
                  <el-select size="mini" v-model="staffForm.work_years" placeholder="请选择">
                    <el-option label="1~2年" value="1~2年"></el-option>
                    <el-option label="3~5年" value="3~5年"></el-option>
                    <el-option label="5~10年" value="5~10年"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <el-form-item label="生日" prop="birthday">
                  <el-date-picker
                    v-model="staffForm.birthday"
                    placeholder="出生年月"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    size="mini"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="宗教信仰" prop="religion">
                  <el-select size="mini" v-model="staffForm.religion" placeholder="请选择">
                    <el-option label="佛教" value="佛教"></el-option>
                    <el-option label="基督教" value="基督教"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="语言能力" prop="language">
                  <el-select size="mini" multiple v-model="staffForm.language" placeholder="请选择">
                    <el-option
                      v-for="item in languages"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="display: flex">
                <el-col :sapn="6">
                  <el-form-item label="紧急联系人" prop="urgent_name" class="urgent-name">
                    <el-input size="mini" v-model="staffForm.urgent_name" placeholder="姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item prop="urgent_mobile">
                    <el-input
                      size="mini"
                      placeholder="手机号"
                      v-model="staffForm.urgent_mobile"
                      style="width: 150px"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="4">
                <el-form-item label="血型" prop="blood">
                  <el-select size="mini" v-model="staffForm.blood" placeholder="请选择">
                    <el-option label="A型" value="A型"></el-option>
                    <el-option label="B型" value="B型"></el-option>
                    <el-option label="O型" value="O型"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="安置协议" prop="agreement_amount" class="identity">
                  <el-input v-model="staffForm.agreement_amount" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5"></el-col>
              <el-col :span="5">
                <el-form-item label="户口类型" prop="census_type">
                  <el-select size="mini" v-model="staffForm.census_type" placeholder="请选择">
                    <el-option label="农村户口" value="农村户口"></el-option>
                    <el-option label="非农村户口" value="非农村户口"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5"></el-col>
            </el-row>

            <!-- 自我评价 -->
            <el-row>
              <el-col :span="8">
                <el-form-item label="自我评价" prop="self_evaluation">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 4}"
                    v-model="staffForm.self_evaluation"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="面试评价" prop="interview_evaluation">
                  <el-input
                    :autosize="{ minRows: 3, maxRows: 4}"
                    type="textarea"
                    v-model="staffForm.interview_evaluation"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <!-- 工作经历 -->
              <el-col :span="12" class="work">
                <!-- 第一个 -->
                <div
                  class="work-list"
                  v-for="(item, index) in staffForm.work_experience"
                  :key="index"
                >
                  <el-row>
                    <el-col :span="15">
                      <el-form-item
                        label="工作经历"
                        :prop="'work_experience.' + index + '.time'"
                        class="workdata"
                      >
                        <el-date-picker
                          v-model="item.time"
                          size="mini"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="从事岗位" :prop="'work_experience.' + index + '.job'">
                        <el-input size="mini" v-model="item.job"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="15">
                      <el-form-item
                        label="地址"
                        :prop="'work_experience.' + index + '.address'"
                        class="adressForm"
                      >
                        <el-input
                          size="mini"
                          class="detail_address"
                          v-model="item.address"
                          placeholder="请输入地址"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item
                        label="从事内容"
                        :prop="'work_experience.' + index + '.content'"
                        class="work-content"
                      >
                        <el-input size="mini" v-model="item.content" type="textarea" autosize></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <!-- 添加工作按钮事件按钮 -->
                <el-row class="work-add">
                  <el-col :span="24">
                    <el-button
                      size="mini"
                      class="add-work"
                      plain
                      icon="el-icon-plus"
                      @click="addWorkBtn"
                      type="primary"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-col>
              <!-- 家庭成员 -->
              <el-col :span="12" class="family-wrap">
                <div class="family" v-for="(item, index) in staffForm.family_member" :key="index">
                  <el-row>
                    <el-col :span="7">
                      <el-form-item label="家庭成员" :prop="'family_member.' + index + '.name'">
                        <el-input size="mini" v-model="item.name" class="family-name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="关系" :prop="'family_member.' + index + '.relation'">
                        <el-input size="mini" v-model="item.relation" placeholder="诸如：母子"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item
                        label="目前状况"
                        :prop="'family_member.' + index + '.current_situation'"
                      >
                        <el-input size="mini" v-model="item.current_situation"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <!-- 添加家庭成员按钮事件按钮 -->
                <el-row class="family-add">
                  <el-col :span="24">
                    <el-button
                      size="mini"
                      class="add-family"
                      plain
                      icon="el-icon-plus"
                      @click="addFamilyBtn"
                      type="primary"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div class="dialog-footer">
          <el-button @click="cancelAddStaff" size="mini">取 消</el-button>
          <el-button v-if="isDisplaySave" type="primary" @click="saveStaffBtn" size="mini">保 存</el-button>
          <el-button v-else type="primary" @click="editSaveStaffBtn" size="mini">保 存</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 生日提醒 -->
    <el-dialog title="今日生日榜" :visible.sync="birthdayDialogVisible" width="600px" center>
      <el-table :data="birthdayListData" height="500">
        <el-table-column prop="date" label="生日日期" align="center"></el-table-column>
        <el-table-column align="center" prop="staff.name" label="姓名">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark">{{scope.row.staff.name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="staff.mobile" label="手机号"></el-table-column>
        <el-table-column align="center" prop="staff.job" label="岗位"></el-table-column>
        <el-table-column align="center" label="人员状态">
          <template slot-scope="scope">
            <p v-if="scope.row.staff.person_state== 1">培训</p>
            <p v-else-if="scope.row.staff.person_state == 2">考核</p>
            <p v-else-if="scope.row.staff.person_state == 3">待岗</p>
            <p v-else-if="scope.row.staff.person_state == 4">离职</p>
            <p v-else-if="scope.row.staff.person_state == 5">黑名单</p>
            <p v-else-if="scope.row.staff.person_state == 6">在岗</p>
            <p v-else-if="scope.row.staff.person_state == 7">离职(下单)</p>
            <p v-else>错误</p>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import Search from "components/common/search/Search";
import eventVue from "common/eventVue";
import Pagination from "components/common/pagination/Pagination";
import {
  requestUserListDate,
  deleteStaff,
  getOneStraffInfo,
  getEventInfo,
  saveEventInfo,
  uploadImage,
  getOneStaffImage,
  saveStaffInfo,
  updateStraffInfo,
  searchAppointStaff,
  getStaffBirthday,
  saveHandlEva,
  addSourceData,
  editSourceData,
  deleteSourceData,
  createResume,
  deleteEventInfo,
} from "network/humanageRequest";
import download from "downloadjs";

import {
  getProvince,
  getCity,
  getDistrict,
  getLanguage,
  getEnglish,
  getComputer,
  getCooking,
  getWiring,
  getJob,
  getKills,
  getAllSource,
} from "network/select";

export default {
  name: "DataInput",
  data() {
    return {
      shareLink: "",
      birthdayDialogVisible: false,
      birthdayListData: [],
      birthdayNumber: "",
      // 搜索字段
      searchForm: {},

      // 用户列表数据
      userList: [],
      // 是否显示用户
      addUserFormVisible: false,
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 已选择的的用户id
      selected: [],
      // 修改与增加title
      title: "新增员工",
      // 是否显示等待加载
      loading: true,
      // 是否显示图片上传弹框
      pictureDialogVisible: false,
      // 上传图片数据
      pictureData: {
        staff_id: "",
        identity: [],
        body_check_c: [],
        life: [],
        skill: [],
        cooking: [],
        take_body: [],
        other: [],
      },
      // 经历评价内容
      handleEvaluation: "",
      // 默认显示客户详情
      activeName: "first",
      // 域名
      baseurl: "http://jz.i4ig.com/",
      // baseurl: "http://jiazhen.gz-isp.com/",
      // 新增事件数据
      eventData: [],
      // 新增事件表单
      eventForm: {
        staff_id: "",
        event_type: "",
        content: "",
      },

      /** */
      // 添加用户数据
      addUserForm: {
        name: "",
        sex: "",
        mobile: "",
        religion: "",
        in_time: "",
        nation: "",
        identity: "",
        // 假期要求
        holiday: "",
        // 工作年限
        work_years: "",
        salary: "",
        education: "",
        blood: "",
        entry_person: "",
        person_state: "",
        recruiters_name: "",
        recruiters_mobile: "",
        spare_time: "",
        birthday: "",
        // 户籍类型
        census_type: "",
        census: "",
        census_id: [],
        census_address_desc: "",
        height: "",
        weight: "",
        urgent_name: "",
        urgent_mobile: "",
        language: [],
        self_evaluation: "",
        agreement_amount: "", // 安置协议
        political_status: "",
        marital_status: "",
        now_id: [],
        now_address_desc: "",
        health: "",
        english: "",
        computer: "",
        cooking: [],
        service_skills: [],
        device: [],
        job: [],
        // 面试评价
        interview_evaluation: "",

        // 工作经历
        work_experience: [
          {
            time: [],
            job: "",
            address: " ",
            content: "",
          },
        ],
        // 家庭成员
        family_member: [
          {
            name: "",
            relation: "",
            current_situation: "",
          },
          {
            name: "",
            relation: "",
            current_situation: "",
          },
        ],
      },

      // 编辑保存，修复bug
      editnow_id: [],
      editcensus_id: [],

      // 添加用户的
      staffForm: {},

      // 验证规则
      addUserRules: {
        name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        // sex: [{ required: true, message: "请输入员工性别", trigger: "change" }],
        mobile: [{ required: true, message: "请输入电话", trigger: "blur" }],
        identity: [
          { required: true, message: "请输入员工身份证号", trigger: "blur" },
        ],
        birthday: [
          { required: true, message: "请输入出生年月", trigger: "blur" },
        ],
        urgent_name: [
          { required: true, message: "请输入紧急联系人", trigger: "blur" },
        ],
        urgent_mobile: [
          { required: true, message: "请输入紧急电话", trigger: "blur" },
        ],
        // political_status: [
        //   { required: true, message: "请输入政治面貌", trigger: "change" },
        // ],
        // marital_status: [
        //   { required: true, message: "请输入婚姻状况", trigger: "change" },
        // ],
        census_id: [
          { required: true, message: "请输入户口地址", trigger: "change" },
        ],
        census_address_desc: [
          { required: true, message: "请输入户口地址", trigger: "blur" },
        ],
        now_id: [
          { required: true, message: "请输入现居地址", trigger: "change" },
        ],
        now_address_desc: [
          { required: true, message: "请输入现居地址", trigger: "blur" },
        ],
        job: [{ required: true, message: "请选择岗位", trigger: "blur" }],
        spare_time: [
          { required: true, message: "请输入空余时间", trigger: "blur" },
        ],
      },

      // 三级地址搜索
      census_data: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;

          if (level === 0) {
            // 获取省
            getProvince().then((res) => {
              const nodes = res.data.map((item) => ({
                value: item.id,
                label: item.name,
                leaf: level >= 2,
              }));
              resolve(nodes);
            });
          }
          // 获取市
          if (level === 1) {
            let limit = [34967];
            let limits = [34948, 34968];
            if (limit.includes(node.value)) {
              resolve([{ value: 34967, label: "台湾省", leaf: level >= 1 }]);
            }
            if (limits.includes(node.value)) {
              getCity(node.value).then((res) => {
                const nodes = res.data.map((item) => ({
                  value: item.id,
                  label: item.name,
                  leaf: level >= 1,
                }));
                resolve(nodes);
              });
            }
            getCity(node.value).then((res) => {
              const nodes = res.data.map((item) => ({
                value: item.id,
                label: item.name,
                leaf: level >= 2,
              }));
              resolve(nodes);
            });
          }
          // 获取县
          if (level === 2) {
            getDistrict(node.value).then((res) => {
              const nodes = res.data.map((item) => ({
                value: item.id,
                label: item.name,
                leaf: level >= 2,
              }));
              resolve(nodes);
            });
          }
        },
      },
      // 默认显示保存按钮
      isDisplaySave: true,

      // 语言能力
      languages: null,
      // 英语水平
      english: null,
      // 计算机水平
      computers: null,
      // 厨艺水平
      cookings: null,
      // 家用电器
      wirings: null,
      // 岗位
      jobs: null,
      // 服务技能
      skills: null,

      /**
       * 上传图片显示，以及链接
       * */
      pictureTitle: "",
      // 身份证上传
      dialogIdentyImageUrl: "",
      dialogIdentyVisible: false,
      // 体检证件
      dialogBodyImageUrl: "",
      dialogBodyVisible: false,
      // 生活照片
      dialogLifeImageUrl: "",
      dialogLifeVisible: false,
      // 技能照片
      dialogSkillImageUrl: "",
      dialogSkillVisible: false,
      // 厨艺展示
      dialogCookingImageUrl: "",
      dialogCookingVisible: false,
      // 育婴照片
      dialogBadyImageUrl: "",
      dialogBadyVisible: false,
      // 其他照片
      dialogOtherImageUrl: "",
      dialogOtherVisible: false,

      // 图片展示列，只能是这个格式。
      identyimg: [],
      Bodyimg: [],
      lifeimg: [],
      skillimg: [],
      cookingimg: [],
      Badyimg: [],
      otherimg: [],
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
  components: {
    Search,
    Pagination,
  },
  methods: {
    timestampToTime(times) {
      let date = new Date(parseInt(times) * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      return Y + M + D;
    },
    // 生成分享链接
    shareShow(staff_id) {
      this.shareLink = `http://jz.i4ig.com/get_pdf?id=${staff_id}`;
    },
    // 复制分享链接回调
    copyBtn(e, index) {
      let clipboard = new Clipboard(e.target);
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        this.$message.error("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    // 跳转链接
    openShareLink() {
      window.open(this.shareLink);
    },
    // 生成简历
    createResumeBtn() {
      // console.log(this.selected);
      if (this.selected.length == 1) {
        createResume(this.selected[0]).then((res) => {
          let { code, data, msg } = res;
          if (code === 200) {
            // console.log(data.url);
            var a = document.createElement("a");
            a.setAttribute("href", data.url);
            a.setAttribute("target", "_blank");
            a.setAttribute("download", "");
            a.setAttribute("id", "js_a");
            //防止反复添加
            if (document.getElementById("js_a")) {
              document.body.removeChild(document.getElementById("js_a"));
            }
            document.body.appendChild(a);
            a.click();
            // download(data.url)
          } else {
            this.$message.error(msg);
          }
        });
      } else {
        this.$message.error("只能选中一个！");
      }
    },
    // 生日提醒
    birthdayBtn() {
      this.birthdayDialogVisible = true;
      this.getBirthdayData();
    },

    // 删除事件
    deleteEventBtn(id, staff_id) {
      deleteEventInfo(id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.eventTabsShow(staff_id);
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 定义生日获取函数
    getBirthdayData() {
      getStaffBirthday().then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.birthdayListData = data.data;
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 经历评价内容保存
    saveHandleEva(staff_id) {
      if (this.handleEvaluation.trim() == "") {
        this.$message.error("请输入评价内容！");
      } else {
        let handleForm = {
          staff_id: staff_id,
          evaluation: this.handleEvaluation,
        };
        saveHandlEva(handleForm).then((res) => {
          let { code, msg } = res;
          if (code === 200) {
            this.$message.success(msg);
            this.getUserData();
            this.this.handleEvaluation = "";
          } else {
            this.$message.error(msg);
          }
        });
      }
    },

    // 定义搜索数据函数
    searchAppointData(options) {
      searchAppointStaff(options).then((res) => {
        let { code, data, msg } = res;
        if (res.code === 200) {
          // console.log(res.data);
          this.userList = data.data;
          this.currentPage = data.current_page;
          this.total = data.total;
          this.per_page = data.per_page;

          // 关闭等待
          this.loading = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    searchBtn(val) {
      this.searchForm = val;
      this.searchAppointData(this.searchForm);
    },

    // 定义请求用户列表数据
    getUserData() {
      this.loading = true;
      this.searchAppointData(this.searchForm);
    },
    //
    popoverHiden() {},

    // 清除原有图片操作
    clearImg() {
      this.identyimg = [];
      this.Bodyimg = [];
      this.lifeimg = [];
      this.skillimg = [];
      this.cookingimg = [];
      this.Badyimg = [];
      this.otherimg = [];
    },

    // 显示图片上传的弹框
    pictureBtn(name, id) {
      this.pictureTitle = `（${name}）图片上传`;
      this.pictureData.staff_id = id;
      this.pictureDialogVisible = true;
      // 获取图片
      getOneStaffImage(id).then((res) => {
        if (res.code === 200) {
          let data = res.data;
          // console.log(res.data);
          // pictureData赋值（防止保存图片错误，使数据丢失）
          this.pictureData.staff_id = data.staff_id;
          this.pictureData.identity = data.identity;
          this.pictureData.body_check_c = data.body_check_c;
          this.pictureData.life = data.life;
          this.pictureData.skill = data.skill;
          this.pictureData.cooking = data.cooking;
          this.pictureData.take_body = data.take_body;
          this.pictureData.other = data.other;

          this.identyimg = data.identity.map((item) => {
            return { name: "identity", url: item };
          });
          this.Bodyimg = data.body_check_c.map((item) => {
            return { name: "body_check_c", url: item };
          });
          this.lifeimg = data.life.map((item) => {
            return { name: "life", url: item };
          });
          this.skillimg = data.skill.map((item) => {
            return { name: "skill", url: item };
          });
          this.cookingimg = data.cooking.map((item) => {
            return { name: "cooking", url: item };
          });
          this.Badyimg = data.take_body.map((item) => {
            return { name: "take_body", url: item };
          });
          this.otherimg = data.other.map((item) => {
            return { name: "other", url: item };
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 点击新增按钮
    addStaffBtn() {
      this.addUserFormVisible = true;
      this.title = "新增员工";
      this.staffForm = {};

      // 发送事件（默认入职时间为当前时间）
      // eventVue.$emit("addstaffevent");
      // 显示保存按钮
      this.isDisplaySave = true;
      // 改变staffForm
      this.staffForm = this.addUserForm;
      // 获取当前时间
      this.staffForm.in_time = new Date()
        .toLocaleDateString()
        .replace(/\//g, "-");
    },

    // 添加按钮关闭回调
    closeAddDialog() {
      this.$refs.addForm.resetFields();
    },

    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      this.searchForm.page = currentpage;
      this.searchAppointData(this.searchForm);
    },

    // 点击表单中的删除按钮
    formDeleteBtn(id) {
      let ids = [id];
      deleteStaff(ids).then((res) => {
        if (res.code === 200) {
          // 提示删除成功
          this.$message.success(res.msg);
          // 更新数据
          this.getUserData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 选择删除按钮
    selectDeleteBtn() {
      if (this.selected.length !== 0) {
        this.$confirm("此操作将永久删除选中员工, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 确认操作
            deleteStaff(this.selected).then((res) => {
              if (res.code === 200) {
                // 提示删除成功
                this.$message.success(res.msg);
                // 更新数据
                this.getUserData();
              } else {
                this.$message.error(res.msg);
              }
            });
          })
          .catch(() => {
            // 取消操作
            this.$message.info("已取消删除");
          });
      } else {
        this.$message.warning("请选择要删除的用户！");
      }
    },

    // 处理选择
    handleSelectionChange(selectedArry) {
      // 清除操作
      this.selected = [];
      selectedArry.forEach((obj) => {
        this.selected.push(obj.id);
      });
    },

    // 编辑员工
    editStaffBtn(id, name) {
      this.title = "编辑员工（" + name + "）";
      this.addUserFormVisible = true;
      // 发送员工id
      // eventVue.$emit("editstaffevent", id);
      this.isDisplaySave = false;
      getOneStraffInfo(id).then((res) => {
        if (res.code === 200) {
          this.staffForm = res.data;
          this.editnow_id = res.data.now_id;
          this.editcensus_id = res.data.census_id;
          this.staffForm.work_experience = Object.values(res.data.work_experience)
          this.staffForm.family_member = Object.values(res.data.family_member)
          this.staffForm.now_id = [];
          this.staffForm.census_id = [];
          this.staffForm.census_text = res.data.census_text.join("/");
          this.staffForm.now_text = res.data.now_text.join("/");
        } else {
          this.$message.warning(res.msg);
        }
      });
    },

    //获取该员工的所有事件内容
    eventTabsShow(staff_id) {
      this.eventForm.staff_id = staff_id;
      getEventInfo(staff_id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.eventData = data;
          // console.log(data);
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 展开是触发
    expandShow(row, expandedRows) {
      if (expandedRows.length == 0) return;
      this.eventTabsShow(row.id);
    },

    // 保存事件按钮
    saveEventData() {
      let { event_type, content, staff_id } = this.eventForm;
      if (event_type.trim() == "" || content.trim() == "") {
        this.$message.error("不能为空");
      } else {
        saveEventInfo(this.eventForm).then((res) => {
          let { code, msg } = res;
          if (code === 200) {
            this.$message.success(msg);
            this.eventForm.event_type = "";
            this.eventForm.content = "";
            this.eventTabsShow(staff_id);
          } else {
            this.$message.error(msg);
          }
        });
      }
    },

    /**
     * 图片上传
     */
    // 转变上传数据
    transforPicData(item, file) {
      // this.pictureData[item] = [...fileList].map((value) => {
      //   return this.baseurl + value.response.data.url;
      // });
      this.pictureData[item].push(this.baseurl + file.response.data.url);
    },
    // 身份证上传
    handleIdentyRemove(file, fileList) {
      let index = this.pictureData.identity.indexOf(file.url);
      this.pictureData.identity.splice(index, 1);
    },
    handleIdentyPreview(file) {
      this.dialogIdentyImageUrl = file.url;
      this.dialogIdentyVisible = true;
    },
    handleIdentyExceed() {
      this.$message.warning("最多上传2张！");
    },
    handleIdentySuccess(res, file, fileList) {
      this.transforPicData("identity", file);
    },
    // 体检证件
    handleBodyRemove(file, fileList) {
      let index = this.pictureData.body_check_c.indexOf(file.url);
      this.pictureData.body_check_c.splice(index, 1);
    },
    handleBodyPreview(file) {
      this.dialogBodyImageUrl = file.url;
      this.dialogBodyVisible = true;
    },
    handleBodyExceed() {
      this.$message.warning("最多上传3张！");
    },
    handleBodySuccess(res, file, fileList) {
      this.transforPicData("body_check_c", file);
    },
    // 生活照片
    handleLifeRemove(file, fileList) {
      let index = this.pictureData.life.indexOf(file.url);
      this.pictureData.life.splice(index, 1);
    },
    handleLifePreview(file) {
      this.dialogLifeImageUrl = file.url;
      this.dialogLifeVisible = true;
    },
    handleLifeExceed() {
      this.$message.warning("最多上传2张！");
    },
    handleLifeSuccess(res, file, fileList) {
      this.transforPicData("life", file);
    },
    // 技能照片
    handleSkillRemove(file, fileList) {
      let index = this.pictureData.skill.indexOf(file.url);
      this.pictureData.skill.splice(index, 1);
    },
    handleSkillPreview(file) {
      this.dialogSkillImageUrl = file.url;
      this.dialogSkillVisible = true;
    },
    handleSkillExceed() {
      this.$message.warning("最多上传8张！");
    },
    handleSkillSuccess(res, file, fileList) {
      this.transforPicData("skill", file);
    },
    // 厨艺展示
    handleCookingRemove(file, fileList) {
      let index = this.pictureData.cooking.indexOf(file.url);
      this.pictureData.cooking.splice(index, 1);
    },
    handleCookingPreview(file) {
      this.dialogCookingImageUrl = file.url;
      this.dialogCookingVisible = true;
    },
    handleCookingExceed() {
      this.$message.warning("最多上传5张！");
    },
    handleCookingSuccess(res, file, fileList) {
      this.transforPicData("cooking", file);
    },
    // 育婴照片
    handleBadyRemove(file, fileList) {
      let index = this.pictureData.take_body.indexOf(file.url);
      this.pictureData.take_body.splice(index, 1);
    },
    handleBadyPreview(file) {
      this.dialogCookingImageUrl = file.url;
      this.dialogCookingVisible = true;
    },
    handleBadyExceed() {
      this.$message.warning("最多上传4张！");
    },
    handleBadySuccess(res, file, fileList) {
      this.transforPicData("take_body", file);
    },
    // 其他照片
    handleOtherRemove(file, fileList) {
      let index = this.pictureData.other.indexOf(file.url);
      this.pictureData.other.splice(index, 1);
    },
    handleOtherPreview(file) {
      this.dialogCookingImageUrl = file.url;
      this.dialogCookingVisible = true;
    },
    handleOtherExceed() {
      this.$message.warning("最多上传4张！");
    },
    handleOtherSuccess(res, file, fileList) {
      this.transforPicData("other", file);
    },

    // 保存按钮
    savePicBtn() {
      uploadImage(this.pictureData).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          // 清除操作
          for (let item in this.pictureData) {
            this.pictureData[item] = null;
          }
          // 关闭图片弹框
          this.pictureDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 图片上传dialog关闭回调
    picDialogClose() {
      this.clearImg();
    },

    /**
     *
     *
     */
    cancelAddStaff() {
      this.$refs.addForm.resetFields();
      this.addUserFormVisible = false;
    },
    // 添加工作经历按钮
    addWorkBtn() {
      if (this.staffForm.work_experience.length > 3) {
        return this.$message.error("不能再添加了！会爆的！");
      } else {
        this.staffForm.work_experience.push({
          time: [],
          job: "",
          address: "",
          content: "",
        });
      }
    },

    // 添加家庭成员
    addFamilyBtn() {
      if (this.staffForm.family_member.length > 4) {
        return this.$message.error("不能再添加了！");
      } else {
        this.staffForm.family_member.push({
          name: "",
          relation: "",
          current_situation: "",
        });
      }
    },

    // 保存员工
    saveStaffBtn() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          saveStaffInfo(this.staffForm).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              // 更新员工数据
              // eventVue.$emit("saveUpdateStaff");
              this.getUserData();
              // 关闭弹框
              this.cancelAddStaff();
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          this.$message.error("验证失败");
        }
      });
    },

    // 编辑保存
    editSaveStaffBtn() {
      // 修复bug
      if (this.staffForm.now_id.length == 0) {
        this.staffForm.now_id = this.editnow_id;
      }
      if (this.staffForm.census_id == 0) {
        this.staffForm.census_id = this.editcensus_id;
      }

      updateStraffInfo(this.staffForm).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          // 关闭编辑弹框
          this.cancelAddStaff();
          // 更新数据
          // eventVue.$emit("saveUpdateStaff");
          this.getUserData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
  created() {
    getStaffBirthday().then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        this.birthdayNumber = data.data ? data.data.length : 0;
      } else {
        this.$message.error(msg);
      }
    });
    // 获取用户数据
    this.getUserData();

    // 监听取消按钮关闭事件
    // eventVue.$on("canceladdstaff", (val) => {
    //   this.addUserFormVisible = false;
    // });

    // // 监听储存更新
    // eventVue.$on("saveUpdateStaff", (val) => {
    //   this.getUserData();
    // });

    // 获取省
    getProvince().then((res) => {
      this.hProvenceArray = (res && res.data) || [];
      this.hProvenceArray.forEach((item, index) => {
        this.hProvenceArray[index].children = [];
      });
    });
    // 获取语言能力分组
    getLanguage().then((res) => {
      if (res.code === 200) {
        this.languages = res.data;
      } else {
        this.$message.waraing("获取语言能力失败！");
      }
    });

    // 英语水平
    getEnglish().then((res) => {
      if (res.code === 200) {
        this.english = res.data;
      } else {
        this.$message.waraing("获取英语水平失败！");
      }
    });

    // 计算机水平
    getComputer().then((res) => {
      if (res.code === 200) {
        this.computers = res.data;
      } else {
        this.$message.waraing("获取计算机水平失败！");
      }
    });

    // 厨艺水平
    getCooking().then((res) => {
      if (res.code === 200) {
        this.cookings = res.data;
      } else {
        this.$message.waraing("获取厨艺水平失败！");
      }
    });

    // 家用电器水平
    getWiring().then((res) => {
      if (res.code === 200) {
        this.wirings = res.data;
      } else {
        this.$message.waraing("获取家用电器水平失败！");
      }
    });

    // 岗位
    getJob().then((res) => {
      if (res.code === 200) {
        this.jobs = res.data;
      } else {
        this.$message.waraing("获取岗位失败！");
      }
    });

    // 服务技能
    getKills().then((res) => {
      if (res.code === 200) {
        this.skills = res.data;
      } else {
        this.$message.waraing("获取服务技能失败！");
      }
    });

    // 获取当前时间
    this.staffForm.in_time = new Date()
      .toLocaleDateString()
      .replace(/\//g, "-");
  },
  destroyed() {
    // eventVue.$off("searchstaff");
  },
};
</script>

<style lang='less' scoped>
.copy {
  color: #409eff;
  margin-right: 10px;
  cursor: pointer;
}
.user-table {
  margin-top: 10px;

  .el-card__body {
    .user-table-wrap {
      margin-top: 20px;

      /deep/.staffInfo-wrap {
        margin-left: 70px;
      }

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
    }
  }
}
// 新增事件
.option-wrap {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}
.eventForm {
  margin-top: 20px;
}
.user-table-card {
  position: relative;
  // height: 700px;

  .pagination {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

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

.user-table-card {
  border-top: 2px solid #75cbf4;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
}

.box-border {
  height: 200px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;

  .title-picture {
    color: #000;
    font-size: 18px;
    height: 30px;

    span {
      margin-left: 20px;
    }
  }

  .upload {
    display: flex;
    height: 150px;
    justify-content: center;
    overflow-y: auto;
  }
}

.picDialog {
  /deep/.el-dialog__body {
    height: 500px;
    // overflow: hidden;
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

.add-staff {
  width: 100%;

  /deep/.add-user-form {
    width: 100%;
    overflow-y: auto;
    height: 450px;

    .header-wrap {
      width: 100%;
      // height: 40px;
      border-bottom: 1px solid rgb(235, 232, 232);

      /deep/.el-form-item {
        // width: 200px;
        display: flex;
        margin-bottom: 10px;

        /deep/.el-form-item__label {
          font-size: 12px;
          width: 80px;
        }

        /deep/.el-input {
          width: 130px;
        }

        /deep/.in_time {
          width: 170px;
        }
      }

      /deep/.in-time-label {
        width: 230px;
      }

      // 员工状态
      /deep/.person_state {
        width: 180px;

        /deep/.el-input {
          width: 110px;
        }
      }

      // 入职来源
      /deep/.recruiters {
        width: 300px;

        /deep/.el-input {
          width: 80px;
        }

        /deep/.telphone {
          width: 120px;
        }
      }
    }

    // 主体
    .content-wrap {
      margin-top: 20px;
      /deep/.el-form-item {
        // width: 140px;
        display: flex;
        margin-bottom: 10px;

        /deep/.el-form-item__label {
          font-size: 12px;
          width: 80px;
        }

        /deep/.el-input {
          width: 100px;
        }
      }

      .urgent-name {
        /deep/.el-form-item__label {
          font-size: 12px;
          width: 90px;
        }
      }

      // 详细地址
      /deep/.registration_address {
        width: 350px;

        /deep/.el-cascader {
          width: 150px;

          /deep/.el-input {
            width: 100%;
          }
        }
      }

      // 婚姻
      /deep/.marital {
        // width: 200px;

        /deep/.el-form-item__label {
          width: 80px;
        }

        /deep/.el-select {
          width: 100px;

          /deep/.el-input {
            width: 100%;
          }
        }
      }

      // 添加工作经历
      .work-family {
        margin-top: 20px;
      }

      .work {
        margin-top: 20px;
        padding-top: 10px;
        border: 1px solid rgb(235, 232, 232);

        /deep/.workdata {
          // width: 200px;

          /deep/.el-form-item__label {
            // width: 100px;
          }

          /deep/.el-range-editor {
            width: 200px;
          }
        }
        /deep/.work-content {
          /deep/.el-form-item__label {
            width: 90px;
          }
        }

        /deep/.work-add {
          padding: 10px 10px;
          box-sizing: border-box;

          /deep/.add-work {
            width: 100%;
            height: 30px;
          }
        }
      }

      // 家庭成员
      .family-wrap {
        margin-top: 20px;
        padding-top: 10px;
        padding-left: 10px;
        border: 1px solid rgb(235, 232, 232);

        /deep/.family-name {
          width: 70px;
        }

        .family-add {
          padding: 10px 10px 10px 0;
          box-sizing: border-box;
          .add-family {
            width: 100%;
            height: 30px;
          }
        }
      }
    }
  }

  /deep/.add-user-form::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  /deep/.add-user-form::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }

  // 确认按钮
  .dialog-footer {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .adressForm {
    /deep/.el-input {
      /deep/.el-input__inner {
        width: 200px;
      }
    }
  }
}
</style>