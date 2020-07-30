<template>
  <div class="training">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <search></search>

        <!-- 表单 -->
        <el-card class="table-content">
          <el-table
            :data="userList"
            class="user-table-wrap"
            border
            style="width: 100%"
            v-loading="loading"
            height="550"
          >
            <el-table-column type="index" width="50" align="center"></el-table-column>
            <el-table-column prop="name" align="center" label="姓名"></el-table-column>
            <el-table-column align="center" prop="sex" label="性别">
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
            <el-table-column align="center" prop="address" label="地址" :show-overflow-tooltip="true">
              <template
                slot-scope="scope"
              >{{scope.row.now_p_text}}{{scope.row.now_c_text}}{{scope.row.now_d_text}}{{scope.row.now_address_desc}}</template>
            </el-table-column>
            <el-table-column prop="in_time" align="center" label="入职日期" width="180"></el-table-column>
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

            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="180px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="lookTrainingBtn(scope.row.id, scope.row.name)"
                >查看记录</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addTraningBtn(scope.row.name)"
                ></el-button>
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

    <!-- 查看培训记录 -->
    <el-dialog
      :title="staff_tranings + '的培训记录'"
      :visible.sync="traningDialogVisible"
      width="70%"
      center
    >
      <!-- 表单内容 -->
      <el-table height="500" :data="trainings" class="looktraining" stripe style="width: 100%;">
        <el-table-column prop="start_end" align="center" label="日期" width="180"></el-table-column>
        <el-table-column prop="training_program" align="center" label="培训项目" width="180"></el-table-column>
        <el-table-column prop="content" :show-overflow-tooltip="true" align="center" label="培训内容"></el-table-column>
        <el-table-column prop="address" align="center" label="地址"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="primary" @click="editTraningBtn" size="mini" icon="el-icon-edit"></el-button>
            <el-popconfirm title="此经历内容确定永远删除吗？">
              <el-button
                style="margin-left:10px"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 添加培训记录 -->
    <el-dialog
      class="addDialog"
      :title="'为' +staff_tranings + '添加培训记录'"
      :visible.sync="addTraningDialogVisible"
      width="700px"
      center
      @close="addTrainingFormClose"
    >
      <!-- 表单内容 -->
      <el-form
        :model="addTrainingForm"
        ref="addTrainingForm"
        label-width="100px"
        :rules="editTrainingRules"
        class="trainings"
      >
        <el-row>
          <el-col :span="2" align="center" style="height: 200px;line-height: 200px"></el-col>
          <el-col :span="17">
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训时间" prop="start_end">
                  <el-date-picker
                    v-model="addTrainingForm.start_end"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    size="mini"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item class="address" label="地址" prop="address">
                <el-cascader
                  size="mini"
                  :props="census_data"
                  v-model="addTrainingForm.address_p_c_d"
                ></el-cascader>
              </el-form-item>
              <el-form-item prop="detail_adress">
                <el-input
                  class="detail-adress-input"
                  size="mini"
                  placeholder="详细地址"
                  v-model="addTrainingForm.detail_address"
                ></el-input>
              </el-form-item>
              <el-form-item label="培训项目" prop="project">
                <el-select size="mini" v-model="addTrainingForm.project" placeholder="请选择">
                  <el-option
                    :label="item.name"
                    :value="item.name"
                    v-for="(item, index) in jobs"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="培训内容" prop="content">
                <el-input
                  class="content-text"
                  type="textarea"
                  :rows="1"
                  placeholder="请输入内容"
                  v-model="addTrainingForm.content"
                ></el-input>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="5" style="height: 200px;line-height: 200px"></el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addTraningDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTrainingForm">保 存</el-button>
      </span>
    </el-dialog>

    <!-- 修改培训记录 -->
    <el-dialog
      title="修改培训记录"
      :visible.sync="editTraningDialogVisible"
      append-to-body
      width="700px"
      center
      @close="editDialogClose"
    >
      <!-- 表单内容 -->
      <el-form
        :model="editTrainings"
        ref="editTrainings"
        label-width="100px"
        :rules="editTrainingRules"
        class="trainings"
      >
        <el-row>
          <el-col :span="2" align="center" style="height: 200px;line-height: 200px"></el-col>
          <el-col :span="17">
            <el-row>
              <el-col :span="24">
                <el-form-item label="培训时间" prop="start_end">
                  <el-date-picker
                    v-model="editTrainings.start_end"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    size="mini"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item class="address" label="地址" prop="address">
                <el-cascader size="mini" :props="{}" v-model="editTrainings.address"></el-cascader>
              </el-form-item>
              <el-form-item prop="detail_adress">
                <el-input
                  class="detail-adress-input"
                  size="mini"
                  placeholder="详细地址"
                  v-model="editTrainings.detail_address"
                ></el-input>
              </el-form-item>
              <el-form-item label="培训项目" prop="training_program">
                <el-select size="mini" v-model="editTrainings.training_program" placeholder="请选择">
                  <el-option label="育婴师" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="培训内容" prop="content">
                <el-input
                  class="content-text"
                  type="textarea"
                  :rows="1"
                  placeholder="请输入内容"
                  v-model="editTrainings.content"
                ></el-input>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="5" style="height: 200px;line-height: 200px"></el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editTraningDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import eventVue from "common/eventVue";
import Search from "components/common/search/Search";
import { requestUserListDate, getTrainingsData } from "network/detail";
import { getProvince, getCity, getDistrict } from "network/select";
import { getJob } from "network/select";
export default {
  name: "Training",
  data() {
    return {
      // 等待
      loading: true,
      // 用户列表数据
      userList: [],
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 是否显示查看培训记录弹框
      traningDialogVisible: false,
      // 显示的是谁的培训记录
      staff_tranings: "",
      // 是否显示添加培训记录弹框
      addTraningDialogVisible: false,
      // 是否显示编辑
      editTraningDialogVisible: false,
      // 岗位
      jobs: null,

      // 显示培训记录
      trainings: [
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: "安徽合肥市",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
        {
          start_end: ["2020-08-14", "2020-07-15"],
          address: ["d", "dd", "ddd"],
          detail_address: "",
          training_program: "育婴师",
          content: "怎么照顾小孩子",
        },
      ],

      // 添加培训记录数据
      addTrainingForm: {
        staff_id: "",
        start_end: [],
        address_p_c_d: [],
        detail_address: "",
        project: "",
        content: "",
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
                value: { id: item.id, name: item.name },
                label: item.name,
                leaf: level >= 2,
              }));
              resolve(nodes);
            });
          }
          // 获取市
          if (level === 1) {
            getCity(node.value.id).then((res) => {
              // console.log(res.data);
              const nodes = res.data.map((item) => ({
                value: { id: item.id, name: item.name },
                label: item.name,
                leaf: level >= 2,
              }));
              resolve(nodes);
            });
          }
          // 获取县
          if (level === 2) {
            getDistrict(node.value.id).then((res) => {
              // console.log(res.data);
              const nodes = res.data.map((item) => ({
                value: { id: item.id, name: item.name },
                label: item.name,
                leaf: level >= 2,
              }));
              resolve(nodes);
            });
          }
        },
      },
      address_p_c_d: "",

      // 修改培训记录
      editTrainings: {
        start_end: [],
        address: [],
        detail_address: "",
        training_program: "",
        content: "",
      },

      /**
       * 以下是验证规则
       */
      editTrainingRules: {
        start_end: [{ required: true, message: "请输入日期", trigger: "blur" }],
        address: [{ required: true, message: "请输入省市级", trigger: "blur" }],
        detail_adress: [
          { required: true, message: "请输详细地址", trigger: "blur" },
        ],
        training_program: [
          { required: true, message: "请输入培训项", trigger: "blur" },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  computed: {},
  watch: {
    //  address_p_c_d(value) {
    //    this.addTrainingForm.address_p_c_d = value.map(item => {
    //      return item.name
    //    })
    //  }
  },
  methods: {
    // 定义请求用户列表数据
    getUserData() {
      this.loading = true;
      requestUserListDate()
        .then((res) => {
          if (res.code === 200) {
            this.userList = res.data.data;
            this.currentPage = res.data.current_page;
            this.total = parseInt(res.data.total);
            this.per_page = res.data.per_page;
            this.loading = false;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          return;
        });
    },

    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
    },

    // 查看培训记录按钮
    lookTrainingBtn(id, name) {
      // 先请求数据
      // getTrainingsData(id).thenl(res => {
      //   console.log(res)
      // })
      this.staff_tranings = name;
      this.traningDialogVisible = true;
    },

    // 保存培训记录
    saveTrainingBtn() {
      console.log(this.value1);
    },

    // 修改培训记录
    editTraningBtn() {
      this.editTraningDialogVisible = true;
    },

    // 添加培训记录
    addTraningBtn(name) {
      // 员工名改变为要添加的员工名
      this.staff_tranings = name;
      this.addTraningDialogVisible = true;
    },

    // 删除培训添加记录表单
    deleteFormBtn(index) {
      this.addTrainingForm.addTranings.splice(index, index + 1);
    },

    // 添加培训记录的表单关闭回调
    addTrainingFormClose() {
      // 重置表单
      this.$refs.addTrainingForm.resetFields();
    },

    // 坚挺编辑培训记录的关闭
    editDialogClose() {
      this.$refs.editTrainings.resetFields();
    },

    // 保存培训记录
    saveTrainingForm() {
      this.$refs["addTrainingForm"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  components: {
    Search,
  },
  created() {
    // 获取用户数据
    this.getUserData();
    // 岗位
    getJob().then((res) => {
      if (res.code === 200) {
        this.jobs = res.data;
      } else {
        this.$message.waraing("获取岗位失败！");
      }
    });
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

  .pagination {
    position: absolute;
    bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.addDialog {
  /deep/.el-dialog--center {
    /deep/.el-dialog__body {
      .trainings {
        padding: 30px 0;
        // border-bottom: 1px solid #cccc;
        /deep/.el-form-item {
          margin-bottom: 15px;
          /deep/.el-form-item__content {
            margin-left: 10px;

            /deep/.detail-adress-input {
              width: 350px;
            }

            /deep/.content-text {
              width: 350px;
            }
          }
        }
      }
    }

    /deep/.el-dialog__body::-webkit-scrollbar {
      width: 8px;
      height: 10px;
    }

    /deep/.el-dialog__body::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 20px;
    }
  }

  /deep/.addTrainingFormCol {
    display: flex;
    justify-content: center;
    /deep/.addTrainingForm {
      width: 80%;
    }
  }
}

// 查看
.looktraining {
  /deep/.el-table__body-wrapper {
    overflow-x: hidden;
  }

  /deep/.el-table__body-wrapper {
    height: 500px;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}

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
    width: 4px;
    height: 10px;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}
</style>
