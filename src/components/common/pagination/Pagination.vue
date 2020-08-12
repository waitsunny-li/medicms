<template>
  <div class="pagination" :style="{width: screenWidth}">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="per_page"
      layout="prev, pager, next, jumper"
      :total="total"
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
    per_page: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth - 240 + 'px'
    }
  },
  methods: {
    // 当前页改变时触发
    handleCurrentChange(currentpage) {
      // console.log(currentpage);
      eventVue.$emit("handlecurrentchange", currentpage)
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