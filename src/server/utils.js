import React from 'react'
import { StaticRouter, Route, matchPath } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import routes from '../Routes'
import { Provider } from 'react-redux'
import getStore from '../store'

export const serverRender = (req) => {
  const store = getStore()
  const matchRoutes = []

  // store里面填充的数据，需结合当前用户请求地址、路由做判断。
  routes.some(route => {
    const match = matchPath(req.path, route)
   
    // 如果路由匹配上
    if (match) {
      matchRoutes.push(route)
    }
  })

  console.log('matchRoutes',matchRoutes)

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

  return `<html>
    <head>
      <title>服务端渲染</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src='/index.js'></script>
    </body>
  </html>`
}