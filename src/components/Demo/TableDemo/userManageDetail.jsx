import React from 'react'
import {
  Row, Input, Select, Form, TreeSelect, Modal, Table, Icon, Popconfirm, Col, InputNumber, Checkbox, Radio, Button
} from 'antd'
import cx from 'classnames'
import {connect} from 'dva'
import {isEmpty, cloneDeep, find, sortBy, pick} from 'lodash'
import Footer from '../../../components/Footer/Footer'
import {mul} from '../../../utils/caculate'


const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const smallFormItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  },
};
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  },
};


const Detail = ({dispatch, form, data, nameSpace, statusList}) => {
  function inputChange(id, value) {
    dispatch({
      type: `${nameSpace}/updateStore`,
      payload: Object.assign(detailData, {[id]: value})
    });
  }

  function onDetailClose() {
    dispatch({
      type: `${nameSpace}/updateStore`, payload: {
        showDetailModal: false,
      }
    });
  }

  function onSubmit() {
    form.resetFields(['password', 'confirmPwd']);
    validateFields((err) => {
      if (isEmpty(err)) {
        dispatch({type: `${nameSpace}/update`})
      }
    })
  }

  //检测确定密码
  function checkConfirmPwd(rule, value, callback) {
    let msg = null
    if (actionType === 'add' || (detailData.password || value)) {
      if (!/^(?![a-zA-z]+$)(?!\d+$)(?![~!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!~@#$%^&*]+$)(?![\d!~@#$%^&*]+$)[a-zA-Z\d!~@#$%^&*]{6,30}$/.test(value)) {
        msg = '密码至少包含一个字母、数字和特殊字符（~@#$%^&*），长度在6-30位';
      } else {
        if (value && (detailData.password !== value)) {
          msg = '两次密码输入不一致！';
        }
      }
    }
    msg ? callback(msg) : callback()
  }

  function resetPwd() {
    Modal.confirm({
      title: '重置密码',
      content: '确定要重置密码吗',
      style: {top: '40%'},
      onOk: () => {
        dispatch({
          type: `${nameSpace}/resetPwd`
        })
      }
    });

  }


  let {detailData, actionType, btnLoading, roleList = [], orgList} = data;
  const {getFieldDecorator, validateFields} = form;
  detailData.measurementUnitList = sortBy(detailData.measurementUnitList, 'measurementType')
  const roleCheckBoxOption = roleList.map((item) => {
    return {label: item.name, value: item.id}
  })

  return (
    <Modal disable={true} title={actionType === 'update' ? '修改用户' : actionType === 'detail' ? '用户详情' : '新增用户'}
      wrapClassName="vertical-center-modal" onCancel={onDetailClose} visible={true} width={800}
      footer={<Footer text={actionType === 'update' ? '修改用户' : '新增用户'} actionType={actionType} onSubmit={onSubmit}
        onCancle={onDetailClose} loading={btnLoading}/>}>
      <div className={'center custom'}>
        <Form className={cx('detail-content', 'iblock', 'txtleft')}>
          <Row>
            <Col span={12}>
              <FormItem {...smallFormItemLayout} label="用户账号" hasFeedback>
                {
                  actionType === 'update' && detailData.userName
                }
                {
                  actionType !== 'update' && getFieldDecorator('userName', {
                    rules: [{
                      required: true, max: 50, message: '请输入用户账号,长度不能超过50!',
                    }, {
                      pattern: /^\S*$/, message: '用户账号不允许包含空字符串!',
                    }],
                    initialValue: detailData.userName
                  })(
                    <Input onChange={(e) => {
                      inputChange('userName', e.target.value);
                    }}/>
                  )
                }
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...smallFormItemLayout} label="姓名" hasFeedback>
                {getFieldDecorator('realName', {
                  rules: [{
                    required: true, max: 50, message: '请输入姓名,长度不能超过50!',
                  }, {
                    pattern: /^\S*$/, message: '姓名不允许包含空字符串!',
                  }],
                  initialValue: detailData.realName
                })(
                  <Input onChange={e => inputChange('realName', e.currentTarget.value)}
                    disabled={actionType === 'detail'}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem {...smallFormItemLayout} label="电话" hasFeedback>
                {getFieldDecorator('phone', {
                  rules: [{
                    required: false, max: 20, message: '请输入电话,长度不能超过20!',
                  }, {
                    pattern: /^\d*$/, message: '电话只能为数字!'
                  }],
                  initialValue: detailData.phone
                })(
                  <Input onChange={e => inputChange('phone', e.currentTarget.value)}/>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...smallFormItemLayout} label="状态" hasFeedback>
                {getFieldDecorator('status', {
                  rules: [{
                    required: true, max: 20, message: '请选择状态!',
                  }],
                  initialValue: detailData.status ? detailData.status + '' : ''
                })(
                  <Select onChange={(value) => {
                    inputChange('status', Number.parseInt(value));
                  }}>
                    {
                      isEmpty(statusList)
                        ? null
                        : statusList.map(item => {
                        return <Select.Option value={item.value + ''} key={item.value}>{item.name}</Select.Option>;
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="密码"
                hasFeedback={actionType === 'update' ? false : true}>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: '请输入密码!',
                  }, {
                    pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![~!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!~@#$%^&*]+$)(?![\d!~@#$%^&*]+$)[a-zA-Z\d!~@#$%^&*]{6,30}$/,
                    message: '密码至少包含一个字母、数字和特殊字符（~@#$%^&*），长度在6-30位',
                  }],
                  initialValue: actionType === 'update' ? 'abcABC123*' : detailData.password
                })(
                  <Input disabled={actionType === 'update'} style={actionType === 'update' ? {width: '80%'} : {}}
                    type="password" onChange={e => inputChange('password', e.currentTarget.value)}/>
                )}
                {
                  actionType === 'update' && <Button className="mg2l" type="primary" onClick={resetPwd}>重置密码</Button>
                }
              </FormItem>
            </Col>
            {
              actionType === 'add' && <Col span={24}>
                <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                  {getFieldDecorator('confirmPwd', {
                    rules: [{
                      required: true, message: '请输入确认密码!',
                    }, {
                      validator: checkConfirmPwd
                    }],
                    initialValue: detailData.confirmPwd
                  })(
                    <Input type="password" onChange={e => inputChange('confirmPwd', e.currentTarget.value)}
                      disabled={actionType === 'detail'}/>
                  )}
                </FormItem>
              </Col>
            }

          </Row>

          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="备注" hasFeedback>
                {getFieldDecorator('remark', {
                  rules: [{
                    required: false, max: 200, message: '输入备注,长度不超过200!',
                  }],
                  initialValue: detailData.remark
                })(
                  <Input type="textarea" style={{height: '52px'}} onChange={(e) => {
                    inputChange('remark', e.target.value);
                  }}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem {...formItemLayout} label="角色选择">
              {getFieldDecorator('roles', {
                rules: [{required: true, message: '请选择您的角色!'}],
                initialValue: detailData.roleIdList ? detailData.roleIdList : []
              })(
                <CheckboxGroup className={cx('checkboxWrap')} options={roleCheckBoxOption} onChange={(value) => {
                  inputChange('roleIdList', value)
                }}/>
              )}
            </FormItem>
          </Row>
          {/*化龙五期暂时不考虑一个用户对应多个组织的问题，目前用户的组织直接跟管理员一样*/}
          {/*<Row>*/}
          {/*<FormItem {...formItemLayout} label="组织选择">*/}
          {/*{getFieldDecorator('orgId', {*/}
          {/*rules: [{ required: true, message: '请选择您的组织!' }],*/}
          {/*initialValue: detailData.orgId*/}
          {/*})(*/}
          {/*<RadioGroup className={cx('checkboxWrap')} onChange={(e) => {inputChange('orgId', e.target.value)}} >*/}
          {/*{*/}
          {/*orgList.map((item) => {*/}
          {/*return <Radio value={item.id} key={item.id + ''}>{item.fullName}</Radio>*/}
          {/*})*/}
          {/*}*/}
          {/*</RadioGroup>*/}
          {/*)}*/}
          {/*</FormItem>*/}
          {/*</Row>*/}
        </Form>
      </div>
    </Modal>
  );
};
export default connect()(Form.create()(Detail))
