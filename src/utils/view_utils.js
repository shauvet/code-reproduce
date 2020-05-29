/*
 * @Date: 2020-04-09 22:29:12
 * @LastEditors: guangling
 * @LastEditTime: 2020-04-29 21:24:10
 */
// 把model中的状态映射到view中
const mapStateToProps = function(state){
  if(!!window.CURR_TAB_KEY){
    // 状态的key数组
    let keysArr = Object.keys(state)
    // 当前model的namespace
    let currKey = window.CURR_TAB_KEY
    let currModel = window.ROUTES_TO_MODEL[currKey]
    let currNameSpace = currModel.namespace
    // 注入到view的model对象
    let obj = {}
    // 设置固定的两个属性
    obj.model = {
      modelObj: state[currNameSpace],
      namespace: currNameSpace
    }
    // 如果有按钮权限信息 则将其映射到view
    let buttonsObj = JSON.parse(sessionStorage.getItem('buttons'))
    let buttons = []
    if (!!buttonsObj) {
      buttons = buttonsObj[currModel.path]
      if (!!buttons) {
        obj.model.buttons = buttons
      } else {
        obj.model.buttons = []
      }
    }
    // 返回注入的对象
    return obj
  }else{
    return {}
  }
}

// 兼容非列表组件写法的状态映射函数
const mapStateToPropsOld = function (state) {
  if (!!window.CURR_TAB_KEY) {
    let currKey = window.CURR_TAB_KEY
    let currModel = window.ROUTES_TO_MODEL[currKey]
    let obj = {}

    obj[currModel.namespace] = state[currModel.namespace]
    // 如果有按钮权限信息 则将其映射到view
    let buttonsObj = JSON.parse(sessionStorage.getItem('buttons'))
    let buttons = []
    if (!!buttonsObj) {
      buttons = buttonsObj[currModel.path]
      if (!!buttons) {
        obj[currModel.namespace].buttons = buttons
      } else {
        obj[currModel.namespace].buttons = []
      }
    }
    return obj
  } else {
    return {}
  }

}

export default { mapStateToProps, mapStateToPropsOld }

export { mapStateToProps, mapStateToPropsOld }
