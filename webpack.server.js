/**
 * 服务端
 */
const path = require('path')
const merge = require('webpack-merge')
const baseCfg = require('./webpack.base.js')

const nodeExternals = require('webpack-node-externals')

const serverCfg = {
  target: 'node',                     // webpack打包node端代码，需加这个选项
  mode: 'development',
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')      //__dirname: 服务器端代码的根路径
  },
  externals: [nodeExternals()],    // externals: 提供"从输出的bundle中排出依赖"的方法。
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

module.exports = merge(baseCfg, serverCfg)