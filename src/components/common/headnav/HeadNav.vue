<template>
  <div class="head-nav-wrap">
    <div class="head-nav">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadNav',
  props: {
    navtitles: {
      type: Array
    }
  },
  data () {
    return {
    };
  },
  methods: {
    
  }
}
</script>

<style scoped>
.head-nav-wrap {
  width: 500px;
}
.head-nav-wrap .head-nav {
  display: flex;
  justify-content: space-around;
}

</style>