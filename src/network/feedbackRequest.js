import {
  request
} from './request'

// 获取反馈
export function getComplaint() {
  return request({
    url: "/complaint/index",
    method: "get",
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
