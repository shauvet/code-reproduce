import React from 'react';
// dva 连接组件 - 连接route和model
import {connect} from 'dva';
// 选项卡、表格、弹出确认框
import { Tabs, Form, Table, Pagination, Modal, message, Input,Steps, Select, Row, Col, Checkbox,Tree, Button,Badge,Tag, DatePicker,Timeline,Upload,Dropdown,Menu,Icon,Radio,InputNumber,Switch } from 'antd';
// 获取样式类名
import cx from 'classnames'
// 当前页面样式
import styles  from './testStyle.less'
import moment from 'moment';

// 表单域
const FormItem = Form.Item;
// 判断对象是否为空
import { Link,hashHistory } from 'dva/router'
import { listConfig } from '../config/config'
const { MonthPicker, RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;
const {Option,OptGroup} = Select;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const SubMenu = Menu.SubMenu;
const ButtonGroup = Button.Group;
const Step = Steps.Step;
const TreeNode = Tree.TreeNode;
// 表单项布局
const formItemLayout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16}
};


const testView = function ({dispatch, testModel, form}) {
  const {resetFields,getFieldDecorator,validateFields,setFieldsValue} = form;
  const menu = (
    <Menu>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  const menu2 = (
    <Menu>
      <Menu.Item>1st menu item</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
      <SubMenu title="sub menu">
        <Menu.Item>3d menu item</Menu.Item>
        <Menu.Item>4th menu item</Menu.Item>
      </SubMenu>
      <SubMenu title="disabled sub menu" disabled>
        <Menu.Item>5d menu item</Menu.Item>
        <Menu.Item>6th menu item</Menu.Item>
      </SubMenu>
    </Menu>
  );
  const columns = [
    {title: '序号', dataIndex: 'key', key: 'key'},
    {title: '退货单号', dataIndex: 'returnNo', key: 'returnNo'},
    {title: '订单编码', dataIndex: 'orderNo', key: 'orderNo'},
    {title: '订单状态', dataIndex: 'statusName', key: 'statusName'},
    {
      title: '操作', render: ()=> {
      return <div className="tableAction">
        <Link>详情</Link>
        <span className={cx("ant-divider")}/>
        <Link>详情</Link>
        <span className={cx("ant-divider")}/>
      </div>
    }
    }
  ]


  const columns2 = [
    {title: '序号', dataIndex: 'key', key: 'key'},
    {title: '退货单号', dataIndex: 'returnNo', key: 'returnNo'},
    {title: '订单编码', dataIndex: 'orderNo', key: 'orderNo'},
    {
      title: '订单状态',
      render: (item)=> {
        return <Tag className={`tag_${item.status}`}>{item.statusName}</Tag>
      }
    },
    {
      title: '操作',
      width: 170,
      fixed: 'right',
      render: ()=> {
        return <div className="tableAction">
          <Link>详情</Link>
          <span className={cx("ant-divider")}/>
          <Link>详情</Link>
          <span className={cx("ant-divider")}/>
          <Link>详情</Link>
          <span className={cx("ant-divider")}/>
          <Link>详情</Link>
        </div>
      }
    }
  ]

  const tableData = [
    {
      "key": "1",
      "returnNo": "1234fs2134235",
      "orderNo": "12d24ggasd",
      "status": 1,
      "statusName": "状态1"
    },
    {
      "key": "2",
      "returnNo": "1234fs2134235",
      "orderNo": "12d24ggasd",
      "status": 2,
      "statusName": "状态2"
    },
    {
      "key": "3",
      "returnNo": "1234fs2134235",
      "orderNo": "12d24ggasd",
      "status": 3,
      "statusName": "状态3"
    },
    {
      "key": "4",
      "returnNo": "1234fs2134235",
      "orderNo": "12d24ggasd",
      "status": 4,
      "statusName": "状态4"
    },
    {
      "key": "5",
      "returnNo": "1234fs2134235",
      "orderNo": "12d24ggasd",
      "status": 5,
      "statusName": "状态5"
    },
  ];

  const pagination = {
    current: 1,//当前页
    pageSize: 10,//单页条数
    total: 100,//总条数
    showTotal: e=>`共 60 条`,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: "" //分页事件
  }

  let queryList = [];

  // 路由视图
  return (
    <div className="skinProgramme_1">
      <Form>
        <div className={styles.div1}>
          <Button icon="search" type="primary">主要按钮</Button>
          <Button type="primary" disabled>主要按钮禁用状态</Button>
          <Button>次要按钮</Button>
          <Button type="searchSubm">搜索提交按钮</Button>
          <Button disabled>次要按钮禁用状态</Button>
          <Button icon="search">图标按钮</Button>
          <Button icon="search" disabled>图标按钮禁用状态</Button>
          <Dropdown overlay={menu}>
            <Button>
              目录按钮 <Icon type="down"/>
            </Button>
          </Dropdown>
          <ButtonGroup style={{marginLeft:40}}>
            <Button disabled>L</Button>
            <Button disabled>M</Button>
            <Button disabled>R</Button>
          </ButtonGroup>

          <ButtonGroup style={{marginLeft:40}}>
            <Button type="primary">L</Button>
            <Button>M</Button>
            <Button>M</Button>
            <Button type="dashed">R</Button>
          </ButtonGroup>


          <ButtonGroup style={{marginLeft:40}}>
            <Button>
              <Icon type="left"/>Go back
            </Button>
            <Button>
              Go forward<Icon type="right"/>
            </Button>
          </ButtonGroup>

          <ButtonGroup style={{margin:40}}>
            <Button disabled type="primary">
              <Icon type="left"/>Go back
            </Button>
            <Button disabled type="primary">
              Go forward<Icon type="right"/>
            </Button>
          </ButtonGroup>
        </div>

        <div className={styles.div1}>
          <RadioGroup value={1}>
            <Radio value={1}>选中项</Radio>
            <Radio value={2}>未选中项</Radio>
          </RadioGroup>
          <RadioGroup disabled value={1}>
            <Radio value={1}>选中禁用项</Radio>
            <Radio value={2}>未选中禁用项</Radio>
          </RadioGroup>
        </div>


        <div className={styles.div1}>
          <CheckboxGroup options={plainOptions} defaultValue={['Apple']}/>
          <br />
          <CheckboxGroup disabled options={plainOptions} defaultValue={['Apple']}/>
          <br />
          <Checkbox indeterminate={true}>Check all</Checkbox>
        </div>


        <div className={styles.div1}>
          <div style={{width:200}}>
            <Input placeholder="Basic usage"/>
            <br />
            <br />
            <Input placeholder="Basic usage" disabled/>
            <br />
            <br />
            <InputNumber min={1} max={10} defaultValue={3}/>
            <br />
            <br />
            <InputNumber disabled min={1} max={10} defaultValue={3}/>
          </div>
        </div>


        <div className={styles.div1}>
          <Select
            defaultValue="lucy"
            style={{ width: 200 }}
          >
            <OptGroup label="Manager">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </OptGroup>
            <OptGroup label="Engineer">
              <Option value="Yiminghe">yiminghe</Option>
            </OptGroup>
          </Select>
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Select defaultValue="lucy" style={{ width: 120 }} allowClear disabled>
            <Option value="lucy">Lucy</Option>
          </Select>
          <Select
            mode="multiple"
            style={{ width: 300 }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
          >
            {children}
          </Select>
          <Select
            disabled
            mode="multiple"
            style={{ width: 300 }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
          >
            {children}
          </Select>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            disabled
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </div>

        <div className={styles.div1}>
          <Dropdown overlay={menu2}>
            <a className="ant-dropdown-link" href="#">
              Cascading menu <Icon type="down"/>
            </a>
          </Dropdown>
          <Dropdown overlay={menu2} style={{magrinLeft:130}}>
            <Button style={{ marginLeft: 8 }}>
              Button <Icon type="down"/>
            </Button>
          </Dropdown>
        </div>
        <div className={styles.div1}>
          <Switch checkedChildren="开" unCheckedChildren="关"/>
          <br />
          <br />
          <Switch defaultChecked={true} checkedChildren="开" unCheckedChildren="关"/>
          <br />
          <br />
          <Switch disabled checkedChildren="开" unCheckedChildren="关"/>
        </div>
        <div className={styles.div1}>
          <DatePicker />
          <br />
          <br />
          <MonthPicker placeholder="Select month"/>
          <br />
          <br />
          <RangePicker />
        </div>
        <div className={styles.div1}>
          <Row>
            <Col span={6}>
              <FormItem {...formItemLayout} label="退货单号">
                <Input placeholder="请输入退货单号"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label="退货单号">
                <Input placeholder="请输入退货单号"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label="退货单号">
                <Input placeholder="请输入退货单号"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label="退货单号">
                <Input placeholder="请输入退货单号"/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout} label="退货单号">
                <Input placeholder="请输入退货单号"/>
              </FormItem>
            </Col>
          </Row>
        </div>

        <div className={styles.div1}>
          <div style={{width:"50%"}}>
            <Steps current={1}>
              <Step title="Finished" description="This is a description."/>
              <Step title="In Progress" description="This is a description."/>
              <Step title="Waiting" description="This is a description."/>
            </Steps>
          </div>
        </div>
        <div className={styles.div1}>
          <div style={{width:"50%"}}>
            <Steps>
              <Step status="finish" title="Login" icon={<Icon type="user" />}/>
              <Step status="finish" title="Verification" icon={<Icon type="solution" />}/>
              <Step status="process" title="Pay" icon={<Icon type="credit-card" />}/>
              <Step status="wait" title="Done" icon={<Icon type="smile-o" />}/>
            </Steps>
          </div>
        </div>

        <div className={styles.div1}>
          <Timeline className={styles.timeline}>
            <Timeline.Item>2015-23-55<span>dasdasdff</span></Timeline.Item>
            <Timeline.Item>2015-23-55<span>dasdasdff</span></Timeline.Item>
            <Timeline.Item>2015-23-55<span>dasdasdff</span></Timeline.Item>
            <Timeline.Item>2015-23-55<span>dasdasdff</span></Timeline.Item>
          </Timeline>
        </div>

        <div className={styles.div1}>
          <Table columns={columns}
                 dataSource={tableData} pagination={pagination}/>
        </div>

        <div className={styles.div1}>
          <Tree
            checkable
            defaultExpandedKeys={['0-0-0', '0-0-1']}
            defaultSelectedKeys={['0-0-0', '0-0-1']}
            defaultCheckedKeys={['0-0-0', '0-0-1']}
          >
            <TreeNode title="parent 1" key="0-0">
              <TreeNode title="parent 1-0" key="0-0-0" disabled>
                <TreeNode title="leaf" key="0-0-0-0" disableCheckbox/>
                <TreeNode title="leaf" key="0-0-0-1"/>
              </TreeNode>
              <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title={<span>sss</span>} key="0-0-1-0"/>
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>


        <div className={styles.div1}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
            <TabPane tab="Tab 2" disabled key="2">Tab 2</TabPane>
            <TabPane tab="Tab 3" key="3">Tab 3</TabPane>
          </Tabs>
        </div>

        <div className={styles.div1}>
          <Tabs type="card">
            <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
          </Tabs>
        </div>

      </Form>

      <div className={styles.div1} style={{height:50}}>&nbsp;</div>

      <div style={{height:50}}></div>


      列表页规范

      搜索部分 只放搜索和重置按钮，其他一切按钮，都放在面包屑下面第一行
      搜索按钮不加图标，其他按钮可能加

      搜索项，下拉框默认全部为    请选择

      <div className="public_listMain">
        {/*功能按钮区域*/}
        <div className="functionButton">
          <Button type="primary">功能1</Button>
          <Button type="primary">功能2</Button>
          <Button type="primary">功能3</Button>
          <Button type="primary">功能4</Button>
        </div>


        <div className="boxShadow listSearchBox">
          <Row>
            <Col {...listConfig.searchCol}>
              <FormItem {...formItemLayout} label="订单编号" hasFeedback>
                <Input placeholder="请输入订单编号"/>
              </FormItem>
            </Col>
            <Col {...listConfig.searchCol}>
              <FormItem {...formItemLayout} label="买家/手机" hasFeedback>
                <Input placeholder="请输入买家/手机"/>
              </FormItem>
            </Col>
            <Col {...listConfig.searchCol}>
              <FormItem {...formItemLayout} label="商品名称" hasFeedback>
                <Input placeholder="请输入商品名称"/>
              </FormItem>
            </Col>
            <Col {...listConfig.searchCol}>
              <FormItem {...formItemLayout} label="来源单号" hasFeedback>
                <Input placeholder="请输入来源单号"/>
              </FormItem>
            </Col>
            <Col {...listConfig.searchCol}>
              <FormItem {...formItemLayout} label="渠道来源" hasFeedback>
                <Select value="">
                  <Option value="">请选择</Option>
                  <Option value="1">选项1</Option>
                  <Option value="2">选项2</Option>
                  <Option value="3">选项3</Option>
                </Select>
              </FormItem>
            </Col>
            <Col {...listConfig.searchCol}>
              <FormItem {...formItemLayout} label="下单时间" hasFeedback>
                {getFieldDecorator('createTime')(
                  <RangePicker style={{width:"100%"}}
                               allowClear={false}
                               ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                               format="YYYY/MM/DD"
                  />
                )}
              </FormItem>
            </Col>
            <Col {...listConfig.searchCol}>
              <Button type="primary">搜索</Button>
              <Button >重置</Button>
            </Col>
          </Row>

        </div>

        {/*内容区域*/}
        <div className="boxShadow">
          <Tabs tabPosition="buttom" activeKey="1"
                type="card">
            <TabPane tab="全部订单" key="1"></TabPane>
            <TabPane tab={<span className="badge">待付款<span>25</span></span>} key="2"></TabPane>
          </Tabs>
          <Table columns={columns2} scroll={listConfig.tableScroll}
                 dataSource={tableData} pagination={pagination}/>
        </div>
      </div>


    </div>
  );
};

// 连接视图(view)和模型(model)
export default connect(({testModel}) => ({testModel}))(Form.create()(testView));
