// 加载React
import React from 'react'
// 加载Component
import { Component, PureComponent } from 'react'
// 样式管理器
import cx from 'classnames'
// 定义html head
import {Helmet} from 'react-helmet'

// 全局皮肤样式
import * as skinStyle from '../../../css/skin.less'
// 公共样式
import '../../../css/common.less'
// 主题样式
import '../../../css/theme.less'
// 当前组件样式
import './appStyle.less'
// 给文档添加皮肤样式
import bodyClass  from '../bodyClass'
// 站点配置
import {config} from '../../../utils'

// 头部组件
import Banner from '../Banner/bannerView'
// 左侧栏组件
import Sider from '../Sider/SiderView'
// 页签组件
import YxTab from '../../../components/PageTabs'

// 引入DVA路由组件
import { Link, hashHistory } from 'dva/router'

// 进入头部组件
import Header from '../Header/headerView'
// 引入底部组件
import Footer from '../Footer/footerView'
// 引入面包屑
import Bread from '../Bread/Bread'

import { connect } from 'dva'

import { has, get } from 'lodash'

// 设置当前tab的key
const setCurrTabKey = (location) => {
  window.CURR_TAB_KEY = location.pathname
}

// 导出组件
function AppView({children, location, dispatch, app, loading}){

  if(has(config, 'noTab')){
    // 设置当前tab的key
    setCurrTabKey(location)
  }

  // 当前选项卡 - 标题 + 路由对象
  const { currTabTitle, menuSuccess } = app

  // 给文档添加皮肤样式
  bodyClass()

  // 菜单加载完成后的回调
  const getMenuSuccess = () => {
    dispatch({
      type: 'app/getMenuSuccess',
      payload: {}
    })
  }

  // 渲染内容
  return (
    <div className='layout-ns-g'>
      {/* 重定义html的head */}
      <Helmet>
        <title>{ config.name }</title>
      </Helmet>

      <div className='layout' id="layoutCont">
        {/* 顶部banner - 包含logo、系统名称、登录者名称等 */}
        <Banner/>

        {/* 左侧栏 - 包含操作菜单 */}
        <aside className='sider'>
          <Sider successCbk={() => getMenuSuccess()}/>
        </aside>

        {/* 右侧内容区 - 包含页签 */}
        {
          (get(config, 'needTempUserAuthFlag', false) || menuSuccess) && <div className='main'>
            {/* 无页签的情况 */}
            {
              has(config, 'noTab') && (
                <div>
                  <Bread location={location}/>
                  <div name='tabContainer' style={{'margin': '16px'}}>
                    <div key={location.pathname}>
                      { children }
                    </div>
                  </div>
                  <Footer />
                </div>
              )
            }

            {/* 有页签的情况 */}
            {
              !has(config, 'noTab') && (
                <YxTab
                  app={app}
                  tabProps={ children }
                  headerProps={null}
                  location={ location }
                  currTabTitle={ currTabTitle }
                />
              )
            }
          </div>
        }

      </div>
    </div>
  )

}

export default connect(({app, loading}) => ({app, loading: loading.models.app}))(AppView)
