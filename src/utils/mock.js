const Mock = require('mockjs')
const users = require('../../mock/users')
const app = require('../../mock/app')
const dashboard = require('../../mock/dashboard')
const customCategory = require('../../mock/customCategory')
const queryMainData = require('../../mock/queryMainData')
const queryExcelState = require('../../mock/queryExcelState')
const excelSave = require('../../mock/excelSave')
const uploadExcelFile = require('../../mock/uploadExcelFile')
const queryTag = require('../../mock/queryTag')
const mainData = require('../../mock/mainData')
const updateTag = require('../../mock/updateTag')
const updateMainData = require('../../mock/updateMainData')
const deleteMainData = require('../../mock/deleteMainData')
const deleteTag = require('../../mock/deleteTag')
const formatSetting = require('../../mock/formatSetting')
const systemSetting = require('../../mock/systemSetting')
const member = require('../../mock/member')
const order = require('../../mock/order')
const commodity = require('../../mock/commodity')
const stockage = require('../../mock/stockage')
const myShop = require('../../mock/myShop')
const productDetail = require('../../mock/productDetail')
const shopAll = require('../../mock/shop')
const mockData = [
  users, app, dashboard, customCategory, queryMainData,
  queryExcelState, excelSave, uploadExcelFile, queryTag, mainData, updateTag, updateMainData,
  deleteMainData, deleteTag, formatSetting, systemSetting, member, order, commodity, stockage, myShop ,productDetail,shopAll
]

function serialize(str) {
  let paramArray = str.split('&')
  let query = {}
  for (let i in paramArray) {
    if (Object.prototype.hasOwnProperty.call(paramArray, i)) {
      query[paramArray[i].split('=')[0]] = paramArray[i].split('=')[1]
    }
  }
  return query
}

for (let i in mockData) {
  if (Object.prototype.hasOwnProperty.call(mockData, i)) {
    for (let key in mockData[i]) {
      if (Object.prototype.hasOwnProperty.call(mockData[i], key)) {
        Mock.mock(eval(`/${key.split(' ')[1].replace(/\//g, '\\/')}/`), key.split(' ')[0].toLowerCase(), (options) => {
          if (key.split(' ')[0].toLowerCase() === 'get') {
            if (options.url.split('?')[1]) {
              options.query = serialize(options.url.split('?')[1])
            } else {
              options.query = options.body ? JSON.parse(options.body) : {}
            }
          }
          let res = {}
          let result = {}
          res.json = function (data) {
            result = data
          }
          mockData[i][key](options, res)
          return result
        })
      }
    }
  }
}

Mock.setup({timeout: '200-600'})
