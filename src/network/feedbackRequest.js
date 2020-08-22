import {
  request
} from './request'

// 获取反馈
export function getComplaint(searchObj) {
  return request({
    url: "/complaint/index",
    method: "get",
    params: searchObj
  })
}

// 新增反馈
export function saveComplaint(data) {
  return request({
    url: "/complaint/save",
    method: "post",
    data: data
  })
}

// 删除反馈
export function deleteComplaint(id) {
  return request({
    url: "/complaint/delete",
    method: "get",
    params: {
      id: id
    }
  })
}

// 手工搜素售后服务人员
export function searchNameSaleStaff(name) {
  return request({
    url: "user/sale",
    method: "get",
    params: {
      keyword: name
    }
  })
}
// 分派给售后服务人员
export function distributeSalesStaff(customer_id, user_id) {
  return request({
    url: "complaint/match",
    method: "post",
    data: {
      complaint_id: customer_id,
      assign_user_id: user_id
    }
  })
}
// 评价内容
export function handleComplaint(data) {
  return request({
    url: "complaint/state",
    method: "post",
    data: data
  })
}

// 处理结果内容
export function handleResult(data) {
  return request({
    url: "/complaint/deal_with",
    method: "post",
    data: data
  })
}