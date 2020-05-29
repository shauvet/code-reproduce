import React, { PropTypes } from 'react'
import { Button, Row, Form, Input, Popover, Modal, Col } from 'antd'
import { config } from '../../utils'
import styles from './login.less'
import classnames from 'classnames'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 0
  },
  wrapperCol: {
    span: 24
  },
};

const login = ({loginButtonLoading, validateImgUrl, onOk, updateValidateImg, updatePassword, form: { getFieldDecorator, validateFieldsAndScroll}}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }

  //监听Enter键
  document.onkeydown=keyDownSearch;
  function keyDownSearch(e) {
    // 兼容FF和IE和Opera
    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
      // alert('回车');//具体处理函数
      handleOk();
      return false;
    }
    return true;
  }

  function showDlg(){
    updatePassword('忘记密码');
  }

  return (
    <div className={styles.bgColor}>

      <div className={styles.contentStyle}>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logoSrc}/>

          {/*<i className="iconfont">&#xe67d;</i>*/}

          {/*<p>{"欢迎登录茅台电商管理后台"}</p>*/}
          <p>{config.loginTitle}</p>
        </div>
        <div className={styles.form}>

          <Form className="formItemNone" autoComplete="off">
            <FormItem {...formItemLayout}  hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '请填写用户名',
                  },
                ],
              })(<Input size="large"
                        onPressEnter={handleOk}
                        placeholder="用户名"
                        prefix={ <i  className="iconfont">&#xe684;</i>

                        }
              />)}
            </FormItem>
            {/* 用于禁用浏览器自动缓存账号密码 */}
            <input type="password" name="password"  style={{display: 'none'}}/>
            <FormItem  {...formItemLayout}  hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码',
                  },
                ],
              })(<Input size="large"
                        type="password"
                        onPressEnter={handleOk}
                        placeholder="密码"
                        prefix={ <i  className="iconfont">&#xe683;</i>}

              />)}
            </FormItem>
            <div className={styles.validateCode}>
              <FormItem  {...formItemLayout}>
                {getFieldDecorator('validateCode', {
                  rules: [
                    {
                      required: false,//去掉非空校验，用于测试使用，用完改为true
                      message: '请填写验证码',
                    },
                  ],
                })(<Input size="large"
                          placeholder="验证码"
                          className="width175"

                />)}

                <img className={styles.imgStyle} src={validateImgUrl} onClick={updateValidateImg}/>
              </FormItem>
            </div>

            <Row>
              <Button className={styles.buttonStyle} type="primary" size="large" onClick={handleOk} loading={loginButtonLoading}>
                登录
              </Button>
            </Row>
            <div className={classnames('txtright', 'mg2t')}>
              <a href="javascript:;" onClick={ e => {showDlg()}}>忘记密码</a>
            </div>
          </Form>
        </div>
      </div>

    </div>
  )
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func,
}

export default Form.create()(login)
