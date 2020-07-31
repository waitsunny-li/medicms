<template>
  <div class="addstaff-wrap">
    <div class="add-staff">
      <el-form
        :inline="true"
        :rules="addUserRules"
        ref="addUserForm"
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
                    v-model="staffForm.census_id"
                    size="mini"
                    :placeholder="census_text"
                    :props="census_data"
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
                <el-input v-model="staffForm.weight" size="mini"></el-input>
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
                    :placeholder="now_text"
                    size="mini"
                    v-model="staffForm.now_id"
                    :props="census_data"
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
                <el-input v-model="staffForm.height" size="mini"></el-input>
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
                <el-select multiple size="mini" v-model="staffForm.job" placeholder="请选择">
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
                  <el-option label="农村户口" value="非农村户口"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5"></el-col>
          </el-row>

          <!-- 自我评价 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="自我评价" prop="self_evaluation">
                <el-input type="textarea" autosize v-model="staffForm.self_evaluation"></el-input>
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
  </div>
</template>

<script>
import eventVue from "common/eventVue";
import { saveStaffInfo, getOneStraffInfo, updateStraffInfo } from "network/detail";
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
} from "network/select";
export default {
  name: "AddStaff",
  data() {
    return {
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
        person_state: "1",
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
        language: "",
        self_evaluation: "",
        agreement_amount: "", // 安置协议
        // is_print: "", //
        political_status: "",
        marital_status: "",
        now_id: [],
        now_address_desc: "",
        health: "",
        english: "",
        computer: "",
        cooking: "",
        service_skills: "",
        device: "",
        job: [],

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

      // 添加用户的
      staffForm: null,

      // 验证规则
      addUserRules: {
        name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        sex: [{ required: true, message: "请输入员工性别", trigger: "change" }],
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
        political_status: [
          { required: true, message: "请输入政治面貌", trigger: "change" },
        ],
        marital_status: [
          { required: true, message: "请输入婚姻状况", trigger: "change" },
        ],
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
        job: [{ required: true, message: "请输入岗位", trigger: "change" }],
        spare_time: [{ required: true, message: "请输入空余时间", trigger: "blur" }],
      },

      // 三级地址搜索
      census_data: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          if (level === 0) {
            // 获取省
            getProvince().then((res) => {
              // console.log(res.data);
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
            getCity(node.value).then((res) => {
              // console.log(res.data);
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
              // console.log(res.data);
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
    };
  },
  created() {
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

    // 初始化赋值添加操作
    this.staffForm = this.addUserForm

    // 获取当前时间
    this.staffForm.in_time = new Date()
      .toLocaleDateString()
      .replace(/\//g, "-");

    // 监听新增员工事件（改变入职时间）
    // 注意该监听函数，必须是该组件已经创建过一次，才能监听到，否则，gameover
    eventVue.$on("addstaffevent", (val) => {
      // 显示保存按钮
      this.isDisplaySave = true
      this.$refs.addUserForm.resetFields();
      // 改变staffForm
      this.staffForm = this.addUserForm
      // 获取当前时间
      this.staffForm.in_time = new Date()
        .toLocaleDateString()
        .replace(/\//g, "-");
        
    });

    // 监听编辑按钮发送的事件
    eventVue.$on("editstaffevent", (id) => {
      this.isDisplaySave = false
      getOneStraffInfo(id).then((res) => {
        if (res.code === 200) {
          console.log(res.data)
          this.staffForm = res.data;
        } else {
          this.$message.warning(res.msg);
        }
      });
    });
  },
  methods: {
    cancelAddStaff() {
      this.$refs.addUserForm.resetFields();
      eventVue.$emit("canceladdstaff");
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
      if (this.staffForm.family.length > 4) {
        return this.$message.error("不能再添加了！");
      } else {
        this.staffForm.family.push({
          name: "",
          relation: "",
          current_situation: "",
        });
      }
    },

    // 保存员工
    saveStaffBtn() {
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {
          saveStaffInfo(this.staffForm).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              // 更新员工数据
              eventVue.$emit("saveUpdateStaff");
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
      updateStraffInfo(this.staffForm).then(res => {
        if(res.code === 200) {
          this.$message.success(res.msg)
          // 关闭编辑弹框
          this.cancelAddStaff()
          // 更新数据
          eventVue.$emit('saveUpdateStaff')
        }else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  watch: {
  },
  computed: {
    census_text() {
      return this.staffForm.census_text ? this.staffForm.census_text.join('') : '请输入省市县'
    },
    now_text() {
      return this.staffForm.now_text ? this.staffForm.now_text.join('') : '请输入省市县'
    },
  }
};
</script>

<style lang='less' scoped>
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