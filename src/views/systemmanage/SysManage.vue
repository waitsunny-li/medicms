<template>
  <div class="sys-manage">
    <!-- 搜索 -->
    <div class="search">
      <el-card class="search-wrap">
        <el-form size="small" :inline="true" ref="searchForm" :model="searchForm">
          <el-form-item prop="name">
            <el-input size="mini" v-model="searchForm.name" placeholder="姓名" clearable></el-input>
          </el-form-item>

          <!-- 员工状态 -->
          <el-form-item prop="state">
            <el-select v-model="searchForm.state" placeholder="职位">
              <el-option label="跟单老师" value="1"></el-option>
              <el-option label="实操老师" value="3"></el-option>
              <el-option label="炒鸡管理员" value="4"></el-option>
              <el-option label="普通管理员" value="5"></el-option>
            </el-select>
          </el-form-item>
          <!-- 录入时间 -->
          <el-form-item prop="join_date">
            <el-date-picker
              class="select-date"
              v-model="searchForm.join_date"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <!-- 操作 -->
          <el-form-item class="handle">
            <el-button type="primary" icon="el-icon-search" @click="searchBtn">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-delete" @click="clearBtn">清除查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 表单 -->
    <div class="user-table">
      <el-card class="user-table-card" :style="{height: screenHeight}">
        <!-- 公共操作 -->
        <el-row>
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-plus" @click="addBtn" size="mini">新增</el-button>
          </el-col>
        </el-row>

        <!-- 表格 -->
        <el-table
          :data="userList"
          class="user-table-wrap"
          style="width: 100%"
          :height="scrollHeight"
          v-loading="loading"
          border
        >
          <el-table-column align="center" label="编号" prop="id" width="100"></el-table-column>
          <el-table-column align="center" prop="username" label="姓名" width="100"></el-table-column>
          <el-table-column width="180" align="center" prop="create_time" label="创建时间"></el-table-column>
          <el-table-column width="180" align="center" prop="role.name" label="角色"></el-table-column>
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
            </template>
          </el-table-column>
        </el-table>
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
    <el-dialog title="添加管理员" :visible.sync="addDialogVisible" width="30%" center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input size="mini" v-model="form.username" style="width: 140px"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input style="width: 140px"  size="mini" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select size="mini" v-model="form.role_id" placeholder="请选择">
            <el-option
              v-for="item in roleIdList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "components/common/pagination/Pagination";
import { getUserList, getRoleList } from "network/systemroles";
export default {
  name: "SysManage",
  data() {
    return {
      searchForm: {
        name: "",
        state: "",
        join_date: "",
      },
      form: {},
      // 添加按钮
      addForm: {
        username: "",
        password: "",
        role_id: "",
      },
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 角色列表
      roleIdList: [],
      // 用户列表
      userList: [],
      loading: false,

      // 显示
      addDialogVisible: false,
    };
  },
  created() {
    this.getAllUserListData();

    // 角色列表
    getRoleList().then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        this.roleIdList = data;
      } else {
        this.$message.error(msg);
      }
    });
  },
  methods: {
    getAllUserListData() {
      this.loading = true;
      getUserList().then((res) => {
        let { code, data, msg } = res;
        console.log(data);
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
    // 清除操作
    clearBtn() {
      this.$refs.searchForm.resetFields();
    },

    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      console.log(currentpage);
    },

    // 搜索操作
    searchBtn() {},

    // 添加用户按钮
    addBtn() {
      this.form = this.addForm;
      this.addDialogVisible = true;
    },
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
    Pagination,
  },
};
</script>

<style lang='less' scoped>
.search {
}

.search-wrap {
  border-top: 2px solid #75cbf4;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);

  /deep/.el-card__body {
    width: 1170px;
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
</style>