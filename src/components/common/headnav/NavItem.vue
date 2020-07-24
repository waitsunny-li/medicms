<template>
  <div class="nav-item" @click="clickNav" :class="{actived: isactived}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    path: {
      type: String,
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      
    };
  },
  computed: {
    isactived() {
      return this.$store.state.navindex === this.index
    }
  },
  methods: {
    clickNav() {
      if(this.$route.path === this.path) return;
      return this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.nav-item {
  height: 40px;
  width: 130px;
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  font-size: 14px;
  border-radius: 5px;
  user-select: none;
  border-right: 1px solid #000;
  font-family: '微软雅黑';
}
.actived {
  background-color: #000;
  color: #ffffff;
}
</style>