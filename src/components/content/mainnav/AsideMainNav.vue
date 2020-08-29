<template>
  <div class="aside-main-nav">
    <aside-nav>
      <!-- <aside-item v-for="(objNav, index) in asideNavList[asideIndex]" :path="objNav.path" :key="index">
        <div slot="icon"><i :class="objNav.icon"></i></div>
        <div slot="text">{{objNav.navname}}</div>
      </aside-item>-->
      
        <el-menu-item
          :index="objNav.path"
          v-for="(objNav, index) in asideNavList[asideIndex]"
          :key="index"
        >
          <i :class="objNav.icon" :style="{color: routerLink == objNav.path ? '#409EFF' : ''}"></i>
          <span :style="{color: routerLink == objNav.path ? '#409EFF' : ''}"  slot="title">{{objNav.navname}}</span>
        </el-menu-item>
    </aside-nav>
  </div>
</template>

<script>
import AsideNav from "components/common/asidenav/AsideNav";

import AsideItem from "components/common/asidenav/AsideItem";

export default {
  name: "AsideMainNav",
  props: {
    asideNavList: {
      type: Array,
    },
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    // 计算出asideIndex
    asideIndex() {
      return this.$store.state.navindex;
    },

    // 计算当前的router链接
    routerLink() {
      return this.$route.path
    }
  },
  components: {
    AsideNav,
    AsideItem,
  },
  methods: {},
};
</script>

<style scoped>
.aside-main-nav {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>