import Mock from 'mockjs'
import * as mUtils from '@/utils/mUtils'


let List = []
const count = 25
let typelist = ['联通', '移动', '电信', '铁通']

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    username: Mock.Random.cname(),
    email: Mock.Random.email(),
  }))
}

export default {
  // 用户登录
  login: config => {
    let data = JSON.parse(config.body);
    let userList = {};
    if(data.username === 'admin'){
        userList = {
            token:'admin',
            name:'管理员',
        }
    }else if(data.username === 'editor'){
        userList = {
            token:'editor',
            name:'苏杰鑫',
        }
    }else{
       return {
        code: -1,
        data: {
          msg: "用户名错误",
          status:'fail'
        }
       }
    }
    return {
      code: 200,
      data: {
        userList: userList
      }
    }
  },
   // 用户登出
   logout: config => {
    return {
      code: 200,
      data: {
        userList: ""
      }
    }
  },
  // 获取登录用户信息
  getUserInfo:config => {
    let data = JSON.parse(config.body);
    let userList = {};
    if(data.token === 'admin'){
        userList = {
            roles: ['admin'],
            name:'admin',
            avatar:'https://wx.qlogo.cn/mmopen/vi_32/un2HbJJc6eiaviaibvMgiasFNlVDlNOb9E6WCpCrsO4wMMhHIbsvTkAbIehLwROVFlu8dLMcg00t3ZtOcgCCdcxlZA/132'
        }
    }else if(data.token === 'editor'){
        userList = {
            roles: ['editor'],
            name:'editor',
            avatar:'https://mirror-gold-cdn.xitu.io/168e088859e325b9d85?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'
        }
    }else{
        userList = {}
    }
    return {
      code: 200,
      data: {
        userList: userList
      }
    }
  },
   /**
   * 获取用户列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList:config => {
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