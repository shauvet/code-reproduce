import React, { PropTypes } from 'react'
import { Button, Row, Form, Input, Popover, Modal, Col} from 'antd'
import { config } from '../../utils'
import styles from './login.less'
import classnames from 'classnames'
import {connect} from 'dva'
import _ from 'lodash'
import $ from 'jquery'
import { messageInform } from '../../utils/notification'
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  },
};

const LoginInfo = ({ form,loginInfo, dispatch, count, disClick }) => {
  //密码更改
  var data
  function onPwdChange( data ) {

    dispatch({type: 'app/changePwdInput', payload: {
      ...data
    }});
  }

  function checkConfirm(rule, value, callback) {
    if (value && (loginInfo.password !== value)) {
      callback('两次密码不一致,请重新输入!')
    }else{
      callback();

    }
  }

  function onSubmit(){
    form.validateFields((err) => {
      if(_.isEmpty(err)) {
        for (let x in loginInfo){
          loginInfo[x] = $.trim(loginInfo[x])
        }
        form.resetFields();
        dispatch({type: 'app/saveNewPassword', payload: loginInfo });
      }
    })
  }

  function reset(){
    form.resetFields();
    dispatch({type: 'app/changePwdInput', payload: {
      // phone:'',
      verifyCode:'',
      password: '',
      confimpassword: '',
    }});
  }

  var count;
  function cancel() {
    form.resetFields();
    count = undefined
    dispatch({type: 'app/cancelPwdUpdate'});
  }
  function getCode() {
    let rge = /^(1)\d{10}$/;
    if(!rge.test(loginInfo.phone)){
      messageInform('手机号码不能为空', 'error')
      return false
    }
    dispatch({type: 'app/getCode'});
    count = 60;
    //倒计时

    setTimeout(e=>{
      let countDown = setInterval(()=>{
        if(count === 0 || count === undefined){
          $('#getCode').html("获取验证码");
          $('#getCode').removeAttr('disabled')
          clearInterval(countDown);
        }else{
          $('#getCode').html(count + 's');
          $('#getCode').attr('disabled',true)
          count --;
        }
      },1000)
    },1000);

  }
  let footer = [
    <Button key="submit" type="primary" className={classnames(styles.btnl, 'mg3r', 'width100')} onClick={onSubmit}>提交</Button>,
    <Button key="reset" className={classnames('mg1l', 'width100')} onClick={reset}>重置</Button>
  ]
  const {getFieldDecorator, validateFields} = form;
  // 降龙手机校验
  // {pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机格式不正确'}
  let mustCharAndNum = function(str){
    var pattern = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
    if (pattern.test(str) &&str.length >= 8 && str.length<=20 ) {
      //正确
      return true;
    }else {
      return false;
    }
  };

  const validator = (brule, value, callback)=>{
    if(!mustCharAndNum(value) && value != undefined && value != ''){
      callback('密码格式不正确，请输入8-20位字母+数字');
    }/*else if(value && value != loginInfo.confimpassword){
      callback('两次密码不一致,请重新输入!');
    }*/else{
      callback();
    }
  }
  return (
    <Modal
      title={loginInfo.titleName}
      wrapClassName="vertical-center-modal"
      visible={true}
      onCancel={cancel}
      className={classnames('center')}
      footer={footer}
      maskClosable={false}
    >
      <div className={classnames('iblock', styles.login_info_content)}>
        <Form autoComplete="off">
          {/* 用于禁用浏览器自动缓存账号密码 */}
          <div style={{opacity: 0, position: 'absolute'}}>
            <input type="text" />
            <input type="password"/>
          </div>

          <FormItem
            {...formItemLayout}
            label="手机号码"
            hasFeedback
          >
            {getFieldDecorator('phone', {
              rules: [
                {required: true, message: '请输入您的手机号码!', },
                {pattern: /^(1)\d{10}$/, message: '手机格式不正确'}
              ],
              initialValue: loginInfo.phone
            })(
              <Input
                disabled={loginInfo.canTel}
                onChange={(e) => {
                  onPwdChange({phone: e.target.value})
                }}
              />
            )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="验证码"
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入您的验证码!' }],
                  initialValue: loginInfo.verifyCode
                })(
                  <Input size="large" onChange={(e) => {
                    onPwdChange({verifyCode: e.target.value})
                  }}/>
                )}
              </Col>
              <Col span={12}>
                <button className={styles.updatePwd1} onClick={() => getCode()} id="getCode" dangerouslySetInnerHTML={{__html:"获取验证码"}}></button>
              </Col>
            </Row>
          </FormItem>
          {/*/!* 用于禁用浏览器自动缓存账号密码 *!/*/}
          {/*<input type="password" name="password"  style={{display: 'none'}}/>*/}
          <FormItem
            {...formItemLayout}
            label="新密码"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [
                {required: true, message: '请输入您的新密码!'},
                {validator: validator},
              ],
              initialValue: loginInfo.password,
            })(
              <Input type="password" onChange={(e) => {
                if(e.target.value == loginInfo.confimpassword){
                  form.resetFields();
                }
                onPwdChange({password: e.target.value})
              }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
            hasFeedback
          >
            {getFieldDecorator('confirmedPwd', {
              rules: [{
                required: true, message: '重新输入密码!',
              },{
                validator: checkConfirm
              }],
              initialValue: loginInfo.confimpassword
            })(
              <Input type="password" onChange={(e) => {
                if(e.target.value == loginInfo.password){
                  form.resetFields();
                }
                onPwdChange({confimpassword: e.target.value})
              }} />
            )}
          </FormItem>
        </Form>
      </div>
    </Modal>
  )
}

export default connect(({ login }) => ({ login }))(Form.create()(LoginInfo))
