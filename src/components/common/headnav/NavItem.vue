<template>
  <div id="nav-item" >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    index: {
      type: Number,
    }
  },
  data () {
    return {
      
    };
  },
  methods: {
    // clickNav() {
    //   console.log(this.index)
    // }
  }
}
</script>

<style scoped>
#nav-item {
  padding: 10px 20px;
  border: 1px solid red;
  color: #1a1a1a;
  cursor: pointer;
  font-size: 15px;
}
</style>