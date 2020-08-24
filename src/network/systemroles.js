import {
  request
} from './request'


// 获取用户列表
export function getUserList(searchform) {
  return request({
    url: "/user/index",
    method: "get",
    params: searchform
  }) 
}


// 获取角色id列表（供添加用户选择使用）
export function getRoleIdList() {
  return request({
    url: "/user/create",
    method: "get",
  }) 
}

// 保存管理员信息
export function saveSysManager(data) {
  return request({
    url: "/user/save",
    method: "post",
    data: data
  }) 
}

// 删除用户
export function deleteUserInfo(id) {
  return request({
    url: "/user/delete",
    method: "get",
    params: {
      id: id
    }
  }) 
}

// 编辑用户
export function getOneUserInfo(id) {
  return request({
    url: "/user/edit",
    method: "get",
    params: {
      id: id
    }
  }) 
}

// 更新用户
export function updateUserInfo(data) {
  return request({
    url: "/user/update",
    method: "post",
    data: data
  }) 
}

// 获取角色列表
export function getRolesList() {
  return request({
    url: "/role/index",
    method: "get",
  }) 
}

// 保存角色信息
export function saveRolueInfo(data) {
  return request({
    url: "/role/save",
    method: "post",
    data: data
  }) 
}

// 获取单一角色
export function getOneRoleInfo(id) {
  return request({
    url: "/role/edit",
    method: "get",
    params: {
      id: id
    }
  }) 
}

// 更新用户
export function updateRoleInfo(data) {
  return request({
    url: "/role/update",
    method: "post",
    data: data
  }) 
}

// 删除用户
export function deleteRoleInfo(id) {
  return request({
    url: "/role/delete",
    method: "get",
    params: {
      id: id
    }
  }) 
}

// 获取所有权限
export function getAllPower() {
  return request({
    url: "/permission/index",
    method: "get",
  }) 
}

// 获取指定角色的所有权限
export function getRolePower(id) {
  return request({
    url: "/role/access_list",
    method: "get",
    params: {
      role_id: id
    }
  }) 
}

// 更新指定角色的所有权限
export function updateRolePower(data) {
  return request({
    url: "/role/access",
    method: "post",
    data: data
  }) 
}
