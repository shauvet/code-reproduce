import React, {PropTypes} from 'react'
import {Menu, Icon, Popover, Select} from 'antd'
import styles from './Header.less'
import Menus from './Menu'

const SubMenu = Menu.SubMenu
const Option = Select.Option

function Header({doGoLeft, doGoRight, doCloseAll, children, user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, updatePassword, langChange, lang, menuConfig}) {
  let handleClickMenu = e => {
    e.key === 'logout' && logout();
    e.key === 'forgetPassword' && updatePassword('修改密码')
  }

  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    menuConfig,
    changeOpenKeys
  }

  // 渲染选项卡
  const renderTabs = () => {
    return React.Children.map(children, (child, i) => {
      return React.cloneElement(child)
    })
  }

  // 左滑
  const goLeft = (e) => {
    // 阻止事件冒泡
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if(!!doGoLeft){
      doGoLeft()
    }
  }

  // 右滑
  const goRight = (e) => {
    // 阻止事件冒泡
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if(!!doGoRight){
      doGoRight()
    }
  }

  // 全部关闭
  const closeAllTabs = (e) => {
    // 阻止事件冒泡
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if(!!doCloseAll){
      doCloseAll()
    }
  }

  return (
    <div className={styles.header} style={{paddingLeft: '16px'}}>
      <div className={styles.tabBarStyle}>
        { renderTabs() }
      </div>

      {/*
        isNavbar && (
          <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible}
                   overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
            <div>
              <div className={styles.button} style={floatLeft}>
                <Icon type="bars"/>
              </div>
              {renderTabs()}
            </div>
          </Popover>
        )
      */}

      {/*
        !isNavbar && (
          <div style={{marginLeft: '16px'}}>
            {renderTabs()}
          </div>
        )
      */}

      <div className={styles.rightWarpper}>
        <div className={styles.scroll} onClick={ e => { closeAllTabs(e) } } title='关闭全部'>
          <i className={'iconfont icon-guanbiquanbu'} style={{'fontSize': '22px', 'color': '#999'}}></i>
        </div>
        <div className={styles.scroll} onClick={ e => { goLeft(e) } } title='向左滑动'>
          <i className={'iconfont icon-back'} style={{'fontSize': '18px', 'color': '#999'}}></i>
        </div>
        <div className={styles.scroll} onClick={ e => { goRight(e) } } title='向右滑动'>
          <i  className={'iconfont icon-forward'} style={{'fontSize': '18px', 'color': '#999'}}></i>
        </div>
      </div>
      {/*
       <div className={styles.rightWarpper}>
       <div className={styles.langSelect}>
       <Select defaultValue="en" style={{width: 60}} value={lang} onChange={langChange}>
       <Option value="en">EN</Option>
       <Option value="zh">中文</Option>
       </Select>
       </div>
       <div className={styles.button}>
       <Icon type="mail"/>
       </div>
       <Menu mode="horizontal" onClick={handleClickMenu}>
       <SubMenu style={{
       float: 'right',
       }} title={< span > <Icon type="user"/>
       {user.name} </span>}
       >
       <Menu.Item key="forgetPassword">
       <a>修改密码</a>
       </Menu.Item>
       <Menu.Item key="logout">
       <a><Icon type="logout"/>注销</a>
       </Menu.Item>
       </SubMenu>
       </Menu>
       </div>
       */}
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
