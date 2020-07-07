<template>
  <div class="aside-main-nav">
    <aside-nav :asideNavList="asideNavList">
      <aside-item v-for="(objNav, index) in asideNavList[asideIndex]" :key="index">
        {{objNav.navname}}
      </aside-item>
    </aside-nav>
  </div>
</template>

<script>
import AsideNav from 'components/common/asidenav/AsideNav'
import AsideItem from 'components/common/asidenav/AsideItem'
export default {
  name: 'AsideMainNav',
  props: {
    asideNavList: {
      type: Array
    }
  },
  data () {
    return {
      
    };
  },
  computed: {
    // 计算出asideIndex
    asideIndex() {
      return this.$store.state.navindex
    }
  },
  components: {
    AsideNav,
    AsideItem
  },
  methods: {
    
  }
}
</script>

<style scoped>
</style>