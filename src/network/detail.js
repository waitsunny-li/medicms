import {request} from './request'

// 请求员工列表数据
export function requestUserListDate() {
  return request({
    url: "/staff",
    method: "get",
  })
}