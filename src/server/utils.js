import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { createStore, applyMiddleware } from 'redux'
import Routes from '../Routes'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

export const serverRender = (req) => {
  const reducer = (previousState = { name: 'Ben' }, action) => {
    return previousState
  }

  const store = createStore(reducer, applyMiddleware(thunk))

  const content = renderToString((
    <Provider store={store}>
      <StaticRouter context={{}} location={req.path}>
        {Routes}
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