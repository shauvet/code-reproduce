// React基础组件
import React, { Component } from 'react'
// dva 连接组件 - 连接route和model
import { connect } from 'dva'
// 选项卡、表格、弹出确认框
import { Form, Tabs, Table, Pagination, Popconfirm, Input, Select, Tree, Radio, Row, Col, Checkbox, Button, DatePicker, TimePicker , Modal, Upload, Icon, message, Tag } from 'antd'
// 单选按钮组
const RadioGroup = Radio.Group
// 复选按钮组
const CheckboxGroup = Checkbox.Group
// 获取样式类名
import cx from 'classnames'
// 表单域
const FormItem = Form.Item
// 判断对象是否为空
import { isEmpty, isArray, cloneDeep, filter, merge, get} from 'lodash'
// 日期处理对象
import moment from 'moment'
// 日期格式
const dateFormat = 'YYYY-MM-DD'
// 时间格式
const dateTime = 'HH:mm:ss'
// 单页应用链接
import { Link } from 'dva/router'
// 树目录
const TreeNode = Tree.TreeNode
// 选项卡面板
const { TabPane } = Tabs
// 日期组件
const { MonthPicker, RangePicker } = DatePicker
// 异步ajax库
import axios from 'axios'
// 对象字符串互转
import {stringify}  from 'qs'
// 富文本编辑器
import { Editor } from '../Editor'
// 列表配置
import { listConfig, editConfig, metaUrl } from '../../config/config'
// 富文本上传图片
import { uploadObject2OSS } from '../../utils/upload'
// 引入异步请求
import {request} from '../../utils'
// 引入当前页样式
import styles from './index.less'
// 引入路由对象
import { hashHistory } from 'dva/router'

const pagination = {
  current: 1,//当前页
  pageSize: 10,//单页条数
  total: 100,//总条数
  showTotal: e=>`共 60 条`,
  showSizeChanger: true,
  showQuickJumper: true,
  onChange: "" //分页事件
}

class PageTmpl extends Component{
  // 构造函数
  constructor(props, context) {
    super(props, context)
    this.state = {
      // 地址栏参数
      query: '',
      // ---------- 界面部分 ----------
      ui: {
        // 页面英文名
        en_name: '',
        // 页面中文名
        zh_name: '',
        // 所属应用
        app_id: '',
        // 表格ID
        table_id: '',
        // 查询字段
        query_conds: [],
        // 字段列表
        fields: [],
        // 子页面
        sub_pages: [],
        // 页面操作
        actions: [],
        // 页面构件
        cmpts: [],
        // 预览图
        review_img: ''
      },

      // --------- 业务部分 ----------
      biz: {
        // 查询表单
        queryForm: {},
        // 编辑表单
        editForm: {},
        // 详情表单
        detailForm: {},

        // 列表数据
        tableData: {
          //表头字段
          columns : [],
          // 表格数据
          dataSource: [],
          // 分页条
          pagination: {
            defaultCurrent: 1,
            defaultPageSize: 10,
            current: 1,
            pageSize: 10,
            total: 0
          }
        }
      }
    }
  }

  //准备：即将被重新渲染，状态未变化
  componentWillUpdate(nextProps, nextState) {}

  //完成：正在被重新渲染，状态已变化
  componentDidUpdate(prevProps, prevState) {}

  // 已加载组件，收到新属性时调用
  componentWillReceiveProps(nextProps) {}

  // 已插入真实DOM
  async componentDidMount() {

    // 作用域提升，用于异步请求
    let self = this
    if(!self.props.pageId) return false

    // ui部分
    // 获取页面信息
    let uiResult = null
    try{
      uiResult = await self.getPageInfo()
    }catch(e){
      message.error(e || '未知的查询页面异常')
    }

    // 设置页面信息
    let pageInfo = null
    try{
      pageInfo = await self.setPageInfo(uiResult)
    }catch(e){
      message.error(e || '未知的设置页面异常')
    }

    // biz部分
    if(!pageInfo.page_type) return false

    // 业务数据结果集
    let bizResult = null 

    // 单据类型必须固定
    switch ('' + pageInfo.page_type) {
      case 'list':
        // 设置列表表头字段
        await self.setListColumns()

        // 捕获异常
        try{
          bizResult = await self.getListDatas()
        }catch(e){
          message.error(e || '未知的查询记录异常')
          return false
        }

        if('0' !== '' + bizResult.resultCode){
          message.error(bizResult.resultMsg || '查询结果集不合法')
          return false
        }

        if(!!bizResult){
          // 设置列表内容数据
          await self.setListDatas(bizResult)
        }

        break
      case 'edit':

        // 捕获异常
        try{
          bizResult = await self.getEditDatas()
        }catch(e){
          message.error(e || '未知的查询记录异常')
          return false
        }

        if('0' !== '' + bizResult.resultCode){
          message.error(bizResult.resultMsg || '查询结果集不合法')
          return false
        }

        if(!!bizResult){
          // 设置编辑内容数据
          await self.setEditDatas(bizResult)
        }
        break
      default:
        console.log('不支持的单据类型')
    }

  }

  // 设置页面信息
  setPageInfo(uiResult){
    // 作用域提升
    let self = this
    // 合并默认属性和查询到的属性
    // let pageInfo = merge(ui, uiResult.data.list[0])
    let pageInfo = null
    // 地址栏参数
    let query = ''

    try{
      // 界面信息
      let { ui } = self.state
      let { query } = self.props
      // 从结果集中取出页面信息
      pageInfo = uiResult.data.data.list[0]

      // 返回Promise，用于下一步处理
      return new Promise((resolve, reject) => {
        if(!pageInfo){
          reject(e || '未知的解析结果异常')
        }
        self.setState({ ui: pageInfo, query}, () => {
          resolve(pageInfo)
        })
      })
    }catch(e){
      return Promise.reject(e || '未知的解析结果异常')
    }
  }

  // 查询页面信息 - ui部分
  getPageInfo(){
    // 作用域提升
    let self = this

    try{
      // pageId未设置，中断执行
      if(!self.props.pageId){
        return Promise.reject('页面ID未设置')
      }

      // 请求URL
      let url =  `${metaUrl}/page_query`

      // 查询条件
      let queryParams = { query: { _id: self.props.pageId } }

      // 请求头部
      let headers = {
        'x-csrf-token': '5G-QhFOTA1P0m5s9a6DyHWxl',
        'Content-Type': 'application/json'
      }

      // 返回Promise结果
      return axios.request({
        method: 'get',
        url: `${url}?${stringify(queryParams)}`,
        headers
      })

    }catch(e){
      return Promise.reject(e || '未知的查询页面异常')
    }
  }

  // 请求元数据系统
  doMetaRequest(url, params, method){
    let self = this
    // 查询条件
    let queryParams = { query: params }
    // 请求头部
    let headers = {
      'x-csrf-token': '5G-QhFOTA1P0m5s9a6DyHWxl',
      'Content-Type': 'application/json'
    }
    // 返回Promise结果
    return axios.request({
      method: `${method || 'GET'}`,
      url: `${url}?${stringify(queryParams)}`,
      headers
    })
  }

  // 请求业务系统
  doBizRequest(url, params, method){
    // 返回Promise
    return request({
      url: `${url}`,
      method: `${method || 'GET'}`,
      data: params
    })
  }

  // 获得RESTFull接口URL
  getRestUrl(){
    // 作用域提升
    let self = this

    if(!self.state.ui.api_url) return ''

    // url数组
    let urlArr = self.state.ui.api_url.split(',')
    // 临时api_url
    let tmp_api_url = urlArr[0]

    if(!tmp_api_url) return ''
    // 请求URL
    let url =  `${self.state.ui.app_gateway_url}${tmp_api_url}`
    // 返回拼接好的URL
    return url
  }

  // 是否元数据
  isMetaData(){
    // 作用域提升
    let self = this
    return '59c9b5a864ba532c90825483' === '' + self.state.ui.app_id
  }

  // 列表数据获取
  getListDatas(){
    // 作用域提升
    let self = this

    try{
      // 校验
      if(!self.state.ui.api_url){
        return Promise.reject('尚未配置接口api')
      }
      // 请求URL
      let url =  self.getRestUrl()

      if(!url) return false

      // 请求方式
      let method = self.state.ui.method || 'GET'
      // 请求参数
      let params = self.state.ui.params || {}

      // 元数据系统
      if(self.isMetaData()){
        return self.doMetaRequest(url, params, method)

      // 其它业务系统
      }else{
        return self.doBizRequest(url, params, method)
      }

    }catch(e){
      return Promise.reject(e || '未知的查询记录异常')
    }
  }

  // 设置列表数据
  setListDatas(bizResult){
    // 作用域提升
    let self = this
    try{
      // 业务数据列表
      let dataList = bizResult.data.data || bizResult.data.list
      // 业务配置
      let biz = self.state.biz

      // 添加key
      if(0 !== dataList.length){
        dataList.map((item, i) => {
          item.key = i
        })
      }

      // 设置到表格
      biz.tableData.dataSource = dataList

      return new Promise((resolve, reject) => {
        self.setState({biz}, () => {
          resolve(dataList)
        })
      })
    }catch(e){
      return Promise.reject(e || '未知的设置列表数据异常')
    }
  }

  // 设置列表页面表头
  setListColumns(){
    // 作用域提升
    let self = this

    try{
      // 列表字段
      let fields = self.state.ui.fields
      // 业务数据
      let biz = self.state.biz

      if(!fields || 0 === fields.length) return Promise.reject('页面字段为空')
      // 表头字段数组
      let list_columns = []
      // 临时字段对象
      let tmpFieldObj = null

      // 遍历列表字段
      fields.map((lFiels, i) => {
        tmpFieldObj = {
          title: lFiels.zh_name || '', 
          dataIndex: lFiels.en_name || '', 
          key: lFiels.en_name || '' 
        }

        if(!!lFiels.is_link){
          tmpFieldObj.render = (text, record, index) => {
            if(!!record.url){
              return <Link to={record.url}>{ text }</Link>
            }else{
              return <span>{text}</span>
            }
          }
        }
        list_columns.push(tmpFieldObj)
      })

      // 附加操作
      list_columns.push(self.getListActions())

      // 放回状态机
      biz.tableData.columns = list_columns

      return new Promise((resolve, reject) => {
        self.setState({biz}, () => {
          resolve(list_columns)
        })
      })
    }catch(e){
      return Promise.reject(e || '未知的设置页面字段错误')
    }
  }

  // 获取编辑页数据
  getEditDatas(){
    // 作用域提升
    let self = this
    try{
      // 校验
      if(!self.state.ui.api_url){
        return Promise.reject('尚未配置接口api')
      }
      // 请求URL
      let url =  self.getRestUrl()

      if(!url) return false

      // 请求方式
      let method = self.state.ui.method || 'GET'
      // 请求参数
      let params =  {id: get(self.props, 'query.id', '')}

      // 如果是新增，则不请求数据
      let actionType = get(self.props, 'query.actionType', 'add')

      if('add' === '' + actionType) return Promise.resolve({resultCode: 0, resultMsg: '', data: []})

      // 元数据系统
      if(self.isMetaData()){
        return self.doMetaRequest(url, params, method)

      // 其它业务系统
      }else{
        return self.doBizRequest(url, params, method)
      }

    }catch(e){
      return Promise.reject(e || '未知的查询记录异常')
    }
  }

  // 设置编辑页面内容
  setEditDatas(bizResult){
    // 作用域提升
    let self = this
    try{
      // 编辑字段
      let fields = self.state.ui.fields
      // 业务数据内容
      let dataInfo = bizResult.data || bizResult.data.list[0]
      // 业务配置
      let biz = self.state.biz

      if(0 === fields.length) return false

      fields.map((eField, i) => {
        biz.editForm[eField.en_name] = dataInfo[eField.en_name]
      })

      return new Promise((resolve, reject) => {
        self.setState({biz}, () => {
          resolve(dataInfo)
        })
      })

    }catch(e){
      return Promise.reject(e || '未知的设置页面字段错误')
    }
  }

  // 获取链接URL
  getLinkUrl(idVal, url){
    let linkUrl = ''
    if(idVal && url){
      // 要替换的参数数组 - 匹配url中的大括号
      linkUrl = ('' + url).replace(/\{[^\}]+\}/g, idVal)
    }
    return linkUrl
  }

  /**
   * 抽取操作中的链接或者按钮
   * actions 操作列表
   * opType links: 链接, buttons: 按钮
   */
  getOpOfAction(opType){
    // 作用域提升
    let self = this
    // 操作列表
    let {actions} = self.state.ui
    // 返回的操作数组
    let opArr = []
    if(!actions || 0 === actions.length) return []
    // 遍历操作列表
    actions.map((act, i) => {
      if('' + opType === '' + act.opType){
        opArr.push(act)
      }
    })
    return opArr
  }

  // 获取链接数组
  getListLinks(record){
    // 作用域提升
    let self = this
    //  ID字段名
    let { id_field_name = 'id' } = self.state.ui
    // 列表页链接
    let links = self.getOpOfAction('links')
    // 链接列表
    let linkDomArr = []
    //  临时链接
    let tmpLink = null

    if(isArray(links) && links.length > 0){
      links.map((link, i) => {
        tmpLink = self.getLinkUrl(record[id_field_name], link.url)

        if('onDelete' == '' + link.func_name){
          linkDomArr.push(
            <Popconfirm key={'link1_' + i} Collapse title='确定要删除吗？' okText='确定' cancelText='取消' onConfirm={(e) => {self.onDelete(e, record, tmpLink)}}>
              <Link>删除</Link>
            </Popconfirm>
          )
        }else{
          linkDomArr.push(<Link key={'link1_' + i} to={tmpLink}>{link.label}</Link>)
        }
        // linkDomArr.push(<Link key={'link1_' + i} to={tmpLink}>{link.label}</Link>)
        linkDomArr.push(<span key={'link2_' + i} className={cx("ant-divider")}/>)
      })
    }
    return linkDomArr
  }

  // 列表页面操作
  getListActions(){
    // 作用域提升
    let self = this

    // 操作栏对象
    return {
      title: "操作",
      width: 170,
      fixed: "right",
      render: (text, record, index) => {
        // console.log('text2', text, 'record2:', record, 'index2:', index)
        // 以下jsx语法
        return (
          <div className="tableAction">
            { self.getListLinks(record) }
          </div>
        )
      }
    }
  }

  // 保存记录
  onSave(e){
    e.preventDefault()
    // 校验参数
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return false
      }
      console.log('保存')
      
    })
  }

  // 跳转URL
  goURL(e, url){
    // 作用域提升
    let self = this
    // 阻止冒泡
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()

    // 清空表单
    this.props.form.resetFields()
    // 跳转到新的路由
    hashHistory.push(url)
    return false
  }

  // 删除点击
  onDelete(e, item, url){
    // 作用域提升
    let self = this

    // 删除结果
    let result = {}

    if(self.isMetaData()){
      url = url.replace(/id/g, '_id')
      let params = {_id: item._id}
      let method = 'DELETE'

      return false
      result = self.doMetaRequest(url, params, 'DELETE')
    }else{
      return false
      result = self.doBizRequest(url, {}, 'GET')
    }

    // 删除成功，重新加载数据
    if('0' === '' + result.resultCode){
      self.getListDatas()
    }else{
      message.error(result.resultMsg || '未知的删除记录异常')
    }
  }

  // 新增按钮点击
  onAdd(e, url){
    // 作用域提升
    let self = this
    // 跳转URL
    self.goURL(e, url)
  }

  // 取消按钮点击
  onCancel(e, url){
    // 作用域提升
    let self = this
    // 跳转URL
    self.goURL(e, url)
  }

  // 查询记录
  onSearch(e){
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('form: ', values);
      }
    });
  }

  // 重置查询条件
  onReset(e){
    e.preventDefault()
    // 清空form
    form.resetFields()
  }

  // 删除记录
  onRemove(item){
    e.preventDefault()
  }

  // 获取上传图片配置 - 用于编辑器
  getUploadCfg(){
    return {
      // 自定义上传
      customUploadImg: function(files, insert){
        let file = files[0]
        if(!file) return false
        // file 已选择的文件对象
        // home 文件对象的组名(目录)
        uploadObject2OSS(file, 'home').then((imgUrl) => {
          // 插入编辑器
          insert(imgUrl)
        }).fail((err) => {
          message.error(err || '未知的上传图片异常')
        })
      },
    }
  }

  // 展示页面条件 - 避免重复渲染
  showPage(){
    return !!this.state.ui.en_name
  }

  // 展示表格条件 - 避免重复渲染
  showTable(){
    return this.state.biz.tableData.columns.length > 0 && this.state.biz.tableData.dataSource.length > 0
  }

  // 获得按钮的属性 - 新增、保存、取消
  getButtonProps(act){
    // 作用域提升
    let self = this

    let obj = {
      type: act.type || 'primary',
      size: 'large',
      icon: act.icon,
    }

    obj.htmlType = 'onSave' === '' + act.func_name? 'submit': 'button'

    if('onCancel' === '' + act.func_name){
      obj.onClick = (e) => {
        self.onCancel(e, act.url)
      }
    }else if('onAdd' === '' + act.func_name){
      obj.onClick = (e) => {
        self.onAdd(e, act.url)
      }
    }
    return obj
  }

  // 初始状态或状态变化会触发render
  render(ReactElement, DOMElement, callback) {
    /**
     * getFieldDecorator 输入域校验函数
     * validateFieldsAndScroll 校验并滚动到输入域
     */
    const { getFieldDecorator } = this.props.form
    // 表单项布局
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    // 按钮布局
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 14, offset: 6}
      }
    }

    return (
      <div>
        { !this.showPage() && <div>不存在的页面</div>}
        {
          this.showPage() && ('list' === '' + this.state.ui.page_type) && (
            <div className="public_listMain">
              {/*查询条件区域*/}
              <div className="boxShadow listSearchBox">
                <Form onSubmit={ e => {this.onSearch(e)}}>
                  <Row>
                    {
                      this.state.ui.query_conds && this.state.ui.query_conds.map((qField, i) => {

                        // 文本输入框
                        if('input' === '' + qField.elem_type){
                          return (
                            <Col {...listConfig.searchCol} key={'qField_' + i}>
                              <FormItem {...listConfig.searchFormItem} label={qField.zh_name} hasFeedback>
                                {
                                  getFieldDecorator(qField.en_name, {
                                    initialValue: '',
                                    rules: [
                                      {
                                        required: qField.required, message: '请选择' + qField.zh_name
                                      },
                                    ],
                                  })
                                  (<Input placeholder={'请输入' + qField.zh_name}/>)
                                }
                              </FormItem>
                            </Col>
                          )

                        // 下拉框
                        }else if('select' === '' + qField.elem_type){
                          return (
                            <Col {...listConfig.searchCol} key={'qField_' + i}>
                              <FormItem {...listConfig.searchFormItem} label={qField.zh_name} hasFeedback>
                                {
                                  'select' === '' + qField.elem_type && (
                                    <Select value="">
                                      <Select.Option value="">请选择</Select.Option>
                                      <Select.Option value="1">选项1</Select.Option>
                                      <Select.Option value="2">选项2</Select.Option>
                                      <Select.Option value="3">选项3</Select.Option>
                                    </Select>
                                  )
                                }
                              </FormItem>
                            </Col>
                          )

                        // 日期框
                        }else if('date' === '' + qField.elem_type){
                          return (
                            <Col {...listConfig.searchCol} key={'qField_' + i}>
                              <FormItem {...listConfig.searchFormItem} label={qField.zh_name} hasFeedback>
                                {
                                  'date' === '' + qField.elem_type && (
                                    getFieldDecorator(qField.en_name, {
                                      initialValue: '',
                                      rules: [
                                        {
                                          required: qField.required, message: '请选择' + qField.zh_name
                                        },
                                      ],
                                    })
                                    (
                                      <RangePicker style={{width:"100%"}}
                                        allowClear={false}
                                        ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                        format="YYYY/MM/DD"
                                      />
                                    )
                                  )
                                }
                              </FormItem>
                            </Col>
                          )
                        }
                      })
                    }
                  </Row>

                {/*顺序必须为搜索-重置*/}
                <Row className={cx('txtcenter')}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                  <Button >重置</Button>
                </Row>

                </Form>
              </div>

              {/*内容区域*/}
              <div className="boxShadow">
                <div className={styles.actionButton}>
                  <div className={styles.leftTitle}> { this.state.ui.zh_name } </div>
                  <div className={styles.center}></div>
                  <div className={styles.rightBtn}>
                    {/*功能按钮区域*/}
                    {
                      this.getOpOfAction('buttons').map((act, i) => {
                        return <Button key={'act_' + i} {...this.getButtonProps(act)}>{act.label}</Button>
                      })
                    }
                  </div>
                </div>
                {
                  this.showTable() && <Table columns={this.state.biz.tableData.columns} scroll={listConfig.tableScroll} dataSource={this.state.biz.tableData.dataSource} pagination={pagination}/>
                }
              </div>

            </div>
          )
        }

        {
          this.showPage() && ('edit' === '' + this.state.ui.page_type) && (
            <div className="public_editMain">
              
                <div className="boxShadow">
                  <Form onSubmit={e => this.onSave(e)}>
                    <div className="groupTitle">基础设置</div>

                    <Row type='flex' justify='start'>
                      {
                        this.state.ui.fields && this.state.ui.fields.map((field, i) => {

                          // 文本输入框
                          if('input' === '' + field.elem_type){
                            return (
                              <Col key={field.en_name + '_' + i} {...editConfig.formCol}>
                                <FormItem label={field.zh_name} {...editConfig.formItem} hasFeedback>
                                  {
                                    getFieldDecorator(field.en_name, {
                                      rules: [
                                        {required: false, message: '请输入' + field.zh_name}
                                      ],
                                      initialValue: this.state.biz.editForm[field.en_name] || ''
                                    })
                                    (<Input placeholder={'请输入' + field.zh_name} onChange={e => {console.log( 1 + 1)}}/>)
                                  }
                                </FormItem>
                              </Col>
                            )

                          // 密码域
                          }if('password' === '' + field.elem_type){
                            return (
                              <Col key={field.en_name + '_' + i} {...editConfig.formCol}>
                                <FormItem label={field.zh_name} {...editConfig.formItem} hasFeedback>
                                  {
                                    getFieldDecorator(field.en_name, {
                                      rules: [
                                        {required: false, message: '请输入' + field.zh_name}
                                      ],
                                      initialValue: this.state.biz.editForm[field.en_name] || ''
                                    })
                                    (<Input type='password' placeholder={'请输入' + field.zh_name} onChange={e => {console.log( 1 + 1)}}/>)
                                  }
                                </FormItem>
                              </Col>
                            )

                          // 下拉框
                          }else if('select' === '' + field.elem_type){
                            return (
                              <Col key={field.en_name + '_' + i} {...editConfig.formCol}>
                                <FormItem label={field.zh_name} {...editConfig.formItem} hasFeedback>
                                  {
                                    getFieldDecorator(field.en_name, {
                                      rules: [
                                        {required: false, message: '请选择' + field.zh_name}
                                      ],
                                      initialValue: this.state.biz.editForm[field.en_name] || ''
                                    })
                                    (
                                      <Select showSearch placeholder={'请选择' + field.zh_name} optionFilterProp='children'
                                        onChange={e => {}}
                                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                      >
                                        <Select.Option value=''>请选择</Select.Option>
                                          <Select.Option key='1' value='1'>选项1</Select.Option>
                                          <Select.Option key='2' value='2'>选项2</Select.Option>
                                          <Select.Option key='3' value='3'>选项3</Select.Option>
                                      </Select>
                                    )
                                  }
                                </FormItem>
                              </Col>
                            )

                          // 日期类型
                          }else if('date' === '' + field.elem_type){
                            return (
                              <Col key={field.en_name + '_' + i} {...editConfig.formCol}>
                                <FormItem label={field.zh_name} {...editConfig.formItem} hasFeedback>
                                  {
                                    getFieldDecorator(field.en_name, {
                                      rules: [
                                        {required: false, message: '请输入' + field.zh_name},
                                        {type: 'object', message: field.zh_name + '不正确'}
                                      ],
                                      initialValue: this.state.biz.editForm[field.en_name] || null
                                    })
                                    (
                                      <DatePicker style={{'width': '100%'}} showTime format={'YYYY-MM-DD HH:mm'} onChange={(date,  dateString) => {}}/>
                                    )
                                  }
                                </FormItem>
                              </Col>
                            )

                          //  放大镜
                          }else if('zoom' === '' + field.elem_type){
                            return (
                              <Col key={field.en_name + '_' + i} {...editConfig.formCol}>
                                <FormItem label={field.zh_name} {...editConfig.formItem} hasFeedback>
                                  {
                                    getFieldDecorator(field.en_name, {
                                      rules: [
                                        {required: false, message: '请输入' + field.zh_name},
                                      ],
                                      initialValue: this.state.biz.editForm[field.en_name] || ''
                                    })
                                    (<Input addonAfter={<Icon type='search'  className={styles.btnHover}/>} placeholder={'请输入' + field.zh_name} onChange={e => {console.log( 1 + 1)}}/>)
                                  }
                                </FormItem>
                              </Col>
                            )

                          //  富文本编辑器
                          }else if('editor' === '' + field.elem_type){
                            return (
                              <Col key={field.en_name + '_' + i} {...editConfig.formCol} style={{position: 'relative', zIndex: 1}}>
                                <FormItem label={field.zh_name} {...editConfig.formItem} hasFeedback>
                                  {
                                    getFieldDecorator(field.en_name, {
                                      rules: [
                                        {required: false, message: '请输入' + field.zh_name},
                                      ],
                                      initialValue: this.state.biz.editForm[field.en_name] || ''
                                    })
                                    (<Editor html={this.state.biz.editForm[field.en_name] || ''} onChange={e => {}} getUploadCfg = {this.getUploadCfg}/>)
                                  }
                                </FormItem>
                              </Col>
                            )

                          // 上传文件
                          }else if('upload' === '' + field.elem_type){
                            return (
                              <Col key={field.en_name + '_' + i} {...editConfig.formCol}>
                                <FormItem label={field.zh_name} {...editConfig.formItem} hasFeedback>
                                  {
                                    getFieldDecorator(field.en_name, {
                                      rules: [
                                        {required: false, message: '请输入' + field.zh_name},
                                      ],
                                      initialValue: this.state.biz.editForm[field.en_name] || ''
                                    })
                                    (<Input addonAfter={<Icon type="upload" className={styles.btnHover}/>} placeholder={'请输入' + field.zh_name} onChange={e => {console.log( 1 + 1)}}/>)
                                  }
                                </FormItem>
                              </Col>
                            )

                          // 单选框
                          }else if('radio' === '' + field.elem_type){
                            return (
                              <Col key={field.en_name + '_' + i} {...editConfig.formCol}>
                                <FormItem label={field.zh_name} {...editConfig.formItem} hasFeedback>
                                  {
                                    getFieldDecorator(field.en_name, {
                                      initialValue: this.state.biz.editForm[field.en_name] || '',
                                      rules: [
                                        {required: false, message: '请选择' + field.en_name}
                                      ],
                                    })
                                    (
                                      <RadioGroup onChange={e => {}}>
                                        <Radio key='1' value='1'>选项1</Radio>
                                        <Radio key='2' value='2'>选项2</Radio>
                                        <Radio key='3' value='3'>选项3</Radio>
                                      </RadioGroup>
                                    )
                                  }
                                </FormItem>
                              </Col>
                            )

                          // 文本域类型
                          }else if('textarea' === '' + field.elem_type){
                            return (
                              <Col key={field.en_name + '_' + i} {...editConfig.formCol}>
                                <FormItem label={field.zh_name} {...editConfig.formItem} hasFeedback>
                                  {
                                    getFieldDecorator(field.en_name, {
                                      rules: [
                                        {required: false, message: '请输入' + field.en_name}
                                      ],
                                      initialValue: this.state.biz.editForm[field.en_name] || ''
                                    })
                                    (<Input style={{'height': '60px'}} type='textarea' rows={8} placeholder={'请输入' + field.zh_name} onChange={e => {}}/>)
                                  }
                                </FormItem>
                              </Col>
                            )
                          }else if('edit_table' === '' + field.elem_type){
                            
                          }
                        })
                      }

                    </Row>

                    <div className='buttonCenter'>
                    {
                      this.getOpOfAction('buttons').map((act, i) => {
                        return <Button key={'edit_buttons_' + i} className={cx('mg1l')} {...this.getButtonProps(act)}>{act.label}</Button>
                      })
                    }
                    </div>
                  </Form>


                </div>
              
            </div>
          )
        }
      </div>
    )
  }
}

export default Form.create()(PageTmpl)