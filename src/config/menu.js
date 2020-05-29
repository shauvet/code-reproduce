let menuList = [
  {
    "key": "productMgmt",
    "name": "产品管理",
    "icon": "icon-shanghushouye",
    "value": "02",
    "child": [
      {
        "key": "productList",
        "name": "所有产品列表",
        "icon": "icon-wodechanpin",
				"value": "022",
				"child": [
					{
						"key": 'release',
						"name": '发布新产品',
						"type": 'button',
						"value": '0221'
					},
					{
						"key": 'releaseGroup',
						"name": '发布组合产品',
						"type": 'button',
						"value": '0222'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0223'
					},
					{
						"key": 'offSale',
						"name": '下架',
						"type": 'button',
						"value": '0224'
					},
					{
						"key": 'audit',
						"name": '审批',
						"type": 'button',
						"value": '0225'
					},
					{
						"key": 'recall',
						"name": '撤回',
						"type": 'button',
						"value": '0226'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0227'
					},
					{
						"key": 'rollback',
						"name": '回滚',
						"type": 'button',
						"value": '0228'
					},
					{
						"key": 'purchase',
						"name": '产品限购',
						"type": 'button',
						"value": '0229'
					},
					{
						"key": 'virtualItem',
						"name": '虚拟库存',
						"type": 'button',
						"value": '0230'
					},
				]
      },
      {
        "key": "productLogisticsList",
        "name": "产品物流列表",
        "icon": "icon-wodechanpin",
				"value": "02D",
				"child": [
					{
						"key": 'config',
						"name": '设置物流信息',
						"type": 'button',
						"value": '02D1'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '02D2'
					},
					{
						"key": 'audit',
						"name": '审批',
						"type": 'button',
						"value": '02D3'
					},
					{
						"key": 'recall',
						"name": '撤回',
						"type": 'button',
						"value": '02D1'
					},
					{
						"key": 'rollback',
						"name": '回滚',
						"type": 'button',
						"value": '02D1'
					}
				]
	  },
	  {
		"key": "monthlySales",
        "name": "产品月销售目标",
        "icon": "icon-wodechanpin",
		"value": "02E",
		"child":[]
	  },
	  {
			"key": "unpackLineList",
			"name": "产品拆包线列表",
			"icon": "icon-wodechanpin",
			"value": "02F",
			"child":[]
	  }
    ]
  },
  {
    "key": "productConfig",
    "name": "产品配置",
    "icon": "icon-shanghushouye",
    "value": "03",
    "child": [
      {
        "key": "unpackLineList",
        "name": "拆包线",
        "icon": "icon-wodechanpin",
				"value": "031",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0311'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0312'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0313'
					}
				]
      },
      {
        "key": "itemTagList",
        "name": "产品标签",
        "icon": "icon-wodechanpin",
				"value": "032",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0321'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0322'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0323'
					}
				]
      },
      {
        "key": "productAttrList",
        "name": "产品属性",
        "icon": "icon-wodechanpin",
				"value": "033",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0331'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0332'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0333'
					}
				]
      },
      {
        "key": "extendAttrList",
        "name": "扩展属性类型",
        "icon": "icon-wodechanpin",
				"value": "034",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0341'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0342'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0343'
					}
				]
      },
      {
        "key": "categoryList",
        "name": "前端类目",
        "icon": "icon-shangpinliebiao",
				"value": "035",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0351'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0352'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0353'
					}
				]
      },
      {
        "key": "productComponentList",
        "name": "产品成份",
        "icon": "icon-wodechanpin",
				"value": "036",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0361'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0362'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0363'
					}
				]
      },
      {
        "key": "productEfficiencyList",
        "name": "产品功效",
        "icon": "icon-wodechanpin",
				"value": "037",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0371'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0372'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0373'
					}
				]
      },
      {
        "key": "componentTypeList",
        "name": "成份类型",
        "icon": "icon-wodechanpin",
				"value": "038",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0381'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0382'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0383'
					}
				]
      },
      {
        "key": "problemTypeList",
        "name": "问题类型",
        "icon": "icon-wodechanpin",
				"value": "039",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0391'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0392'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0393'
					}
				]
      },
      {
        "key": "problemList",
        "name": "常见问题",
        "icon": "icon-wodechanpin",
				"value": "03A",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '03A1'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '03A2'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '03A3'
					}
				]
      },
      {
        "key": "vopCodeList",
        "name": "智芯尊享代码",
        "icon": "icon-wodechanpin",
        "value": "03B"
      },
      {
        "key": "priceTypeList",
        "name": "产品价格类型",
        "icon": "icon-wodechanpin",
				"value": "03C",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '03C1'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '03C2'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '03C3'
					}
				]
      },
    ]
  },
  {
    "key": "warehouseMgmt",
    "name": "仓库管理",
    "icon": "icon-shanghushouye",
    "value": "04",
    "child": [
      {
        "key": "serverList",
        "name": "服务区列表",
        "icon": "icon-wodechanpin",
				"value": "041",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0411'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0412'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0413'
					}
				]
      },
      {
        "key": "warehouseList",
        "name": "仓库列表",
        "icon": "icon-wodechanpin",
				"value": "042",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0421'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0422'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0423'
					}
				]
      },
      {
        "key": "storeList",
        "name": "门店列表",
        "icon": "icon-wodechanpin",
        "value": "043",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0431'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0432'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0433'
					}
				]
      },
      {
        "key": "warehouseInfo",
        "name": "库存明细列表",
        "icon": "icon-wodechanpin",
        "value": "044",
      },
      {
        "key": "availableList",
        "name": "可用库存列表",
        "icon": "icon-wodechanpin",
        "value": "045",
      },
      {
        "key": "warehouseWarning",
        "name": "库存预警",
        "icon": "icon-wodechanpin",
				"value": "046",
				"child": [
					{
						"key": 'config',
						"name": '定时预警设置',
						"type": 'button',
						"value": '0461'
					},
					{
						"key": 'import',
						"name": '导入',
						"type": 'button',
						"value": '0462'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0463'
					},
					{
						"key": 'batchSetting',
						"name": '批量审批',
						"type": 'button',
						"value": '0464'
					}
				]
      },
      {
        "key": "preStorageSetup",
        "name": "预售库存设置",
        "icon": "icon-wodechanpin",
				"value": "047",
				"child": [
					{
						"key": 'config',
						"name": '设置预售数',
						"type": 'button',
						"value": '0471'
					},
					{
						"key": 'audit',
						"name": '审批',
						"type": 'button',
						"value": '0472'
					},
					{
						"key": 'recall',
						"name": '撤回',
						"type": 'button',
						"value": '0473'
					},
					{
						"key": 'import',
						"name": '导入',
						"type": 'button',
						"value": '0474'
					},
					{
						"key": 'batch',
						"name": '批量审批',
						"type": 'button',
						"value": '0475'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0476'
					}
				]
      }
    ]
  },
  {
    "key": "contentMgmt",
    "name": "内容管理",
    "icon": "icon-shanghushouye",
    "value": "05",
    "child": [
      {
        "key": "advertisementMgmt",
        "name": "首页广告管理",
        "icon": "icon-wodechanpin",
        "value": "051"
      },
      {
        "key": "productConfig",
        "name": "推荐产品配置",
        "icon": "icon-wodechanpin",
        "value": "052"
      },
      {
        "key": "showConfig",
        "name": "页面显示配置",
        "icon": "icon-wodechanpin",
        "value": "053"
      },
      {
        "key": "footerConfig",
        "name": "页脚管理",
        "icon": "icon-wodechanpin",
				"value": "054",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0541'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0542'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0543'
					}
				]
      },
      {
        "key": "articalList",
        "name": "文章列表",
        "icon": "icon-wodechanpin",
				"value": "055",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0551'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0552'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0553'
					}
				]
			},
			{
        "key": "searchConfig",
        "name": "搜索功能入口配置",
        "icon": "icon-wodechanpin",
				"value": "056",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0561'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0562'
					}
				]
	  },
	  {
		"key": "assetsMgmt",
		"name": "留资管理",
		"icon": "icon-shanghushouye",
		"value": "057",
		"child": [
			{
				"key": 'export',
				"name": '导出',
				"type": 'button',
				"value": '0571'
			},
		]
		},
			{
				"key": "centerSet",
				"name": "个人中心跳转配置",
				"icon": "icon-wodechanpin",
				"value": "058",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0581'
					},
				]
			},
			{
				"key": "pageSet",
				"name": "页面跳转配置",
				"icon": "icon-wodechanpin",
				"value": "059",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0591'
					},
				]
			},
			{
				"key": "downSet",
				"name": "下载资料配置",
				"icon": "icon-wodechanpin",
				"value": "05A",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '05A1'
					},
				]
			},
			{
				"key": "loginSet",
				"name": "登录页背景图设置",
				"icon": "icon-wodechanpin",
				"value": "05B"
			},
    ]
  },
  {
    "key": "systemMgmt",
    "name": "系统管理",
    "icon": "icon-shanghushouye",
    "value": "06",
    "child": [
      {
        "key": "basicSetting",
        "name": "基本设置",
        "icon": "icon-wodechanpin",
				"value": "061",
				"child": [
					{
						"key": 'site',
						"name": '站点信息保存',
						"type": 'button',
						"value": '0611'
					},
					{
						"key": 'safe',
						"name": '安全设置保存',
						"type": 'button',
						"value": '0612'
					},
					{
						"key": 'order',
						"name": '订单设置保存',
						"type": 'button',
						"value": '0613'
					},
					{
						"key": 'product',
						"name": '产品设置保存',
						"type": 'button',
						"value": '0614'
					}
				]
	  },
      {
        "key": "graySetting",
        "name": "灰度发布设置",
        "icon": "icon-wodechanpin",
        "value": "068"
      },
      {
        "key": "accountList",
        "name": "账号列表",
        "icon": "icon-wodechanpin",
				"value": "062",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0621'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0622'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0623'
					}
				]
      },
      {
        "key": "areaList",
        "name": "大区管理",
        "icon": "icon-wodechanpin",
				"value": "063",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0631'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0632'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0633'
					}
				]
      },
      {
        "key": "organization",
        "name": "组织管理",
        "icon": "icon-wodechanpin",
				"value": "064",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0641'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0642'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0643'
					}
				]
      },
      {
        "key": "roleList",
        "name": "角色列表",
        "icon": "icon-wodechanpin",
				"value": "065",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0651'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0652'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0653'
					}
				]
      },
      {
        "key": "msgTemplateList",
        "name": "消息模板列表",
        "icon": "icon-wodechanpin",
				"value": "066",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '0661'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '0662'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '0663'
					}
				]
      },
      {
        "key": "mailDep",
        "name": "邮件消息配置",
        "icon": "icon-wodechanpin",
        "value": "067"
      },
      {
        "key": "instationMail",
        "name": "站内信发送",
        "icon": "icon-wodechanpin",
        "value": "068"
      },
      {
        "key": "userMsgList",
        "name": "用户留言",
        "icon": "icon-wodechanpin",
        "value": "069"
      },
      {
        "key": "evaluationList",
        "name": "订单评价",
        "icon": "icon-wodechanpin",
        "value": "06A"
      },
      {
        "key": "bpSetting",
        "name": "申请BP设置",
        "icon": "icon-wodechanpin",
				"value": "06C",
				"child": [
					{
						"key": 'add',
						"name": '新增银行卡类别',
						"type": 'button',
						"value": '06C1'
					},
					{
						"key": 'save',
						"name": '结算单信息保存',
						"type": 'button',
						"value": '06C2'
					}
				]
      },
      {
        "key": "provisionList",
        "name": "条款管理",
        "icon": "icon-wodechanpin",
				"value": "06D",
				"child": [
					{
						"key": 'add',
						"name": '新增',
						"type": 'button',
						"value": '06D1'
					},
					{
						"key": 'audit',
						"name": '审批',
						"type": 'button',
						"value": '06D2'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '06D3'
					},
					{
						"key": 'copy',
						"name": '复制',
						"type": 'button',
						"value": '06D4'
					}
				]
      },
      {
        "key": 'IDBlackList',
        "name": '身份证黑名单',
        "icon": 'icon-wodechanpin',
        "value": '06E',
			},
			{
        "key": 'appConfig',
        "name": 'app版本配置',
        "icon": 'icon-wodechanpin',
        "value": '06F',
			},
			{
        "key": 'pageConfig',
        "name": '页面入口显示配置',
        "icon": 'icon-wodechanpin',
        "value": '06G',
	  },
	  {
        "key": "address",
        "name": "地址管理",
        "icon": "icon-wodechanpin",
        "value": "069"
			},
			{
        "key": 'freightPlan',
        "name": '运费计划',
        "icon": 'icon-wodechanpin',
        "value": '06H',
      },
      {
        "key": 'mediaCenter',
        "name": '媒体中心权限管理',
        "icon": 'icon-wodechanpin',
        "value": '06I',
			},
			{
        "key": 'appAdPageMg',
        "name": 'APP广告页管理',
        "icon": 'icon-wodechanpin',
        "value": '06J',
			},
      {
        "key": 'structureList',
        "name": '组织架构管理',
        "icon": 'icon-wodechanpin',
        "value": '06K',
      },
    ]
  },
  {
    "key": "userMgmt",
    "name": "用户管理",
    "icon": "icon-shanghushouye",
    "value": "07",
    "child": [
      {
        "key": "userList",
        "name": "用户列表",
        "icon": "icon-wodechanpin",
				"value": "071",
				"child": [
					{
						"key": 'add',
						"name": '开通合作伙伴',
						"type": 'button',
						"value": '0711'
					},
					{
						"key": 'delete',
						"name": '解除合作伙伴',
						"type": 'button',
						"value": '0712'
					},
					{
						"key": 'phone',
						"name": '解除手机号',
						"type": 'button',
						"value": '0713'
					},
					{
						"key": 'ageloc',
						"name": 'ageloc me撤销导入',
						"type": 'button',
						"value": '0714'
					},
					{
						"key": 'point',
						"name": '积分跟踪',
						"type": 'button',
						"value": '0715'
					},
					{
						"key": 'history',
						"name": '用户历史订单',
						"type": 'button',
						"value": '0716'
					},
					{
						"key": 'coupon',
						"name": '用户券使用情况',
						"type": 'button',
						"value": '0717'
					},
					{
						"key": 'activity',
						"name": '用户参与活动情况',
						"type": 'button',
						"value": '0718'
					},
					{
						"key": 'provision',
						"name": '用户同意条款内容',
						"type": 'button',
						"value": '0719'
					},
					{
						"key": 'unbind',
						"name": '机器码解除绑定',
						"type": 'button',
						"value": '0720'
					},
					{
						"key": 'lock',
						"name": '锁定用户',
						"type": 'button',
						"value": '0721'
					},
					{
						"key": 'import',
						"name": 'ageloc me导入',
						"type": 'button',
						"value": '0722'
					},
					{
						"key": 'record',
						"name": '绑定&解绑机器码记录',
						"type": 'button',
						"value": '0723'
					},
					{
						"key": 'invalid',
						"name": '优惠券作废',
						"type": 'button',
						"value": '0724'
					},
					{
						"key": 'agelocSkin',
						"name": 'ageloc me测肤记录',
						"type": 'button',
						"value": '0725'
					}
				]
			},
		{
			"key": "skinTestReport",
			"name": "用户肌肤测评报表",
			"icon": "icon-wodechanpin",
			"value": "072",
			"child": []
		},
		{
        "key": "infoList",
        "name": "绑定&解绑信息列表",
        "icon": "icon-wodechanpin",
		"value": "073",
		"child": []
		},
		{
			"key": "teamNameList",
			"name": "团队系统名列表",
			"icon": "icon-wodechanpin",
			"value": "074",
			"child": []
		},
		{
			"key": "upperManagerList",
			"name": "上手经理SM列表",
			"icon": "icon-wodechanpin",
			"value": "075",
			"child": []
		},
		{
			"key": "leaderManagerList",
			"name": "领导高级业务经理列表",
			"icon": "icon-wodechanpin",
			"value": "076",
			"child": []
		},
		{
			"key": "noSponsorList",
			"name": "no sponsor名单列表",
			"icon": "icon-wodechanpin",
			"value": "077",
			"child": []
		},
		{
			"key": "epEPMEPDList",
			"name": "EP/EPM/EPD名单列表",
			"icon": "icon-wodechanpin",
			"value": "078",
			"child": []
		},
		{
			"key": "applyList",
			"name": "变更参考人",
			"icon": "icon-wodechanpin",
			"value": "079",
			"child": [
				{
					"key": 'applyDetail',
					"name": '查看',
					"type": 'button',
					"value": '0791'
				},
				{
					"key": 'applyEdit',
					"name": '编辑',
					"type": 'button',
					"value": '0792'
				},
				{
					"key": 'applyCancel',
					"name": '取消',
					"type": 'button',
					"value": '0793'
				},
				{
					"key": 'addApply',
					"name": '发起申请',
					"type": 'button',
					"value": '0794'
				},
				{
					"key": 'applyExport',
					"name": '报表导出',
					"type": 'button',
					"value": '0795'
				},
				{
					"key": 'applyBatch',
					"name": '批量审批',
					"type": 'button',
					"value": '0796'
				},
				{
					"key": 'editInformation',
					"name": '编辑原始资料扫描件',
					"type": 'button',
					"value": '0797'
				},
				{
					"key": 'changeStatus',
					"name": '修改申请状态',
					"type": 'button',
					"value": '0797'
				},
			]
		},
		{
			"key": "applyConfig",
			"name": "变更参考人配置设置",
			"icon": "icon-wodechanpin",
			"value": "079A",
			"child": []
		},
    ]
  },
  {
    "key": "orderMgmt",
    "name": "订单管理",
    "icon": "icon-shanghushouye",
    "value": "08",
    "child": [
      {
        "key": "orderList",
        "name": "订单列表",
        "icon": "icon-wodechanpin",
				"value": "081",
				"child": [
					{
						"key": 'replace',
						"name": '补单',
						"type": 'button',
						"value": '0811'
					},
					{
						"key": 'return',
						"name": '退款',
						"type": 'button',
						"value": '0812'
					}
				]
      },
      {
        "key": "orderSheetList",
        "name": "发货单列表",
        "icon": "icon-wodechanpin",
        "value": "082"
      },
      {
        "key": "returnedSheetList",
        "name": "退货单列表",
        "icon": "icon-wodechanpin",
        "value": "083"
	  },
	  {
        "key": "refundSheetList",
        "name": "退款单列表",
        "icon": "icon-wodechanpin",
        "value": "084"
      }
    ]
  },
  {
   "key": "marketingMgmt",
   "name": "营销管理",
   "icon": "icon-shanghushouye",
   "value": "09",
   "child": [
     {
       "key": "activityList",
       "name": "促销活动列表",
       "icon": "icon-wodechanpin",
			 "value": "091",
			 "child": [
				{
					"key": 'add',
					"name": '新增',
					"type": 'button',
					"value": '0911'
				},
				{
					"key": 'edit',
					"name": '编辑',
					"type": 'button',
					"value": '0912'
				},
				{
					"key": 'enable',
					"name": '禁用/启用',
					"type": 'button',
					"value": '0913'
				},
				{
					"key": 'audit',
					"name": '审批',
					"type": 'button',
					"value": '0914'
				},
				{
					"key": 'recall',
					"name": '撤销',
					"type": 'button',
					"value": '0915'
				},
				{
					"key": 'copy',
					"name": '复制发布',
					"type": 'button',
					"value": '0916'
				}
			]
     },
     {
       "key": "couponList",
       "name": "优惠券列表",
       "icon": "icon-wodechanpin",
			 "value": "092",
			 "child": [
				{
					"key": 'add',
					"name": '新增',
					"type": 'button',
					"value": '0921'
				},
				{
					"key": 'edit',
					"name": '编辑',
					"type": 'button',
					"value": '0922'
				},
				{
					"key": 'enable',
					"name": '禁用/启用',
					"type": 'button',
					"value": '0923'
				},
				{
					"key": 'delivery',
					"name": '发送给会员',
					"type": 'button',
					"value": '0924'
				},
				{
					"key": 'copy',
					"name": '复制发起',
					"type": 'button',
					"value": '0925'
				},
				{
					"key": 'invalid',
					"name": '作废',
					"type": 'button',
					"value": '0926'
				}
			]
		},
		{
      "key": "luckDrawList",
      "name": "抽奖活动列表",
      "icon": "icon-wodechanpin",
			"value": "093",
			"child": [
				{
					"key": 'add',
					"name": '新增',
					"type": 'button',
					"value": '0931'
				},
				{
					"key": 'edit',
					"name": '编辑',
					"type": 'button',
					"value": '0932'
				},
				{
					"key": 'enable',
					"name": '禁用/启用',
					"type": 'button',
					"value": '0933'
				},
				{
					"key": 'delete',
					"name": '删除',
					"type": 'button',
					"value": '0934'
				},
				{
					"key": 'addOnline',
					"name": '新增线上',
					"type": 'button',
					"value": '0935'
				},
				{
					"key": 'seeResults',
					"name": '查看抽奖结果',
					"type": 'button',
					"value": '0936'
				}
			]
		},
		{
			"key": "autoSendCoupon",
			"name": "自动发券设置",
			"icon": "icon-wodechanpin",
			"value": "094",
			"child": []
   },
   {
    "key": "basicSet",
    "name": "抽奖基本设置",
    "icon": "icon-wodechanpin",
    "value": "095",
   },
   {
    "key": "resultsList",
    "name": "抽奖结果列表",
    "icon": "icon-wodechanpin",
		"value": "096",
		"child": [
			{
				"key": 'export',
				"name": '导出数据',
				"type": 'button',
				"value": '0961'
			}
		]
   },
   {
    "key": "issueCoupons",
    "name": "大批量发券",
    "icon": "icon-wodechanpin",
    "value": "097",
   },
   ]
	},
	{
    "key": "otherMgmt",
    "name": "其它功能",
    "icon": "icon-shanghushouye",
    "value": "0A",
    "child": [
      {
        "key": "scanProductList",
        "name": "扫码购管理",
        "icon": "icon-wodechanpin",
				"value": "0A1",
				"child": [
					{
						"key": 'addProduct',
						"name": '新增',
						"type": 'button',
						"value": '0A11'
					},
					{
						"key": 'deleteProduct',
						"name": '删除',
						"type": 'button',
						"value": '0A12'
					},
					{
						"key": 'addStore',
						"name": '新增门店',
						"type": 'button',
						"value": '0A13'
					},
					{
						"key": 'editStore',
						"name": '编辑门店',
						"type": 'button',
						"value": '0A14'
					},
					{
						"key": 'deleteStore',
						"name": '删除门店',
						"type": 'button',
						"value": '0A15'
					},
					{
						"key": 'save',
						"name": '保存',
						"type": 'button',
						"value": '0A16'
					}
				]
	  },
	  {
		"key": "bindingMachineCodeList",
		"name": "机器码绑定提醒",
		"icon": "icon-wodechanpin",
		"value": "0A2",
		 },
		 {
			"key": "buyAgainPlanList",
			"name": "产品复购提醒计划",
			"icon": "icon-wodechanpin",
			"value": "0A3",
			},
    ]
	},
	{
		"key": "localeManage",
		"name": "现场管理",
		"icon": "icon-shanghushouye",
		"value": "13",
		"child": [
			{
				"key": "signInManage",
        "name": "签到管理",
        "icon": "icon-wodechanpin",
				"value": "131",
				"child": [
					{
						"key": 'distinguish',
						"name": '智能识别',
						"type": 'button',
						"value": '1311'
					},
					{
						"key": 'signIn',
						"name": '签到',
						"type": 'button',
						"value": '1312'
					},
					{
						"key": 'print',
						"name": '打印胸牌',
						"type": 'button',
						"value": '1313'
					},
					{
						"key": 'reset',
						"name": '重置胸牌',
						"type": 'button',
						"value": '1314'
					}
				]
			},
			{
				"key": "signInList",
        "name": "签到记录查询",
        "icon": "icon-wodechanpin",
				"value": "132",
				"child": [
					{
						"key": 'export',
						"name": '导出签到记录',
						"type": 'button',
						"value": '1321'
					}
				]
			},
			{
				"key": "siteClearing",
        "name": "批量清场",
        "icon": "icon-wodechanpin",
				"value": "133",
				"child": [
					{
						"key": 'clear',
						"name": '批量清场',
						"type": 'button',
						"value": '1331'
					}
				]
			},
			{
				"key": "outAndenterList",
        "name": "出入场记录",
        "icon": "icon-wodechanpin",
				"value": "134",
				"child": [
					{
						"key": 'export',
						"name": '导出出入明细',
						"type": 'button',
						"value": '1341'
					}
				]
			},
		],
	},
	{
		"key": "careerMgmt",
		"name": "事业工具",
		"icon": "icon-shanghushouye",
		"value": "10",
		"child": [
			{
				"key": "leaderShipList",
        "name": "训练营",
        "icon": "icon-wodechanpin",
				"value": "101",
				"child": [
					{
						"key": 'upload',
						"name": '会员资料上传',
						"type": 'button',
						"value": '1011'
					},
					{
						"key": 'setInfo',
						"name": '内容信息配置',
						"type": 'button',
						"value": '1012'
					},
					{
						"key": 'add',
						"name": '新增活动',
						"type": 'button',
						"value": '1013'
					},
					{
						"key": 'look',
						"name": '查看',
						"type": 'button',
						"value": '1014'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '1015'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '1016'
					},
					{
						"key": 'exportReport',
						"name": '报表导出',
						"type": 'button',
						"value": '1017'
					},
					{
						"key": 'travelConfig',
						"name": '出行要求配置',
						"type": 'button',
						"value": '1018'
					}
				]
			},
			{
				"key": "shangdeList",
				"name": "商德认证管理",
				"icon": "icon-wodechanpin",
				"value": "102",
				"child": [
					{
						"key": 'shangdeImport',
						"name": '批量上传',
						"type": 'button',
						"value": '1021'
					},
					{
						"key": 'shangdeExport',
						"name": '报表导出',
						"type": 'button',
						"value": '1022'
					},
					{
						"key": 'addShangde',
						"name": '新增商德认证',
						"type": 'button',
						"value": '1023'
					},
					{
						"key": 'editShangde',
						"name": '编辑商德认证',
						"type": 'button',
						"value": '1024'
					},
					{
						"key": 'shangdeDetail',
						"name": '商德认证详情',
						"type": 'button',
						"value": '1025'
					},
					{
						"key": 'shangdeType',
						"name": '商德认证类型',
						"type": 'button',
						"value": '1026',
						"child": [
							{
								"key": 'addShangdeType',
								"name": '新增商德认证类型',
								"type": 'button',
								"value": '10241'
							}
						]
					}
				]
			},
			{
				"key": "searchProduct",
				"name": "产品认证管理",
				"icon": "icon-wodechanpin",
				"value": "103",
				"child": [
					{
						"key": 'recordImportProduct',
						"name": '批量上传',
						"type": 'button',
						"value": '1031'
					},
					{
						"key": 'recordExportProduct',
						"name": '报表导出',
						"type": 'button',
						"value": '1032'
					},
					{
						"key": 'addProductCertified',
						"name": '新增产品认证',
						"type": 'button',
						"value": '1033'
					},
					{
						"key": 'editProductCertified',
						"name": '编辑产品认证',
						"type": 'button',
						"value": '1034'
					},
					{
						"key": 'productCertifiedDetail',
						"name": '产品认证详情',
						"type": 'button',
						"value": '1035'
					}
				]
			},
			{
				"key": "travelRewardList",
				"name": "创星登峰游",
				"icon": "icon-wodechanpin",
				"value": "104",
				"child": [
					{
						"key": 'uploadMemberInfo',
						"name": '会员资料上传',
						"type": 'button',
						"value": '1041'
					},
					{
						"key": 'exportTravelReward',
						"name": '报表导出',
						"type": 'button',
						"value": '1042'
					},
					{
						"key": 'operateTravelReward',
						"name": '新增活动',
						"type": 'button',
						"value": '1043'
					},
					{
						"key": 'setContent',
						"name": '内容信息配置',
						"type": 'button',
						"value": '1044'
					},
					{
						"key": 'operateTravel',
						"name": '内容信息配置',
						"type": 'button',
						"value": '1045'
					},
				]
      },
      {
        "key": "dealerMgmt",
        "name": "经销商管理",
        "icon": "icon-shanghushouye",
        "value": "105",
        "child": [
          {
            "key": "dealer",
            "name": "经销商清单",
            "icon": "icon-wodechanpin",
            "value": "1051",
            "child": [
              {
              "key": "list",
              "name": "经销商清单列表",
              "icon": "icon-wodechanpin",
              "value": "10511",
              "child": [],
              },
              {
              "key": "export",
              "name": "经销商清单导出",
              "icon": "icon-wodechanpin",
              "value": "10512",
              "child": [],
              },
            ]
          },
          {
            "key": "dealerVisited",
            "name": "经销商走访记录",
            "icon": "icon-wodechanpin",
            "value": "1052",
            "child": [
              {
              "key": "list",
              "name": "经销商走访记录列表",
              "icon": "icon-wodechanpin",
              "value": "10521",
              "child": [],
              },
              {
              "key": "add",
              "name": "经销商走访记录新增",
              "icon": "icon-wodechanpin",
              "value": "10522",
              "child": [],
              },
              {
              "key": "edit",
              "name": "经销商走访记录编辑",
              "icon": "icon-wodechanpin",
              "value": "10523",
              "child": [],
              },
              {
              "key": "detail",
              "name": "经销商走访记录详情",
              "icon": "icon-wodechanpin",
              "value": "10524",
              "child": [],
              },
              {
                "key": "export",
                "name": "经销商走访记录导出",
                "icon": "icon-wodechanpin",
                "value": "10525",
                "child": [],
              },
            ]
          },
        ],
			},
			{
				"key": "seeRecord",
				"name": "管理员查看记录",
				"icon": "icon-wodechanpin",
				"value": "106",
			},
			{
				"key": "dealerVisitSet",
				"name": "经销商走访相关配置",
				"icon": "icon-wodechanpin",
				"value": "107",
				"child": [
					{
						"key": 'set',
						"name": '绑定角色设置',
						"type": 'button',
						"value": '1071'
					},
					{
						"key": 'add',
						"name": '新增账号',
						"type": 'button',
						"value": '1072'
					},
				]
			},
		]
	},
	{
		"key": "reportMgmt",
    	"name": "数据中台报表",
    	"icon": "icon-shanghushouye",
		"value": "11",
		"child": [
			{
				"key": "saleSpecialMKT",
        		"name": "销售专题（MKT）",
      		    "icon": "icon-wodechanpin",
				"value": "110",
				"child": []
			},
			{
				"key": "saleSpecialEP",
        		"name": "销售专题（EP）",
      		    "icon": "icon-wodechanpin",
				"value": "111",
				"child": []
			},
			{
				"key": "shareSpecial",
        		"name": "分享专题",
      		    "icon": "icon-wodechanpin",
				"value": "112",
				"child": []
			}
		]
	},
	{
		"key": "newsMgmt",
    "name": "消息管理",
    "icon": "icon-shanghushouye",
		"value": "11",
		"child": [
			{
				"key": "newsTypeList",
        "name": "消息类型列表",
        "icon": "icon-wodechanpin",
				"value": "111",
				"child": [
					{
						"key": 'add',
						"name": '新增消息类型',
						"type": 'button',
						"value": '1111'
					},
				]
			},
			{
				"key": "newsTemplateList",
        "name": "消息模版列表",
        "icon": "icon-wodechanpin",
				"value": "112",
				"child": [
					{
						"key": 'add',
						"name": '新增消息模版',
						"type": 'button',
						"value": '1121'
					},
				]
			},
			{
				"key": "newsList",
        "name": "自定义消息管理",
        "icon": "icon-wodechanpin",
				"value": "113",
				"child": [
					{
						"key": 'add',
						"name": '新增消息',
						"type": 'button',
						"value": '1131'
					},
				]
			},
		]
	},
  {
    "key": "nUContractMgmt",
    "name": "NU合同",
    "icon": "icon-shanghushouye",
    "value": "15",
    "child": [
      {
        "key": "signContractList",
        "name": "签署合同管理",
        "icon": "icon-wodechanpin",
        "value": "151",
        "child": [
          {
            "key": 'signContractDetail',
            "name": '签署合同管理',
            "type": 'button',
            "value": '1511'
          },
        ]
      },
      {
        "key": "peopleReview",
        "name": "人工验证",
        "icon": "icon-wodechanpin",
        "value": "152",
        "child": [
          {
            "key": 'review',
            "name": '人工验证',
            "type": 'button',
            "value": '1521'
          },
        ]
      },
      {
        "key": "permissionIndex",
        "name": "资料审核",
        "icon": "icon-wodechanpin",
        "value": "153",
        "child": [
          {
            "key": 'dsNFTReview',
            "name": 'DS/NFT资料审核',
            "type": 'button',
            "value": '1531'
          },
          {
            "key": 'imReview',
            "name": '经销商资料审核',
            "type": 'button',
            "value": '1532'
          },
          {
            "key": 'personalDataReview',
            "name": '个人资料审核',
            "type": 'button',
            "value": '1533'
          },
        ]
      },
      {
        "key": "accountInfoList",
        "name": "户口信息管理",
        "icon": "icon-wodechanpin",
        "value": "153",
        "child": []
      },
      {
        "key": "experienceShopList",
        "name": "体验点设置",
        "icon": "icon-wodechanpin",
        "value": "154",
        "child": [
          {
            "key": 'addExperienceShop',
            "name": '新增体验点',
            "type": 'button',
            "value": '1541'
          },
        ]
      },
      {
        "key": "companyList",
        "name": "公章设置",
        "icon": "icon-wodechanpin",
        "value": "155",
        "child": [
          {
            "key": 'addExperienceShop',
            "name": '新增公章',
            "type": 'button',
            "value": '1551'
          },
        ]
      },
      {
        "key": "fileTemplateList",
        "name": "文章/模板管理",
        "icon": "icon-wodechanpin",
        "value": "156",
        "child": [
          {
            "key": 'operateFileTemplate',
            "name": '新增文章/模板管理',
            "type": 'button',
            "value": '1561'
          },
        ]
      },
      // {
      // 	"key": "electronicSignList",
      //   "name": "电子签章管理",
      //   "icon": "icon-wodechanpin",
      // 	"value": "158",
      // 	"child": [
      // 		{
      // 			"key": 'operateElectronicSign',
      // 			"name": '新增公章',
      // 			"type": 'button',
      // 			"value": '1581'
      // 		},
      // 	]
      // },
      // {
      // 	"key": "limitNameList",
      //   "name": "限制名单设置",
      //   "icon": "icon-wodechanpin",
      // 	"value": "159",
      // 	"child": [
      // 		{
      // 			"key": 'downloadTemplate',
      // 			"name": '下载模板',
      // 			"type": 'button',
      // 			"value": '1591'
      // 		},
      // 		{
      // 			"key": 'importLimit',
      // 			"name": '批量导入名单',
      // 			"type": 'button',
      // 			"value": '1592'
      // 		},
      // 		{
      // 			"key": 'operateLimitName',
      // 			"name": '新增限制人员',
      // 			"type": 'button',
      // 			"value": '1593'
      // 		},
      // 	]
      // },
      {
        "key": "signDataList",
        "name": "签约资料配置",
        "icon": "icon-wodechanpin",
        "value": "15A",
        "child": [
          {
            "key": 'operateSignData',
            "name": '新增资料',
            "type": 'button',
            "value": '15A1'
          },
        ]
      },
      {
        "key": "changeSignList",
        "name": "改签白名单",
        "icon": "icon-wodechanpin",
        "value": "157",
        "child": [
          {
            "key": 'viewChange',
            "name": '查看改签类型说明',
            "type": 'button',
            "value": '1571'
          },
          {
            "key": 'changeSignWhiteDetail',
            "name": '查看导入记录',
            "type": 'button',
            "value": '1572'
          },
          {
            "key": 'addChangeSignWhite',
            "name": '设置白名单有效期',
            "type": 'button',
            "value": '1573'
          },
          {
            "key": 'changeSignWhiteDetail',
            "name": '下载导入模板',
            "type": 'button',
            "value": '1574'
          },
          {
            "key": 'addChangeSignWhite',
            "name": 'Excel表导入',
            "type": 'button',
            "value": '1575'
          },
          {
            "key": 'changeSignWhiteDetail',
            "name": '单个新增',
            "type": 'button',
            "value": '1576'
          },
          {
            "key": 'changeSignWhiteDetail',
            "name": '批量删除',
            "type": 'button',
            "value": '1577'
          },
        ]
      },
      {
        "key": "emailList",
        "name": "邮件组设置",
        "icon": "icon-wodechanpin",
        "value": "15B",
        "child": [
          {
            "key": 'operateEmail',
            "name": '新增',
            "type": 'button',
            "value": '15B1'
          },
        ]
      },
      {
        "key": "signParamsIndex",
        "name": "签署参数设置",
        "icon": "icon-wodechanpin",
        "value": "15C",
        "child": [
          {
            "key": 'limitNameList',
            "name": '限制名单设置',
            "type": 'button',
            "value": '15C1'
          },
          {
            "key": 'modifyBankTime',
            "name": '修改银行卡限时设置',
            "type": 'button',
            "value": '15C2'
          },
          {
            "key": 'retireAge',
            "name": '退休年龄设置',
            "type": 'button',
            "value": '15C3'
          },
          {
            "key": 'limitContractTime',
            "name": '限制签合同时间',
            "type": 'button',
            "value": '15C4'
          },
          {
            "key": 'xinjiangSet',
            "name": '新疆籍设置',
            "type": 'button',
            "value": '15C5'
          },
          {
            "key": 'changeSignReason',
            "name": '改签原因设置',
            "type": 'button',
            "value": '15C6'
          },
          {
            "key": 'cbmOnline',
            "name": 'CBM上线配置',
            "type": 'button',
            "value": '15C7'
          },
        ]
      },
      {
        "key": "recordLogIndex",
        "name": "记录保存",
        "icon": "icon-wodechanpin",
        "value": "15D",
        "child": [
          {
            "key": 'dataModifyLog',
            "name": '资料修改记录',
            "type": 'button',
            "value": '15D1'
          },
          {
            "key": 'smsLog',
            "name": '短信发送日志',
            "type": 'button',
            "value": '15D2'
          },
          {
            "key": 'electronicUsrlog',
            "name": '电子签章使用记录',
            "type": 'button',
            "value": '15D3'
          },
          {
            "key": 'cloudLog',
            "name": '云调用记录',
            "type": 'button',
            "value": '15D4'
          },
          {
            "key": 'emailLog',
            "name": '邮件发送记录',
            "type": 'button',
            "value": '15D5'
		  },
		  {
            "key": 'accessRecord',
            "name": '管理员访问记录',
            "type": 'button',
            "value": '15D6'
		  },
        ]
      },
    ]
  },
  {
    "key": "makeAptToConfigure",
    "name": "预约配置",
    "icon": "icon-shanghushouye",
    "value": "12",
    "child": [
      {
        "key": "eventType",
        "name": "事件类型管理",
        "icon": "icon-wodechanpin",
				"value": "121",
				"child": [
					{
						"key": 'add',
						"name": '新建',
						"type": 'button',
						"value": '1211'
					},
					{
						"key": 'edit',
						"name": '编辑',
						"type": 'button',
						"value": '1212'
					},
					{
						"key": 'delete',
						"name": '删除',
						"type": 'button',
						"value": '1213'
					},
				]
      },
      // {
      //   "key": "eventTemplate",
      //   "name": "事件模板管理",
      //   "icon": "icon-wodechanpin",
      //   "value": "122"
      // }
    ]
  },
  {
    "key": "appointEventManage",
    "name": "预约事件管理",
    "icon": "icon-shanghushouye",
    "value": "14",
    "child": [
      {
        "key": "eventManagentList",
        "name": "事件管理",
        "icon": "icon-wodechanpin",
        "value": "141",
        "child": [
          {
            "key": 'addAppointEvent',
            "name": '新建预约事件',
            "type": 'button',
            "value": '1411'
					},
					{
            "key": 'addSchedule',
            "name": '新建日程',
            "type": 'button',
            "value": '1412'
          },
					{
            "key": 'seeSchedule',
            "name": '查看日程',
            "type": 'button',
            "value": '1413'
          },
					{
            "key": 'copyTemplate',
            "name": '复制为模板',
            "type": 'button',
            "value": '1414'
          },
					{
            "key": 'edit',
            "name": '编辑',
            "type": 'button',
            "value": '1415'
          },
					{
            "key": 'records',
            "name": '操作记录',
            "type": 'button',
            "value": '1416'
          },
					{
            "key": 'delete',
            "name": '删除',
            "type": 'button',
            "value": '1417'
          }
        ]
      },
      {
        "key": "scheduleList",
        "name": "日程管理",
        "icon": "icon-wodechanpin",
        "value": "142",
        "child": [
          {
            "key": 'addSchedule',
            "name": '新建日程',
            "type": 'button',
            "value": '1421'
					},
					{
            "key": 'underCarriage',
            "name": '紧急下架',
            "type": 'button',
            "value": '1422'
					},
					{
            "key": 'manageScene',
            "name": '管理场次',
            "type": 'button',
						"value": '1423'
					},
					{
            "key": 'scheduleDetail',
            "name": '日程详情',
            "type": 'button',
            "value": '1424'
					},
					{
            "key": 'records',
            "name": '操作记录',
            "type": 'button',
            "value": '1425'
					},
					{
            "key": 'qualifications',
            "name": '报名资格管理',
            "type": 'button',
            "value": '1426'
					},
					{
            "key": 'configure',
            "name": '配置',
            "type": 'button',
            "value": '1427'
					}
        ]
      },
      {
        "key": "reviewList",
        "name": "预约审核",
        "icon": "icon-wodechanpin",
        "value": "143",
        "child": [
					{
            "key": 'batchPass',
            "name": '批量审核通过',
            "type": 'button',
            "value": '1431'
					},
					{
            "key": 'exportResults',
            "name": '导出结果',
            "type": 'button',
            "value": '1432'
					},
					{
            "key": 'audit',
            "name": '审核通过',
            "type": 'button',
            "value": '1433'
					},
					{
            "key": 'waitAudit',
            "name": '待审核',
            "type": 'button',
            "value": '1434'
					},
					{
            "key": 'waitPerfect',
            "name": '待完善',
            "type": 'button',
            "value": '1435'
					},
					{
            "key": 'reject',
            "name": '驳回',
            "type": 'button',
            "value": '1436'
					},
					{
            "key": 'cancel',
            "name": '取消预约单',
            "type": 'button',
            "value": '1437'
					},
					{
            "key": 'edit',
            "name": '编辑',
            "type": 'button',
            "value": '1438'
					},
					{
            "key": 'detail',
            "name": '预约详情',
            "type": 'button',
            "value": '1439'
					}
        ]
      },
    ]
  },
  {
    "key": "scanProductList",
    "name": "扫码购管理",
    "icon": "icon-shanghushouye",
    "value": "17",
    "child": [
      {
        "key": "baseSet",
        "name": "基本设置",
        "icon": "icon-wodechanpin",
        "value": "171",
        "child": []
      },
      {
        "key": "storeSet",
        "name": "门店设置",
        "icon": "icon-wodechanpin",
        "value": "172",
        "child": [{
					"key": "productConfig",
					"name": "配置售卖商品",
					"value": "1721",
					"child": []
				}]
      },
      {
        "key": "oldMemberList",
        "name": "老顾客产品列表",
        "icon": "icon-wodechanpin",
        "value": "173",
        "child": [
        ]
      },
      {
        "key": "pickList",
        "name": "拣货清单",
        "icon": "icon-wodechanpin",
        "value": "174",
        "child": [
				]
			},
		]
  },
  {
    "key": "toolsApplication",
    "name": "TR90",
    "icon": "icon-wodechanpin",
    "value": "18",
    "child": [
      {
        "key": "baseConfig",
        "name": "基础配置",
        "icon": "icon-wodechanpin",
        "value": "1801",
        "child": []
      },
      {
        "key": "measureData",
        "name": "测量数据管理",
        "icon": "icon-wodechanpin",
        "value": "1802",
        "child": []
      },
		]
	},
]

module.exports = menuList
