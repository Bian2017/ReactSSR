/**
 * 服务端
 */
const path = require('path')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',                     // webpack打包node端代码，需加这个选项
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')      //__dirname: 服务器端代码的根路径
  },
  externals: [nodeExternals()],    // externals: 提供"从输出的bundle中排出依赖"的方法。
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {                    // 配置额外的配置项
        presets: [                  // 在编译的时候，通过presets设置编译一些规则
          'react',                  // 支持react，需安装相应依赖包babel-preset-react
          'stage-0',                // 支持新的语法，需安装相应依赖包babel-preset-stage-0 
          [
            'env',                  // 在打包的过程中，根据环境做一些适配，需安装依赖包babel-preset-env
            {
              targets: {
                browsers: ['last 2 versions']   // 打包编译的过程中，babel会去兼容目前所有主流浏览器的最后两个版本
              }
            }
          ]
        ]
      }
    }]
  }
}