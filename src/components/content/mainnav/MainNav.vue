<template>
  <div class="main-nav">
    <head-nav :navList="navList">
      <nav-item v-for="(item,index) in navList" :key="index" :index="index"  @click.native="clickNav(index)">{{item}}</nav-item>
    </head-nav>
  </div>
</template>

<script>
import HeadNav from "../../common/headnav/HeadNav";
import NavItem from "../../common/headnav/NavItem";
export default {
  name: 'MainNav',
  props: {
    navList: {
      type: Array
    }
  },
  data () {
    return {
      
    };
  },
  components: {
    HeadNav,
    NavItem
  },
  methods: {
    clickNav(index) {
      // console.log(index)
      this.$store.commit('changeNavIndex', index)
    }
  }
}
</script>

<style scoped>

.main-nav {
  width: 500px;
}
</style>