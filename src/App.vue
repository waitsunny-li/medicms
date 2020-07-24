<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
  
};
</script>

<style lang='scss' scoped>
@import "assets/css/init.min.css";
// @import "assets/css/normalize.css";

#app {
  width: 100%;
  background-color: #ededed;
}
</style>
