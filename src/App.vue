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
@import "assets/css/normalize.css";
#app {
  width: 1200px;
  margin: 0 auto;
}
</style>
