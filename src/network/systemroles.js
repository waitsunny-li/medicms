import {
  request
} from './request'


// 获取用户列表
export function getUserList() {
  return request({
    url: "/user/index",
    method: "get",
  }) 
}

// 获取角色id列表
export function getRoleList() {
  return request({
    url: "/user/create",
    method: "get",
  }) 
}