/*
 * @Author: liweilong
 * @Date: 2020-08-24 08:59:40
 */
import axios from 'axios'
import {getItem} from 'common/utils'

export function request(config) {
  // 1、创建一个实例
  const instance = axios.create({
    // baseURL : "http://jz.i4ig.com/api/",
    baseURL : "http://jzn.gz-isp.com/api/",
    // baseURL: 'http://www.jz.com/api',
    timeout: 5000
    
  })


  // 请求拦截器的使用
  instance.interceptors.request.use(config => {
    // 必须返回config、因为要使用config，这个config就是包含着一些配置信息，如url ，请求头等
    if (getItem('userInfo')['userToken']) {
      config.headers.Authorization = getItem('userInfo')['userToken']
    }
    return config
  }, err => {
  })

  // 响应拦截器的使用
  instance.interceptors.response.use(res => {
    // 响应的数据，包含一些东西
    return res.data //这样，就可以只拿到data 返回到.then()中
  }, err => {
    console.log(err)
  })

  return instance(config)
}

