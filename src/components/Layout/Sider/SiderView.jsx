// 加载React
import React from 'react'
// 加载Component
import { Component } from 'react'
// 引入antd的组件
import { Menu, Icon, Input } from 'antd'
const Search = Input.Search
// 引入DVA路由组件
import { Link, hashHistory } from 'dva/router'

// 引入JQ
import $ from 'jquery'
// 引入lodash
import { get, includes, cloneDeep, isArray } from 'lodash'
// 引入样式管理
import cx from 'classnames'

// 加载当前组件样式
import styles  from './SiderStyle.less'
// 加载服务层
import { queryAuthPath } from './SiderServ'

// 站点配置
import { config } from '../../../utils'
// 静态的菜单 - 用于开发环境
import staticMenuConfig from '../../../config/menu'
// 弹出提示框
import { messageInform } from '../../../utils/notification'
// 权限过滤
import { authFilter } from '../../../utils/permission-control'

// Cookie对象
import Cookie from 'js-cookie'

// 存储左侧菜单展开、折叠状态
const setSiderFold = function(siderFold){
  sessionStorage.setItem('IS_SIDER_FOLD', siderFold)
}

// 获取左侧菜单展开、折叠状态
const getSiderFold = function(){
  return '' + sessionStorage.getItem('IS_SIDER_FOLD') === 'true'
}

// 存储左侧菜单打开的项
const setOpenKey = function(key){
  sessionStorage.setItem('SIDER_OPEN_KEY', key)
}

// 获取左侧菜单打开的项
const getOpenKey = function(){
  return sessionStorage.getItem('SIDER_OPEN_KEY')
}

// 存储左侧菜单选中的项
const setSelectedKey = function(key){
  sessionStorage.setItem('SIDER_SELECTED_KEY', key)
}

// 存储左侧菜单选中的项
const getSelectedKey = function(){
  return sessionStorage.getItem('SIDER_SELECTED_KEY')
}

// 递归查询菜单
const getMenus = function(menuArray, parentPath = '/'){

  // 遍历菜单列表
  return menuArray.map(item => {
    let linkTo = parentPath + item.key
    let copyLinkTo = linkTo

    // 菜单节点，有叶子节点，则递归遍历叶子
    if(item.child){
       return (
        <li key={ copyLinkTo } data-link={ item.key } className="ant-menu-submenu-inline ant-menu-submenu">
          <div className="ant-menu-submenu-title" style={{'paddingLeft': '24px'}}>
            <span>
              <i className='iconfont icon-Packup'></i>
              { item.name }
            </span>
          </div>
          <ul className="ant-menu ant-menu-inline ant-menu-sub ant-menu-hidden" role="menu">
            { getMenus(item.child, `${linkTo}/`) }
          </ul>
        </li>
      )
    // 最后一级节点，无叶子节点，附加资源ID，用于权限操作
    }else{
      linkTo += '?resId=' + item.id
    }
    // 最后一级节点，直接渲染
    return (
      <li key={ copyLinkTo } data-link={ item.key } className="ant-menu-item" role="menuitem" style={{'paddingLeft': '45px'}}>
        <a href='javascript:;' data-to={`/home${linkTo}`}>
          <span>
            <i className={`iconfont ${item.icon}`}></i>
            { item.name }
          </span>
        </a>
      </li>
    )
  })
}

// 递归查询菜单
const getMenusExt = function(menuArray, parentPath = '/'){

  // 遍历菜单列表
  return menuArray.map(item => {
    let linkTo = parentPath + item.key
    let copyLinkTo = linkTo

    // 菜单节点，有叶子节点，则递归遍历叶子
    if(item.child){
       return (
        <li key={ copyLinkTo } data-link={ item.key } className="ant-menu-submenu-vertical ant-menu-submenu">
          <div className="ant-menu-submenu-title">
            <span>
              <i className={`iconfont ${item.icon}`}></i>
            </span>
          </div>
          <ul className={`ant-menu ant-menu-vertical ant-menu-sub ant-menu-hidden`} role="menu">
            { getMenusExt(item.child, `${linkTo}/`) }
          </ul>
        </li>
      )
    // 最后一级节点，无叶子节点，附加资源ID，用于权限操作
    }else{
      linkTo += '?resId=' + item.id
    }
    // 最后一级节点，直接渲染
    return (
      <li key={ copyLinkTo } data-link={ item.key } className="ant-menu-item" role="menuitem">
        <a href='javascript:;' data-to={`/home${linkTo}`}>
          <span>
            <i className={`iconfont ${item.icon}`}></i>
            { item.name }
          </span>
        </a>
      </li>
    )
  })
}

// 导出组件
export default class extends Component{
  // 构造函数
  constructor(props, context) {
    super(props, context)
    this.state = {
      // 菜单配置列表
      menuConfig: [],
      loadedSuccess: false
    }
  }

  // 渲染菜单项
  renderMenuItems(siderFold){
    if(!this.state.menuConfig || 0 === this.state.menuConfig.length) return false

    if(!siderFold){
      return getMenus(this.state.menuConfig)
    }else{
      return getMenusExt(this.state.menuConfig)
    }
  }

  // 是否触发render函数
  shouldComponentUpdate(nextProps, nextState) {
    let self = this
    // 若已渲染过，则不重新渲染
    if(self.state.loadedSuccess){
      return false
    }else{
      return true
    }
  }

  /** 递归菜单数据
   * @param data 树形数据
   * @param level 树的层级
   * @param path 递归的路径
   * @param tmpObj 传入的buttonsObj
   */
  menuDataInit(data, level, path, tmpObj) {
    // level = 1 为 一级菜单, level = 2 为 二级菜单, 二级菜单的children为按钮权限
    if (level === 1) {
      data.map(item => {
        let currentPath = `${path}/${item.key}`
        this.menuDataInit(item.child, 2, currentPath, tmpObj)
      })
    } else if (level === 2) {
      data.map(item => {
        if (isArray(item.child)) {
          let currentPath = `${path}/${item.key}`
          let buttonsArray = cloneDeep(item.child)
          item.child = null
          tmpObj[currentPath] = buttonsArray.map(button => button.key)
        }
      })
    }
  }

  /** 菜单数据菜单与按钮分离
   * @param data 原始菜单数据
   */
  splitMenu(data) {
    // 校验传入数据为数组且不为空
    let basePath = '/home'
    let buttonsObj = {}
    let copyTreeData = cloneDeep(data)
    if (isArray(data) && data.length > 0) {
      this.menuDataInit(copyTreeData, 1, basePath, buttonsObj)
    }
    return {
      menus: copyTreeData,
      buttons: buttonsObj
    }
  }

  // 请求登录菜单权限
  async getMenuList(){
    try{
      // 查询结果集
      let result = await queryAuthPath({ applicationId: config.applicationId })
      // 返回菜单列表
      let menuList = []

      if('0' === '' + result.resultCode){
        sessionStorage.clear()
        if (!!result.data) {
          let resultObj = this.splitMenu(result.data)
          menuList = !!resultObj.menus ? resultObj.menus : []
          sessionStorage.setItem('buttons', JSON.stringify(resultObj.buttons))
          this.props.successCbk()
        } else {
          menuList = []
        }

        return Promise.resolve(menuList)
      }else{
        return Promise.reject(result.resultMsg || '未知的查询菜单错误')
      }

    }catch(e){
      return Promise.reject(e || '未知的查询菜单权限异常')
    }
  }

  // 本地菜单分离按钮权限
  localMenuInit(data) {
    let resultObj = this.splitMenu(data)
    let menuList = !!resultObj.menus ? resultObj.menus : []
    sessionStorage.setItem('buttons', JSON.stringify(resultObj.buttons))
    return menuList
  }

  // 查询登录菜单权限
  async getAuthPath(){
    let self = this
    // 没有登录，则中断执行
    if(!Cookie.get(config.cookie.auth)) return false

    try{
      // 查询结果
      let resp = null
      // 返回的菜单列表
      let menuList = []

      let needTempUserAuthFlag = get(config, 'needTempUserAuthFlag', false)
      // 开发环境
      if(!config.ENV || 'dev' === '' + config.ENV || 'development' === '' + config.ENV){
        // 设置了固定数据
        if(needTempUserAuthFlag){
          resp = { "resultCode": 0, "status": "success", "resultMsg": "OK", "data": config.defaultAuthMenu }
          menuList = authFilter(staticMenuConfig, resp.data)
          menuList = this.localMenuInit(menuList)
        }else{
          menuList = await self.getMenuList()
       }
      // 测试、预生产、生产环境等等
      }else{
        // 设置了固定数据
        if(needTempUserAuthFlag){
          resp = { "resultCode": 0, "status": "success", "resultMsg": "OK", "data": config.defaultAuthMenu }
          menuList = authFilter(staticMenuConfig, resp.data)
          menuList = this.localMenuInit(menuList)
        }else{
          menuList = await self.getMenuList()
        }
      }

      // 返回Promise对象
      return new Promise((resolve, reject) => {
        // 设置到祖状态机
        self.setState({
          menuConfig: menuList,
          loadedSuccess: (0 === menuList.length) ? false: true
        }, () => {
          resolve(menuList)
        })
      })

    }catch(e){
      messageInform(e || '未知的请求菜单权限异常', 'error')
      return Promise.reject(e)
    }
  }

  // 已插入DOM
  async componentDidMount(){
    let self = this

    await self.getAuthPath()

    if(getSiderFold()){
      $('#layoutCont').addClass('fold')
    }else{
      $('#layoutCont').removeClass('fold')
    }

    // 是否折叠菜单
    self.toggleSiderTree(getSiderFold())

    // 展开菜单事件监听
    self.onInlineMenuEvtListen()
    // 折叠菜单事件监听
    self.onVerticalMenuEvtListen()

    self.initDefaultMenu(getSiderFold())

    // 加载完成
    console.log('render ok loadedSuccess')
  }

  // 设置菜单状态
  setMenuStatus(elem, siderFold){
    let openKey = getOpenKey()
    let selectedKey =  getSelectedKey()

    // 菜单或叶子
    let hasRole = $(elem).attr('role')
    if(!hasRole){

      if('' + openKey === '' + $(elem).data('link')){
        $(elem).addClass('ant-menu-submenu-open')
        // 菜单的子节点 - 显示、隐藏
        if('menu' === '' + $(elem).find('ul').attr('role')){
          $(elem).find('ul').removeClass('ant-menu-hidden')
        }

        // 三角形角标 - 展开、折叠
        if(!siderFold){
          $(elem).find('.ant-menu-submenu-title i').removeClass('icon-Packup').addClass('icon-show')
        }
      }
    }else{
      if('' + selectedKey === '' + $(elem).data('link')){
        // 兄弟节点取消选中
        $(elem).siblings().removeClass('ant-menu-item-selected')
        // 当前叶子选中
        $(elem).addClass('ant-menu-item-selected')
      }
    }
  }

  // 打开默认的菜单和选中的项
  initDefaultMenu(siderFold){
    let self = this

    if(!siderFold){
      $('#MenuJsxInline ul.ant-menu-root').find('li').each((idx, elem) => {
        self.setMenuStatus(elem, siderFold)
      })
    }else{
      $('#MenuJsxVertical ul.ant-menu-root').find('li').each((idx, elem) => {
        self.setMenuStatus(elem, siderFold)
      })
    }
  }

  // 展开菜单事件监听
  onInlineMenuEvtListen(){

    $('#MenuJsxInline ul.ant-menu-root').find('li').on({

      // 菜单项点击
      click: function(e){
        // 阻止事件冒泡
        e.preventDefault()
        e.stopPropagation()
        // 菜单或叶子
        let hasRole = $(this).attr('role')

        // 菜单点击
        if(!hasRole){
          setOpenKey($(this).data('link'))

          let siblingsObj = $(this).siblings()
          siblingsObj.find('ul').hide()
          siblingsObj.find('.ant-menu-submenu-title i').removeClass('icon-show').addClass('icon-Packup')
          siblingsObj.removeClass('ant-menu-submenu-active')

          // 菜单的子节点 - 显示、隐藏
          if('menu' === '' + $(this).find('ul').attr('role')){
            $(this).find('ul').slideToggle(150)
          }
          // 三角形角标 - 展开、折叠
          let iconObj = $(this).find('.ant-menu-submenu-title i')
          if(iconObj.hasClass('icon-Packup')){
            iconObj.removeClass('icon-Packup').addClass('icon-show')
          }else{
            iconObj.removeClass('icon-show').addClass('icon-Packup')
          }
          // 菜单目录 - 展开、折叠
          $(this).toggleClass('ant-menu-submenu-open')
        // 叶子点击
        }else{
          setSelectedKey($(this).data('link'))
          // 清空其它叶子的样式
          $('#MenuJsxInline ul.ant-menu-root').find('li').removeClass('ant-menu-item-selected')
          // 兄弟节点取消选中
          $(this).siblings().removeClass('ant-menu-item-selected')
          // 当前叶子选中
          $(this).addClass('ant-menu-item-selected')
          // 取到跳转的链接
          let linkTo = $(this).find('a').data('to')
          // 跳转
          hashHistory.push(linkTo)
        }
      },
      // 鼠标移入
      mouseover: function(e){
        // 阻止事件冒泡
        e.preventDefault()
        e.stopPropagation()
        // 菜单或叶子
        let hasRole = $(this).attr('role')
        // 菜单移入
        if(!hasRole){
          $(this).siblings().removeClass('ant-menu-submenu-active')
          $(this).addClass('ant-menu-submenu-active')

        // 叶子节点移入
        }else{
          $(this).siblings().removeClass('ant-menu-item-active')
          $(this).addClass('ant-menu-item-active')
        }
      },
      // 鼠标移出
      mouseout: function(e){
        // 阻止事件冒泡
        e.preventDefault()
        e.stopPropagation()
        // 菜单或叶子
        let hasRole = $(this).attr('role')
        // 菜单移出
        if(!hasRole){
          $(this).removeClass('ant-menu-submenu-active')

        // 叶子节点移出
        }else{
          $(this).removeClass('ant-menu-item-active')
        }
      }

    })
  }

  // 折叠菜单事件监听
  onVerticalMenuEvtListen(){
    $('#MenuJsxVertical ul.ant-menu-root').find('li').on({
      // 菜单项点击
      click: function(e){
        // 阻止事件冒泡
        e.preventDefault()
        e.stopPropagation()
        // 菜单或叶子
        let hasRole = $(this).attr('role')
        if(!hasRole){
          setOpenKey($(this).data('link'))
        }else{
          setSelectedKey($(this).data('link'))
          // 清空其它叶子的样式
          $('#MenuJsxVertical ul.ant-menu-root').find('li').removeClass('ant-menu-item-selected')
          // 关闭所有子菜单
          $('#MenuJsxVertical ul.ant-menu-root').find('ul').addClass('ant-menu-hidden')
          // 兄弟节点取消选中
          $(this).siblings().removeClass('ant-menu-item-selected')
          // 当前叶子选中
          $(this).addClass('ant-menu-item-selected')
          // 取到跳转的链接
          let linkTo = $(this).find('a').data('to')
          // 跳转
          hashHistory.push(linkTo)
        }
      },
      // 鼠标移入
      mouseenter: function(e){
        // 阻止事件冒泡
        e.preventDefault()
        e.stopPropagation()
        // 菜单或叶子
        let hasRole = $(this).attr('role')
        if(!hasRole){
          $(this).addClass('ant-menu-submenu-open ant-menu-submenu-active')
          $(this).find('ul').removeClass('ant-menu-hidden')
        }
        // 叶子节点移入
        else{
          $(this).siblings().removeClass('ant-menu-item-active')
          $(this).addClass('ant-menu-item-active')
        }
      },
      // 鼠标移出
      mouseleave: function(e){
        // 阻止事件冒泡
        e.preventDefault()
        e.stopPropagation()
        // 菜单或叶子
        let hasRole = $(this).attr('role')
        if(!hasRole){
          $(this).removeClass('ant-menu-submenu-open ant-menu-submenu-active')
          $(this).find('ul').addClass('ant-menu-hidden')
        }
        // 叶子节点移出
        else{
          $(this).removeClass('ant-menu-item-active')
        }
      }
    })
  }

  // 切换菜单树
  toggleSiderTree(siderFold){
    console.log('siderFold:', siderFold)
    if(!siderFold){
      $('#MenuJsxInline').removeClass('displayHide').addClass('displayShow')
      $('#MenuJsxVertical').removeClass('displayShow').addClass('displayHide')
    }else{
      $('#MenuJsxVertical').removeClass('displayHide').addClass('displayShow')
      $('#MenuJsxInline').removeClass('displayShow').addClass('displayHide')
    }
  }

  // 展开折叠
  toggleFold(e){
    // 阻止事件冒泡
    e.preventDefault()
    e.stopPropagation()

    let layoutCont = $('#layoutCont')
    layoutCont.toggleClass('fold')

    // 菜单是否折叠
    let hasFold = !getSiderFold()

    // 展开、折叠
    let siderFold = hasFold
    // 存储到sessionStorage
    setSiderFold(siderFold)
    // 切换菜单树
    this.toggleSiderTree(siderFold)
  }

  // 菜单上下滑
  menuUpDown (e, oper){
    // 阻止事件冒泡
    e.preventDefault()
    e.stopPropagation()

    let top = parseInt($('#MenuJsx').css('top'))
    let lastChildTop = $('#MenuJsx > li:last-child').offset().top

    if(oper == 'up'){
      if(lastChildTop > 269){
        $('#MenuJsx').css('top',(top - 48) + 'px' )
      }
      console.log('上滑')
    }else if(oper == 'down'){
      if(top < 97){
        $('#MenuJsx').css('top',(top + 48) + 'px' )
      }else{
        $('#MenuJsx').css('top', 97 + 'px' )
      }
      console.log('下滑')
    }
  }

  // 展示搜索结果 keys要展示的键名
  showSearchHandler(keys, isShowAll){
    // console.log('isShowAll:', isShowAll)
    // 节点的key值
    let elemKey = ''
    // 隐藏的对象
    let hideObj = null
    // 检索所有菜单
    $('#MenuJsxInline ul.ant-menu-root').find('li').each((idx, elem) => {
      elemKey = '' + $(elem).data('link')

      // 非检索结果菜单处理
      if(!includes(keys, elemKey)){
        hideObj = $(elem)[0]
        // 如果是菜单才隐藏
        if($(hideObj).hasClass('ant-menu-submenu')){
          $(hideObj).hide()
        }

      // 检索到的结果
      }else{
        // 仅展示搜索的结果
        if(!isShowAll){
          // 当前菜单打开状态
          $(elem).addClass('ant-menu-submenu-open')
          // 菜单的子节点 - 显示、隐藏
          if('menu' === '' + $(elem).find('ul').attr('role')){
            $(elem).find('ul').removeClass('ant-menu-hidden')
          }
          // 三角形角标 - 展开、折叠
          $(elem).find('.ant-menu-submenu-title i').removeClass('icon-Packup').addClass('icon-show')
          // 显示当前菜单
          $(elem).show()

        // 展示所有，则所有节点折叠
        }else{
          // 当前菜单关闭状态
          $(elem).removeClass('ant-menu-submenu-open')
          // 隐藏菜单的子节点
          if('menu' === '' + $(elem).find('ul').attr('role')){
            $(elem).find('ul').addClass('ant-menu-hidden')
          }
          // 三角形角标 - 展开、折叠
          $(elem).find('.ant-menu-submenu-title i').removeClass('icon-show').addClass('icon-Packup')
          // 显示当前菜单
          $(elem).show()
        }
      }
    })
  }

  // 获取搜索结果
  getSearchResult(tmpArr, val){
    let result = [], self = this

    // 过滤包含key值的节点
    tmpArr.map((m, i) => {
      if(m.child){
        m.child.map((mc, j) => {
          if(('' + mc.name).indexOf('' + val) > -1){
            result.push(m)
          }
        })
      }
      if(('' + m.name).indexOf('' + val) > -1){
        result.push(m)
      }
    })
    return result
  }

  // 获取所有结果的keys
  getSearchKeys(tmpArr, val){
    // 菜单列表
    let keys = [], result = []

    // 菜单为空，则不执行
    if(0 === tmpArr.length) return false

    // 不输入，则检索所有节点
    if(!val){
      result = tmpArr
    // 输入，则根据关键字检索
    }else{
      // 过滤包含key值的节点
      result = this.getSearchResult(tmpArr, val)
    }

    // 如果过滤后的节点有值，则取出key值
    if(result && result.length > 0){
      result.map((res, i) => {
        keys.push(res.key)
      })
    }
    // 返回过滤后菜单节点的keys
    return keys
  }

  // 点击搜索处理
  onSearchHandler(val){
    let tmpArr = this.state.menuConfig
    let keys = this.getSearchKeys(tmpArr, val)
    let isShowAll = !val ? true: false

    if(0 !== keys.length && keys.length === tmpArr.length){
      this.showSearchHandler(keys, isShowAll)
    }else{
      this.showSearchHandler(keys, isShowAll)
    }
  }

  // 折叠菜单时

  // 初始状态或状态变化会触发render
  render(){
    console.log('sider render')

    if(0 === this.state.menuConfig.length){
      return <div></div>
    }else{
      return (
        <div>
          {/* 展开菜单 */}
          <div id="MenuJsxInline" className='siderBlueSkin'>
            <div className='changeFold'>
              {/* 左侧栏顶部图标 */}
              <div className={styles.button} onClick={ (e) => { this.toggleFold(e) }}>
                <i className="iconfont icon-menufold"/>
              </div>
              <div className='siderSearchBtn'>
                <Search
                  placeholder="请输入关键词，例：产品"
                  style={{ width: 178, backgroundColor: '#1F2543' }}
                  onSearch={value => this.onSearchHandler(value) }
                />
              </div>
            </div>
            {/* 菜单列表 */}
            <ul className="ant-menu ant-menu-inline menuLeft ant-menu-dark ant-menu-root" role="menu" aria-activedescendant="">
              {/* 左侧菜单列表 */}
              { this.renderMenuItems(false) }

              {/* 空菜单 - 用于底部空隙 */}
              <li className="ant-menu-item" role="menuitem" aria-selected="false" style={{'cursor': 'default', 'paddingLeft': '24px'}}></li>
            </ul>
          </div>

          {/* 折叠菜单 */}
          <div id="MenuJsxVertical" className='siderBlueSkin siderBlueFold displayHide'>
            <div className='changeFold'>
              {/* 左侧栏顶部图标 */}
              <div className='button' onClick={ (e) => { this.toggleFold(e) }}>
                <i className="iconfont icon-menufold"/>
              </div>

              {/* 左侧栏上滑按钮 */}
              <div className='button' onClick={(e) => { this.menuUpDown(e, 'up') }}>
                <Icon type="up" style={{fontSize: '18px'}}/>
              </div>
            </div>

            {/* 菜单列表 */}
            <ul className="ant-menu ant-menu-vertical menuLeft ant-menu-dark ant-menu-root" role="menu" aria-activedescendant="" id="MenuJsx">
              {/* 左侧菜单列表 */}
              { this.renderMenuItems(true) }

              {/* 空菜单 - 用于底部空隙 */}
              <li className="ant-menu-item" role="menuitem" aria-selected="false" style={{'cursor': 'default'}}></li>
            </ul>

            {/* 左侧栏下滑按钮 */}
            <div className='button down' onClick={(e) => { this.menuUpDown(e, 'down') }}>
              <Icon type="down" style={{fontSize: '18px'}}/>
            </div>
          </div>

        </div>
      )
    }
  }
}
