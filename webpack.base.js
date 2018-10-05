/**
 * 公用配置
 */

module.exports = {
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
    }, {
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