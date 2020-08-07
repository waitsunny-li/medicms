<template>
  <div class="feedback-search">
    <el-card class="search-wrap">
      <el-form size="small" :inline="true" ref="searchForm" :model="feedbacksearchForm">
        <el-form-item prop="name">
          <el-input size="mini" v-model="CustomerSearchForm.name" placeholder="请输入投诉人姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="telphone">
          <el-input
            size="mini"
            v-model="CustomerSearchForm.telphone"
            placeholder="请输入客户手机号"
            clearable
          ></el-input>
        </el-form-item>

        <!-- 处理状态 -->
        <el-form-item prop="state">
          <el-select v-model="CustomerSearchForm.demand_source" placeholder="需求来源">
            <el-option label="二次开发老客户" value="1"></el-option>
            <el-option label="二次开发失效客户" value="3"></el-option>
            <el-option label="家政员介绍" value="4"></el-option>
            <el-option label="家政客户转介绍" value="5"></el-option>
            <el-option label="其他转介绍" value="6"></el-option>
            <el-option label="公司接待" value="7"></el-option>
          </el-select>
        </el-form-item>
        <!-- 录入时间 -->
        <el-form-item prop="join_date">
          <el-date-picker
            class="select-date"
            v-model="CustomerSearchForm.join_date"
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
        demand_source: "",
        join_date: "",
      },
    };
  },
};
</script>

<style lang='less' scoped>
</style>