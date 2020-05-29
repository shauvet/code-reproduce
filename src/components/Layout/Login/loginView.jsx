// 加载React
import React from 'react'
// 加载Component
import { Component } from 'react'
// 路由对象
import { hashHistory } from 'dva/router'

import { parse } from 'qs'
import cx from 'classnames'
import Cookie from 'js-cookie'

import { Button, Row, Form, Input, Popover, Modal, Col, Spin } from 'antd'

import bodyClass  from '../bodyClass'
import { config} from '../../../utils'
import { rstr2b64 } from '../../../utils/md5'
import { messageInform } from '../../../utils/notification'

import styles from './loginStyle.less'
import { queryValidateImg, reqLogin } from './LoginServ'

import UpdatePwd from '../UpdatePwd/updatePwdView'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 0
  },
  wrapperCol: {
    span: 24
  },
}

// 导出组件
class loginView extends Component {
  // 构造函数
  constructor(props, context) {
    super(props, context)
    this.state = {
      uniqueId: '',
      //登录验证码
      validateImgUrl: '',
      loginButtonLoading: false,
      updatePwdFlag: false,
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
    let self = this
    // 给文档body加样式
    bodyClass()
    // 请求图形验证码
    self.getValidateImg()
    // 监听键盘敲击事件
    self.regKeyDown()
  }

  //组件将被卸载
  componentWillUnmount(){
    //重写组件的setState方法，直接返回空
    this.setState = (state, callback)=>{
      return
    }
    // 注销键盘监听事件
    document.onkeydown = null
  }

  // 登录按钮点击
  handleOk(e) {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      this.doLogin(values)
    })
  }

  // 设置登录按钮的loading
  setButtonLoading(flag){
    let self = this
    return new Promise((resolve, reject) => {
      // 设置按钮加载中
      self.setState({loginButtonLoading: flag}, () => {
        resolve(0)
      })
    })
  }

  // 存储登录结果到Cookie
  saveResToCookie(username, auth){
    // 用户名和令牌auth存入Cookie
    Cookie.set(config.cookie.user_name, username, { expires: config.loginTimeout })
    Cookie.set(config.cookie.auth, auth)
  }

  // 执行登录处理
  async doLogin(payload){
    let self = this

    let { password, validateCode, username } = payload

    let loginText = {
      userCode: username, //用户名
      userPassword: rstr2b64(password), //密码MD5加密
      loginType: 'name',
      trench: 'pc',
      loginSource: '1',
      verifyCode: validateCode,
      uniqueId: self.state.uniqueId,
      //userType: '2'
    }

    // 登录加载中
    await self.setButtonLoading(true)

    try{
      // 登录结果 - 调用登录接口
      let result = await reqLogin(parse({
        ...loginText,
        loginSource: 1
      }))

      if ('0' === '' + result.resultCode){
        // 存储登录结果到Cookie
        self.saveResToCookie(username, result.data.auth)

        // 指定了登录之后跳转
        if(!!config.isRedirect){
          hashHistory.push(config.homePath)
        // 默认跳转到首页
        }else{
          hashHistory.push('/')
        }
      }else{
        messageInform(result.resultMsg || '账户不存在或密码错误', 'error')
        self.getValidateImg()
      }
    }catch(e){
      messageInform(e || '未知的登录异常', 'error')
      self.getValidateImg()
    }
    // 关闭登录加载中
    await self.setButtonLoading(false)
  }

  // 监听Enter键
  keyDownSearch(e){
    let self = this
    // 兼容FF和IE和Opera
    var theEvent = e || window.event
    // 键盘的二进制编码
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode
    // 13 回车键
    if (code == 13) {
      self.handleOk(e)
      return false
    }
    return true
  }

  // 注册键盘监听事件
  regKeyDown(){
    // document.onkeydown = (e) => this.keyDownSearch(e)
    document.onkeydown = this.keyDownSearch.bind(this)
  }

  // 请求验证码
  async getValidateImg(){
    let self = this

    let time = Math.random()
    let result = await queryValidateImg({ time })

    if('0' === '' + result.resultCode){
      self.setState({
        validateImgUrl: ('data:image/jpeg;base64,' + result.data.image),
        uniqueId: result.data.uniqueId
      })
    }
  }

  // 打开密码对话框
  showPwdDlg(e){
    this.setState({
      updatePwdFlag: true
    })
  }

  // 关闭密码对话框
  hidePwdDlg(e){
    this.setState({
      updatePwdFlag: false
    })
  }

  // 初始状态或状态变化会触发render
  render(ReactElement, DOMElement, callback) {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        {
          this.state.updatePwdFlag && <UpdatePwd titleName='重置密码' visible={ this.state.updatePwdFlag } onClose={ e => { this.hidePwdDlg(e) } }/>
        }
        <div className={styles.startsContent}>
          <div className={cx(styles.starts)}></div>
        </div>

        <div className={cx(styles.spin)}>
          <Spin tip="加载用户信息..." spinning={false} size="large">
            <div className={styles.bgColor}>
              <div className={styles.contentStyle}>
                <div className={styles.logo}>
                  <img alt={'logo'} src={config.logoSrc}/>
                  <p>{ config.loginTitle }</p>
                </div>
                <div className={styles.form}>
                  <form className="formItemNone">
                    <FormItem {...formItemLayout}  hasFeedback>
                      {
                        getFieldDecorator('username', {
                          rules: [
                            {
                              required: true,
                              message: '请填写用户名',
                            },
                          ],
                      })(<Input size="large" onPressEnter={ e => this.handleOk(e) } placeholder="用户名" prefix={ <i  className="iconfont">&#xe684;</i>}/>)}
                    </FormItem>
                    <FormItem  {...formItemLayout}  hasFeedback>
                      {
                        getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: '请填写密码',
                            },
                          ],
                      })(<Input size="large" type="password" onPressEnter={ e => this.handleOk(e) } placeholder="密码" prefix={ <i  className="iconfont">&#xe683;</i>}/>)}
                    </FormItem>
                    <div className={styles.validateCode}>
                      <FormItem  {...formItemLayout}>
                        {
                          getFieldDecorator('validateCode', {
                            rules: [
                              {
                                required: true,
                                message: '请填写验证码',
                              },
                            ],
                        })(<Input size="large" placeholder="验证码" className="width175"/>)}
                        <img className={styles.imgStyle} src={ this.state.validateImgUrl } onClick={ e => this.getValidateImg(e) }/>
                      </FormItem>
                    </div>

                    <Row>
                      <Button className={styles.buttonStyle} type="primary" size="large" onClick={ e => this.handleOk(e) } loading={ this.state.loginButtonLoading }>登录</Button>
                    </Row>
                    <div className={cx('txtright', 'mg2t')}>
                      <a href="javascript:;" style={{float: 'left'}} onClick={ e => hashHistory.push('/home/productMgmt/productList')}>NU SKIN ADFS登录</a>
                      {/* <a href="javascript:;" onClick={ e => this.showPwdDlg(e) }>忘记密码</a> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Spin>
        </div>
      </div>

    )
  }
}

export default Form.create()(loginView)
