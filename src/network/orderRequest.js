import {
  request
} from './request'

/**
 * 用户需求
 */
// 获取所有客户需求等信息
export function getCustomerInfo() {
  return request({
    url: "/customer/index",
    method: "get",
  })
}
// 添加客户需求数据
export function saveCustomerInfo(data) {
  return request({
    url: "/customer/save",
    method: "post",
    data: data
  })
}
// 获取单个客户的信息
export function getOneCustomerInfo(id) {
  return request({
    url: "/customer/edit",
    method: "get",
    params: {
      id: id
    }
  })
}
// 删除客户信息
export function deleteCustomer(id) {
  return request({
    url: "/customer/delete",
    method: "get",
    params: {
      id: id
    }
  })
}
// 修改单个客户需求
export function updateCustomer(data) {
  return request({
    url: "/customer/update",
    method: "post",
    data: data
  })
}



/**
 * 手动分配
 */
// 分配员工名搜索
export function searchNameStaff(name) {
  return request({
    url: "",
    method: "post",
    data: {
      name: name
    }
  })
}
// 客户分配给员工
export function distributeStaff(cusid, staid) {
  return request({
    url: "",
    method: "post",
    data: {
      cusid,
      staid
    }
  })
}


/**
 * 订单列表
 */
// 保存编辑订单数据
export function saveEditOrderInfo(data) {
  return request({
    url: "",
    method: "post",
    data: data
  })
}
// 删除订单
export function deleteOrderInfo(id) {
  return request({
    url: "",
    method: "post",
    data: {
      id: id
    }
  })
}
// 保存首位服务人员
export function saveFisrstStaff(data) {
  return request({
    url: "",
    method: "post",
    data: data
  })
}
// 删除面试记录
export function deleteInterview(id) {
  return request({
    url: "",
    method: "post",
    data: {
      id: id
    }
  })
}
// 获取该订单的所有面试
export function getInterviewInfo(customer_id) {
  return request({
    url: "/interview/index",
    method: "post",
    data: {
      customer_id: customer_id
    }
  })
}
// 获取该订单中的所有跟进
export function getFollowUpInfo(id) {
  return request({
    url: "",
    method: "post",
    data: {
      id: id
    }
  })
}
// 保存面试记录
export function saveInterviewInfo(data) {
  return request({ 
    url: "",
    method: "post",
    data: data
  })
}
// 保存跟进内容
export function saveFollowUpInfo(data) {
  return request({ 
    url: "",
    method: "post",
    data: data
  })
}
