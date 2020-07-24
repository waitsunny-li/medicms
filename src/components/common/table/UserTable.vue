<template>
  <div class="user-table">
    <el-card class="user-table-card">
      <!-- 公共操作 -->
      <el-row>
        <el-col :span="7">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addStaffBtn">新增</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          <el-button type="warning" icon="el-icon-printer" size="mini">打印</el-button>
          <el-button type="success" icon="el-icon-share" size="mini">分享</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="userList" class="user-table-wrap" style="width: 100%">
        <!-- 选择 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 展示 -->
        <el-table-column type="expand">
          <template slot-scope="scope"></template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-else-if="scope.row.sex == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column class="identify" align="center" prop="identity" label="身份证"></el-table-column>
        <el-table-column align="center" prop="age" label="年龄"></el-table-column>
        <el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
        <el-table-column align="center" prop="address" label="地址"></el-table-column>
        <el-table-column align="center" prop="cencus" label="户籍"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <!-- 图片提示 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="图片上传"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" size="mini" icon="el-icon-picture-outline" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加用户 -->
    <el-dialog title="收货地址" :visible.sync="addUserFormVisible" @close="closeAddDialog ">
      <add-staff></add-staff>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>
</template>

<script>
import { requestUserListDate } from "network/detail";
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
    };
  },
  methods: {
    // 定义请求用户列表数据
    getUserData() {
      requestUserListDate()
        .then((res) => {
          if (res.code === 200) {
            this.userList = res.data.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          return;
        });
    },

    // 点击新增按钮
    addStaffBtn() {
      this.addUserFormVisible = true
    },

    // 添加按钮关闭回调
    closeAddDialog() {
      console.log("关闭添加员工框的回调")
    }
  },
  created() {
    // 获取用户数据
    this.getUserData();

    // 监听取消按钮关闭事件
    eventVue.$on('canceladdstaff', val => {
      this.addUserFormVisible = false
    })
  },
  components: {
    AddStaff,
  },
};
</script>

<style lang='less' scoped>
.user-table {
  margin-top: 20px;

  .user-table-wrap {
    .el-table__row {
      .el-table_1_column_5 {
        color: red;
        .cell {
          word-break: normal;
        }
      }
    }
  }
}

.user-table-card {
  border-top: 2px solid #75cbf4;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
}
</style>