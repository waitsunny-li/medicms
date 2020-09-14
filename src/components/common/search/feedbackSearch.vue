<template>
  <div class="feedback-search">
    <el-card class="search-wrap">
      <el-form size="small" :inline="true" ref="searchForm" :model="feedbacksearchForm">
        <el-row>
          <el-col :span="3">
            <el-form-item prop="name">
              <el-input
                size="mini"
                v-model="feedbacksearchForm.name"
                placeholder="投诉人姓名"
                clearable
                @keyup.native.enter="searchBtn"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item prop="mobile">
              <el-input
                size="mini"
                v-model="feedbacksearchForm.mobile"
                placeholder="投诉人手机号"
                clearable
                @keyup.native.enter="searchBtn"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <!-- 分配状态 -->
            <el-form-item>
              <el-select v-model="is_assign" size="mini" placeholder="分配状态" @change="searchBtn">
                <el-option label="已分配" value="1"></el-option>
                <el-option label="未分配" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <!-- 处理状态 -->
            <el-form-item>
              <el-select v-model="status" placeholder="处理状态" size="mini" @change="searchBtn">
                <el-option label="已解决" value="1"></el-option>
                <el-option label="未解决" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <!-- 录入时间 -->
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

          <el-col :span="4">
            <!-- 操作 -->
            <el-col :span="11" :offset="2">
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
      time: [],
    };
  },
  methods: {
    // 清除操作
    clearBtn() {
      this.feedbacksearchForm = {
        name: "",
        mobile: "",
        create_time: "",
      };
      this.is_assign = "";
      this.status = "";
      this.time = []
      this.searchBtn();
    },

    // 搜索操作
    searchBtn() {
      // 每次点击都清除

      if (this.is_assign !== "") {
        this.feedbacksearchForm.is_assign = this.is_assign;
      }
      if (this.status !== "") {
        this.feedbacksearchForm.status = this.status;
      }
      this.feedbacksearchForm.create_time = this.time
        ? this.time.join(",")
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
    width: 80px;
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