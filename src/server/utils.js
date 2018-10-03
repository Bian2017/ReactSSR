import React from 'react'
import { StaticRouter, Route } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'
import routes from '../Routes'
import { Provider } from 'react-redux'
import getStore from '../store'

export const serverRender = (req, res) => {
  const store = getStore()

  // store里面填充的数据，需结合当前用户请求地址、路由做判断。
  const matchedRoutes = matchRoutes(routes, req.path)

  const promises = []
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  })

  // 等待promises数组里的所有promise全部执行完毕，再执行下面代码
  Promise.all(promises).then(() => {
    const content = renderToString((
      <Provider store={store}>
        <StaticRouter context={{}} location={req.path}>
          <div>
            {
              routes.map(route =>
                <Route {...route} />)
            }
          </div>
        </StaticRouter>
      </Provider>
    ))

    res.send(`<html>
      <head>
        <title>服务端渲染</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src='/index.js'></script>
      </body>
    </html>`)

  })
}