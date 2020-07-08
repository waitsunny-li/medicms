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
  margin: 20px 0;
  padding: 10px 20px;
  color: #1a1a1a;
  cursor: pointer;
  transition: 0.3s;
  font-size: 15px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(16, 153, 245, 1);
  user-select: none;
}
.actived {
  background-color: rgb(16, 153, 245);
  color: #ffffff;
}
</style>