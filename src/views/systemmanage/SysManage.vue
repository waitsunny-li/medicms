<template>
  <div class="sys-manage">
    <!-- 搜索 -->
    <div class="search">
      <el-card class="search-wrap">
        <el-row>
          <el-col :span="16">
            <el-form
              size="small"
              :inline="true"
              ref="searchForm"
              :model="searchForm"
              :span="6"
            >
              <el-form-item prop="username">
                <el-input
                  size="mini"
                  v-model="searchForm.username"
                  placeholder="姓名"
                  clearable
                  @keyup.native.enter="searchBtn"
                ></el-input>
              </el-form-item>

              <!-- 角色 -->
              <el-form-item prop="role_id">
                <el-select
                  v-model="searchForm.role_id"
                  placeholder="职位"
                  @change="searchBtn"
                >
                  <el-option
                    v-for="item in roleIdList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 操作 -->
              <el-form-item class="handle">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="searchBtn"
                  >搜索</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-delete" @click="clearBtn"
                  >清除查询</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3" :offset="5">
            <el-button
              type="primary"
              icon="el-icon-user"
              @click="addBtn"
              size="mini"
              >新增用户</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 左边用户列表 -->
    <div class="user-table">
      <el-card class="user-table-card" :style="{ height: screenHeight }">
        <!-- 表格 -->
        <el-row>
          <el-col :span="14">
            <el-col :span="24">
              <p class="list-name">
                <el-tag>用户列表</el-tag>
              </p>
            </el-col>
            <!-- 左边用户表格 -->
            <el-table
              :data="userList"
              class="user-table-wrap"
              style="width: 100%"
              :height="scrollHeight"
              v-loading="loading"
              border
            >
              <el-table-column
                align="center"
                label="编号"
                prop="id"
                width="100"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="username"
                label="姓名"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                width="180"
                align="center"
                prop="create_time"
                label="创建时间"
              ></el-table-column>
              <el-table-column
                width="140"
                align="center"
                prop="role.name"
                label="角色"
              ></el-table-column>
              <!-- 操作 -->
              <el-table-column label="操作" align="center" width="140px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="editUserBtn(scope.row.id, scope.row.username)"
                    circle
                  ></el-button>
                  <el-popconfirm
                    confirmButtonText="好的"
                    cancelButtonText="不用了"
                    icon="el-icon-info"
                    iconColor="red"
                    title="您确定要永久删除该用户吗？"
                    @onConfirm="userDeleteBtn(scope.row.id)"
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
                </template>
              </el-table-column>
            </el-table>
          </el-col>

          <!-- 右边角色表格 -->
          <el-col :span="10" :offset="0">
            <el-col :span="24">
              <p class="list-name">
                <el-tag type="warning">角色列表</el-tag>
              </p>
            </el-col>
            <el-table
              :data="roleList"
              class="user-table-wrap"
              style="width: 100%"
              :height="scrollHeight"
              v-loading="roleLoading"
              border
            >
              <el-table-column
                align="center"
                label="编号"
                prop="id"
                width="100"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="name"
                label="角色名"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                align="center"
                prop="description"
                label="描述"
              ></el-table-column>
              <!-- 操作 -->
              <el-table-column label="操作" align="center" width="140px">
                <template slot-scope="scope">
                  <!-- <el-tooltip
                    class="item"
                    effect="dark"
                    content="权限"
                    :enterable="false"
                    placement="top"
                  >
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-s-custom"
                      @click="showPowerBtn(scope.row.id)"
                      circle
                    ></el-button>
                  </el-tooltip> -->
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="editRoleBtn(scope.row.id, scope.row.name)"
                    circle
                  ></el-button>
                  <!-- <el-popconfirm
                    confirmButtonText="好的"
                    cancelButtonText="不用了"
                    icon="el-icon-info"
                    iconColor="red"
                    title="您确定要永久删除该角色吗？"
                    @onConfirm="roleDeleteBtn(scope.row.id)"
                  >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      circle
                      slot="reference"
                      style="margin: 0 10px"
                    ></el-button>
                  </el-popconfirm> -->
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 分页 -->
    <pagination
      :currentPage="currentPage"
      :perpage="per_page"
      :total="total"
      @handlecurrentchange="handleCurrentChange"
    />

    <!-- 添加管理员用户等 -->
    <el-dialog
      :title="editUserTitle"
      :visible.sync="addDialogVisible"
      @close="addClose"
      width="450px"
      center
    >
      <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            size="mini"
            v-model="form.username"
            style="width: 140px"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            style="width: 140px"
            placeholder="请输入密码"
            size="mini"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select size="mini" v-model="form.role_id" placeholder="请选择">
            <el-option
              v-for="item in roleIdList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addDialogVisible = false"
          >取 消</el-button
        >

        <el-button
          v-if="isAddManager"
          size="mini"
          type="primary"
          @click="addSystemManager"
          >保 存</el-button
        >
        <el-button v-else size="mini" type="primary" @click="editSaveManager"
          >编 辑</el-button
        >
      </span>
    </el-dialog>

    <!-- 添加角色 -->
    <el-dialog
      :title="editRoleTile"
      :visible.sync="addRoleDialogVisible"
      @close="addRoleClose"
      width="450px"
      center
    >
      <el-form
        ref="roleForm"
        :rules="roleFormRules"
        :model="roleForm"
        label-width="80px"
      >
        <el-form-item label="角色名" prop="name">
          <el-input
            size="mini"
            v-model="roleForm.name"
            style="width: 140px"
            placeholder="请输入角色名"
          ></el-input>
        </el-form-item>
        <el-form-item label="简述" prop="description">
          <el-input
            style="width: 140px"
            placeholder="请输入简述"
            size="mini"
            v-model="roleForm.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addRoleDialogVisible = false"
          >取 消</el-button
        >
        <el-button
          v-if="isAddRole"
          size="mini"
          type="primary"
          @click="saveRoleInfo"
          >保 存</el-button
        >
        <el-button v-else size="mini" type="primary" @click="saveEditRoleInfo"
          >编 辑</el-button
        >
      </span>
    </el-dialog>

    <!-- 查看添加权限 -->
    <el-dialog
      title="权限列表"
      :visible.sync="powerDialogVisible"
      width="600px"
      center
    >
      <div class="power-content">
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checkedPowers"
          @change="handleCheckedPwersChange"
        >
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item
              v-for="powerItemObj in powers"
              :key="powerItemObj.controller"
              :title="powerItemObj.controller_text"
              name="1"
            >
              <el-checkbox
                v-for="power in powerItemObj.menu"
                :label="power.id"
                :key="power.id"
                border
                size="mini"
                style="margin: 10px"
                >{{ power.name }}</el-checkbox
              >
            </el-collapse-item>
          </el-collapse>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="powerDialogVisible = false"
          >取 消</el-button
        >
        <el-button size="mini" type="primary" @click="updateRolePowerInfo"
          >保 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "components/common/pagination/Pagination";
import {
  getUserList,
  getRoleIdList,
  saveSysManager,
  getRolesList,
  saveRolueInfo,
  deleteUserInfo,
  getOneUserInfo,
  updateUserInfo,
  getOneRoleInfo,
  updateRoleInfo,
  deleteRoleInfo,
  getAllPower,
  getRolePower,
  updateRolePower,
} from "network/systemroles";
export default {
  name: "SysManage",
  data() {
    return {
      searchForm: {
        username: "",
        role_id: "",
      },
      form: {},
      roleForm: {},
      addRoleDialogVisible: false,

      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 角色列表
      roleList: [],
      roleLoading: false,
      // 新增角色
      addRoleForm: {
        name: "",
        description: "",
      },
      editRoleForm: {
        id: "",
        name: "",
        description: "",
      },
      isAddRole: null,
      editRoleTile: "",
      // 角色id列表
      roleIdList: [],

      // 用户列表
      userList: [],
      loading: false,
      // 添加按钮
      addForm: {
        username: "",
        password: "",
        role_id: 5,
      },
      editManagerForm: {
        id: "",
        username: "",
        password: "",
        role_id: "",
      },
      isAddManager: null,
      editUserTitle: "",

      // 显示
      addDialogVisible: false,

      /**
       * 查看权限
       */
      powerDialogVisible: false,

      checkedPowers: [],
      powers: [],
      activeNames: ["1"],
      updatePowerForm: {
        permission_id: [],
        role_id: "",
      },

      /**
       * 添加管理员的验证
       */
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role_id: [{ required: true, message: "请输入", trigger: "blur" }],
      },

      roleFormRules: {
        name: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        description: [
          { required: true, message: "请输入简述", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getAllUserListData(this.searchForm);
    this.getAllRoleListData();

    // 角色id列表
    getRoleIdList().then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        this.roleIdList = data;
      } else {
        this.$message.error(msg);
      }
    });

    // 获取全部权限
    getAllPower().then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        this.powers = data;
      } else {
        this.$message.error(msg);
      }
    });
  },
  methods: {
    getAllUserListData(opation) {
      this.loading = true;
      getUserList(opation).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.userList = data.data;
          // 页数赋值
          this.currentPage = data.current_page;
          // 总数据条数
          this.total = data.total;
          // 每页的条
          this.per_page = data.per_page;
          this.loading = false;
        } else {
          this.$message.error(msg);
          this.loading = false;
        }
      });
    },
    // 获取角色列表
    getAllRoleListData() {
      this.roleLoading = true;
      getRolesList().then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.roleList = data;
          this.roleLoading = false;
        } else {
          this.$message.error(msg);
          this.roleLoading = false;
        }
      });
    },

    // 显示权限
    showPowerBtn(id) {
      // 清除操作
      this.updatePowerForm.permission_id = [];
      this.updatePowerForm.role_id = "";

      this.updatePowerForm.role_id = id;
      getRolePower(id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          let numbers = data
            ? data.map((item) => {
                return parseInt(item);
              })
            : [];
          this.checkedPowers = numbers;
          this.powerDialogVisible = true;
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 更新指定角色中的权限
    updateRolePowerInfo() {
      this.updatePowerForm.permission_id = this.checkedPowers;
      updateRolePower(this.updatePowerForm).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.powerDialogVisible = false;
        } else {
          this.$message.error(msg);
        }
      });
    },
    handleChange() {
      return false;
    },

    handleCheckedPwersChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.powers.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.powers.length;
    },

    // 清除操作
    clearBtn() {
      this.$refs.searchForm.resetFields();
      this.getAllUserListData(this.searchForm);
    },

    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      this.searchForm.page = currentpage;
      this.getAllUserListData(this.searchForm);
    },

    // 搜索操作
    searchBtn() {
      this.getAllUserListData(this.searchForm);
    },

    // 添加用户按钮
    addBtn() {
      this.editUserTitle = "添加用户";
      this.isAddManager = true;
      this.form = this.addForm;
      this.addDialogVisible = true;
    },

    // 编辑用户按钮
    editUserBtn(id, name) {
      this.isAddManager = false;
      // 请求id数据
      getOneUserInfo(id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.editManagerForm["username"] = data.username;
          this.editManagerForm["password"] = data.passowrd;
          this.editManagerForm["id"] = data.id;
          this.editManagerForm["role_id"] = data.role_id;
          this.form = this.editManagerForm;

          this.editUserTitle = `编辑（${name}）`;
          this.addDialogVisible = true;
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 编辑用户保存
    editSaveManager() {
      updateUserInfo(this.editManagerForm).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.addDialogVisible = false;
          this.getAllUserListData();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 添加角色按钮
    addRoleBtn() {
      this.editRoleTile = "添加角色";
      this.isAddRole = true;
      this.roleForm = this.addRoleForm;
      this.addRoleDialogVisible = true;
    },

    // 删除用户按钮
    userDeleteBtn(id) {
      deleteUserInfo(id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.getAllUserListData();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 保存管理员信息
    addSystemManager() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveSysManager(this.form).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.addDialogVisible = false;
              this.getAllUserListData();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 保存角色信息
    saveRoleInfo() {
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          saveRolueInfo(this.roleForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.addRoleDialogVisible = false;
              this.getAllRoleListData();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 编辑角色按钮
    editRoleBtn(id, name) {
      this.isAddRole = false;
      // 请求id数据
      getOneRoleInfo(id).then((res) => {
        let { code, data, msg } = res;
        if (code === 200) {
          this.editRoleForm["name"] = data.name;
          this.editRoleForm["description"] = data.description;
          this.editRoleForm["id"] = data.id;

          this.roleForm = this.editRoleForm;

          this.editRoleTile = `编辑（${name}）`;
          this.addRoleDialogVisible = true;
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 编辑保存
    saveEditRoleInfo() {
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          updateRoleInfo(this.editRoleForm).then((res) => {
            let { code, msg } = res;
            if (code === 200) {
              this.$message.success(msg);
              this.addRoleDialogVisible = false;
              this.getAllRoleListData();
            } else {
              this.$message.error(msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 角色删除
    roleDeleteBtn(id) {
      deleteRoleInfo(id).then((res) => {
        let { code, msg } = res;
        if (code === 200) {
          this.$message.success(msg);
          this.getAllRoleListData();
        } else {
          this.$message.error(msg);
        }
      });
    },

    // 用户添加关闭回调
    addClose() {
      this.$refs.form.resetFields();
      this.form = {};
    },

    //角色添加关闭回调
    addRoleClose() {
      this.$refs.roleForm.resetFields();
      this.roleForm = {};
    },
  },
  computed: {
    screenHeight() {
      return this.$store.state.screenHeight - 210 + "px";
    },
    scrollHeight() {
      return this.$store.state.screenHeight - 310 + "px";
    },
  },
  components: {
    Pagination,
  },
};
</script>

<style lang='less' scoped>
.search {
}
.power-content {
  height: 500px;
  overflow-y: auto;
}
.power-content::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
.power-content::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 20px;
}

.search-wrap {
  border-top: 2px solid #75cbf4;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);

  /deep/.el-card__body {
    // width: 1170px;
  }

  .el-form-item {
    width: 170px;
    margin: 0;
    margin-right: 10px;
    .select-date {
      width: 170px;
    }
  }
  .handle {
    width: 80px;
  }
}

.user-table {
  margin-top: 10px;

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

.list-name {
  padding: 20px;
  text-align: center;
  font-size: 15px;
  color: #666;
}
</style>