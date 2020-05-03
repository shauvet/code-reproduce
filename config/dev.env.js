/*
 * @Date: 2020-04-07 14:37:50
 * @LastEditors: guangling
 * @LastEditTime: 2020-04-07 14:37:51
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})