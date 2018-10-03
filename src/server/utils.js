import React from 'react'
import { StaticRouter, Route } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

export const serverRender = ({ store, routes, req }) => {
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
        <script>
          window.context = {
            state: ${JSON.stringify(store.getState())}
          }
        </script>
        <script src='/index.js'></script>
      </body>
    </html>`
}