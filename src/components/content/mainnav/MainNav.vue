<template>
  <div class="main-nav">
    <head-nav>
      <nav-item v-for="(objItem,index) in navList" :key="index" :index="index" :path="objItem.path" @click.native="clickNav(index)">{{objItem.navname}}</nav-item>
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