/*
 * @Date: 2020-04-10 15:07:19
 * @LastEditors: guangling
 * @LastEditTime: 2020-05-01 23:05:10
 */
import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { hashHistory } from 'dva/router'
import appMod from './components/Layout/App/appMod'
import router from './router'

// const Window = require('window');

// const window = new Window();

// if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }

// 1. Initialize
const app = dva()

app.use(createLoading())

// 2. Model
// app.model(require('./models/app'))
app.model(appMod)
// 3. Router
// app.router(require('./router'))
app.router(router)

// 4. Start
app.start('#root')
