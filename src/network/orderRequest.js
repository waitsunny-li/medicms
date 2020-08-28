import {
  request
} from './request'

// 搜索待岗员工
export function searchStaffNmae(keyword) {
  return request({
    url: "/staff/waiting",
    method: "get",
    params: {
      keyword: keyword
    }
  })
}


/**
 * 用户需求
 */
// 获取所有客户需求等信息
export function searchCustomerInfo(searchform) {
  return request({
    url: "/customer/index",
    method: "get",
    params: searchform
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
    url: "/customer/cancel",
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
export function searchNameTeacher(name) {
  return request({
    url: "/user/match_teacher",
    method: "get",
    params: {
      keyword: name
    }
  })
}
// 客户分配给匹配老师
export function distributeTeacher(customer_id, user_id) {
  return request({
    url: "customer/match",
    method: "post",
    data: {
      customer_id: customer_id,
      user_id: user_id
    }
  })
}


/**
 * 订单列表
 */
// 添加保险
export function saveInsuranceInfo(data) {
  return request({
    url: "/safety/save",
    method: "post",
    data: data
  })
}
// 查看保险列表
export function lookStaffInsurance(staff_id) {
  return request({
    url: "/safety/index",
    method: "get",
    params: {
      staff_id: staff_id
    }
  })
}
// 编辑保险
export function lookOneInsurance(id) {
  return request({
    url: "/safety/edit",
    method: "get",
    params: {
      id: id
    }
  })
}
// 更新保险
export function updateOneInsurance(data) {
  return request({
    url: "/safety/update",
    method: "post",
    data: data
  })
}
// 删除保险
export function deleteInsurance(id) {
  return request({
    url: "/safety/delete",
    method: "get",
    params: {
      id: id
    }
  })
}

// 删除订单
export function deleteOrderInfo(id) {
  return request({
    url: "/customer/cancel",
    method: "get",
    params: {
      id: id
    }
  })
}
// 保存首位服务人员
export function saveFisrstStaff(data) {
  return request({
    url: "/customer/add_or_replace",
    method: "post",
    data: data
  })
}
// 删除面试记录
export function deleteInterview(id) {
  return request({
    url: "/interview/delete",
    method: "get",
    params: {
      id: id
    }
  })
}
// 编辑获取单个面试记录
export function getOneInterview(id) {
  return request({
    url: "/interview/edit",
    method: "get",
    params: {
      id: id
    }
  })
}
// 更新单个面试记录
export function updateOneInterview(data) {
  return request({
    url: "/interview/update",
    method: "post",
    data: data
  })
}
// 获取该订单的所有面试
export function getInterviewInfo(idObj) {
  return request({
    url: "/interview/index",
    method: "get",
    params: {
      customer_id: idObj.customer_id ? idObj.customer_id : "",
      staff_id: idObj.staff_id ? idObj.staff_id : ""
    }
  })
}
// 获取该订单中的所有跟进
export function getFollowUpInfo(idObj) {
  return request({
    url: "/follow_up/index",
    method: "get",
    params: {
      customer_id: idObj.customer_id ? idObj.customer_id : "",
      staff_id: idObj.staff_id ? idObj.staff_id : ""
    }
  })
}
// 保存面试记录
export function saveInterview(data) {
  return request({
    url: "/interview/save",
    method: "post",
    data: data
  })
}
// 保存跟进内容
export function saveFollowUpInfo(data) {
  return request({
    url: "/follow_up/save",
    method: "post",
    data: data
  })
}
// 删除跟进记录
export function deleteFollowUp(id) {
  return request({
    url: "/follow_up/delete",
    method: "get",
    params: {
      id: id
    }
  })
}
// 编辑合同
export function saveEditContract(data) {
  return request({
    url: "/contract/save",
    method: "post",
    data: data
  })
}
// 通过pass
export function spassOrder(customer_id) {
  return request({
    url: "/contract/pass",
    method: "post",
    data: {
      customer_id: customer_id
    }
  })
}

// 暂停
export function pauseOrder(data) {
  return request({
    url: "/customer/pause",
    method: "post",
    data: data
  })
}

// 恢复订单
export function restoreOrder(customer_id) {
  return request({
    url: "/customer/restore",
    method: "post",
    data: {
      customer_id: customer_id
    }
  })
}
// 完成订单
export function completeOrder(customer_id) {
  return request({
    url: "/customer/complete",
    method: "post",
    data: {
      customer_id: customer_id
    }
  })
}
// 复制订单
export function copyOrder(customer_id) {
  return request({
    url: "/customer/copy",
    method: "get",
    params: {
      customer_id: customer_id
    }
  })
}

/**
 * 销售回访
 */
// 获取回访记录
export function getSalesVisitInfo(objsearch) {
  return request({
    url: "/visit/index",
    method: "get",
    params: objsearch
  })
}

// 保存回访记录
export function saveSalesVisitInfo(data) {
  return request({
    url: "/visit/save",
    method: "post",
    data: data
  })
}

// 派出单
export function dispatchOrder(customer_id) {
  return request({
    url: "/dispatch_order/send",
    method: "get",
    params: {
      customer_id: customer_id
    }
  })
}