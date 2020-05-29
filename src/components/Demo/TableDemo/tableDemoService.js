import { requestApiUrl } from '../common/config'
import {request} from '../common/util/request'

export async function queryUser (params) {
  return request({
    url: requestApiUrl.queryUser,
    method: 'get',
    data: params,
  })
}

export async function addUser (params) {
  return request({
    url: requestApiUrl.addUser,
    method: 'post',
    data: params,
    headers:{
      'Content-type': 'application/json;charset=UTF-8'
    },
  })
}

export async function deleteUser (params) {
  return request({
    url: requestApiUrl.deleteUser,
    method: 'delete',
    data: params,
  })
}

export async function updateUser (params) {
  return request({
    url: requestApiUrl.updateUser,
    method: 'put',
    data: params,
    headers:{
      'Content-type': 'application/json;charset=UTF-8'
    },
  })
}


export async function getOrganizationList (params) {
  return request({
    url: requestApiUrl.getOrganizationList,
    method: 'get',
    data: params,
  })
}

//角色列表
export async function getRoleList (params) {
  return request({
    url: requestApiUrl.getRoleList,
    method: 'get',
    data: params,
  })
}

//用户状态更改
export async function changeUserStatus (params) {
  return request({
    url: requestApiUrl.changeUserStatus,
    method: 'put',
    data: params,
    headers:{
      'Content-type': 'application/json;charset=UTF-8'
    },
  })
}

//重置组织管理员密码
export async function resetUserPwd(params) {
  return request({
    url: requestApiUrl.resetUserPwd,
    method: 'put',
    data: params,
    headers:{
      'Content-type': 'application/json;charset=UTF-8'
    },
  })
}





