/*
 * @Date: 2020-04-09 22:29:12
 * @LastEditors: guangling
 * @LastEditTime: 2020-04-30 18:24:35
 */
import './index.html'
import 'babel-polyfill'
import createLoading from 'dva-loading'
import dva from 'dva'
import appMod from './components/Layout/App/appMod'
import router from './router'

// 1. Initialize
const app = dva(createLoading())

// 2. Model
app.model(appMod)

// 3. Router
app.router(router)

// 4. Start
app.start('#root')
