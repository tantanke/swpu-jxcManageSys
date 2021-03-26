import Vue from 'vue'
import Router from 'vue-router'
import { Layout,Content }  from "../layout"; // 页面整体布局
import { topRouterMap } from "./topRouter";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

function filterTopRouterMap(name){
	let router = topRouterMap.find((item) => {
		return item.parentName === name;
	});
	return router.data; // arr
}

/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 * 
 */
//默认不需要权限的页面
export const constantRouterMap = [
	{
    path: '',  
    component: Layout,
		redirect: '/index/index',
		hidden:true
  },
	{ path: '/login',name: 'login',component:() => import('@/page/login'),hidden: true},
	{ path: '/404', component: () => import('@/page/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/page/errorPage/401'), hidden: true },
	{
		path: '/index',
		name: 'index',
		component:Layout,
		meta:{
			title:'首页',
		  icon: 'icondashboard',
		},
		noDropdown:true,
		children:[ 
			{
				path:'index', 
				meta:{
					title:'首页', 
					icon:'icondashboard',
				  routerType:'leftmenu'
				},
        component: () => import('@/page/index/index'),
			}
		]
	}
]

	//注册路由
export default new Router({
	mode:'history', // 默认为'hash'模式
	base: '/permission/', // 添加跟目录,对应服务器部署子目录
	routes: constantRouterMap
})

  //异步路由（需要权限的页面）
export const asyncRouterMap = [
	{
		path:'/userManager',
		name: 'userManage',
		component:Layout,
		meta: {
			title:'用户管理',
			icon: 'iconuser',
			roles: ['admin']
		},
		noDropdown:true,
		children:[
			{
				path:'userList', 
				meta:{
					title:'用户管理', 
					icon:'iconuser',
				  routerType:'leftmenu',
				  
				},
				component: () => import('@/page/userList/userList'),
			}
		]
	},
	{
	  path:'/infoManage',
	  name: 'infoManage',
	  meta: {
			title:'信息管理',
			icon: 'iconinfo',
	  },
	  component:Layout,
	  children:[
		{
			path:'infoModify',
			name:'infoModify',
			meta: {
				title:'修改信息',
				icon: 'iconinfo',
				routerType:'leftmenu',
				titleList:[
					{"path":"infoModify1","title":"修改信息"},
				]
			},
			component:Content,
			children:filterTopRouterMap('infoModify')
		 }
	  ]
	},
	{
		path:'/fundManage',
		name: 'fundManage',
		meta: {
		  title:'基础信息管理',
		  icon: 'iconpay3',
		},
		component:Layout,
		children:[
		  {
			path:'fundList',
			name:'fundList',
			meta: {
					title:'供货商信息管理',
					routerType:'leftmenu',
					roles: ['admin']
			},
			component: () => import('@/page/fundList/providerMsg'),
		  },
		  {
			path:'chinaTabsList',
			name:'chinaTabsList',
			meta: {
				title:'仓库信息管理',
				routerType:'leftmenu',
				roles: ['admin']
			},
			component: () => import('@/page/fundList/storeList'),
			}
		]
	},
	{
		path:'/fundData',
		name: 'fundData',
		meta: {
		  title:'入库和出库管理',
		  icon: 'iconecharts',
		},
		component:Layout,
		redirect: '/fundData/fundPosition',
		children:[
		  {
			 path:'fundDataIn',
			 name:'fundDataIn',
			 meta: {
				  title:'入库管理',
				  roles: ['admin']
			 },
			 component: () => import('@/page/fundData/fundDataIn')
		  },
		   {
				path:'fundDataOut',
				name:'fundDataOut',
				meta: {
					title:'出库管理',
					roles: ['admin']
				},
				component: () => import('@/page/fundData/fundDataOut')
		    },
			{
				path:'fundNumberMonth',
				name:'fundNumberMonth',
				meta: {
					title:'月度报表'
				},
				component: () => import('@/page/fundData/incomePayPositionMonth')
		    },
			{
				path:'fundNumberYear',
				name:'fundNumberYear',
				meta: {
					title:'年度报表'
				},
				component: () => import('@/page/fundData/incomePayPosition')
		    }
		]
	},
	{
		path:'/fundNumber',
		name: 'fundNumber',
		meta: {
		  title:'商品库存管理',
		  icon: 'iconpay3',
		},
		component:Layout,
		redirect: '/fundNumber/fundNumberInfo',
		children:[
		  {
			 path:'fundNumberInfo',
			 name:'fundNumberInfo',
			 meta: {
				  title:'库存信息',
				  roles: ['admin']
			 },
			 component: () => import('@/page/fundNumber/index')
		  },
		  {
			path:'fundNumberChart',
			name:'fundNumberChart',
			meta: {
				 title:'库存信息图表'
			},
			component: () => import('@/page/fundNumber/imageChart')
		 }
		]
	},
	{
		path:'/fundSend',
		name: 'fundSend',
		meta: {
		  title:'商品销售管理',
		  icon: 'iconecharts',
		},
		component:Layout,
		redirect: '/fundSend/fundSendIndex',
		children:[
		  {
			 path:'fundSendIndex',
			 name:'fundSendIndex',
			 meta: {
				  title:'商品销售管理',
				  roles: ['admin']
			 },
			 component: () => import('@/page/fundSend/index')
		  },
		  {
			 path:'fundSendChart',
			 name:'fundSendChart',
			 meta: {
				  title:'商品销售图表',
				  
			 },
			 component: () => import('@/page/fundSend/imageChart')
		  }
		]
	},
	{
    path: '/permission',
		name: 'permission',
		meta: {
      title: '权限设置',
      icon: 'iconpermission', // you can set roles in root nav
    },
    component: Layout,
    redirect: '/permission/page',
    children: [{
			path: 'page',
			name: 'pagePer',
      meta: {
        title: '页面权限',
        roles: ['admin'] // or you can only set roles in sub nav
      },
      component: () => import('@/page/permission/page'),
    }]
  },

	{ path: '*', redirect: '/404', hidden: true }
	];
	
	/**
	 *  路由设置要求：
	 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
	 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
	 * 
	 * 按需加载路由组件的2种方法：
	 * 1、component: () => import('@/page/login')
	 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
	 */

