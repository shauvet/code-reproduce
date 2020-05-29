import { request, config } from '../utils'

const { requestApiUrl } = config
export async function updateLoginPwd (params) {
  return request({
    url: requestApiUrl.updatedPassword,
    method: 'POST',
    data: params,
  })
}
export async function forgetLoginPwd (params) {
  return request({
    url: requestApiUrl.forgetPassword,
    method: 'POST',
    data: params,
  })
}
export async function getPhoneCode (params) {
  return request({
    url: requestApiUrl.phoneCode,
    method: 'GET',
    data: params,
  })
}


export async function delCacheUser (params) {
  return request({
    url: requestApiUrl.delCacheUser,
    method: 'POST',
    data: params,
  })
}
