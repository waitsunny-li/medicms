<template>
  <div class="user-table">
    <el-card class="user-table-card">
      <!-- 公共操作 -->
      <el-row>
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addStaffBtn">新增</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="selectDeleteBtn" size="mini">删除</el-button>
          <el-button type="warning" icon="el-icon-printer" size="mini">打印</el-button>
          <el-button type="success" icon="el-icon-share" size="mini">分享</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table
        :data="userList"
        class="user-table-wrap"
        style="width: 100%"
        height="550"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        border
      >
        <!-- 选择 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 展示 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
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
                <span class="content-text">{{scope.row.salary}}</span>
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
                <span class="content-text">{{scope.row.service_skills}}</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">家用电器</span>
                <span class="content-text">{{scope.row.device}}</span>
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
                <span class="content-text">{{scope.row.person_state}}</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">保险</span>
                <span class="content-text">{{scope.row.agreement_amount}}</span>
              </el-col>
            </el-row>

            <el-row class="expand-row">
              <el-col :span="4">
                <span class="label-text">身高</span>
                <span class="content-text">{{scope.row.height}}</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">体重</span>
                <span class="content-text">{{scope.row.weight}}</span>
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
                <span class="content-text">{{scope.row.language}}</span>
              </el-col>
            </el-row>

            <el-row class="expand-row">
              <el-col :span="4">
                <span class="label-text">录入人</span>
                <span class="content-text">{{scope.row.salary}}</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">家庭紧急联系</span>
                <span class="content-text">{{scope.row.urgent_name}}：{{scope.row.urgent_mobile}}</span>
              </el-col>
              <el-col :span="8">
                <span class="label-text">安置协议</span>
                <span class="content-text">{{scope.row.agreement_amount}}</span>
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
                <div class="content-text">
                  <el-col :span="24">月嫂</el-col>
                  <el-col :span="24">2017年至2019年</el-col>
                  <el-col :span="24">本公司</el-col>
                  <el-col :span="24">照顾小孩、老年人、宠物</el-col>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="100">
          <template slot-scope="scope">
            <div class="name-wrap">
              <el-popover placement="bottom-start" width="600" trigger="click" @hide="popoverHiden">
                <!-- 内容 -->
                <el-tabs>
                  <el-tab-pane label="新增事件">
                    <!-- 表单 -->
                    <el-table :data="eventData" stripe style="width: 100%">
                      <el-table-column prop="time" align="center" label="日期" width="180"></el-table-column>
                      <el-table-column prop="event_type" align="center" label="事件类型" width="180"></el-table-column>
                      <el-table-column align="center" prop="content" label="事件内容"></el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                          <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                        </template>
                      </el-table-column>
                    </el-table>

                    <!-- 添加事件 -->
                    <div class="option-wrap">
                      <i class="el-icon-folder-add"></i> 增加事件
                    </div>
                    <!-- 表单 -->
                    <el-form ref="form" class="eventForm" :model="eventForm" label-width="80px">
                      <el-form-item label="事件类型">
                        <el-select size="mini" v-model="eventForm.event_type" placeholder="请选择事件类型">
                          <el-option label="黑名单" value="1"></el-option>
                          <el-option label="奖赏" value="2"></el-option>
                          <el-option label="处罚" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="事件内容">
                        <el-input size="mini" type="textarea" :rows="3" v-model="eventForm.content"></el-input>
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
          width="200"
        ></el-table-column>
        <el-table-column width="80" align="center" prop="age" label="年龄"></el-table-column>
        <el-table-column align="center" prop="mobile" width="110px" label="手机号"></el-table-column>
        <el-table-column width="100" align="center" prop="address" label="现居住地址" :show-overflow-tooltip="true">
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
        <el-table-column width="150" align="center" prop="in_time" label="入职时间"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="140px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editStaffBtn(scope.row.id, scope.row.name)"
              circle
            ></el-button>
            <el-popconfirm
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
              ></el-button>
            </el-popconfirm>

            <!-- 图片提示 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="图片上传"
              placement="top"
              :enterable="false"
            >
              <el-button
                @click="pictureBtn(scope.row.id)"
                type="warning"
                size="mini"
                icon="el-icon-picture-outline"
                circle
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

    <!-- 添加用户 -->
    <el-dialog
      :title="title"
      :visible.sync="addUserFormVisible"
      @close="closeAddDialog"
      width="1060px"
    >
      <add-staff></add-staff>
    </el-dialog>

    <!-- 图片上传 -->
    <el-dialog
      title="图片上传"
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
          action="http://qqq.shihanphp.cn/api/upload"
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
          action="http://qqq.shihanphp.cn/api/upload"
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
          action="http://qqq.shihanphp.cn/api/upload"
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
          action="http://qqq.shihanphp.cn/api/upload"
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
          action="http://qqq.shihanphp.cn/api/upload"
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
          action="http://qqq.shihanphp.cn/api/upload"
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
          action="http://qqq.shihanphp.cn/api/upload"
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
        <el-button @click="pictureDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePicBtn">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestUserListDate,
  deleteStaff,
  getOneStraffInfo,
  uploadImage,
  getOneStaffImage,
} from "network/detail";
import AddStaff from "components/common/table/AddStaff";
import eventVue from "common/eventVue";

export default {
  name: "UserTable",
  data() {
    return {
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
      // 域名
      baseurl: "http://qqq.shihanphp.cn/",
      // 新增事件数据
      eventData: [
        {
          time: "2012-12-02",
          event_type: 1,
          content: "重大拉黑事件",
        },
      ],
      // 新增事件表单
      eventForm: {
        event_type: "",
        content: "",
      },

      /**
       * 上传图片显示，以及链接
       * */
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
  methods: {
    // 定义请求用户列表数据
    getUserData() {
      this.loading = true;
      requestUserListDate()
        .then((res) => {
          if (res.code === 200) {
            console.log(res.data);
            this.userList = res.data.data;
            // console.log(res.data)
            this.currentPage = res.data.current_page;
            this.total = parseInt(res.data.total);
            this.per_page = res.data.per_page;

            // 关闭等待
            this.loading = false;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          return;
        });
    },
    //
    popoverHiden() {
      console.log("我隐藏了");
    },

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
    pictureBtn(id) {
      this.pictureData.staff_id = id;
      this.pictureDialogVisible = true;
      // 获取图片
      getOneStaffImage(id).then((res) => {
        if (res.code === 200) {
          console.log(res.data);
          let data = res.data;
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

      // 发送事件（默认入职时间为当前时间）
      eventVue.$emit("addstaffevent");
    },

    // 添加按钮关闭回调
    closeAddDialog() {
      console.log("关闭添加员工框的回调");
    },

    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
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
      console.log(ids);
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
              console.log(res);
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
      eventVue.$emit("editstaffevent", id);
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
      console.log(file.url);
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
      console.log(file);
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
  },
  created() {
    // 获取用户数据
    this.getUserData();

    // 监听取消按钮关闭事件
    eventVue.$on("canceladdstaff", (val) => {
      this.addUserFormVisible = false;
    });

    // 监听储存更新
    eventVue.$on("saveUpdateStaff", (val) => {
      this.getUserData();
    });
  },
  components: {
    AddStaff,
  },
};
</script>

<style lang='less' scoped>
.user-table {
  margin-top: 20px;

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
    }
  }
}
// 新增事件
.option-wrap {
  margin-top: 30px;
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
  height: 700px;

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
</style>