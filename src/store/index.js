import Vue from 'vue'
import Vuex from 'vuex'
import {setItem, getItem} from '../common/utils'

Vue.use(Vuex)

// 状态
const state = {
  navindex: 0,
  
  // 用户信息
  userInfo: {
    userToken: getItem('userInfo')['userToken'] ? getItem('userInfo')['userToken'] : '',
    username: getItem('userInfo')['username'] ? getItem('userInfo')['username'] : '',
    last_login_time: getItem('userInfo')['last_login_time'] ? getItem('userInfo')['last_login_time'] : ''
  }
}

// 方法
const mutations = {
  // 修改当前的nav的下标
  changeNavIndex(state, index) {
    state.navindex = index
  },
 
  // 存储用户的基本信息
  saveUserInfo(state, payload) {
    state.userInfo.userToken = payload.userToken
    state.userInfo.username = payload.username
    state.userInfo.last_login_time = payload.last_login_time
    // 保存在sessionStorage中
    setItem('userInfo', payload)
  },
}

const store =  new Vuex.Store({
  state,
  mutations
})


export default store
