import {
  request
} from './request'
import Qs from 'qs'

/**
 * 资料录入
 */
// 请求员工列表数据
export function requestUserListDate() {
  return request({
    url: "/staff/index",
    method: "get",
  })
}

// 保存员工信息
export function saveStaffInfo(data) {
  return request({
    url: '/staff/save',
    method: 'post',
    data: data
  })
}

// 删除单个员工按钮
export function deleteStaff(ids) {
  return request({
    url: '/staff/delete',
    method: 'post',
    data: {
      ids: ids
    }
  })
}

// 获取单个用户的详情
export function getOneStraffInfo(id) {
  return request({
    url: '/staff/edit',
    method: "get",
    params: {
      id: id
    }
  })
}

// 用户更新
export function updateStraffInfo(data) {
  return request({
    url: '/staff/update',
    method: 'post',
    data: data
  })
}

// 上传图片
export function uploadImage(data) {
  return request({
    url: '/staff/image',
    method: 'post',
    data: data
  })
}

// 获取单人图片
export function getOneStaffImage(id) {
  return request({
    url: '/staff/image',
    method: 'get',
    params: {
      staff_id: id
    }
  })
}


/**
 *  培训记录
 */
// 请求培训记录
export function getTrainingsData(id) {
  return request({
    url: '/train/index',
    method: 'get',
    params: {
      staff_id: id
    }
  })
}

// 保存培训记录
export function saveTrainingsData(data) {
  return request({
    url: '/train/save',
    method: 'post',
    data: data
  })
}

// 获取单条培训数据
export function getOneTrainingInfo(id) {
  return request({
    url: '/train/edit',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 更新单条培训记录
export function updateTrainingInfo(data) {
  return request({
    url: '/train/update',
    method: 'post',
    data: data
  })
}

// 删除单条培训记录
export function deleteTrainingInfo(ids) {
  return request({
    url: '/train/delete',
    method: 'post',
    data: {
      ids: ids
    }
  })
}


/**
 * 考核评价
 */
// 请求单个员工的所有培训记录

// 对考核进行保存评价内容
export function saveAssessment(data) {
  return request({
    url: "",
    method: "post",
    data
  })
}