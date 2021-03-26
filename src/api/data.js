const permission = {
    "code": 1,
    "data": [{
        "id": 1,
        "permissionName": "首页管理",
        "parentId": 0,
        "permissionCode": "home",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 11,
            "permissionName": "首页",
            "permissionLevel": null,
            "parentId": 1,
            "permissionCode": "home"
        }]
    }, {
        "id": 2,
        "permissionName": "用户管理",
        "parentId": 0,
        "permissionCode": "order-manage",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 21,
            "parentId": 2,
            "permissionName": "用户管理",
            "permissionLevel": null,
            "permissionCode": "order-list"
        }]
    }, {
        "id": 3,
        "permissionName": "信息管理",
        "parentId": 0,
        "permissionCode": "goods",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 31,
            "permissionName": "修改信息",
            "permissionLevel": null,
            "parentId": 3,
            "permissionCode": "goods-list"
        }]
    }, {
        "id": 4,
        "permissionName": "基础信息管理",
        "parentId": 0,
        "permissionCode": "permission",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 41,
            "permissionName": "供货商信息管理",
            "permissionLevel": null,
            "parentId": 4,
            "permissionCode": "user-manage"
        }, {
            "id": 42,
            "permissionName": "仓库信息管理",
            "permissionLevel": null,
            "parentId": 4,
            "permissionCode": "role-manage"
        }]
    }, {
        "id": 5,
        "permissionName": "入库和出库管理",
        "parentId": 0,
        "permissionCode": "permission",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 51,
            "permissionName": "入库管理",
            "permissionLevel": null,
            "parentId": 5,
            "permissionCode": "user-manage"
        }, {
            "id": 52,
            "permissionName": "出库管理",
            "permissionLevel": null,
            "parentId": 5,
            "permissionCode": "role-manage"
        }, {
            "id": 53,
            "permissionName": "月度报表",
            "permissionLevel": null,
            "parentId": 5,
            "permissionCode": "role-manage"
        }, {
            "id": 54,
            "permissionName": "年度报表",
            "permissionLevel": null,
            "parentId": 5,
            "permissionCode": "role-manage"
        }]
    }, {
        "id": 6,
        "permissionName": "商品库存管理",
        "parentId": 0,
        "permissionCode": "permission",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 61,
            "permissionName": "库存信息",
            "permissionLevel": null,
            "parentId": 6,
            "permissionCode": "user-manage"
        }, {
            "id": 62,
            "permissionName": "库存图表",
            "permissionLevel": null,
            "parentId": 6,
            "permissionCode": "role-manage"
        },]
    }, {
        "id": 7,
        "permissionName": "商品销售管理",
        "parentId": 0,
        "permissionCode": "permission",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 71,
            "permissionName": "商品销售管理",
            "permissionLevel": null,
            "parentId": 7,
            "permissionCode": "user-manage"
        }, {
            "id": 72,
            "permissionName": "商品销售图表",
            "permissionLevel": null,
            "parentId": 7,
            "permissionCode": "role-manage"
        }]
    }, {
        "id": 8,
        "permissionName": "权限管理",
        "parentId": 0,
        "permissionCode": "permission",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 81,
            "permissionName": "页面权限",
            "permissionLevel": null,
            "parentId": 8,
            "permissionCode": "user-manage"
        }]
    }]
}

const permission1 = {
    "code": 1,
    "data": [{
        "id": 1,
        "permissionName": "首页管理",
        "parentId": 0,
        "permissionCode": "home",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 11,
            "permissionName": "首页",
            "permissionLevel": null,
            "parentId": 1,
            "permissionCode": "home"
        }]
    }, {
        "id": 3,
        "permissionName": "信息管理",
        "parentId": 0,
        "permissionCode": "goods",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [{
            "id": 31,
            "permissionName": "修改信息",
            "permissionLevel": null,
            "parentId": 3,
            "permissionCode": "goods-list"
        }]
    }, {
        "id": 5,
        "permissionName": "入库和出库管理",
        "parentId": 0,
        "permissionCode": "permission",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [ {
            "id": 53,
            "permissionName": "月度报表",
            "permissionLevel": null,
            "parentId": 5,
            "permissionCode": "role-manage"
        }, {
            "id": 54,
            "permissionName": "年度报表",
            "permissionLevel": null,
            "parentId": 5,
            "permissionCode": "role-manage"
        }]
    }, {
        "id": 6,
        "permissionName": "商品库存管理",
        "parentId": 0,
        "permissionCode": "permission",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [ {
            "id": 62,
            "permissionName": "库存图表",
            "permissionLevel": null,
            "parentId": 6,
            "permissionCode": "role-manage"
        },]
    }, {
        "id": 7,
        "permissionName": "商品销售管理",
        "parentId": 0,
        "permissionCode": "permission",
        "resourceLevel": 1,
        "permissionLevel": 1,
        "erpMemberPermissions": [ {
            "id": 72,
            "permissionName": "商品销售图表",
            "permissionLevel": null,
            "parentId": 7,
            "permissionCode": "role-manage"
        }]
    }]
}

const role =  {
    "code": 1,
    "data": [{
        "id": 1,
        "roleName": "超级管理员",
        "status": 1,
        "erpMemberPermissions": [{
            "id": 1,
            "permissionName": "首页管理"
        }, {
            "id": 11,
            "permissionName": "首页"
        }, {
            "id": 2,
            "permissionName": "用户管理"
        }, {
            "id": 21,
            "permissionName": "用户管理"
        }, {
            "id": 3,
            "permissionName": "信息管理"
        }, {
            "id": 31,
            "permissionName": "修改信息"
        }, {
            "id": 4,
            "permissionName": "基础信息管理"
        }, {
            "id": 41,
            "permissionName": "供货商信息管理"
        }, {
            "id": 42,
            "permissionName": "仓库信息管理"
        }, {
            "id": 5,
            "permissionName": "权限管理"
        }, {
            "id": 51,
            "permissionName": "入库管理"
        }, {
            "id": 52,
            "permissionName": "出库管理"
        }, {
            "id": 53,
            "permissionName": "月度报表"
        }, {
            "id": 54,
            "permissionName": "年度报表"
        }, {
            "id": 6,
            "permissionName": "商品库存管理"
        }, {
            "id": 61,
            "permissionName": "库存信息"
        }, {
            "id": 62,
            "permissionName": "库存图表"
        }, {
            "id": 7,
            "permissionName": "商品销售管理"
        }, {
            "id": 71,
            "permissionName": "商品销售管理"
        }, {
            "id": 72,
            "permissionName": "商品销售图表"
        }, {
            "id": 8,
            "permissionName": "权限管理"
        }, {
            "id": 81,
            "permissionName": "页面权限"
        }]
    }, {
        "id": 1,
        "roleName": "普通用户",
        "status": 1,
        "erpMemberPermissions": [{
            "id": 1,
            "permissionName": "首页管理"
        }, {
            "id": 11,
            "permissionName": "首页"
        }]
    }]
}

const editData = {
    "id": 1,
    "roleName": "普通用户",
    "status": 1,
    "erpMemberPermissions": [{
        "id": 1,
        "permissionName": "首页管理"
    }, {
        "id": 11,
        "permissionName": "首页"
    }, {
        "id": 3,
        "permissionName": "信息管理"
    }, {
        "id": 31,
        "permissionName": "修改信息"
    }, {
        "id": 5,
        "permissionName": "入库和出库管理"
    }, {
        "id": 53,
        "permissionName": "月度报表"
    }, {
        "id": 54,
        "permissionName": "年度报表"
    }, {
        "id": 6,
        "permissionName": "商品库存管理"
    }, {
        "id": 62,
        "permissionName": "库存图表"
    }, {
        "id": 7,
        "permissionName": "商品销售管理"
    }, {
        "id": 72,
        "permissionName": "商品销售图表"
    }]
}
export {
    role,
    permission,
    permission1,
    editData
}