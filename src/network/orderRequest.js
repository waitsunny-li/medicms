import {
  request
} from './request'

/**
 * 用户需求
 */
// 获取所有客户需求等信息
export function getCustomerInfo() {
  return request({
    url: "",
    method: "get",
  })
}