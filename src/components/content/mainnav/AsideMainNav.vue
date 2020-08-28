<template>
  <div class="aside-main-nav">
    <aside-nav>
      <!-- <aside-item v-for="(objNav, index) in asideNavList[asideIndex]" :path="objNav.path" :key="index">
        <div slot="icon"><i :class="objNav.icon"></i></div>
        <div slot="text">{{objNav.navname}}</div>
      </aside-item>-->
      <el-menu-item
        :index="objNav.path"
        route
        v-for="(objNav, index) in asideNavList[asideIndex]"
        :key="index"
      >
        <i class="el-icon-edit-outline"></i>
        <span slot="title">{{objNav.navname}}</span>
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
    return {};
  },
  computed: {
    // 计算出asideIndex
    asideIndex() {
      return this.$store.state.navindex;
    },
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