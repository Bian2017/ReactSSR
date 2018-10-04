Node中间层处理
---

## 一、Proxy代理

客户端和服务端使用的是同一个函数getHomeList获取数据。当服务端渲染时，该函数在Node端运行，则数据显然是通过Node获取得到的。但是当代码运行在浏览器端，再使用同一个函数getHomeList获取数据时，很明显数据的获取直接跳过了Node中间层，而向Java后台直接获取数据。

要想实现数据全部走Node中间层，此时可以通过proxy代理，让Node中间层承担数据获取职责，代码修改见分支[daily/0.1.0](https://github.com/Bian2017/ReactSSR/commit/82d16a55a23cf20148beae1916602ea3fb9e7662)。

但上述代码修改存在这样一个问题：

+ 浏览器运行： axios访问/api/news.json，等价于访问：http://localhost:3000/api/news.json
+ 服务器运行： axios访问/api/news.json，等价于访问：服务器根目录下/api/news.json，由于不存在该目录或者该文件，此时就会出错。

针对这一问题，可以判断下当前运行环境是在服务端还是在浏览器端，然后依据环境的不同让axios访问不同的URL，代码修改见分支[daily/0.1.1](https://github.com/Bian2017/ReactSSR/commit/65a9b8509c40c0895ee9d7284d33d85b54cc27d6)。

不过上述修改有点Low，因为若针对每一个API请求都进行上述判断，则略显冗余、可维护性会较差。此时可以通过axios提供的instance来进行处理，代码修改见分支[daily/0.1.2](https://github.com/Bian2017/ReactSSR/commit/1d05358173d26cbfd046e3f4bb41ca5a53161082)。

### 1. withExtraArgument

分支[daily/0.1.1](https://github.com/Bian2017/ReactSSR/commit/1d05358173d26cbfd046e3f4bb41ca5a53161082)通过给每个API请求传递参数(true/false)区分当前API请求是服务端发出还是浏览器端发出。但是当随着页面增多API请求也增多时，给每个API请求传递参数方式也不太可取，后期维护性也较差。

而redux-thunk提供的withExtraArgument方法则可以解决这一问题，它允许给返回的函数传入额外参数。针对这一特性，在创建store的时候，针对浏览器端store，传递浏览器端axios作为定制参数；针对服务端store，传递服务端的axios作为定制参数。然后派发action的时候，就可以通过第三个参数来获取传递过来的定制参数(axios)，此时就实现了不同端请求不同URL地址数据，代码修改见分支[daily/0.1.3](https://github.com/Bian2017/ReactSSR/commit/cd5aaa13f19530bc13dad03ac10fcda6bf58ad6e)

### 2. cookie传递问题

用户的登录状态为已登录，并已获取cookie。刷新页面，依旧显示未登录，这是由于以下原因造成的：

+ 刚进入页面，处于非登录状态；
+ 用户点击登录按钮，进行登录操作；
  + 浏览器发请求给NodeJS服务器；
  + 转发给API服务器，进行登陆；
  + API服务器生成cookie；
  + 浏览器上存在cookie，登录成功；
+ 当用户重新刷新页面的时候：
  + 浏览器去请求HTML(携带了cookie)；
  + NodeJS服务器进行服务器端渲染；
  + 进行服务端渲染，首先要去API服务器取数据(没有携带cookie)

## 二、代码优化

### 1. renderRoutes支持多级路由

Home页面和登录页面都包含一个Head导航栏，原先实现是Home组件和Login组件都包含一个Head组件。但这样做其实还是有些啰嗦，可以将Head组件设置一级路由，Home组件和Login组件设置为二级路由，就无需每次都进行包含了。但这样会带来一个二级路由匹配问题，此时可以通过react-router-config提供的renderRoutes进行二级路由的匹配，代码修改见分支[daily/0.1.4](https://github.com/Bian2017/ReactSSR/commit/c30b3c757161d98826c9401aeaad642822c5ee11)。
