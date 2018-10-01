/**
 * 客户端(浏览器端)
 */
const path = require('path')
const merge = require('webpack-merge')
const baseCfg = require('./webpack.base.js')

const clientCfg = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')      //__dirname: 服务器端代码的根路径
  }
}

module.exports = merge(baseCfg, clientCfg)