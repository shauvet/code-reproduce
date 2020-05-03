/*
 * @Date: 2020-05-03 12:27:53
 * @LastEditors: guangling
 * @LastEditTime: 2020-05-03 12:31:31
 */
import { getAreaList } from '../services'
export default {
  namespace: 'app',
  state: {
    // 当前页签标题 - 兼容旧的代码
    currTabTitle: '',
    menuSuccess: false
  },
  subscriptions: {
    setup({ dispatch }) {
      // 从Cookie中取出auth令牌
      let tmpAuth = false
      // Cookie中无auth令牌  不请求
      if(!tmpAuth) return
      dispatch({
        type: `getAreaList`,
        payload: {}
      })
    },
  },
  effects: {
    // 设置页签标题
    * setTabTitle({ payload }, { call, put, select }) {
      yield put({
        type: 'updateStore',
        payload: {
          currTabTitle: {...payload}
        }
      })
    },
    // 菜单加载完改变标志位
    * getMenuSuccess({ payload }, { call, put, select }) {
      yield put({
        type: 'updateStore',
        payload: {
          menuSuccess: true
        }
      })
    },
    // 加载地址列表
    * getAreaList({ payload }, { call, put, select }){
      let { data, resultCode, resultMsg } = yield call(getAreaList, {});
      if(resultCode == 0) {
        // 地址数据较大，不存store了，存localStorage
        localStorage.setItem('areaList',JSON.stringify(data))
      }
    },
  },
  reducers: {
    updateStore(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
  },
}
