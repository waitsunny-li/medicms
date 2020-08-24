import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { request } from 'network/request'
import htmlToPdf from '../src/common/htmlToPdf' // 路径仅为示例
// Vue.use(htmlToPdf)

Vue.use(ElementUI)

Vue.prototype.$request =  request

Vue.config.productionTip = false

// 全局绑定一个v-has-permission
Vue.directive('hasPermission', {
  inserted: function(el, binding, vnode) {
    console.log(el.parentNode, binding.value.powers, binding.value.curpower)
    if(!binding.value.powers.hasOwnProperty(binding.value.curpower)) {
      // el.style.display = 'none'
      el.parentNode.removeChild(el)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')




