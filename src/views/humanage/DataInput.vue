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
  </div>
</template>

<script>
import eventVue from 'common/eventVue'
import Search from "components/common/search/Search";
import UserTable from 'components/common/table/UserTable'
export default {
  name: "DataInput",
  data() {
    return {};
  },
  components: {
    Search,
    UserTable
  },
  created() {
    console.log(window.baseUrl)
    eventVue.$on('searchbtn', val => {
      console.log('你点击了搜索按钮')
    })
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
.data-input {
}
</style>