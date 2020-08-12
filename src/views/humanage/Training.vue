<template>
  <div class="training">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <search @searchbtn="searchBtn"></search>

        <!-- 表单 -->
        <el-card class="table-content" :style="{height: screenHeight}">
          <el-table
            :data="userList"
            class="user-table-wrap"
            border
            style="width: 100%"
            v-loading="loading"
            :height="scrollHeight"
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
                  @click="addTraningBtn(scope.row.id, scope.row.name)"
                ></el-button>
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

    <!-- 查看培训记录 -->
    <el-dialog
      :title="staff_tranings + '的培训记录'"
      :visible.sync="traningDialogVisible"
      width="70%"
      center
    >
      <!-- 表单内容 -->
      <el-table height="500" :data="trainings" class="looktraining" stripe style="width: 100%;">
        <el-table-column prop="time" align="center" label="日期" width="180">
          <template slot-scope="scope">
            <el-tag>{{scope.row.time.join(' ~ ')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="project" align="center" label="培训项目" width="180">
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.project}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" :show-overflow-tooltip="true" align="center" label="培训内容"></el-table-column>
        <el-table-column prop="address" align="center" label="地址"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" fixed="right" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="editTraningBtn(scope.row.id)"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
            <el-popconfirm
              title="此经历内容确定永远删除吗？"
              @onConfirm="deleteTraining(scope.row.staff_id, scope.row.id)"
            >
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
                <el-form-item label="培训时间" prop="time">
                  <el-date-picker
                    v-model="addTrainingForm.time"
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
              <el-form-item label="地址" prop="address">
                <el-input
                  class="detail-adress-input"
                  size="mini"
                  placeholder="详细地址"
                  v-model="addTrainingForm.address"
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
        <el-button size="mini" @click="addTraningDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="saveTrainingForm">保 存</el-button>
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
                <el-form-item label="培训时间" prop="time">
                  <el-date-picker
                    v-model="editTrainings.time"
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
              <el-form-item label="地址" prop="address">
                <el-input
                  class="detail-adress-input"
                  size="mini"
                  placeholder="详细地址"
                  v-model="editTrainings.address"
                ></el-input>
              </el-form-item>
              <el-form-item label="培训项目" prop="project">
                <el-select size="mini" v-model="editTrainings.project" placeholder="请选择">
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
                  v-model="editTrainings.content"
                ></el-input>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="5" style="height: 200px;line-height: 200px"></el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editTraningDialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="editSaveTraining" type="primary">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Search from "components/common/search/Search";
import Pagination from "components/common/pagination/Pagination";
import {
  requestUserListDate,
  getTrainingsData,
  saveTrainingsData,
  getOneTrainingInfo,
  updateTrainingInfo,
  deleteTrainingInfo,
} from "network/humanageRequest";
import { getProvince, getCity, getDistrict, getJob } from "network/select";
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
      trainings: [],

      // 添加培训记录数据
      addTrainingForm: {
        staff_id: "",
        time: [],
        address: "",
        project: "",
        content: "",
      },

      // 修改培训记录
      editTrainings: {
        staff_id: "",
        id: "",
        time: [],
        address: "",
        project: "",
        content: "",
      },

      /**
       * 以下是验证规则
       */
      editTrainingRules: {
        time: [{ required: true, message: "请输入日期", trigger: "blur" }],
        address: [{ required: true, message: "请输详细地址", trigger: "blur" }],
        project: [{ required: true, message: "请输入培训项", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
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
  },
  methods: {
    // 搜索按钮
    searchBtn(searchForm) {
      console.log(searchForm);
      console.log("培训记录");
    },
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
      console.log(currentpage);
    },

    // 获取该员工的所有培训数据
    getOneStaffTrainingsData(staff_id) {
      getTrainingsData(staff_id).then((res) => {
        if (res.code === 200) {
          this.trainings = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 查看培训记录按钮
    lookTrainingBtn(id, name) {
      // 先请求数据
      this.getOneStaffTrainingsData(id);
      this.staff_tranings = name;
      this.traningDialogVisible = true;
    },

    // 修改培训记录
    editTraningBtn(id) {
      // 获取单条培训记录
      getOneTrainingInfo(id).then((res) => {
        if (res.code === 200) {
          for (let item in this.editTrainings) {
            this.editTrainings[item] = res.data[item];
          }
        } else {
          this.$message.error(res.msg);
        }
      });
      this.editTraningDialogVisible = true;
    },

    // 添加培训记录
    addTraningBtn(id, name) {
      // 员工名改变为要添加的员工名
      this.staff_tranings = name;
      this.addTraningDialogVisible = true;
      this.addTrainingForm.staff_id = id;
    },

    // 添加培训记录的表单关闭回调
    addTrainingFormClose() {
      // 重置表单
      this.$refs.addTrainingForm.resetFields();
    },

    // 监听编辑培训记录的关闭
    editDialogClose() {
      this.$refs.editTrainings.resetFields();
    },

    // 保存培训记录
    saveTrainingForm() {
      this.$refs["addTrainingForm"].validate((valid) => {
        if (valid) {
          saveTrainingsData(this.addTrainingForm).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.addTraningDialogVisible = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          // this.$message.error('验证失败')
          return;
        }
      });
    },

    // 编辑保存
    editSaveTraining() {
      this.$refs["editTrainings"].validate((valid) => {
        if (valid) {
          updateTrainingInfo(this.editTrainings).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.editTraningDialogVisible = false;
              // 刷新该员工的所有培训记录
              this.getOneStaffTrainingsData(this.editTrainings.staff_id);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          // this.$message.error('验证失败')
          return;
        }
      });
    },

    // 删除培训内容
    deleteTraining(staff_id, id) {
      let ids = [id];
      deleteTrainingInfo(ids).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg);

          this.getOneStaffTrainingsData(staff_id);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
  components: {
    Search,
    Pagination,
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
  margin-top: 10px;
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
      width: 5px;
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
    width: 5px;
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
    width: 5px;
    height: 10px;
  }

  /deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 20px;
  }
}
</style>
