import React from 'react'
import { StaticRouter, Route } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'
import routes from '../Routes'
import { Provider } from 'react-redux'
import getStore from '../store'

export const serverRender = (req) => {
  const store = getStore()

  // store里面填充的数据，需结合当前用户请求地址、路由做判断。
  const matchedRoutes = matchRoutes(routes, req.path)

  console.log('matchRoutes', matchedRoutes)

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