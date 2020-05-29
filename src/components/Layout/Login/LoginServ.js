import { request, config } from '../../../utils'
const { requestApiUrl } = config
import { has, get } from 'lodash'

// 查询图形验证码
export function queryValidateImg(params) {
  return request({
    url: requestApiUrl.getValidateImg,
    method: 'GET',
    data: params
  })
}

// 登录请求
export function reqLogin(params) {
  // needLogin为false则免登陆
  if(has(config, 'needLogin') && 'false' === '' + get(config, 'needLogin', null)){
    let loginRes = {"data":{"auth":"eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJjYTgwY2MyYi0wN2M1LTQxYjUtYTc1NS0zMGUwYzA3YjM1NDQiLCJzdWIiOiJrZXkmX18mbnVza2luJl9fJjYmX18mY2hlbmRhaGFpJl9fJjAmX18mbnVza2luJl9fJnBjJl9fJjAmX18mMSJ9.YVyo_J91EPrAhdBNXaLBehOeA4caJMcU21-F4GuVycZRvcSsXBtWyH5XI7mJEe1ATmTUhSguETu-q6ZgxeNivA"},"resultCode":0,"resultMsg":"success"}
    return Promise.resolve(loginRes)
  }

  return request({
    url: config.loginUrl,
    method: 'post',
    data: params,
  })
}
