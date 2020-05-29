import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import menuConfig from '../../config/menu'
import {homePath} from '../../config/config'
import _ from 'lodash'
import cx from 'classnames'

let menuItemsCache = null

const topMenus = menuConfig.map(item => item.key)
const getMenus = function (menuArray, siderFold, parentPath = '/', navOpenKeys) {

  if(!!menuArray && menuArray.length > 0){
    return menuArray.map(item => {
      let linkTo = parentPath + item.key
      let copyLinkTo = linkTo
      let flag = true;
      navOpenKeys && navOpenKeys.map(k => {
        if(k == linkTo){
          flag = false;
        }
      })
      let open = flag ? 'icon-Packup' : 'icon-show'
      if (item.child) {
        return (
          <Menu.SubMenu key={copyLinkTo} title={<span>{siderFold ? <i className={"iconfont " + item.icon }></i> :<i className={"iconfont " + open }></i>}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
            {getMenus(item.child, siderFold, `${linkTo}/`)}
          </Menu.SubMenu>
        )
      }else{
        linkTo += '?resId=' + item.id
      }
      return (
        <Menu.Item key={copyLinkTo}>
          <Link to={linkTo}>
            {item.icon ?  <i className={"iconfont " + item.icon }></i> : ''}
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    })
  }
}
const getSelectedKeys =  (path) => {
  let keys = [];
  if(path === '/') {
    path = homePath
  }
  let paths = path.match(/\/[^\/]*/ig);
  paths.forEach((d,i) => {
    i === 0 ? keys.push(d) : keys.push(keys[i-1] + d)
  })
  return keys
}


function Menus ({siderFold, darkTheme, location, navOpenKeys, changeOpenKeys, menuConfig }) {

  if(!menuItemsCache){
    menuItemsCache = getMenus(menuConfig, siderFold, '/', _.isEmpty(navOpenKeys) ? [location.pathname.slice(0,(location.pathname.indexOf('/',1) ))]: navOpenKeys)
  }
  const onOpenChange = (openKeys) => {
    changeOpenKeys(openKeys)
  }
  let menuProps = !siderFold ? {
    onOpenChange,
    openKeys: _.isEmpty(navOpenKeys) ? getSelectedKeys(location.pathname) : navOpenKeys,
  } : {};

  return (
    <Menu
      {...menuProps}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      selectedKeys={[location.pathname === '/' ? homePath: location.pathname ]}
      className={cx('menuLeft',(darkTheme? '': 'white-theme'))}
      id="MenuJsx"
    >
      {menuItemsCache}
      <Menu.Item style={{cursor: 'default'}}></Menu.Item>
    </Menu>
  )
}


Menus.propTypes = {
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  isNavbar: PropTypes.bool,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Menus
