

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


## 一、webpack配置

### 1. 设置target

打包node端代码，需加这个选项：

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

### 2. 设置externals

在打包的时候，报如下Warning：

```
WARNING in ./node_modules/_express@4.16.3@express/lib/view.js 81:13-25
Critical dependency: the request of a dependency is an expression
 @ ./node_modules/_express@4.16.3@express/lib/application.js
 @ ./node_modules/_express@4.16.3@express/lib/express.js
 @ ./node_modules/_express@4.16.3@express/index.js
```

写node端代码的时候，虽然设置了"target:node"，webpack在加载核心模块(如path)的时候便不会打包核心模块代码。但是在引入node_modules里面的依赖包时，仅仅这样是不行的，此时需安装第三方插件webpack-node-externals，这样会忽略所有来自node_modules里面的依赖包。

```JS
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',                   
  externals: [nodeExternals()],  // in order to ignore all modules in node_modules folder
  ***
}
```

## 二、服务端渲染

在React中，虚拟DOM是真实DOM的一个javascript对象映射。实际上，React这些组件在编译或者运行过程中，一开始都是虚拟DOM，换句话说，都是javascript对象。这样就带来一个好处，在做服务器端渲染，就可以将虚拟DOM(javascript对象)很方便的转化成字符串，服务器端就可以给浏览器提供渲染好的字符串。

因为虚拟DOM是一个JS对象，所以在客户端渲染的时候，可以将虚拟DOM转化成一个真实DOM，挂载到页面上。也可以在服务端渲染的时候，虚拟DOM可以转化成字符串，返回给浏览器。所以虚拟DOM使得React的服务端渲染非常简单、方便。

**服务端好处：**

+ 首屏加载速度得到了加快；
+ SEO效果大大提升；

**服务端弊端：**

客户端渲染---React代码在浏览器上执行，消耗的是用户浏览器性能，可能只需一台服务器；
服务端渲染---React代码在服务器上执行，消耗的是服务器端性能，可能需十台服务器才能保证项目的稳定性。

React代码是一个非常消耗计算性能的代码，因为需要将虚拟DOM转化成字符串，中间需要进行各种JS运算比对等。如果项目完全没必要使用搜索引擎优化，则可以不用使用React SSR技术。