<template>
  <div class="aside-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AsideItem',
  props: {
    
  },
  data () {
    return {
      
    };
  },
}
</script>

<style scoped>
.aside-item {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #1a1a1a;
  font-size: 15px;
}
</style>