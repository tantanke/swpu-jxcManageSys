
export const topRouterMap = [
    {
        'parentName':'infoShow',
        'data':[
            {
                path: 'infoShow1',
                name: 'infoShow1',
                meta: {
                    title: '个人信息',
                    icon: 'fa-asterisk',
                    routerType: 'topmenu'
                },
                component: () => import('@/page/infoManage/infoShow')
            }
        ]
    },
    {
        'parentName':'infoModify',
        'data':[
            {
                path:'infoModify1',
                name:'infoModify1',
                meta:{
                    title:'修改信息',
                    icon:'fa-asterisk',
                    routerType:'topmenu'
                },
                component: () => import('@/page/infoManage/infoModify')
            }
        ]
    }
]


