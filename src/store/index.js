import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态
const state = {
  navindex: 0
}

// 方法
const mutations = {
  // 修改当前的nav的下标
  changeNavIndex(state, index) {
    state.navindex = index
  }
}

const store =  new Vuex.Store({
  state,
  mutations
})


export default store
