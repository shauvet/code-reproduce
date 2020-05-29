import { request, config } from '../utils'
const { requestApiUrl } = config

export async function queryAuth (params) {
  return request({
    url: requestApiUrl.queryAuth,
    method: 'get',
    data: params,
  })
}

export async function queryAuthPath (params) {
  return request({
    url: requestApiUrl.queryAuthPath,
    method: 'get',
    data: params,
  })
}