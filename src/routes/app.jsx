import React, {PropTypes} from 'react'
import {connect} from 'dva'
import Login from '../components/Login/Login'
import * as Layout from '../components/Layout/'
import * as skinStyle from '../css/skin.less'
import * as skinMeta from '../css/skinMeta.less'
import {Spin, Menu, Icon, Dropdown, Carousel, Badge,Select, Radio } from 'antd'
import { Link,hashHistory } from 'dva/router'
import {classnames, config, selector} from '../utils'
import {Helmet} from 'react-helmet'
import '../css/common.less'
import '../css/theme.less'
import Cookie from 'js-cookie'
import UpdateLoginPwd from '../components/Login/UpdateLoginPwd'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
const {Header, Bread, Footer, styles} = Layout
import Sider from '../components/Layout/Sider/SiderView'
const RadioGroup = Radio.Group;
const SubMenu = Menu.SubMenu
import YxTab from '../components/PageTabs'
import { getLocalData, setLocalData } from '../utils/globalScope'
import cx from 'classnames'
import {find, get} from 'lodash'
import $ from 'jquery'

const App = ({children, location, dispatch, app, loading}) => {
  const {login, loginButtonLoading, user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, updatePwdFlag,
    loginInfo, lang, menuConfig, validateImgUrl, count, disClick, myMsgList, myMsgTotal, currTabTitle,
    handleClickNavMenu, selectMenuItem, sellerInfo, imgLogo, isShowList,sellerName,operationName} = app

  // 登录模块参数配置
  const loginProps = {
    loading,
    loginButtonLoading,
    validateImgUrl,
    onOk (data) {
      for (let x in data){
        data[x] = $.trim(data[x])
      }
      dispatch({type: 'app/login', payload: data})
    },
    updateValidateImg() {
      dispatch({type: 'app/queryValidateImg'})
    },

    updatePassword(data){
      dispatch({type: 'app/openPwdUpdate', payload: { titleName: data, isForget: '忘记密码'}})
    },
  };

  // 内容头部区域参数配置
  const headerProps = {
    user,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    lang,
    menuConfig,
    switchMenuPopover () {
      dispatch({type: 'app/switchMenuPopver'})
    },
    logout () {
      dispatch({type: 'app/logout'})
    },
    updatePassword(data){
      dispatch({type: 'app/openPwdUpdate', payload: { titleName: data}})
    },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    },
    changeOpenKeys (openKeys) {
      dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}})
    },
    //语言转换
    langChange (lang) {
      //刷新页面
      history.go(0)
      dispatch({type: 'app/langChange', payload: {lang}})
    }
  };

  // 侧边栏参数配置
  const siderProps = {
    // siderFold,
    // darkTheme,
    // location,
    // navOpenKeys,
    // menuConfig,
    // selectMenuItem,
    // changeTheme () {
    //   dispatch({type: 'app/changeTheme'})
    // },
    // changeOpenKeys (openKeys) {
    //   localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
    //   dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}})
    // },
    switchSider () {
      dispatch({type: 'app/switchSider'})
    },
  };

  // 主题风格设置
  const bodyClass = ()=>{
    if(!selector.hasClass('skinProgramme_1')){
      selector.addClass(document.body, 'skinProgramme_1');
    }
  };
  bodyClass();

  // 用户操作时触发的函数
  let handleClickMenu = e => {
    e.key === 'logout' && headerProps.logout();
    e.key === 'forgetPassword' && headerProps.updatePassword('修改密码')
  };

  // 商户列表
  let sellersList = [];
  let defaultSeller = { id:  '', name: '' };

  // 判断是否需要商户切换
  if(!!config.isSwitchSel){
    //获取缓存在localStorage的商户数据
    let tmpSellersList = localStorage.getItem('sellersList');
    if(tmpSellersList){
      sellersList = JSON.parse(tmpSellersList);
    }
    let tmpMessage = localStorage.getItem('selMessgae');
    if(tmpMessage) {
      defaultSeller = JSON.parse(tmpMessage);
    }
  }

  // 获取当前用户所在的组织列表，以及当前的组织
  const userOrgList =  getLocalData('userOrgList');
  const currentOrg = getLocalData('currentOrg');

  //用户
  const menu = (
    <Menu onClick={handleClickMenu} className={styles.userOpr}>
      <Menu.Item key="forgetPassword">
        <a><i className="iconfont icon-xiugaimima"></i>修改密码</a>
      </Menu.Item>
      <Menu.Item key="logout">
        <a><i className="iconfont icon-zhuxiao"></i>注销</a>
      </Menu.Item>
    </Menu>
  );

  //商户列表
  const menu2 = (
    <Menu>
      <RadioGroup value={ defaultSeller.id } onChange={(e)=>{changeSeller(e.target.value)}} className={styles.sellerRadio}>
        {
          sellersList.map((x,i)=>{
            return <Radio value={x.id} key={'seller_'+i} className={cx(styles.sellerLabel,x.defaultStatus == 1 ? styles.defaultStatus : '')}>
              <span className={styles.sellerName}>{x.name}</span>
              {/*<a className={styles.defaultBtn} href="javascript:;">{x.defaultStatus == 1 ? '默认' : '设为默认'}</a>*/}
            </Radio>
          })
        }
      </RadioGroup>
    </Menu>
  );

  //消息列表
  const menu3 = (
    <Menu id="msgList">
      <div className={styles.msgList}>
        <div className={cx(styles.myMsg)}>
          <p>我的消息</p>
          <Link to="/messageManage/myMessage">查看更多</Link>
        </div>
        {
          myMsgList.length && myMsgList.map((item,i)=>{
            return <div key={'msg_'+i} className={styles.msg}>
              <Link to="/messageManage/myMessage">
                <span>【{item.title}】</span>
                <span>{item.time}</span>
              </Link>
            </div>
          })
        }
      </div>
    </Menu>
  );

  // 组织列表
  const orgListMenu = (
    <Menu onClick={e => orgChange(e.key)} className={styles.userOpr}>
      {
        currentOrg && userOrgList && userOrgList.length > 0
          ? userOrgList.map((item, index) => (
            <Menu.Item key={item.id + ''}>{item.name}</Menu.Item>
          ))
          : <Menu.Item key={'default'}>集团</Menu.Item>
      }
    </Menu>
  );

  //组织切换
  function orgChange(v) {
    if(currentOrg + '' === v + '') {
      return
    }
    let org = find(userOrgList, d => d.id + '' === v + '');
    setLocalData('currentUnitId', org ? org.unitId : '');
    setLocalData('selMessgae', {
      id: org ? org.unitId : ''
    });
    setLocalData('currentOrg', v);
    dispatch({
      type: 'app/updateSelCurOrg',
      payload: { id: v }
    })
    //回到初始页面
    hashHistory.push('/')
  }

  //切换商户
  const changeSeller = (value) => {
    dispatch({
      type: 'app/changeSeller',
      payload: { id: value }
    })
  };

  //判断使用写死的名称，还是使用配置名称
  let newName = config.name || '';
  if(config.wheName){
    //平台后台
    if('1' === '' + config.plaType){
      newName = operationName + config.nameSuffix;
    }
    // 商户后台
    if('2' === '' + config.plaType){
      newName = sellerName + config.nameSuffix;
    }
  }

  // 展示信息的操作
  $('body').on('mouseover', '#msgList', function(){
    $('#notice b').css('display','block')
  });
  $('body').on('mouseout', '#msgList', function(){
    $('#notice b').css('display','none')
  });

  return (
    <div>
      {/* 动画区域 */}
      <div key={location.pathname}>
       {/* <CSSTransitionGroup transitionName="lineAnimations" transitionAppear={true} transitionAppearTimeout={500}
          transitionEnter={false} transitionLeave={false}>
          <div style={{ background: '#00a2e3', height: '3px', zIndex: '1000',position: 'fixed'}} />
        </CSSTransitionGroup>*/}
      </div>

      {
        // 忘记密码弹出框
        updatePwdFlag && <UpdateLoginPwd loginInfo={loginInfo} count={count} disClick={disClick}/>
      }

      {/* 浏览器标签页设置 */}
      <Helmet>
        <title>{newName}</title>
        <link rel="icon" href={config.logoSrc} type="image/x-icon" />
        {/*config.iconFontUrl ? <script src={config.iconFontUrl}></script> : ''*/}
      </Helmet>

      {
        // 根据登录情况，给出相应的页面信息（登录页面、内容页面）
        login
        ? <div className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
          {/* 顶部导航条位置 */}
          <div className={styles.tophead}>
            {/* 左边区域 */}
            <div className={styles.headLeft}>
              {
                // Logo图片设置
                '' !== imgLogo ? <img style={{position: 'relative',top: '5px',width:'90px',height:'40px'}} className={styles.headLogo} src={imgLogo + '?x-oss-process=image/resize,m_lfit,h_40,w_90/format,png'} alt=""/> : <img style={{position: 'relative',top: '5px',width:'90px',height:'40px'}} className={styles.headLogo} src="data:image/png;base64,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" alt=""/>
              }
              <span className={styles.line}>|</span>
              {/* 名称设置 */}
              <p className={styles.headTitle}>{newName || ''}
                {/*<span style={{fontSize: '14px',marginLeft: '10px'}}>{sellerInfo&&sellerInfo.sellerName}</span>*/}
              </p>
            </div>
            {/* 右边区域 */}
            <div className={styles.headRight} id="routerApp_headRight">
              {
                // 组织切换区域（新）
                config.isSwitchOrg &&
                <div className={classnames(styles.org)}>
                  <Dropdown placement="bottomRight"
                    overlay={orgListMenu}
                    getPopupContainer={() => document.getElementById('routerApp_headRight')}>
                    <a>{currentOrg ? get(find(userOrgList, item => item.id + '' === currentOrg + ''), 'name', '集团') : '集团'}</a>
                  </Dropdown>
                </div>
              }
              {
                // 商户切换区域
                config.isSwitchSel &&
                <div className={styles.sellerList}>
                  <Dropdown overlay={menu2} getPopupContainer={() => document.getElementById('routerApp_headRight')} placement="bottomRight">
                    <a className="ant-dropdown-link" href="javascript:;">
                      <span>{defaultSeller.name}</span><Icon type="down" />
                    </a>
                  </Dropdown>
                </div>
              }
              {/* 用户操作区域 */}
              <div className={styles.user} style={{borderLeft: myMsgList.length ? '': 'none'}}>
                <Dropdown overlay={menu} getPopupContainer={() => document.getElementById('routerApp_headRight')}>
                  <a className="ant-dropdown-link" href="javascript:;">
                    <span className={styles.userPic}>
                      <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8IAEQgAGAAYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAMCBAEFAAYHCAkKC//EAMMQAAEDAwIEAwQGBAcGBAgGcwECAAMRBBIhBTETIhAGQVEyFGFxIweBIJFCFaFSM7EkYjAWwXLRQ5I0ggjhU0AlYxc18JNzolBEsoPxJlQ2ZJR0wmDShKMYcOInRTdls1V1pJXDhfLTRnaA40dWZrQJChkaKCkqODk6SElKV1hZWmdoaWp3eHl6hoeIiYqQlpeYmZqgpaanqKmqsLW2t7i5usDExcbHyMnK0NTV1tfY2drg5OXm5+jp6vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAQIAAwQFBgcICQoL/8QAwxEAAgIBAwMDAgMFAgUCBASHAQACEQMQEiEEIDFBEwUwIjJRFEAGMyNhQhVxUjSBUCSRoUOxFgdiNVPw0SVgwUThcvEXgmM2cCZFVJInotIICQoYGRooKSo3ODk6RkdISUpVVldYWVpkZWZnaGlqc3R1dnd4eXqAg4SFhoeIiYqQk5SVlpeYmZqgo6SlpqeoqaqwsrO0tba3uLm6wMLDxMXGx8jJytDT1NXW19jZ2uDi4+Tl5ufo6ery8/T19vf4+fr/2wBDAAEBAQEBAQIBAQIDAgICAwUDAwMDBQYFBQUFBQYHBgYGBgYGBwcHBwcHBwcICAgICAgKCgoKCgsLCwsLCwsLCwv/2wBDAQICAgMDAwUDAwULCAYICwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwv/2gAMAwEAAhEDEQAAAf3UoLDyuvY9X2FN+X7DU3cbV//aAAgBAQABBQJjcrY3TuZ020Av7MXFtcJuoJYkTR/oOxrFEiGP/9oACAEDEQE/Aez/2gAIAQIRAT8B7P/aAAgBAQAGPwJ+6fm4dlTq/K/fOUc/SujTOnSrMUgqC66sRRigD//EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/IbBK611Pj/hoyDg/FgjfPkeeKQMOr+L2YmXoo+JvRiZf/9oADAMBAAIRAxEAABBgiAD/xAAzEQEBAQADAAECBQUBAQABAQkBABEhMRBBUWEgcfCRgaGx0cHh8TBAUGBwgJCgsMDQ4P/aAAgBAxEBPxD8H//aAAgBAhEBPxD8H//aAAgBAQABPxCr4O8OPmUzPXET/wATsY9iqA+1Kknqz7cy3PfET1WqjfIIqPyUJRobvvreb/pV/wAT+6e40Fsd8u67f//Z" alt=""/>
                    </span>
                    <span className={styles.userName}>{user.name}</span>
                  </a>
                </Dropdown>
              </div>
              {
                // 信息展示区域
                config.isShowMsgList
                  ? <div className={styles.notice}>
                      {
                        myMsgList.length > 0 ? <div id="notice" className={styles.hasNotice}>
                          <Dropdown overlay={menu3} getPopupContainer={() => document.getElementById('routerApp_headRight')}>
                            <a className="ant-dropdown-link" href="javascript:;">
                              <i className="iconfont icon-xiaoxi1"></i>
                              <Badge count={myMsgTotal>99 ? '99+' : myMsgTotal} style={{backgroundColor:'#FFB840',right:'2px',top:'-12px',boxShadow: 'none'}}/>
                            </a>
                          </Dropdown>
                          <b></b>
                        </div>: <div className={cx(styles.noNotice)}>
                          <i className="iconfont icon-xiaoxi1"></i>
                        </div>
                      }
                    </div>
                  : ''
              }

            </div>
          </div>
          {/* 侧边栏区域 */}
          {
            !isNavbar
              ? <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}><Sider {...siderProps} /></aside>
              : ''
          }
          {/* 内容区域 */}
          <div className={styles.main}>
            <YxTab tabProps={children} headerProps={headerProps} location={location} currTabTitle={currTabTitle}/>
          </div>
        </div>
        : <div>
          <div className={styles.startsContent}>
            <div className={classnames(styles.starts)}></div>
          </div>

          <div className={classnames(styles.spin)}>
            <Spin tip="加载用户信息..." spinning={loading} size="large">
              <Login {...loginProps} />
            </Spin>
          </div>
        </div>
      }
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({app, loading}) => ({app, loading: loading.models.app}))(App)
