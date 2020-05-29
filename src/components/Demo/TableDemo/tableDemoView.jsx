import React from 'react'
import {connect} from 'dva'
import {Row, Col, Select, Input, Button, Popconfirm} from 'antd'
import {Grid, QueryCondition} from '../../../components/Grid/Grid'
import cx from 'classnames'
import UserManageDetail from './userManageDetail'
import {chunk, cloneDeep, pick, isEmpty, find, join} from 'lodash'
import {confirm} from '../../../components/DialogBox/DialogBox'
import UserDisplayDetail from './userManageDisplayDetail'

const statusList = [{
  name: "启用",
  value: "1"
}, {
  name: "禁用",
  value: "2"
}]
const columns = [
  {title: '用户账号', width: 150, dataIndex: 'userName', key: 'userName'},
  {title: '姓名', width: 200, dataIndex: 'realName', key: 'realName'},
  {
    title: '状态', width: 80, dataIndex: 'status', key: 'status', render: (data) => {
    let status = find(statusList, (item) => item.value == data)
    return status ? status.name : data
  }
  },
  {title: '电话', width: 200, dataIndex: 'phone', key: 'phone'},
  {title: '创建人', width: 200, dataIndex: 'createPerson', key: 'createPerson'},
  {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},

];

//mod 命名统一配置/更改
const nameSpace = 'tableDemo';
const View = ({dispatch, tableDemo}) => {

  function queryListAdaptor(queryList) {
    queryList.forEach((item) => {
      if (item.key === 'status') {
        item.list = statusList.map((data) => {
          return {id: data.value, name: data.name}
        });
      }
    })
  }

  //修改、删除、禁用等操作
  function generateAction() {
    return {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: (item, record, index) => {
        return <span>
          <a onClick={() => handleClick('detail', item, index)}>查看</a>
          <span className={cx("ant-divider")}/>
          <a onClick={() => handleClick('edit', item, index)}>编辑</a>
           <span className={cx("ant-divider")}/>
           <Popconfirm Collapse title='确定要删除吗？' okText='确定' cancelText='取消' onConfirm={() => {
             handleClick('del', item, index)
           }}>
             <a>删除</a>
           </Popconfirm>
        </span>
      }
    };
  }

  //操作栏统一配置
  function handleClick(type, item, itemIndex) {
    switch (type) {
      case 'edit':
        dispatch({
          type: `${nameSpace}/updateStore`,
          payload: {
            detailData: {
              ...item,
              confirmPwd: item.password
            },
            showDetailModal: true,
            actionType: 'update',
          }
        });
        break;
      case 'delete':
        dispatch({
          type: `${nameSpace}/delete`, payload: [item.id]
        });
        break;
      case 'detail':
        dispatch({
          type: `${nameSpace}/updateStore`,
          payload: {
            detailData: cloneDeep(item),
            showDetailModal: true,
            actionType: 'detail'
          }
        });
        break;
      case 'status' :
        dispatch({
          type: `${nameSpace}/changeUserStatus`,
          payload: {
            id: item.id,
            //状态转换
            status: item.status == 1 ? 2 : 1
          }
        });
      default:
    }
  }

  function create() {
    dispatch({
      type: `${nameSpace}/updateStore`, payload: {
        showDetailModal: true,
        actionType: 'add',
        detailData: {}
      }
    });
  }

  function onSearch() {
    dispatch({type: `${nameSpace}/search`});
  }

  const {showDetailModal, queryList, selectedRowKeys, btnLoading, loading, actionType} = tableDemo;
  queryListAdaptor(queryList);

  //表格配置(表头,和数据源)
  const data = {
    columns: columns.concat(generateAction()),
    ...pick(tableDemo, ['tableData', 'selectedRowKeys', 'pageConfig']),
  };

  //弹窗提示配置
  const confirmProps = {
    title: '删除记录', content: '确定要删除所选记录吗？', onOk() {
      dispatch({type: `${nameSpace}/delete`})
    }
  };

  return (
    <div>
      {/*Modal 新增弹窗和详情弹窗, 根据actionType 判断展示   */}
      {
        showDetailModal && <UserManageDetail data={tableDemo} statusList={statusList} nameSpace={nameSpace}/>
      }

      <div className={cx('dropdownShadow listCondition mg2b')}>
        {/*动态生成 各种查询框 根据queryList 生成 ,配置看mod */}
        <QueryCondition data={queryList}
          inputChange={(key, value) => dispatch({
            type: `${nameSpace}/inputChange`,
            payload: {key, value}
          })}/>
        <Row className={cx('txtright')}>
          <Button className={cx('createBtn')} type="primary" onClick={create} icon="plus-circle-o">增加</Button>
          <Button className={cx('mg1l', 'searchBtn')} type="primary" icon="search" onClick={onSearch}
            loading={btnLoading}>搜索</Button>
          <Button className={cx('mg1l', 'deleteBtn')} type="primary" onClick={() => confirm(confirmProps)}
            disabled={isEmpty(selectedRowKeys)} loading={btnLoading}>批量删除</Button>
          <Button className={cx('mg1l')} type="primary"
            onClick={() => dispatch({type: `${nameSpace}/queryReset`})}>重置</Button>
        </Row>
      </div>

      <div className={cx('mg3t')}>
        <Grid nameSpace='tableDemo' data={data} selectedKeysChange='selectedKeysChange'
          pageChange='pageChange' loading={loading} scroll={{x: 1200}}/>
      </div>

    </div>
  );
};

export default connect(({tableDemo}) => ({tableDemo}))(View)
