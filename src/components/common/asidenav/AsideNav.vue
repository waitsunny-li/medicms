<template>
  <div class="aside-nav">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AsideNav',
  data () {
    return {
      
    };
  },
}
</script>

<style scoped>
.aside-nav {
  width: 80px;
}
</style>