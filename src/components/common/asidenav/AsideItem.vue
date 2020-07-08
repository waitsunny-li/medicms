<template>
  <div class="aside-item" @click="clickPath" :class="{actived: isactived}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AsideItem',
  props: {
    // 路径
    path: String
  },
  data () {
    return {
      
    };
  },
  computed: {
    // 是否处于活跃
    isactived() {
      return this.$route.path === this.path
    }
  },
  methods: {
    // 路径切换
    clickPath() {
      if(this.$route.path === this.path) return;
      return this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.aside-item {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #1a1a1a;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  font-size: 15px;
  user-select: none;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 10px;
  border-radius: 5px;
}
.aside-item:hover {
  transform: translate(20px);
  box-shadow: 0 0 3px rgba(16, 153, 245, 1);
}

.actived {
  transform: translate(20px);
  box-shadow: 0 0 3px rgba(16, 153, 245, 0.2);
  background-color: rgb(16, 153, 245);
  color: #ffff;
}
</style>