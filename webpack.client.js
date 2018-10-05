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
  },
  module: {
    rules: [{
      test: /\.css?$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,              // 支持CSS模块
          localIdentName: '[name]_[local]_[hash:base64:5]'    //定制class名字
        }
      }]
    }]
  }
}

module.exports = merge(baseCfg, clientCfg)