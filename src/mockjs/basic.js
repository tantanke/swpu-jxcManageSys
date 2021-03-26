import Mock from 'mockjs'
import * as mUtils from '@/utils/mUtils'


let List = []
const count = 25
let providerList =['供货商1','供货商2','供货商3','供货商4','供货商5','供货商6',]
Mock.Random.extend({
    phone: function () {
      var phonePrefixs = ['132', '135', '189','136','159','182'] // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
  })
  
  for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: Mock.Random.guid(),
      username: Mock.Random.cname(),
      "sex|1":['男','女'],
      phoneNumber: Mock.Random.phone(),
      email: Mock.Random.email(),
      eviName: '身份证', 
      'providerName|1':providerList,
      eviNumber:  Mock.Random.id()
    }))
  }

export default {

  getProviderList:config => {
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
  },
  getAllProviderList:() => {
    let mockList = List;
    return {
      code: 200,
      data: {
        total: mockList.length,
        userList: userList
      }
    }
  }

  
}