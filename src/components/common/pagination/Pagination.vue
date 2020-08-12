<template>
  <div class="pagination" :style="{width: screenWidth}">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentpage"
      :page-size="perpages"
      layout="prev, pager, next, jumper"
      :total="totalNumber"
    ></el-pagination>
  </div>
</template>

<script>
import eventVue from "common/eventVue";
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    perpage: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      currentpage: null,
      perpages: null,
      totalNumber: null
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth - 240 + 'px'
    }
  },
  watch: {
    currentPage(val) {
      this.currentpage = val
    },
    perpage(val) {
      this.perpages = val
    },
    total(val) {
      this.totalNumber = val
    }
  },
  methods: {
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
      this.$emit("handlecurrentchange", currentpage)
    },
  },
};
</script>

<style lang='less' scoped>
.pagination {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  height: 50px;
  justify-content: center;
  background-color: #fff;
  // margin-top: -10px;

  /deep/.el-pagination {
    height: 30px;
    margin-top: 8px;
  }
}
</style>