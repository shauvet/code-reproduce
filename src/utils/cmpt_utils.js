// 对象和JSON字符串互转
import { parse } from 'qs'
import { isEmpty, merge } from 'lodash'

import request from './request'
import { metaUrl } from '../config/config'

// 获得下拉框、单选框、复选框等列表选项
const getBoxList = function(module, fieldName, cmptType){
  let cmptId = module.cmptIdKeyMap[fieldName]
  if(!!module.cmpt_biz_datas[cmptType][cmptId]){
    return module.cmpt_biz_datas[cmptType][cmptId]
  }
  return []
}

// 初始化组件配置、内容列表 bizData 构件配置或者构件数据内容
const initCmpt = function(cmptIdKeyMap, bizType, isBizData){
  let tmpObj = {}
  tmpObj[bizType] = {}

  Object.keys(cmptIdKeyMap).map((k, i) => {
    if(!isBizData){
      tmpObj[bizType][cmptIdKeyMap[k]] = {}
    }else{
      tmpObj[bizType][cmptIdKeyMap[k]] = []
    }
  })
  return tmpObj
}

// 获取组件内容
const getCmptDatas = function(cmptIds, bizType = 'edit_items'){
  // 临时对象
  let tmp_cmpt_biz_data = {}

  // 先查询页面的构件
  return request({
    url: `${metaUrl}/cmpt_query`,
    method: 'GET',
    data: parse({query: { _id: cmptIds}})
  }).then((cmptsResult) => {

    // 不带有cmpt_items的构件
    let api_url_items = {}

    // 遍历组件
    cmptsResult.data.list.map((cmpt, i) => {
      // 构件ID
      let k = cmpt._id
      // 无api_url，有cmpt_items的构件
      if(!cmpt.api_url && !!cmpt.cmpt_items && cmpt.cmpt_items.length > 0){
        tmp_cmpt_biz_data[k] = cmpt.cmpt_items

      // 有api_url，无cmpt_items的构件
      }else{
        api_url_items[k] = cmpt
      }
    })
    return api_url_items
  }).then((api_url_items) => {
    return getCmptBizDatasList(api_url_items)
  }).then((curr_cmpt_biz_data) => {
    // 新的业务数据对象
    let new_cmpt_biz_data = merge(tmp_cmpt_biz_data, curr_cmpt_biz_data)
    // 构造结构
    let resObj = {}
    // 赋值
    resObj[bizType] = new_cmpt_biz_data
    // 返回结果
    return resObj
  }).catch((err) => {
    return err
  })
}

// 通过接口配置项查询多个构件内容
const getCmptBizDatasList = function(api_url_items){
  // 填充业务数据对象
  let tmp_cmpt_biz_data = {}
  // 空值判断
  if(isEmpty(api_url_items)){
    return Promise.resolve({})
  }

  // 函数列表
  let funcs = []
  // 遍历所有带有api_url的构件
  Object.keys(api_url_items).map((k, i) => {
    // 单个构件的参数
    let v = api_url_items[k]

    let tmp_api_url = `${metaUrl}${v.api_url}`
    // 构件Promise对象
    let p = getCmptBizDataByParams(tmp_api_url, v.api_params).then((res) => {
      let o = {}

      let label_field_name = 'label'
      // if(!!v['' + v.cmpt_type] && !!v['' + v.cmpt_type].label_field_name){
      //   label_field_name = v['' + v.cmpt_type].label_field_name
      // }

      if(!!v.label_field_name){
        label_field_name = v.label_field_name
      }


      let value_field_name = 'value'
      // if(!!v['' + v.cmpt_type] && !!v['' + v.cmpt_type].value_field_name){
      //   value_field_name = v['' + v.cmpt_type].value_field_name
      // }
      if(!!v.value_field_name){
        value_field_name = v.value_field_name
      }

      o[k] =  setBoxValue(res.data.data || res.data.list, label_field_name, value_field_name)
      return o
    })
    // 存入Promise对象
    funcs.push(p)
  })
  // 并发请求
  return Promise.all(funcs)
  .then((res) => {
    if(0 !== res.length){
      res.map((o, i) => {
        Object.keys(o).map((k, j) => {
          let v = o[k]
          tmp_cmpt_biz_data[k] = v
        })
      })
    }
    return tmp_cmpt_biz_data
  })
  .catch((err) => {
    return err
  })
}

 // 设置下拉框、单选框、复选框返回值
const setBoxValue = function(apiData, label_field_name, value_field_name){
  let cv = []
  if(!!apiData){
    apiData.map((a, i) => {
      let o = {}
      o['label'] = a[label_field_name]
      o['value'] = a[value_field_name]
      cv.push(o)
    })
  }
  return cv
}

// 通过参数查询单个构件业务内容
const getCmptBizDataByParams = function(api_url, api_params){
  // 先查询页面的构件
  return request({
    url: api_url,
    method: 'GET',
    data: api_params
  }).then((res) => {
    return res
  }).catch((err) => {
    return err
  })
}

// 获取页面构件ID数组
const getCmptIds = function(cmptIdKeyMap){
  let cmptArr = []
  Object.keys(cmptIdKeyMap).map((k, i) => {
    cmptArr.push(cmptIdKeyMap[k])
  })
  return cmptArr
}

/* 获取页签标题
* moduleName 业务模块名 member, product, items等
* actionType 业务操作名 add, edit, detail等
*/
const getTabTitle = function(moduleName, actionType){
  // 标题字典
  let titleDict = {
    'add': `${moduleName}新增`,
    'edit': `${moduleName}编辑`,
    'detail': `${moduleName}详情`
  }
  return titleDict[actionType]
}

export default { getBoxList, getCmptDatas, initCmpt, getCmptIds, getTabTitle}