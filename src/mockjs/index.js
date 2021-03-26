// import Vue from 'vue'
import Mock from 'mockjs'
// process.env.NODE_ENV === "development" ? Vue.use(Mock) : null;

import tableAPI from './money'
import salesAPI from './sales'
import userAPI from './user'
import {permission,role,permission1} from '@/api/data'

// 基本信息管理

import basicAPI from './basic'
import storeAPI from './storeList'
// 出库入库
import storeInAPI from './storeIn'
import storeOutAPI from './storeOut'
// 销售
import  leftAPI from './Left'
// 库存
import sentApi from './sent'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})

// 获取供应商信息
Mock.mock(/\/provider\/get/, 'get', basicAPI.getProviderList)
Mock.mock(/\/provider\/getAll/, 'get', basicAPI.getAllProviderList)
// 获取仓库信息
Mock.mock(/\/store\/get/, 'get', storeAPI.getStoreList)
// 出库入库
Mock.mock(/\/store\/in/, 'get', storeInAPI.getInStoreList)
Mock.mock(/\/store\/out/, 'get', storeOutAPI.getOutStoreList)
// 销售
Mock.mock(/\/left\/get/, 'get', leftAPI.getLeftList)
// 库存
Mock.mock(/\/sent\/get/, 'get', sentApi.getSentList)



Mock.mock(/\/money\/get/, 'get', tableAPI.getMoneyList)
Mock.mock(/\/money\/remove/, 'get', tableAPI.deleteMoney)
Mock.mock(/\/money\/batchremove/, 'get', tableAPI.batchremoveMoney)
Mock.mock(/\/money\/add/, 'get', tableAPI.createMoney)
Mock.mock(/\/money\/edit/, 'get', tableAPI.updateMoney)
// sales相关
Mock.mock(/\/sales\/get/, 'get', salesAPI.getSalesList)
// user相关
Mock.mock(/\/user\/login/, 'get', userAPI.login)
Mock.mock(/\/user\/logout/, 'get', userAPI.logout)
Mock.mock(/\/user\/info\/get/, 'get', userAPI.getUserInfo)
Mock.mock(/\/user\/list\/get/, 'get', userAPI.getUserList)
Mock.mock(/\/permission\/all/, 'get', permission)
Mock.mock(/\/permission\/user/, 'get', permission1)
Mock.mock(/\/role\/list/, 'get', role)

// 基础信息管理相关
export default Mock;