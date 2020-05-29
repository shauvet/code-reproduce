import React, {PropTypes} from 'react'
import {Icon, Switch} from 'antd'
// 获取样式类名
import cx from 'classnames'
import styles from './Layout.less'
import Menus from './Menu'
import {classnames, config} from '../../utils'
import $ from 'jquery'
const floatLeft = {
  'float': 'left'
}

function Sider({siderFold, darkTheme, location, changeTheme, navOpenKeys, changeOpenKeys, menuConfig, isNavbar, switchSider, handleClickNavMenu, selectMenuItem}) {
  const menusProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
    menuConfig,
    isNavbar,
    switchSider,
    handleClickNavMenu,
    selectMenuItem
  }
  const logoTitleStyle = darkTheme ? {color: 'white'}: {}
  const menuUpDown = (oper) =>{
    let top = parseInt($('#MenuJsx').css('top'));
    let lastChildTop = $('#MenuJsx > li:last-child').offset().top
    if(oper == 'up'){
      if(lastChildTop > 269){
        $('#MenuJsx').css('top',(top - 48)+'px' )
      }

    }else if(oper == 'down'){
      if(top < 97){
        $('#MenuJsx').css('top',(top + 48)+'px' )
      }else{
        $('#MenuJsx').css('top',97+'px' )
      }
    }
  }
  return (
    <div className={"siderBlueSkin" + (siderFold ? ' siderBlueFold': '')}>
      <div className="changeFold">
        <div className={styles.button} onClick={switchSider}>
          {
            siderFold ? <i className="iconfont icon-menuunfold"></i> : <i className="iconfont icon-menufold"></i>
          }
        </div>
        {
          siderFold ? <div className={styles.button} onClick={()=>{menuUpDown('up')}}>
            <Icon type="up" style={{fontSize: '18px'}}/>
          </div> : null
        }

      </div>
      <Menus {...menusProps} />
      {
        siderFold ?
          <div className={cx(styles.button,styles.down)} onClick={()=>{menuUpDown('down')}}>
            <Icon type="down" style={{fontSize: '18px'}}/>
          </div> : null
      }
    </div>
  )
}

Sider.propTypes = {
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider
