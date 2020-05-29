import { parse } from 'qs'
import {message} from 'antd'
// 日期处理对象
import {isEmpty, cloneDeep} from 'lodash'



const defaultTableData = {

}

// 初始默认状态
const defultState = {

};

export default {
  namespace: 'testModel',
  state: defultState,
  //订阅数据
  subscriptions: {
    setup ({dispatch, history}) {

    },
  },
  //数据逻辑部分
  effects: {

  },
  //更新数据到state
  reducers: {
  }
}

