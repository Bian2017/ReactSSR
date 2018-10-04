Node中间层处理
---

## 一、Proxy代理

客户端和服务端使用的是同一个函数getHomeList获取数据。当服务端渲染时，该函数在Node端运行，则数据显然是通过Node获取得到的。但是当代码运行在浏览器端，再使用同一个函数getHomeList获取数据时，很明显数据的获取直接跳过了Node中间层，而向Java后台直接获取数据。

要想实现数据全部走Node中间层，此时可以通过proxy代理，让中间层承担数据获取职责，代码修改见分支[daily/0.1.0](https://github.com/Bian2017/ReactSSR/commit/82d16a55a23cf20148beae1916602ea3fb9e7662)

但上述代码修改存在这样一个问题：

+ 浏览器运行： axios访问/api/news.json，等价于访问：http://localhost:3000/api/news.json
+ 服务器运行： axios访问/api/news.json，等价于访问：服务器根目录下/api/news.json，由于不存在该目录或者该文件，此时就会出错。

针对这一问题，可以判断下当前运行环境是在服务端还是在浏览器端，然后依据环境的不同让axios访问不同的URL，代码修改见分支[daily/0.1.1](https://github.com/Bian2017/ReactSSR/commit/65a9b8509c40c0895ee9d7284d33d85b54cc27d6)

不过上述修改有点Low，因为若针对每一个API请求都进行上述判断，则略显冗余、可维护性会较差。此时可以通过axios的instance来进行处理，代码修改见分支[daily/0.1.2](https://github.com/Bian2017/ReactSSR/commit/1d05358173d26cbfd046e3f4bb41ca5a53161082)