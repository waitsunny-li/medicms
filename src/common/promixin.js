import { getComplaint } from "network/feedbackRequest";
// 反馈
let feedMixin = {
  data() {
    return {
      // 这里应该是未分配的投诉
      feedFormData: [],

      // 当前页数
      currentPage: 1,
      // 总数据条数
      total: null,
      // 每页的条数
      per_page: null,
      // 是否加载
      loading: false,
    }
  },
  created () {
    this.getAllComplaints()
  },
  methods: {
    // 获取投诉列表
    getAllComplaints() {
      this.loading = true;
      getComplaint().then((res) => {
        let { code, data, msg } = res;
        console.log(data);
        if (code === 200) {
          // 获取客户数据
          this.feedFormData = data.data;
          console.log(this.feedFormData)
          // 页数赋值
          this.currentPage = data.current_page;
          // 总数据条数
          this.total = data.total;
          // 每页的条
          this.per_page = data.per_page;
          this.loading = false;
        } else {
          this.$message.error(msg);
          this.loading = true;
        }
      });
    },
  }
}

export {feedMixin}