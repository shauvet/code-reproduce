import { cloneDeep, isEmpty, pick, uniq, omit, map, keyBy } from 'lodash'
import { queryUser, addUser, updateUser, deleteUser, getOrganizationList, getRoleList, changeUserStatus, resetUserPwd } from './tableDemoService'
import config from '../../../config/config'
import {messageInform} from '../../../utils/notification'

const queryList = [
  { name: '用户账号', type: 'text', key: 'userName', value: '',},
  { name: '姓名', type: 'text', key: 'realName', value: ''},
  { name: '状态', type: 'select', key: 'status', value: '', list: []},
  { name: '电话', type: 'text', key: 'phone', value: ''},
  { name: '创建时间', type: 'time', key: 'createTime', value: []},
]
const modalName = 'tableDemo';

const state = {
  queryList,
  detailData: {},
  tableData: {
    dataSource: [],
    total: 0,
  },
  selectedRowKeys: [],
  showDetailModal: false,
  pageConfig: {
    pageSizeOptions: config.smallPageSizeList,
    pageSize: Number.parseInt(config.smallPageSizeList[0]),
    current: 1
  },
  actionType: '',
  loading: false,
  btnLoading: false,
};

export default {
  namespace: modalName,
  state: cloneDeep(state),
  effects: {
    //查询操作
    *search({ payload = {} }, { call, put, select }) {
      //显示loading状态
      yield put({ type: 'updateStore', payload: { loading: true, tableData: { total: 0 }, btnLoading: true } })

      const { queryList, pageConfig, path } = yield select(d => d[modalName]);
      const { pageIndex = 1 } = payload, pageSize = pageConfig.pageSize;
      //组装接口入参
      let params = {};
      queryList.map(item => {
        params[item.key] = item.value;
      });

      const resp = yield call(queryUser, { ...params, pageNum: pageIndex, pageSize });
      let tableData;
      if (resp.resultCode === 0) {
        const { list, total } = resp.data;
        tableData = {
          dataSource: list,
          total
        }
        yield put({ type: 'updateStore', payload: { pageConfig: { ...pageConfig, current: pageIndex }, tableData, selectedRowKeys: [] } })
      }
      //取消loading状态
      yield put({ type: 'updateStore', payload: { loading: false,btnLoading: false } })
    },

    //改变查询条件
    *inputChange({ payload }, { call, put, select }) {
      const { queryList } = yield select(d => d[modalName]);
      const { key, value } = payload;
      let data = queryList.find(item => item.key === key);
      data.value = value;
      yield put({ type: 'updateStore', payload: { queryList: [...queryList, ...data] } });
    },
    // 新增/修改
    *update({ }, { call, put, select }) {
      let { detailData, actionType } = yield select(d => d[modalName]);
      const service = actionType === 'add' ? addUser : updateUser;
      yield put({ type: 'updateStore', payload: { btnLoading: true } });

      const resp = yield call(service, detailData);
      if (resp.resultCode === 0) {
        messageInform(actionType === 'add' ? '新增成功!' : '修改成功!', 'info');
        //重新查询
        yield put({ type: 'search' });
        yield put({ type: 'updateStore', payload: { showDetailModal: false } });
      }
      yield put({ type: 'updateStore', payload: { btnLoading: false } });
    },
    //删除(批量/单条)
    *delete({ payload }, { call, put, select }) {
      const { selectedRowKeys } = yield select(d => d[modalName]);
      yield put({ type: 'updateStore', payload: { btnLoading: true } });
      const resp = yield call(deleteUser, payload ? [payload] : selectedRowKeys);
      if (resp.resultCode === 0) {
        messageInform('删除成功!', 'info');
        yield put({ type: 'search' });
      }
      yield put({ type: 'updateStore', payload: { btnLoading: false } });
    },
    //翻页
    *pageChange({ payload }, { put, select }) {
      const { pageIndex, pageSize } = payload;
      const { pageConfig } = yield select(d => d[modalName]);
      yield put({ type: 'updateStore', payload: { pageConfig: { ...pageConfig, pageSize, current: pageIndex } } });
      yield put({ type: 'search', payload: { pageIndex, pageSize } });
    },
    //勾选中的状态变化
    *selectedKeysChange({ payload }, { call, put }) {
      const { selectedRowKeys } = payload;
      yield put({ type: 'updateStore', payload: { selectedRowKeys } });
    },
    // 查询条件重置
    *queryReset({ }, { put }) {
      yield put({ type: 'updateStore', payload: { queryList: cloneDeep(state.queryList) } });
    },


    //自定义方法
    *init({ payload = {} }, { call, put, select }) {

    },
    //
    *changeUserStatus({ payload }, { put, select, call }) {
      const resp = yield call(changeUserStatus, payload);
      if (resp.resultCode === 0) {
        messageInform('用户状态更改成功!', 'info');
        yield put({ type: 'search' });
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/globleManage/tableDemo') {
          dispatch({ type: 'updateStore', payload: cloneDeep(state) });
          dispatch({ type: 'init' });
          dispatch({ type: 'search' });
        }
      });
    },
  },
  reducers: {
    updateStore(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  },
}
