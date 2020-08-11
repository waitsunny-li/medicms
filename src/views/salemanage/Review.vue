<template>
  <div class="review">
    客户回访
  </div>
</template>

<script>
export default {
  name: 'Review',
  data() {
    return {
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    // 搜索按钮
    searchBtn(searchForm) {
      console.log("客户回访", searchForm)
    },
  },
};
</script>

<style scoped>

</style>
