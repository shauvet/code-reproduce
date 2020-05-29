// 加载React
import React from 'react'
// 加载Component
import { Component } from 'react'

// 引入antd的组件
import { Select } from 'antd'
// 样式管理器
import cx from 'classnames'

// 站点配置
import config from '../../../config/config'

import styles from './orgListStyle.less'
import { getUserOrg } from './orgListServ'

// 弹出提示框
import { messageInform } from '../../../utils/notification'

// 导出组件
export default class extends Component {
  // 构造函数
  constructor(props, context) {
    super(props, context)
    this.state = {
      // 组织机构列表
      userOrgList: [],
      // 当前组织机构
      currentOrg: '',
    }
  }

  //准备：即将被重新渲染，状态未变化
  componentWillMount() {}

  //准备：即将被重新渲染，状态未变化
  componentWillUpdate(nextProps, nextState) {}

  //完成：正在被重新渲染，状态已变化
  componentDidUpdate(prevProps, prevState) {}

  // 已加载组件，收到新属性时调用
  componentWillReceiveProps(nextProps) {}

  // 已插入真实DOM
  componentDidMount() {
    this.getOrgList()
  }

  //组件将被卸载  
  componentWillUnmount(){}

  // 是否触发render函数
  shouldComponentUpdate(nextProps, nextState) {
    let self = this
    // 若不配置组织机构开关，则不渲染
    if(!config.isSwitchOrg){
      return false
    }else{
      return true
    }
  }

  // 获取组织机构列表
  async getOrgList(){
    try{
      if(!config.isSwitchOrg) return false
      // 查询用户组织结构
      let result = await getUserOrg({})

      if ('0' === '' + result.resultCode) {
        this.setState({
          userOrgList: result.data,
          currentOrg: result.data && result.data[0] ? result.data[0].id : ''
        })
      }
    }catch(e){
      messageInform(e || '未知的查询组织异常', 'error')
    }
  }

  // 渲染组织机构列表
  renderOrgList(){
    if(config.isSwitchOrg){
      return (
        <div className={ cx(styles.org, 'mg2r') }>
          <span className={ cx('ant-divider', 'mg1l') }/>
          <Select 
            value={ this.state.currentOrg + '' } 
            style={{width: 120}} 
            getPopupContainer={() => document.getElementById('routerApp_headRight')}
            dropdownMatchSelectWidth={false} 
            dropdownClassName={styles.orgDropdown}
          >
          {
            this.state.userOrgList && this.state.userOrgList.map((d, i) => {
              return <Select.Option key={ d.id + '' } value={ d.id + '' }> { d.name } </Select.Option>
            })
          }
          </Select>
        </div>
      )
    }else{
      return ''
    }
  }

  // 初始状态或状态变化会触发render
  render(ReactElement, DOMElement, callback) {
    return (
      <div> { this.renderOrgList() } </div>
    )
  }
}