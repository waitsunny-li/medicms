<template>
  <div class="feedback-search">
    <el-card class="search-wrap">
      <el-form size="small" :inline="true" ref="searchForm" :model="feedbacksearchForm">
        <el-row>
          <el-col :span="3">
            <el-form-item prop="name">
              <el-input size="mini" v-model="feedbacksearchForm.name" placeholder="投诉人姓名" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item prop="mobile">
              <el-input
                size="mini"
                v-model="feedbacksearchForm.mobile"
                placeholder="请输入客户手机号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <!-- 分配状态 -->
            <el-form-item>
              <el-select v-model="is_assign" size="mini" placeholder="分配状态">
                <el-option label="已分配" value="1"></el-option>
                <el-option label="未分配" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <!-- 处理状态 -->
            <el-form-item>
              <el-select v-model="status" placeholder="处理状态" size="mini">
                <el-option label="已解决" value="1"></el-option>
                <el-option label="未解决" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <!-- 录入时间 -->
            <el-form-item prop="create_time">
              <el-date-picker
                class="select-date"
                v-model="feedbacksearchForm.create_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 250px"
                value-format="yyyy-MM-dd"
                size="mini"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <!-- 操作 -->
            <el-col :span="14">
              <el-form-item class="handle">
                <el-button type="primary" icon="el-icon-search" @click="searchBtn">搜索</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <el-button icon="el-icon-delete" @click="clearBtn">清除</el-button>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import eventVue from "common/eventVue";
export default {
  name: "feedbackSearch",
  data() {
    return {
      feedbacksearchForm: {
        name: "",
        mobile: "",
        create_time: "",
      },
      is_assign: "",
      status: "",
    };
  },
  methods: {
    // 清除操作
    clearBtn() {
      this.$refs.searchForm.resetFields();
    },

    // 搜索操作
    searchBtn() {
      if (this.is_assign !== "") {
        this.feedbacksearchForm.is_assign = this.is_assign
      }
      if(this.status !== "") {
        this.feedbacksearchForm.status = this.status
      }
      this.feedbacksearchForm.create_time = this.feedbacksearchForm.create_time
        ? this.feedbacksearchForm.create_time.join(",")
        : "";

      this.$emit("searchBtn", this.feedbacksearchForm);
    },
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
    margin: 0;
    margin-right: 10px;
    .select-date {
    }
  }
  .handle {
    width: 80px;
  }
}
</style>