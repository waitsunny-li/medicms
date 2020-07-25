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
      <el-table :data="userList" class="user-table-wrap" style="width: 100%" @selection-change="handleSelectionChange">
        <!-- 选择 -->
        <el-table-column type="selection" width="55">

        </el-table-column>
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
        <el-table-column class="identify" align="center" prop="identity" label="身份证" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" prop="age" label="年龄"></el-table-column>
        <el-table-column align="center" prop="mobile" width="110px" label="手机号"></el-table-column>
        <el-table-column align="center" prop="address" label="地址"></el-table-column>
        <el-table-column align="center" prop="cencus" label="户籍"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="130px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" @click="formDeleteBtn(scope.row.id)" icon="el-icon-delete" size="mini" circle></el-button>
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
    <el-dialog title="新增员工" :visible.sync="addUserFormVisible" @close="closeAddDialog" width="75%">
      <add-staff></add-staff>
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
      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 已选择的的用户id
      selected: [],
    };
  },
  methods: {
    // 定义请求用户列表数据
    getUserData() {
      requestUserListDate()
        .then((res) => {
          if (res.code === 200) {
            this.userList = res.data.data;
            this.currentPage = res.data.current_page;
            this.total = parseInt(res.data.total);
            this.per_page = res.data.per_page;
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
      this.addUserFormVisible = true;
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
      console.log(id)
    },

    // 选择删除按钮
    selectDeleteBtn() {
      if(this.selected.length !== 0) {

      }else {
        this.$message.warning('请选择要删除的用户！')
      }
    },

    // 处理选择
    handleSelectionChange(selectedArry) {
      // 清除操作
      this.selected = []
      selectedArry.forEach(obj => {
        this.selected.push(obj.id)
      })
    }

  },
  created() {
    // 获取用户数据
    this.getUserData();

    // 监听取消按钮关闭事件
    eventVue.$on("canceladdstaff", (val) => {
      this.addUserFormVisible = false;
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
      }
     
    }
  }
}
.user-table-card {
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

.user-table-card {
  border-top: 2px solid #75cbf4;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
}
</style>