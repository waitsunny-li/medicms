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
              <el-popover placement="bottom-start" width="600" trigger="click" @hide="popoverHiden">
                <!-- 内容 -->
                <el-tabs>
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
              <el-button
                @click="pictureBtn"
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
          multiple
          :limit="2"
          class="upload"
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
          multiple
          :limit="3"
          class="upload"
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
        >
          <i class="el-icon-picture"></i>
        </el-upload>
        <el-dialog append-to-body :visible.sync="dialogLifeVisible">
          <img width="100%" :src="dialogLifeImageUrl" alt />
        </el-dialog>
      </div>

      <!-- 脚部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="pictureDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="pictureDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestUserListDate,
  deleteStaff,
  getOneStraffInfo,
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
    };
  },
  methods: {
    // 定义请求用户列表数据
    getUserData() {
      this.loading = true;
      requestUserListDate()
        .then((res) => {
          if (res.code === 200) {
            console.log(res.data)
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

    // 显示图片上传的弹框
    pictureBtn() {
      console.log("jjj");
      this.pictureDialogVisible = true;
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
      console.log(id);
      // 发送员工id
      eventVue.$emit("editstaffevent", id);
    },

    /**
     * 图片上传
     */
    // 身份证上传
    handleIdentyRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleIdentyPreview(file) {
      this.dialogIdentyImageUrl = file.url;
      this.dialogIdentyVisible = true;
    },
    handleIdentyExceed() {
      this.$message.warning("最多上传两张！");
    },
    // 体检证件
    handleBodyRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleBodyPreview(file) {
      this.dialogBodyImageUrl = file.url;
      this.dialogBodyVisible = true;
    },
    handleBodyExceed() {
      this.$message.warning("最多上传三张！");
    },
    // 生活照片
    handleLifeRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleLifePreview(file) {
      this.dialogLifeImageUrl = file.url;
      this.dialogLifeVisible = true;
    },
    handleLifeExceed() {
      this.$message.warning("最多上传二张！");
    },
    handleLifeSuccess(res, file, fileList) {
      console.log(res, fileList);
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
    eventVue.$on('saveUpdateStaff', val => {
      this.getUserData()
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