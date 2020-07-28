import {
  request
} from './request'
import Qs from 'qs'

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
    data: ids
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

// export function getOneStraffInfo(id) {
//   return axios.get({
//     url: '/staff/' + id + '/edit',
//     method: "get"
//   })
// }