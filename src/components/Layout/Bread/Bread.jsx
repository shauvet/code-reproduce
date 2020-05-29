import React, { PropTypes } from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './Bread.less'
import { menu } from '../../../utils'
import $ from 'jquery'

let pathSet = [], fullPath = ''
const getPathSet = function (menuArray, parentPath) {
  parentPath = parentPath || ''
  menuArray.forEach(item => {
    fullPath = '/home/' + parentPath + item.key
    pathSet[(fullPath).replace(/\//g, '-').hyphenToHump()] = {
      path: fullPath,
      name: item.name,
      icon: item.icon || '',
      clickable: item.clickable === undefined,
    }
    if (item.child) {
      getPathSet(item.child, `${parentPath}${item.key}/`)
    }
  })
}
getPathSet(menu)

function Bread ({ location, app }) {
  let pathNames = []
  location.pathname.substr(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push((`${pathNames[key - 1]}-${item}`).hyphenToHump())
    } else {
      pathNames.push((`-${item}`).hyphenToHump())
    }
  })

  const breadsArray = pathNames.filter(item => (item in pathSet))
  const breads = breadsArray.map((item, key) => {
    const content = (
      // <span>{pathSet[item].icon
      //     ? <Icon type={pathSet[item].icon} style={{ marginRight: 4 }} />
      //     : ''}{pathSet[item].name}</span>
      <span>{pathSet[item].name}</span>
    )
    return (
      <Breadcrumb.Item key={key}>
          {content}
      </Breadcrumb.Item>
    )
  })

  //详情页没在菜单的情况，面包屑需要显示标题
  if(breads && breads.length < 2) {
    let currTabTitle = app.currTabTitle;
    if(typeof app.currTabTitle === 'object') {
      currTabTitle = app.currTabTitle.title;
    }
    if(!currTabTitle){
      currTabTitle = $('.tabPage .active a span').text()
    }
    breads.push((<Breadcrumb.Item key="2">
      <span>{currTabTitle} </span>
    </Breadcrumb.Item>))
  }

  /*{((breadsArray.length - 1) !== key && pathSet[item].clickable)
          ? <Link to={pathSet[item].path}>
              {content}
          </Link>
          : content}*/

  return (
    <div className={styles.bread}>
      <Breadcrumb separator=">">
        <Breadcrumb.Item >
          {/*<Link to="/businessmanHome">*/}
            <Icon type="home" />
          <span><Link to="/">首页</Link></span>
          {/*</Link>*/}
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object,
}

export default Bread
