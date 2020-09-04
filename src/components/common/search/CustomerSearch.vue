<template>
  <div class="search">
    <el-card class="search-wrap">
      <el-form size="small" :inline="true" ref="searchForm" :model="CustomerSearchForm">
        <el-row>
          <el-col :span="3">
            <el-form-item prop="name">
              <el-input
                v-model="CustomerSearchForm.name"
                placeholder="请输入客户姓名"
                clearable
                style="width: 140px"
                @keyup.native.enter="searchBtn"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item prop="mobile">
              <el-input
                v-model="CustomerSearchForm.mobile"
                placeholder="请输入客户手机号"
                clearable
                @keyup.native.enter="searchBtn"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <!-- 需求来源 -->
            <el-form-item prop="source_id">
              <el-select
                v-model="CustomerSearchForm.source_id"
                placeholder="需求来源"
                @change="searchBtn"
              >
                <el-option
                  v-for="item in source"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <!-- 需求来源 -->
            <el-form-item prop="state">
              <el-select v-model="CustomerSearchForm.state" placeholder="订单状态" @change="searchBtn">
                <el-option label="审核中" value="0"></el-option>
                <el-option label="待进行" value="1"></el-option>
                <el-option label="订单进行中" value="2"></el-option>
                <el-option label="已完成" value="3"></el-option>
                <el-option label="已取消" value="4"></el-option>
                <el-option label="暂停中" value="5"></el-option>
                <el-option label="重新恢复" value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <!-- 录入时间 -->
            <el-form-item>
              <el-date-picker
                @change="searchBtn"
                class="select-date"
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                style="width: 250px"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <!-- 操作 -->
            <el-col :span="10" :offset="2">
              <el-form-item class="handle">
                <el-button type="primary" icon="el-icon-search" @click="searchBtn">搜索</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <el-button icon="el-icon-delete" @click="clearBtn">清除查询</el-button>
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
import { getAllSource } from "network/select";
export default {
  name: "Search",
  data() {
    return {
      CustomerSearchForm: {
        name: "",
        mobile: "",
        source_id: "",
        create_time: [],
        state: "",
      },
      source: [],
      time: [],
    };
  },
  mounted() {
    // 获取需求来源
    getAllSource().then((res) => {
      let { code, data, msg } = res;
      if (code === 200) {
        this.source = data;
      } else {
        this.$message.error(msg);
      }
    });
  },
  methods: {
    // 清除操作
    clearBtn() {
      this.$refs.searchForm.resetFields();
      this.time = [];
      this.searchBtn();
    },

    // 搜索操作
    searchBtn() {
      this.CustomerSearchForm.create_time = this.time
        ? this.time.join(",")
        : "";
      if (this.CustomerSearchForm.state) {
        this.$emit("searchBtn", this.CustomerSearchForm);
      } else {
        let res = {};
        res.name = this.CustomerSearchForm.name;
        res.mobile = this.CustomerSearchForm.mobile;
        res.source_id = this.CustomerSearchForm.source_id;
        res.create_time = this.CustomerSearchForm.create_time;
        console.log("else: ", res);
        this.$emit("searchBtn", res);
      }
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
    width: 1170px;
  }

  .el-form-item {
    margin: 0;
    margin-right: 10px;
    .select-date {
    }
  }
  .handle {
    width: 60px;
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