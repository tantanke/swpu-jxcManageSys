import Mock from 'mockjs'
import * as mUtils from '@/utils/mUtils'


let List = []
const count = 25
let cate = ['手工艺品', '口红', '眼霜', '洗面奶', '精华', '显卡', '手机', '耳机', '笔记本', '茶叶','水杯','衣服']
let providerList =['供应商1','供应商2','供应商3','供应商4','供应商5','供应商6',]

Mock.Random.extend({
    phone: function () {
      var phonePrefixs = ['132', '135', '189','136','159','182'] // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
  })
  
  for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: Mock.Random.guid(), // 编号
      'cate|1':cate, // 类别
      'price|5-1000': 1,
      'number|5-1000': 1, 
      total:0,
      name:Mock.Random.cname(),
      dateTime: Mock.Random.date(),
      'providerName|1': providerList,
    }))
  }

export default {

  getInStoreList:config => {
    const { limit , page } = JSON.parse(config.body);
    let mockList = List;
    const userList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        userList: userList
      }
    }
  }

  
}