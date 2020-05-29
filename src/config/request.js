/*
 * @Date: 2020-05-28 18:04:43
 * @LastEditors: guangling
 * @LastEditTime: 2020-05-29 10:33:46
 */ 
/**
 * @(#)request.js 0.5.1 2017-09-13
 * Copyright (c) 2017, YUNXI. All rights reserved.
 * YUNXI PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { request as commonRequest } from '../utils'
import config from './config'

/*
 * 请求
 *
 * @author 苏离
 * @since 0.5.1
 */
//项目统一处理，例如对不同service使用不同host
export function request(option, needHandComErr = true) {
  //旧系统兼容，如果没有传入version就使用v1
  option.version || (option.version = 'v1');
  let url = option.url;
  let apiAppName = ''
  if (url.indexOf("http") >= 0) {
    option.url = url;
  } else {
    option.url = config.baseURL + apiAppName + '/api/' + option.version + "/" + url;
  }
  return commonRequest(option, needHandComErr)
}
