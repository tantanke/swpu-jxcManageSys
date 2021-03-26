import Mock from 'mockjs'
import * as mUtils from '@/utils/mUtils'


let List = []
const count = 25
let typelist = ['私有', '公有', '国有']
let desclist = ['平平无奇的仓库', '大家都喜欢的仓库', '千载难逢的仓库', '百里挑一的仓库', '苏杰鑫的仓库', '谭达科的仓库']
Mock.Random.extend({
    phone: function () {
      var phonePrefixs = ['132', '135', '189','136','159','182'] // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
  })
  
  for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: Mock.Random.guid(),
      address: Mock.mock('@county(true)'),
      'storeArea|5000-10000.1-3':1,
      'huojia|1-1000':1,
      'cate|1': typelist,
      'desc|1': desclist, 

    }))
  }

export default {

  getStoreList:config => {
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