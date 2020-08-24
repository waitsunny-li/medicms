import Vue from 'vue'
import Vuex from 'vuex'
import {
  setItem,
  getItem
} from '../common/utils'

Vue.use(Vuex)

// 状态
const state = {
  navindex: sessionStorage.getItem('navindex') ? sessionStorage.getItem('navindex') : 0,

  // 窗口的宽和高
  screenWidth: "",
  screenHeight: "",

  // 菜单
  navList: getItem('navList') ? getItem('navList') : [],
  asideNavList: getItem('asideNavList') ? getItem('asideNavList') : [],

  // 权限链接
  permissionLink: {
    '/page1': true,
    '/page1/page1_child1': true
  },
  // 权限列表
  powersList: {
    '/ordergenerate/add': true,
    '/ordergenerate/edit': false
  },

  // 用户信息
  userInfo: {
    userToken: getItem('userInfo')['userToken'] ? getItem('userInfo')['userToken'] : '',
    username: getItem('userInfo')['username'] ? getItem('userInfo')['username'] : '',
    last_login_time: getItem('userInfo')['last_login_time'] ? getItem('userInfo')['last_login_time'] : '',
    ip: getItem('userInfo')['ip'] ? getItem('userInfo')['ip'] : '',
    role_id: getItem('userInfo')['role_id'] ? getItem('userInfo')['role_id'] : '',
  }
}

// 方法
const mutations = {
  // 修改当前的nav的下标
  changeNavIndex(state, index) {
    state.navindex = index
    sessionStorage.setItem('navindex', index)
  },

  // 存储用户的基本信息
  saveUserInfo(state, payload) {
    state.userInfo.userToken = payload.userToken
    state.userInfo.username = payload.username
    state.userInfo.last_login_time = payload.last_login_time
    state.userInfo.ip = payload.ip
    // 保存在sessionStorage中
    setItem('userInfo', payload)
  },

  // 动态修改窗口的宽和高
  changeWidthHeight(state, payload) {
    state.screenWidth = payload.width
    state.screenHeight = payload.height
  },

  // 修改菜单
  changeNavList(state, navListData) {
    state.navList = navListData
    // sessionStorage.setItem('navList', navListData)
    setItem('navList', navListData)
  },
  changeAsideNavList(state, asidenavListData) {
    state.asideNavList = asidenavListData
    // sessionStorage.setItem('asideNavList', asidenavListData)
    setItem('asideNavList', asidenavListData)


  }
}

const store = new Vuex.Store({
  state,
  mutations
})


export default store