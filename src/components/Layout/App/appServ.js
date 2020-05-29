/*
 * @Date: 2020-01-03 16:43:01
 * @LastEditors  : zhishui
 * @LastEditTime : 2020-01-06 14:03:53
 */
import { request, config } from '../../../utils'
const { requestApiUrl } = config
// 查询图形验证码
export async function getAreaList(params) {
    return request({
        url: requestApiUrl.getAreaList,
        method: 'GET',
        data: params
   });
}