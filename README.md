

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

## 一、环境配置

### 1. 安装nodemon

nodemon是node monitor的简写，帮助node实现node文件的监听。

> npm install nodemon -g

### 2. 安装npm-run-all

> npm install npm-run-all -g

## 二、package.json脚本说明

```json
"scripts": {
  "dev": "npm-run-all --parallel dev:**",
  "dev:start": "nodemon --watch build --exec node \"./build/bundle.js\"",
  "dev:build": "webpack --config webpack.config.js --watch"
}
```

### npm-run-all

> npm-run-all --parallel dev:** 

该脚本表示并行执行以dev:开头的所有命令，--parallel表示并行执行。

### 添加命名空间
在start、build前面添加"dev:"，表示在开发环境下启动服务器或者在开发环境下进行打包流程。

### nodemon

使用nodemon监听build目录下的文件改变，当文件发生改变时，则重新运行"node ./build/bundle.js"。

## 三、webpack配置

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

### 3. 提取公共配置

webpack.client.js和webpack.server.js存在一些公用配置，可以通过webpack-merge插件，来减少webpack配置中的重复代码。


## 四、服务端渲染

在React中，虚拟DOM是真实DOM的一个javascript对象映射。实际上，React这些组件在编译或者运行过程中，一开始都是虚拟DOM，换句话说，都是javascript对象。这样就带来一个好处，在做服务器端渲染的时候，就可以将虚拟DOM(javascript对象)很方便的转化成字符串，服务器端就可以给浏览器提供渲染好的字符串。

因为虚拟DOM是一个JS对象，所以在客户端渲染的时候，可以将虚拟DOM转化成一个真实DOM，挂载到页面上；也可以在服务端渲染的时候，虚拟DOM直接转化成字符串，返回给浏览器。由此可见，虚拟DOM使得React 服务端渲染变得非常简单、方便。

**服务端好处：**

+ 首屏加载速度得到了加快；
+ SEO效果大大提升；

**服务端弊端：**

+ 客户端渲染---React代码在浏览器上执行，消耗的是用户浏览器性能，可能只需一台服务器；
+ 服务端渲染---React代码在服务器上执行，消耗的是服务器端性能，可能需十台服务器才能保证项目的稳定性。

React代码是一个非常消耗计算性能的代码，因为需要将虚拟DOM转化成字符串，中间需要进行各种JS运算比对等。如果项目完全没必要使用搜索引擎优化，则可以不用使用React SSR技术。

## 五、同构

写服务端渲染代码时，若在React组件上绑定事件，会发现事件无法生效。这是因为renderToString方法不会渲染事件，只会渲染组件的基础内容，因此仅有服务端渲染是不够的。解决办法：首先服务器端先渲染页面，然后让相同代码像传统React项目一样在浏览器端再执行一遍，这样就能产生事件了。这就是所谓的**同构概念**。

**同构：一套React代码，在服务器端执行一次，在客户端再执行一次**。

同构简单实现：见[分支daily/0.0.4](https://github.com/Bian2017/ReactSSR/commit/ae5a2317aa437dcfb219220b609f83bd26429b08)

### 1. 同构流程

+ 服务器端运行React代码渲染出HTML(绑定事此时不生效)；
+ 发送HTML给浏览器；
+ 浏览器接收到内容展示；
+ 浏览器加载JS文件；
+ JS中的React代码在浏览器端重新执行；
+ JS中的React代码接管页面操作；
+ JS代码拿到浏览器上的地址
+ JS代码根据地址返回不同的路由内容；

### 2. 静态路由StaticRouter

在同构的时候，路由需在服务器端跑一遍，在客户端也需跑一遍，这样可以让用户得到更好的用户体验。

使用StaticRouter的时候，必须传递一个参数context，用来做服务器端渲染的时候在渲染的过程中使用context做数据的传递。

StaticRouter区别于BrowserRouter，是无法感知浏览器当前路径。此时需把用户请求的路径传递给StaticRouter，StaticRouter才知道用户现在所处的当前路径是什么，location参数则是实现这个目的。

```JS
const content = renderToString((
  <StaticRouter context={{}} location={req.path}>
    {Routes}
  </StaticRouter>
))
```

### 3. 服务端渲染只发生在第一次进入页面时

做React同构项目的时候，服务器端渲染，只发生在第一次进入页面的时候。服务器端渲染并不是每个页面都去做服务器端渲染，它指的是只有你访问的第一个页面具有服务器端渲染的特性，其他页面依旧基于React路由机制，如下图所示：

![](https://raw.githubusercontent.com/Bian2017/ReactSSR/master/docs/img/QQ20181002-093949%402x.png)

**回到主页面：在地址栏中输入URl后回车**

浏览器会将URL请求发送给服务器，服务器会进行服务端渲染，并加渲染好的页面返回给浏览器。

**回到主页面：点击Home链接**

页面此时已由React前端代码接管页面，会通过React路由回到主页面，在这过程中并不会给服务器发送请求，服务器当然也就不会进行服务端渲染。

### 4. 同构Warning处理

#### 4.1 标签直接不能有空格

在同构的时候，报如下警告：

> Warning: Did not expect server HTML to contain the text node "" in \<div>.

**原代码:**

```JS
app.get('/', function (req, res) {
  res.send(`
  <html>
    <head>
      <title>服务端渲染</title>
    </head>
    <body>
      <div id="root">
        ${content}
      </div>
      <script src='/index.js'></script>
    </body>
  </html>
  `)
})
```

这是因为在同构时候，div标签之间不能有空格，需将代码置于一行，紧贴着来写。

```JS
app.get('/', function (req, res) {
  res.send(`
  <html>
    <head>
      <title>服务端渲染</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src='/index.js'></script>
    </body>
  </html>
  `)
})
```

#### 4.2 客户端和服务端渲染内容不统一

当在客户端配置了路由，在服务端没有配置路由，同构的时候，就会报如下警告：

> Warning: Expected server HTML to contain a matching \<div> in \<div>.

原因：这是由于客户端和服务端渲染出的内容不统一造成的，为了消除警告，此时需在服务端也执行一次路由代码。

代码见[分支daily/0.0.6](https://github.com/Bian2017/ReactSSR/commit/e77028018438178c9f6d20b790270921f1b39259)