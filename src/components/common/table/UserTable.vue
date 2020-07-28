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
                <span class="content-text">5000~7000</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">英语水平</span>
                <span class="content-text">四级</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">计算机水平</span>
                <span class="content-text">一般</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">政治面貌</span>
                <span class="content-text">公民</span>
              </el-col>
            </el-row>

            <el-row class="expand-row">
              <el-col :span="4">
                <span class="label-text">生肖</span>
                <span class="content-text">狗</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">休假要求</span>
                <span class="content-text">月休4天</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">户口地址</span>
                <span class="content-text">湖南省长沙市</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">户口类型</span>
                <span class="content-text">非农业户口</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">入职时间</span>
                <span class="content-text">2020年05月20日</span>
              </el-col>
            </el-row>

            <el-row class="expand-row">
              <el-col :span="4">
                <span class="label-text">学历</span>
                <span class="content-text">高中</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">现居住地</span>
                <span class="content-text">长沙</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">服务技能</span>
                <span class="content-text">开车、卫生清洁</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">家用电器</span>
                <span class="content-text">电磁炉、电饭锅等</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">入职来源</span>
                <span class="content-text">李小海：15888888888</span>
              </el-col>
            </el-row>

            <el-row class="expand-row">
              <el-col :span="4">
                <span class="label-text">血型</span>
                <span class="content-text">O型</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">健康状况</span>
                <span class="content-text">良好</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">婚姻状况</span>
                <span class="content-text">已婚</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">员工状态</span>
                <span class="content-text">待岗</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">保险</span>
                <span class="content-text">------------</span>
              </el-col>
            </el-row>

            <el-row class="expand-row">
              <el-col :span="4">
                <span class="label-text">身高</span>
                <span class="content-text">180cm</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">体重</span>
                <span class="content-text">60kg</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">籍贯</span>
                <span class="content-text">常山</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">生日</span>
                <span class="content-text">10.12</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">语言能力</span>
                <span class="content-text">普通话、客家话</span>
              </el-col>
            </el-row>

            <el-row class="expand-row">
              <el-col :span="4">
                <span class="label-text">录入人</span>
                <span class="content-text">李万鑫</span>
              </el-col>
              <el-col :span="5">
                <span class="label-text">家庭紧急电话</span>
                <span class="content-text">15888888888</span>
              </el-col>
              <el-col :span="8">
                <span class="label-text">安置协议</span>
                <span class="content-text">于2020年5月12日在长沙市订立</span>
              </el-col>
            </el-row>

            <el-row class="expand-row">
              <el-col :span="12" style="display: flex">
                <span class="label-text">工作经历</span>
                <div class="content-text">
                  <el-col :span="24">育婴师</el-col>
                  <el-col :span="24">2017年至2019年</el-col>
                  <el-col :span="24">宝安西乡</el-col>
                  <el-col :span="24">照顾小孩、老年人、宠物</el-col>
                </div>
              </el-col>
              <el-col :span="12" style="display: flex">
                <span class="label-text">家庭成员</span>

                <div class="content-text">
                  <el-col :span="24">许承海</el-col>
                  <el-col :span="24">1987年8月15日</el-col>
                  <el-col :span="24">务工</el-col>
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
        <el-table-column align="center" prop="name" label="姓名" width="180">
          <template slot-scope="scope">
            <div class="name-wrap">
              <el-popover
                placement="bottom-start"
                width="600"
                trigger="click"
                @hide="popoverHiden"
              >
                <!-- 内容 -->
                <el-tabs >
                  <el-tab-pane label="新增事件">新增事件</el-tab-pane>
                  <el-tab-pane label="面试管理">面试管理</el-tab-pane>
                  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
                </el-tabs>
                <!-- 按钮显示 -->
                <el-button type="text" id="popoPlus" slot="reference" icon="el-icon-circle-plus"></el-button>
              </el-popover>

              <span style="margin-left: 10px">{{scope.row.name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sex" label="性别" width="180">
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
        <el-table-column align="center" prop="age" label="年龄"></el-table-column>
        <el-table-column align="center" prop="mobile" width="110px" label="手机号"></el-table-column>
        <el-table-column align="center" prop="address" label="地址"></el-table-column>
        <el-table-column align="center" prop="cencus" label="户籍"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="180px">
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
              <el-button type="warning" size="mini" icon="el-icon-picture-outline" circle></el-button>
            </el-tooltip>
            <!-- 新增事件 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="新增事件"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" size="mini" icon="el-icon-data-board" circle></el-button>
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
  </div>
</template>

<script>
import { requestUserListDate, deleteStaff, getOneStraffInfo } from "network/detail";
import AddStaff from "components/common/table/AddStaff";
import eventVue from "common/eventVue";

export default {
  name: "UserTable",
  data() {
    return {
      // 用户列表数据
      userList: [],
      // 是否显示用户
      addUserFormVisible: true,
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
     
    };
  },
  methods: {
    // 定义请求用户列表数据
    getUserData() {
      this.loading = true
      requestUserListDate()
        .then((res) => {
          if (res.code === 200) {
            this.userList = res.data.data;
            // console.log(res.data)
            this.currentPage = res.data.current_page;
            this.total = parseInt(res.data.total);
            this.per_page = res.data.per_page;

            // 关闭等待
            this.loading = false
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
      console.log('我隐藏了')
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
      let ids = { ids: [id] };
      deleteStaff(ids).then((res) => {
        console.log(res);
      });
      console.log(ids);
    },

    // 选择删除按钮
    selectDeleteBtn() {
      if (this.selected.length !== 0) {
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
      console.log(id);
      // 发送员工id
      eventVue.$emit("editstaffevent", id);
    },
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
.user-table-card {
  position: relative;
  height: 700px;

  .name-wrap {
    // display: flex;
    // justify-content: center;
  }

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
</style>