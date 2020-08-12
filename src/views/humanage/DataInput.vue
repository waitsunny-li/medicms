<template>
  <div class="data-input">
    <el-row>
      <el-col :span="24">
        <!-- 搜索框 -->
        <search></search>

        <!-- 表单 -->
        <user-table></user-table>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <pagination />
  </div>
</template>

<script>
import eventVue from 'common/eventVue'
import Search from "components/common/search/Search";
import UserTable from 'components/common/table/UserTable'
import Pagination from "components/common/pagination/Pagination";
export default {
  name: "DataInput",
  data() {
    return {};
  },
  components: {
    Search,
    UserTable,
    Pagination
  },
  created() {
    
  },
  methods: {
    // 搜索按钮
    searchBtn(searchForm) {
      console.log(searchForm)
      console.log("培训记录");
    },
  }
};
</script>

<style lang="less" scoped>
.data-input {
}
</style>