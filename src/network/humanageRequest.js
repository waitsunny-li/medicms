import {
  request
} from './request'
import Qs from 'qs'


/**
 * 搜索
 */
// 人员状态搜索
export function searchAppointStaff(searchobj) {
  return request({
    url: "/staff/index",
    method: "get",
    params: searchobj
  })
}

// 获取生日提醒
export function getStaffBirthday() {
  return request({
    url: "/staff/birthday",
    method: "get",
  })
}

// 添加来源
export function addSourceData(name) {
  return request({
    url: "/source/save",
    method: "post",
    data: {
      name: name
    }
  })
}

// 编辑来源
export function editSourceData(id, name) {
  return request({
    url: "/source/update",
    method: "post",
    data: {
      id: id,
      name: name
    }
  })
}

// 删除来源
export function deleteSourceData(id) {
  return request({
    url: "/source/delete",
    method: "get",
    params: {
      id: id
    }
  })
}

/**
 * 资料录入
 */
// 请求员工列表数据
export function requestUserListDate(tate) {
  return request({
    url: "/staff/index",
    method: "get",
  })
}

// 简历
export function createResume(id) {
  return request({
    url: "/share/send",
    method: "get",
    params: {
      staff_id: id
    }
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

// 添加经理评价内容
export function saveHandlEva(data) {
  return request({
    url: "/staff/evaluation",
    method: "post",
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

// 获取用户所有的事件内容
export function getEventInfo(staff_id) {
  return request({
    url: "/event/index",
    method: "get",
    params: {
      staff_id: staff_id
    }
  })
}

// 保存事件内容
export function saveEventInfo(data) {
  return request({
    url: "/staff/event",
    method: "post",
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

// 对考核进行保存评价内容
export function saveAssessment(data) {
  return request({
    url: "/train/assess",
    method: "post",
    data: data
  })
}

/**
 * 员工申诉
 */
// 员工申诉列表
export function getAppeal(id) {
  return request({
    url: "/appeal/index",
    method: "get",
    params: {
      staff_id: id
    }
  })
}
// 添加员工申诉
export function saveAppeal(data) {
  return request({
    url: "/appeal/save",
    method: "post",
    data: data
  })
}
// 修改员工申诉
export function changeAppeal(data) {
  return request({
    url: "/appeal/status",
    method: "post",
    data: data
  })
}