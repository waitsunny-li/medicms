<template>
  <div class="search">
    <el-card class="search-wrap">
      <el-form size="small" :inline="true" ref="searchForm" :model="searchForm">
        <el-row>
          <el-col :span="3">
            <el-form-item prop="num">
              <el-input
                size="mini"
                v-model="searchForm.num"
                placeholder="员工编号"
                clearable
                @keyup.native.enter="searchBtn"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="name">
              <el-input
                size="mini"
                v-model="searchForm.name"
                placeholder="姓名"
                clearable
                @keyup.native.enter="searchBtn"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="mobile">
              <el-input size="mini" v-model="searchForm.mobile" placeholder="手机号" clearable @keyup.native.enter="searchBtn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="identity">
              <el-input size="mini" v-model="searchForm.identity" placeholder="身份证号" clearable @keyup.native.enter="searchBtn"></el-input>
            </el-form-item>
          </el-col>

          <!-- 员工状态 -->
          <el-col :span="3">
            <el-form-item prop="person_state">
              <el-select size="mini" v-model="searchForm.person_state" placeholder="员工状态" @change="searchBtn">
                <el-option label="培训" value="1"></el-option>
                <el-option label="待岗" value="3"></el-option>
                <el-option label="离职" value="4"></el-option>
                <el-option label="黑名单" value="5"></el-option>
                <el-option label="在岗" value="6"></el-option>
                <el-option label="离职（下单）" value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 录入时间 -->
          <el-col :span="5">
            <el-form-item>
              <el-date-picker
                class="select-date"
                @change="searchBtn"
                v-model="time"
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
          <!-- 操作 -->
          <el-col :span="3">
            <el-col :span="12">
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
  name: "Search",
  data() {
    return {
      searchForm: {
        num: "",
        name: "",
        mobile: "",
        identity: "",
        person_state: "",
        create_time: "",
      },
      time: [],
    };
  },
  methods: {
    // 清除操作
    clearBtn() {
      this.$refs.searchForm.resetFields();
      this.time = []
      // 清除再搜索
      this.searchBtn()
    },

    // 搜索操作
    searchBtn() {
      this.searchForm.create_time = this.time.join(',')
      console.log(this.searchForm)
      this.$emit("searchbtn", this.searchForm);
    },
  },
  created() {},
};
</script>

<style lang='less' scoped>
.search {
}

.search-wrap {
  overflow: auto;
  border-top: 2px solid #75cbf4;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);

  /deep/.el-card__body {
    min-width: 1085px;
  }

  .el-form-item {
    // width: 170px;
    margin: 0;
    margin-right: 10px;
    .select-date {
      // width: 170px;
    }
  }
  .handle {
    // width: 80px;
  }
}

.search-wrap::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.search-wrap::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 20px;
}
</style>