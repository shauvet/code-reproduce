// 加载React
import React from 'react'
// 加载Component
import { Component } from 'react'
// Cookie对象
import Cookie from 'js-cookie'
// 路由对象
import { hashHistory } from 'dva/router'

// 引入antd的组件
import {Menu, Icon, Dropdown, Select } from 'antd'
// 站点配置
import config from '../../../config/config'
// 弹出提示框
import { messageInform } from '../../../utils/notification'

// 加载当前组件样式
import styles  from './bannerStyle.less'
// 注销登录
import { delCacheUser, getUserName } from './bannerServ'

// 引入我的消息组件
import MsgList  from '../MsgList/msgListView'
// 引入组织机构组件
import OrgList from '../OrgList/orgListView'
// 引入商户信息组件
import SellerInfo from '../SellerInfo/sellerInfoView'

// 引入修改密码对话框
import UpdatePwd from '../UpdatePwd/updatePwdView'

// 是否已加载成功
let loadedSuccess = false

// 导出组件
export default class extends Component{

  // 构造函数
  constructor(props, context) {
    super(props, context);
    this.state = {
      updatePwdFlag: false,
      userName: Cookie.get(config.cookie.user_name)
    }
  }

  // 已插入DOM
  async componentDidMount(){
    let self = this

    loadedSuccess = true

    // adfs登录回跳后没有用户名则调接口获取用户名
    let tmpAuth = Cookie.get(config.cookie.auth)
    let { userName } = this.state
    // 有auth但无用户名, 则为adfs登录用户, 需调用接口获取用户名
    if (!!tmpAuth && !userName) {
      let result = await getUserName()
      if (result.resultCode + '' === '0') {
        Cookie.set(config.cookie.user_name, result.data.userName, { expires: config.loginTimeout })
        this.setState({ userName: result.data.userName })
        window.location.reload()
      }
    }
  }

  // 比较对话框状态，已确保是否需要重新渲染
  getPwdDlgFlag(nextState){
    if('' + this.state.updatePwdFlag === '' + nextState.updatePwdFlag){
      return false
    }else{
      return true
    }
  }

  // 是否触发render函数
  shouldComponentUpdate(nextProps, nextState) {
    let self = this

    // 若已渲染过，则不重新渲染
    if(loadedSuccess){
      if(self.getPwdDlgFlag(nextState)){
        return true
      }else{
        return false
      }
    }else{
      return true
    }
  }

  // 删除Cookie
  clearCookie(){
    Cookie.remove(config.cookie.user_name)
    Cookie.remove(config.cookie.auth)
  }

  // 执行退出
  async doLogout(){
    let self = this

    // 注销登录
    let { data, resultCode, resultMsg } = await delCacheUser({})

    if('0' !== '' + resultCode){
      messageInform(resultMsg || '注销失败', 'error')
      return false
    }
    // 清除Cookie
    self.clearCookie()
    // 注销成功提示
    messageInform('注销成功', 'success')

    if (!!data.logoutRedirectUrl) {
      window.location.href = data.logoutRedirectUrl
    } else {
      // 跳转到登录页
      hashHistory.push('/login')

      //刷新页面，用于清空状态机，重置页面
      location.reload();
    }
  }

  // 打开密码对话框
  showPwdDlg(e){
    this.setState({
      updatePwdFlag: true
    }, () => {
      console.log('this.state.updatePwdFlag:', this.state.updatePwdFlag)
    })
  }

  // 关闭密码对话框
  hidePwdDlg(e){
    this.setState({
      updatePwdFlag: false
    })
  }

  // 下拉菜单点击事件
  handleClickMenu(e){
    let self = this
    // 点击那一项
    switch('' + e.key){
      case 'logout':
        // 退出登录
        self.doLogout()
        break
      case 'forgetPassword':
        self.showPwdDlg(e)
        break
      default:
        console.log('unknown key')
    }
  }

  // 点击用户登录信息的下拉菜单
  getDropDownMenu(){
    return (
      <Menu onClick={ e => this.handleClickMenu(e) }>
        {/* <Menu.Item key="forgetPassword">
          <a>修改密码</a>
        </Menu.Item> */}
        <Menu.Item key="logout">
          <a>注销</a>
        </Menu.Item>
      </Menu>
    )
  }

  // 渲染用户信息
  renderUserInfo(){

    return (
      <div className={styles.user}>
        <i className="iconfont icon-yonghuming"></i>
        <Dropdown overlay={ this.getDropDownMenu() } trigger={['click']} getPopupContainer={() => document.getElementById('routerApp_headRight')}>
          <a className="ant-dropdown-link" href="#" style={{display: 'inline-block'}}>
            <span style={{minWidth: "40px", display: 'inline-block'}}>
              { this.state.userName }
            </span>
            <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    )
  }

  // 渲染内容
  render(){
    let imgLogo = ''
    return (
      <div>
        {/* 弹出的修改密码对话框 - 默认隐藏 */}
        {
          this.state.updatePwdFlag && <UpdatePwd titleName='修改密码' visible={ this.state.updatePwdFlag } onClose={ e => { this.hidePwdDlg(e) } }/>
        }
        <div className={styles.tophead}>
          {/* 左侧header */}
          <div className={styles.headLeft}>
            <img className={styles.headLogo} src={config.logoSrc} alt=""/>
            <span className={styles.line}>|</span>
            <p className={styles.headTitle}>
              {config.name || ''}
              <SellerInfo/>
            </p>
          </div>

          {/* 右侧header */}
          <div className={styles.headRight} id="routerApp_headRight">

            {/* 组织机构列表*/}
            <OrgList/>

            {/* 用户登录信息 */}
            { this.renderUserInfo() }

            {/* 消息列表 */}
            <MsgList/>
          </div>

        </div>
      </div>
    )
  }
}
