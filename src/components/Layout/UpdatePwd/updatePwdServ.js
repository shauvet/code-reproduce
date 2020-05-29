import { request, config } from '../../../utils'
const { requestApiUrl } = config

// 请求短信验证码
export function getPhoneCode (params) {
  return request({
    url: requestApiUrl.phoneCode,
    method: 'GET',
    data: params
  })
}

// 修改密码 - 提交
export function updateLoginPwd (params) {
  return request({
    url: requestApiUrl.updatedPassword,
    method: 'POST',
    data: params
  })
}

// 重置密码
export function forgetLoginPwd (params) {
  return request({
    url: requestApiUrl.forgetPassword,
    method: 'POST',
    data: params
  })
}