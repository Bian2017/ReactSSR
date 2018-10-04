import React from 'react'
import { StaticRouter, Route } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { renderRoutes } from 'react-router-config'        // 支持多级路由
import { Provider } from 'react-redux'

export const serverRender = ({ store, routes, req }) => {
  const content = renderToString((
    <Provider store={store}>
      <StaticRouter context={{}} location={req.path}>
        <div>
          {
            renderRoutes(routes)
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
        <script>
          window.context = {
            state: ${JSON.stringify(store.getState())}
          }
        </script>
        <script src='/index.js'></script>
      </body>
    </html>`
}