import axios from 'axios'
import {request} from './request'

// 获取省
export function getProvince() {
  return request({
    url: '/region/province',
    method: 'get'
  })
}

// 获取市
export function getCity(pid) {
  return request({
    url: '/region/city',
    method: 'get',
    params: {
      parent_id: pid
    }
  })
}


// 获取县
export function getDistrict(pid) {
  return request({
    url: '/region/district',
    method: 'get',
    params: {
      parent_id: pid
    }
  })
}

// 获取语言能力分组
export function getLanguage() {
  return request({
    url: '/information',
    method: 'get',
    params: {
      category_id: 1
    }
  })
}

// 获取英语水平分组
export function getEnglish() {
  return request({
    url: '/information',
    method: 'get',
    params: {
      category_id: 2
    }
  })
}

// 获取计算机水平分组
export function getComputer() {
  return request({
    url: '/information',
    method: 'get',
    params: {
      category_id: 3
    }
  })
}

// 获取厨艺水平分组
export function getCooking() {
  return request({
    url: '/information',
    method: 'get',
    params: {
      category_id: 4
    }
  })
}

// 获取家用电器水平分组
export function getWiring() {
  return request({
    url: '/information',
    method: 'get',
    params: {
      category_id: 5
    }
  })
}

// 获取岗位水平分组
export function getJob() {
  return request({
    url: '/information',
    method: 'get',
    params: {
      category_id: 6
    }
  })
}

// 获取服务技能水平分组
export function getKills() {
  return request({
    url: '/information',
    method: 'get',
    params: {
      category_id: 7
    }
  })
}

// 获取需求前置
export function getAllSelects() {
  return request({
    url: "/customer/create",
    method: "get",
  })
}

// 获取需求来源
export function getAllSource() {
  return request({
    url: "/source/index",
    method: "get",
  })
}