<template>
  <div class="aside-item" @click="clickPath" :class="{actived: isactived}">
    <div class="content">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="text">
        <slot name="text"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideItem",
  props: {
    // 路径
    path: String,
  },
  data() {
    return {};
  },
  computed: {
    // 是否处于活跃
    isactived() {
      return this.$route.path === this.path;
    },
  },
  methods: {
    // 路径切换
    clickPath() {
      if (this.$route.path === this.path) return;
      return this.$router.push(this.path);
    },
  },
  created() {
  },
};
</script>

<style lang="less" scoped>
.aside-item {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  user-select: none;
  cursor: pointer;
  transition: 0.3s;
  font-family: "微软雅黑";
  border-bottom: 1px solid #1f272d;
  display: flex;
  justify-content: center;

  .content {
    display: flex;
  }
}
.text {
  margin-left: 6px;
}
.aside-item:hover {
  // background-color: #000;
}

.actived {
  background-color: #26aae3;
  color: #ffff;
}
</style>