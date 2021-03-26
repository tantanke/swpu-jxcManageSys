import Mock from 'mockjs'
import * as mUtils from '@/utils/mUtils'


let List = []
const count = 25
let typelist = ['联通', '移动', '电信', '铁通']
let cate = ['手工艺品', '口红', '眼霜', '洗面奶', '精华', '显卡', '手机', '耳机', '笔记本', '茶叶','水杯','衣服']
Mock.Random.extend({
    phone: function () {
      var phonePrefixs = ['132', '135', '189','136','159','182'] // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
  })
  
  for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: Mock.Random.guid(),
      'name|1': cate,
      'number|5-1000': 1,
      "price|5-1000":1,
      dateTime:Mock.Random.date(),
      phoneNumber: Mock.Random.phone(),
      email: Mock.Random.email(),
      total:0
    }))
  }

export default {

    getSentList:config => {
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