import request from '@/utils/axios'


export function login(params) {
  return request({
    url: '/user/login',
    method: 'get',
    data:params
  })
}
export function logout(params) {
  return request({
    url: '/user/logout',
    method: 'get',
    data:params
  })
}


export function getUserInfo(params) {
  return request({
    url: '/user/info/get',
    method: 'get',
    data:params
  })
}

export function getUserList(reqData) {
  return request({
    url:'/user/list/get',
    method: 'get',
    data: reqData
  })
}

export function getProviderList(reqData) {
  return request({
    url:'/provider/get',
    method: 'get',
    data: reqData
  })
}

export function getAllProviderList() {
  return request({
    url:'/provider/getAll',
    method: 'get'
  })
}
export function getStoreList(reqData) {
  return request({
    url:'/store/get',
    method: 'get',
    data: reqData
  })
}

// 出库入库数据
export function getInStoreList(reqData) {
  return request({
    url:'/store/in',
    method: 'get',
    data: reqData
  })
}
export function getOutStoreList(reqData) {
  return request({
    url:'/store/out',
    method: 'get',
    data: reqData
  })
}
// 库存管理数据
export function getLeftList(reqData) {
  return request({
    url:'/left/get',
    method: 'get',
    data: reqData
  })
}
// 商品销售管理数据
export function getSentList(reqData) {
  return request({
    url:'/sent/get',
    method: 'get',
    data: reqData
  })
}

