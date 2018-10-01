

## CSR

数据脱水和数据注水概念。

预渲染技术

### CSR劣势

TTFP(首屏展示时间)时间比较长，不具备SEO(搜索引擎优化)排名的条件。


### React客户端渲染流程

+ 浏览器发送请求；
+ 服务器返回HTML；
+ 浏览器发送bundle.js请求；
+ 服务器返回bundle.js；
+ 浏览器执行bundle.js中的React代码；

### React服务端渲染流程

+ 浏览器发送请求；
+ 服务器运行React代码生成的页面；
+ 服务器返回页面；

### 在服务器端编写React组件


## webpack配置

### 1.设置target

若打包node端代码，需加这个选项：

```JS
module.exports = {
  target: 'node',      
}
```

**原因:**

```JS
// 服务器端
require('path')

// 浏览器端(客户端)
require('path')
```

同样一段代码，在Node端，是不会打包path里的内容。但在浏览器端，则需打包path里的内容到最终的bundle文件中。所以在打包过程中需告诉webpack打包的是服务器端代码还是浏览器端代码。

#### 1.1 插件webpack-node-externals

在打包的时候，报如下错误：

```
WARNING in ./node_modules/_express@4.16.3@express/lib/view.js 81:13-25
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/_express@4.16.3@express/lib/application.js
 @ ./node_modules/_express@4.16.3@express/lib/express.js
 @ ./node_modules/_express@4.16.3@express/index.js
```

写node代码的时候，设置了"target:node"，于是在加载核心模块(path)的时候，webpack便不会打包核心模块代码。但是在引入node_modules里面的依赖包时，仅仅这样是不行的，此时需安装第三方插件webpack-node-externals，这样会忽略所有来自node_modules里面的依赖包。

```JS
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',                   
  externals: [nodeExternals()],  // in order to ignore all modules in node_modules folder
  ***
}
```