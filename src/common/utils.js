// sessionStorage存储一个对象字符串
export function setItem(key, obj) {
  sessionStorage.setItem(key, JSON.stringify(obj))
}

// 解析返回一个对象
export function getItem(key) {
  if(sessionStorage.getItem(key) == '' || sessionStorage.getItem(key) == null) {
    return {}
  }
  return JSON.parse(sessionStorage.getItem(key))
}