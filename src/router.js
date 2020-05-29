import React, { PropTypes } from 'react'
import { Router, hashHistory, routerRedux, Route } from 'dva/router'
import AppView from './components/Layout/App/appView'
import Cookie from 'js-cookie'
import config from './config/config'

// 全局注入路由路径键值对映射
if (typeof window !== 'undefined') {
  window.MODULE_TO_ROUTES = {}
  window.ROUTES_TO_MODEL = {}
  window.CURR_TAB_KEY = '/'
}

// DVA注册model方法
const cached = {}
const registerModel = (app, model, routeObj) => {
  let { namespace, path } = getPickRouteObj(model, routeObj)
  model.pathname = path
  if (!cached[namespace]) {
    if (!!routeObj) {
      model.namespace = namespace
    }
    app.model(model)
    cached[namespace] = 1
  }
}

// 修改路由路径
const getRoutePath = function (routeObj) {
  let path = ''
  if (routeObj.path.indexOf('/home') === -1) {
    path = `/home/${routeObj.path}`
  } else {
    path = routeObj.path
  }
  return path
}

// 获得新的路由对象
const getPickRouteObj = function (model, routeObj) {
  let obj = {}
  if (!routeObj) {
    obj.namespace = model.namespace
    obj.path = ''
  } else {
    obj.namespace = routeObj.namespace
    obj.path = getRoutePath(routeObj)
  }
  return obj
}

// 设置路径键值对到全局models2Routes
const setModel2Routes = function (app, route) {
  if (!!route.routeObj) {
    let routeObj = route.routeObj
    let copyRouteObj = JSON.parse(JSON.stringify(routeObj))
    copyRouteObj.path = getRoutePath(copyRouteObj)
    // app._models[0].state.model2Routes[route.pathKey] = route.path
    window.MODULE_TO_ROUTES[routeObj.namespace] = routeObj
    window.ROUTES_TO_MODEL[copyRouteObj.path] = copyRouteObj
  }
}

// 路由路径键值对映射
const getPathKeyRoutes = function (app, routes) {
  if (routes.length !== 0) {
    let rootRoute = routes[2]
    let { childRoutes } = rootRoute

    if (!childRoutes || childRoutes.length === 0) {
      setModel2Routes(app, rootRoute)
    } else {
      childRoutes.push(rootRoute)
      childRoutes.forEach((route, i) => {
        setModel2Routes(app, route)
      })
    }
  }
}

// 进入路由之前的处理，检查是否已登录
const beforeEnter = async (nextState, replace, next) => {
  // 进入路由先解绑所有的排序事件
  // document.onkeydown = "";
  next()
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: () => {
        return <div> {hashHistory.push('/home')} </div>
      },
    },
    {
      path: '/login',
      name: '登录',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./components/Layout/Login/loginView').default)
        }, 'loginView')
      },
    },
    {
      path: '/home',
      name: '默认首页',
      component: AppView,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          let tmpAuth = Cookie.get(config.cookie.auth)
          if (tmpAuth == 'undefined' || tmpAuth == 'null' || !tmpAuth) {
            hashHistory.push('/login')
          }
          cb(null, require('./routes/error/'))
        }, 'error')
      },
      childRoutes: [
        // 样式测试
        {
          path: 'test',
          name: 'test',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./test/testMod'))
              cb(null, require('./test/testView'))
            }, 'test')
          },
          onEnter: beforeEnter,
        },
        {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
          onEnter: beforeEnter,
        },
      ],
    },
  ]

  getPathKeyRoutes(app, routes)
  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
