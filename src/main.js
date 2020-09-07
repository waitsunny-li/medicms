import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  request
} from 'network/request'
import htmlToPdf from '../src/common/htmlToPdf' // 路径仅为示例
// Vue.use(htmlToPdf)

Vue.use(ElementUI)

Vue.prototype.$request = request

Vue.config.productionTip = false

// 全局绑定一个v-has-permission
Vue.directive('hasPermission', {
  inserted: function (el, binding, vnode) {
    // console.log(el.parentNode, binding.value.powers, binding.value.curpower)
    if (!binding.value.powers.hasOwnProperty(binding.value.curpower)) {
      // el.style.display = 'none'
      el.parentNode.removeChild(el)
    }
  }
})

// 角色的所有的权限
Vue.directive('hasPower', {
  // console.log(el.parentNode, binding.value.limitList, binding.value.state)
  inserted: function (el, binding, vnode) {
    let role_id = parseInt(binding.value.role_id)
    if (!binding.value.limitList.includes(role_id)) {
      console.log('jjj')
      // el.style.display = 'none'
      el.parentNode.removeChild(el)
    }
  }
})

// 全局绑定订单的状态来显示对应的操作(v-order-state="{limitList: [], state: "1"}")
Vue.directive('orderState', function (el, binding, vnode) {
  // console.log(el.parentNode, binding.value.limitList, binding.value.state)
  let state = parseInt(binding.value.state)
  if (!binding.value.limitList.includes(state)) {
    el.style.display = 'none'
    // el.parentNode.removeChild(el)
  }
})

// Vue.directive('state', {
//   inserted: function (el, binding, vnode) {
//     // console.log(el.parentNode, binding.value.limitList, binding.value.state)
//     console.log(binding.arg, ...binding.value)
//     let state = parseInt(binding.arg)
//     // let ar = [...binding.value]
//     // console.log(ar)
//     if (!binding.value.includes(state)) {
//       el.style.display = 'none'
//       // el.parentNode.removeChild(el)
//     }
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')