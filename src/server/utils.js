import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import Routes from '../Routes'

export const serverRender = (req) => {
  const content = renderToString((
    <StaticRouter context={{}} location={req.path}>
      {Routes}
    </StaticRouter>
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