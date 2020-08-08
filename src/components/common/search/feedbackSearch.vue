<template>
  <div class="feedback-search">
    <el-card class="search-wrap">
      <el-form size="small" :inline="true" ref="searchForm" :model="feedbacksearchForm">
        <el-form-item prop="name">
          <el-input size="mini" v-model="feedbacksearchForm.name" placeholder="请输入投诉人姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="telphone">
          <el-input
            size="mini"
            v-model="feedbacksearchForm.telphone"
            placeholder="请输入客户手机号"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 处理状态 -->
        <el-form-item prop="state">
          <el-select v-model="feedbacksearchForm.state" placeholder="状态">
            <el-option label="已解决" value="1"></el-option>
            <el-option label="未解决" value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- 录入时间 -->
        <el-form-item prop="join_date">
          <el-date-picker
            class="select-date"
            v-model="feedbacksearchForm.join_date"
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
</template>

<script>
import eventVue from "common/eventVue";
export default {
  name: "feedbackSearch",
  data() {
    return {
      feedbacksearchForm: {
        name: "",
        telphone: "",
        state: "",
        join_date: "",
      },
    };
  },
  methods: {
    // 清除操作
    clearBtn() {
      this.$refs.searchForm.resetFields();
    },

    // 搜索操作
    searchBtn() {
      eventVue.$emit("searchbtn", this.searchForm);
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
</style>