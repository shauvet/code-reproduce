import axios from 'axios'
import qs from 'qs'
import config from '../config/config'
import {reqInform, showConfirm} from './notification'
import Cookie from 'js-cookie'
import {hashHistory} from 'dva/router'
import {join,get} from 'lodash'
import { messageInform } from '../utils/notification'
import toBase64 from './toBase64'
// 弹窗次数
let confirmCount = 0

const fetch = (options) => {

  const {method = 'post', data, url, auth = Cookie.get(config.cookie.auth)} = options
  // 取出headers
  let {headers} = options;
  headers = headers ? headers : {}
  headers = {
    ...headers,
    'auth': auth,
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': -1
  }
  //判断本地缓存是否有商户信息，有则将商户id添加到请求头里
  if(JSON.parse(localStorage.getItem('selMessgae'))){
    headers.unitId = JSON.parse(localStorage.getItem('selMessgae')).id
  }

  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/x-www-form-urlencoded';
  }
  const hasUrl = function (arr, url) {
    let flag = false
    arr.map((k, i) => {
      if(url.indexOf(k) !== -1){
        flag = true
      }
    })
    return flag
  }
  const exAuthArr = ['restapi.amap.com', config.requestApiUrl.getValidateImg]
  // 请求headers中移除auth
  if (hasUrl(exAuthArr, url)) {
    delete headers['auth'];
  }

  const exAppIdArr = ['verify/img/get', '/huieryun-identity/', 'restapi.amap.com']

  // 请求headers中增加appId
  if(!hasUrl(exAppIdArr, url)){
    headers["appId"] = config.appId;
  }

  //过滤获取经纬度报错问题
  const exAuthArr1 = ['restapi.amap.com'];
  // 请求headers中移除Pragma  Expires
  if (hasUrl(exAuthArr1, url)) {
    delete headers['Pragma'];
    delete headers['Expires'];
    delete headers['unitId'];
  }

  // console.log('headers:', headers);
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${options.data ? `?${qs.stringify(options.data)}` : ''}`, {headers})
    case 'delete':
      return axios.delete(`${url}${options.data ? `?${qs.stringify(options.data)}` : ''}`, {headers})
    case 'head':
      return axios.head(url, data, {headers})
    case 'post':
      let newData = data;
      if ('' + headers['Content-type'] === 'application/x-www-form-urlencoded') {
        newData = qs.stringify(data)
      }
      return axios.post(url, newData, {headers})
    case 'put':
      let putData = data;
      if ('' + headers['Content-type'] === 'application/x-www-form-urlencoded') {
        putData = qs.stringify(data)
      }
      return axios.put(url, putData, {headers})
    case 'patch':
      return axios.patch(url, data, {headers})
    default:
      return axios(options)
  }
}

// 跳转到登录
const go2Login = function(isReload, res){
  confirmCount = 1
  localStorage.removeItem('antdAdminSiderFold')
  sessionStorage.removeItem('SIDER_OPEN_KEY')
  sessionStorage.removeItem('SIDER_SELECTED_KEY')
  Cookie.remove(config.cookie.user_name);
  Cookie.remove(config.cookie.auth);
  //hashHistory.push('/login');

  //如果有adfs第三方登录，则进行此请求
  if (res + '' === '1') {
    hashHistory.push('/login')
  } else if(get(config, 'adfs')){
    fetch({
      url: config.baseURL+""+config.adfs,
      method: 'get',
      data: {backUrl:toBase64(`${window.location.origin}${window.location.pathname}#/home`),errorUrl:toBase64(window.location.origin+"/#/home/loginFailure")},
    }).then((response) => {
      let {data} = response;
      if(data.resultCode == '0'){
        window.location.href = data.data.loginUrl;
      }else{
        messageInform(data.resultMsg, 'error');
      }
    });
  }

  // if(!!isReload){
  //   window.location.reload();
  // }
}

// 检测登录处理, isReload 未登录是否刷新
const checkLogin = function(isReload){
  // 从Cookie中取出auth令牌
  let tmpAuth = Cookie.get(config.cookie.auth)
  // Cookie中无auth令牌，直接跳转到登录页面
  if(!tmpAuth){
    // 跳转登录
    go2Login(isReload)
  }
  return false
}

//needHandComErr： 是否需要request方法做统一全局报错处理
export default function request (options, needHandComErr　) {
  // // 无网络时的提醒
  // if (!navigator.onLine){
  //   showConfirm({
  //     title: '断网提示框',
  //     content: '网络状态不佳，请检查网络之后重试'
  //   }).then((cRes) => {
  //     confirmCount = 0
  //   })
  //   confirmCount ++
  //   return false
  // }

  // console.log('options:', options)
  if(!options || !options.url){
    reqInform({
      title: '无效的url',
      description: '请求选项中的url是无效的'
    }, 'error')
    return Promise.reject({resultCode: 1, resultMsg: '无效的url：' + options.url, data: null})
  }

  if (options.url.indexOf('//') > -1) {
    if (config.crossDomains && config.crossDomains.indexOf(`${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`) > -1) {
      options.isCross = true
      options.url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${qs.stringify(options.data)}'&format=json`
      delete options.data
    }
  } else {
    options.url = config.baseURL + options.url;
  }


  //判断是否存在表情等特殊字符
  if(options.data){
    let emojiData = JSON.stringify(options.data);
    var emojiRegRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
    if (emojiData && emojiData.match(emojiRegRule)) {
      // reqInform({
      //   title: '非法参数',
      //   description: '参数包含了特殊表情符号或其它不可辨识的符号'
      // }, 'error')
      // return  Promise.reject({resultCode: 1, resultMsg: '参数包含了特殊表情符号或其它不可辨识的符号', data: null});
      messageInform('参数包含了特殊表情符号或其它不可辨识的符号', 'error');
      return false;
    }
  }


  return fetch(options).then((response) => {
    const {statusText, status} = response
    let data = options.isCross ? response.data.query.results.json : response.data

    // Cookie中有auth令牌，表示已登录，但是auth失效的，则弹出窗口提示
    if ('' + 401 === '' + response.status || data.resultCode + '' === '401') {
      // 检测是否登录
      checkLogin(false)
      // 若已登录，则检测auth是否失效
      if(confirmCount < 1 ){
        showConfirm().then((cRes) => {
          if('1' === '' + cRes || '2' === '' + cRes){
            go2Login(false, cRes)
          }else{
            confirmCount = 0
          }
        })
        confirmCount ++
      }
      return {resultCode: 0, resultMsg: '登录信息失效提示', data: null}
    }


    if((response.status !== '401' && needHandComErr && (response.data.resultCode !== 0))) {
      reqInform({
        title: '系统提示',
        description: response.data.resultMsg || '接口服务故障'
      }, 'warn')
    }

    return {
      resultCode: 0,
      status,
      resultMsg: statusText,
      ...data,
    }
  }).catch((error) => {
    const {response = {statusText: 'Network Error'}} = error

    // Cookie中有auth令牌，表示已登录，但是auth失效的，则弹出窗口提示 '1' === '' + error.errCode ||
    if ('401' === '' + response.status) {
      // 检测是否登录
      checkLogin(true)

      // 已登录，则检测auth是否失效
      if(confirmCount < 1 ){
        showConfirm().then((cRes) => {
          if('1' === '' + cRes || '2' === '' + cRes){
            go2Login(true, cRes)
          }else{
            confirmCount = 0
          }
        })
        confirmCount ++
      }
      return {resultCode: 0, resultMsg: '登录信息失效提示', data: null}
    }

    reqInform({
      title: '出现请求错误',
      description: response.statusText || '接口服务故障'
    }, 'error')
    // return { code: 1, message: response.statusText }
    return {resultCode: 1, resultMsg: response.statusText, data: null}
  })
}
