/*
 * @Date: 2020-05-03 12:22:48
 * @LastEditors: guangling
 * @LastEditTime: 2020-05-03 12:26:06
 */
import { Router } from 'react-router'

export default function Routers({ history }) {
  const routes = [
    {
      path: '/',
      component: () => {
        return <div>home</div>
      }
    }
  ]

  return <Router history={history} routes={routes}></Router> 
}