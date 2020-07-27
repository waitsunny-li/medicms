<template>
  <div class="add-staff">
    <el-form :inline="true" :model="addUserForm" class="add-user-form">
      <!-- 头部 -->
      <div class="header-wrap">
        <el-row>
          <el-col :span="6">
            <el-form-item label="入职时间" prop="in_time" class="in-time-label">
              <el-date-picker
                size="mini"
                v-model="addUserForm.in_time"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                class="in_time"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="录入人">
              <el-input size="mini" v-model="addUserForm.entry_person"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="员工状态" class="person_state">
              <el-select size="mini" v-model="addUserForm.person_state" placeholder="员工状态">
                <el-option label="在岗" value="1"></el-option>
                <el-option label="待岗" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入职来源" class="recruiters">
              <el-input size="mini" placeholder="姓名" v-model="addUserForm.recruiters.name"></el-input>
              <el-input
                size="mini"
                class="telphone"
                placeholder="手机号"
                v-model="addUserForm.recruiters.telphone"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 主体 -->
      <div class="content-wrap">
        <el-row>
          <el-col :span="4">
            <el-form-item label="姓名" prop="name">
              <el-input size="mini" v-model="addUserForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="家用电器" prop="wiring">
              <el-select size="mini" multiple v-model="addUserForm.wiring" placeholder="请选择">
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
            <el-form-item label="厨艺">
              <el-select size="mini" v-model="addUserForm.cooking" placeholder="请选择">
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
              <el-form-item label="户口地址" prop="registration_address" class="registration_address">
                <el-cascader
                  @active-item-change="casecaderChange"
                  size="mini"
                  :options="hProvenceArray"
                  :props="census_data"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="census_address_desc">
                <el-input size="mini" class="census_address_desc" placeholder="详细地址"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4">
            <el-form-item label="籍贯" prop="census">
              <el-input size="mini" v-model="addUserForm.census"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="体重" prop="weight">
              <el-input v-model="addUserForm.weight" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工资要求" prop="pay">
              <el-input v-model="addUserForm.pay" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="现居地址" prop="address" class="registration_address">
              <el-cascader size="mini" :props="addUserForm.address"></el-cascader>
              <el-input size="mini" class="detail_address" placeholder="详细地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4">
            <el-form-item label="性别" prop="sex">
              <el-input size="mini" v-model="addUserForm.sex"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学历" prop="education" class="education">
              <el-select size="mini" v-model="addUserForm.education" placeholder="学历">
                <el-option label="小学" value="1"></el-option>
                <el-option label="本科" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="保险" prop="insurance">
              <el-input v-model="addUserForm.insurance" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="英语水平" prop="english">
              <el-select size="mini" v-model="addUserForm.english" placeholder="请选择">
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
              <el-select size="mini" v-model="addUserForm.computer" placeholder="请选择">
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
              <el-input size="mini" v-model="addUserForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="身高" prop="height" class="height">
              <el-input v-model="addUserForm.height" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="政治面貌" prop="political_outlook">
              <el-select size="mini" v-model="addUserForm.political_outlook" placeholder="请选择">
                <el-option label="群众" value="1"></el-option>
                <el-option label="团员" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="健康情况" prop="healthy">
              <el-select size="mini" v-model="addUserForm.healthy" placeholder="请选择">
                <el-option label="健康" value="1"></el-option>
                <el-option label="亚健康" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="服务技能" class="service_skills" prop="service_skills">
              <el-select
                size="mini"
                multiple
                v-model="addUserForm.service_skills"
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
              <el-input size="mini" v-model="addUserForm.nation"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="身份证" prop="identity" class="identity">
              <el-input v-model="addUserForm.identity" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="空余时间" prop="spare_time">
              <el-input v-model="addUserForm.spare_time" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="岗位" prop="station">
              <el-select size="mini" v-model="addUserForm.station" placeholder="请选择">
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
              <el-select size="mini" v-model="addUserForm.work_years" placeholder="请选择">
                <el-option label="1~2年" value="1"></el-option>
                <el-option label="3~5年" value="2"></el-option>
                <el-option label="5~10年" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4">
            <el-form-item label="生日" prop="birthday">
              <el-date-picker
                v-model="addUserForm.birthday"
                placeholder="选择月"
                format="MM-dd"
                value-format="MM-dd"
                size="mini"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="宗教信仰" prop="belief">
              <el-select size="mini" v-model="addUserForm.belief" placeholder="请选择">
                <el-option label="佛教" value="1"></el-option>
                <el-option label="基督教" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="语言能力" prop="language">
              <el-select size="mini" multiple v-model="addUserForm.language" placeholder="请选择">
                <el-option
                  v-for="item in languages"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="紧急电话" prop="urgent_mobile" class="recruiters">
              <el-input
                size="mini"
                class="telphone"
                placeholder="手机号"
                v-model="addUserForm.urgent_mobile"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="婚姻状况" class="marital" prop="marital">
              <el-select size="mini" v-model="addUserForm.marital" placeholder="请选择">
                <el-option label="未婚" value="1"></el-option>
                <el-option label="已婚" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 自我评价 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="自我评价" prop="self_evaluation">
              <el-input type="textarea" autosize v-model="addUserForm.self_evaluation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 工作经历 -->
          <el-col :span="12" class="work">
            <!-- 第一个 -->
            <div class="work-list" v-for="(item, index) in addUserForm.workexperi" :key="index">
              <el-row>
                <el-col :span="15">
                  <el-form-item label="工作经历" :prop="item.date" class="workdata">
                    <el-date-picker
                      v-model="item.date"
                      size="mini"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="从事岗位" :prop="item.occupation">
                    <el-input size="mini" v-model="item.occupation"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15">
                  <el-form-item label="户口地址" :prop="item.address" class>
                    <el-cascader size="mini" :props="item.address"></el-cascader>
                    <el-input size="mini" class="detail_address" placeholder="详细地址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="从事内容" :prop="item.content" class="work-content">
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
            <div class="family" v-for="(item, index) in addUserForm.family" :key="index">
              <el-row>
                <el-col :span="7">
                  <el-form-item label="家庭成员" :prop="item.name">
                    <el-input size="mini" v-model="item.name" class="family-name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="生日" :prop="item.birthday">
                    <el-date-picker
                      v-model="item.birthday"
                      size="mini"
                      placeholder="选择月"
                      format="MM-dd"
                      value-format="MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="目前状况" :prop="item.current_situation">
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
      <el-button type="primary" size="mini">保 存</el-button>
    </div>
  </div>
</template>

<script>
import eventVue from "common/eventVue";
import { getProvince, getCity } from "network/select";
import {
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
        in_time: "",
        entry_person: "",
        person_state: "",
        recruiters: {
          name: "",
          telphone: "",
        },
        urgent_mobile: "",
        name: "",
        address: null,
        birthday: "",
        wiring: "",
        sex: "",
        education: "",
        insurance: "",
        english: "",
        mobile: "",
        blood_type: "",
        political_outlook: "",
        healthy: "",
        computer: "",
        census: "",
        census_p: "",
        census_c: "",
        census_d: "",
        height: "",
        weight: "",
        pay: "",
        census_address_desc: "",
        cooking: "",
        nation: "",
        marital: "",
        station: "",
        service_skills: "",
        identity: "",
        spare_time: "",
        leave_request: "",
        work_years: "",
        belief: "",
        language: "",
        self_evaluation: "",

        // 工作经历
        workexperi: [
          {
            date: "dd",
            occupation: "",
            address: null,
            content: "",
          },
        ],
        // 家庭成员
        family: [
          {
            name: "",
            birthday: "",
            current_situation: "",
          },
          {
            name: "",
            birthday: "",
            current_situation: "",
          },
        ],
      },

      // 户口省级
      hProvenceArray: [],
      // 户口地址
      // census_data: {
      //   lazy: true,
      //   lazyLoad(node, resolve) {
      //     const { level } = node;
      //     // 获取省
      //     getProvince().then((res) => {
      //       // console.log(res.data);
      //       const nodes = res.data.map((item) => ({
      //         value: item.id,
      //         label: item.name,
      //         leaf: level >= 2,
      //       }));
      //       resolve(nodes)

      //     });
      //     // setTimeout(() => {
      //     //   const nodes = Array.from({ length: level + 1 }).map((item) => ({
      //     //     value: 1,
      //     //     label: "1",
      //     //     leaf: level >= 2,
      //     //   }));
      //     //   // 通过调用resolve将子节点数据返回，通知组件数据加载完成
      //     //   resolve(nodes);
      //     // }, 1000);
      //   },
      // },
      census_data: {
        // lazy: true,
        label: "name",
        value: "id",
        // children: "cities",
      },

      // 单个员工基本信息
      oneStaffInfo: "",
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

    // 获取当前时间
    this.addUserForm.in_time = new Date()
      .toLocaleDateString()
      .replace(/\//g, "-");

    // 监听新增员工事件（改变入职时间）
    // 注意该监听函数，必须是该组件已经创建过一次，才能监听到，否则，gameover
    eventVue.$on("addstaffevent", (val) => {
      // 获取当前时间
      this.addUserForm.in_time = new Date()
        .toLocaleDateString()
        .replace(/\//g, "-");
    });

    // 监听编辑按钮发送的事件
    eventVue.$on("editstaffevent", (id) => {
      console.log("我已经监听到了该员工id之：" + id);
    });
  },
  methods: {
    // node改变
    casecaderChange(nodeArry) {
      console.log(nodeArry);
      let i = 0;
      // 当前获取的省份的id
      let nodeid = nodeArry[i];
      getCity(nodeid).then((res) => {
        let cities = (res && res.data) || [];
        console.log(cities);

        for (let i = 0; i < this.hProvenceArray.length; i++) {
          if (this.hProvenceArray[i].id === nodeid) {
            this.$set(this.hProvenceArray[i], 'children', cities) // right
          }
        }

        // this.hProvenceArray.forEach((item) => {
        //   // item["cities"] = cities;
        //   if (item.id === nodeid) {
        //     // item.children = cities; // 视图未更新
        //     this.$set(item, 'children', cities)
        //   }
        // });
      });
      console.log(this.hProvenceArray);
    },
    cancelAddStaff() {
      eventVue.$emit("canceladdstaff");
    },
    // 添加工作经历按钮
    addWorkBtn() {
      if (this.addUserForm.workexperi.length > 3) {
        return this.$message.error("不能再添加了！会爆的！");
      } else {
        this.addUserForm.workexperi.push({
          date: "",
          occupation: "",
          address: null,
          content: "",
        });
      }
    },

    // 添加家庭成员
    addFamilyBtn() {
      if (this.addUserForm.family.length > 4) {
        return this.$message.error("不能再添加了！");
      } else {
        this.addUserForm.family.push({
          name: "",
          birthday: "",
          current_situation: "",
        });
      }
    },
  },
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
}
</style>