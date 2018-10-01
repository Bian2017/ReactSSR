import express from 'express'
import Home from './containers/Home'
import React from 'react'
import { renderToString } from 'react-dom/server'

const app = express()
const content = renderToString(<Home />)

app.get('/', function (req, res) {
  res.send(`
  <html>
    <head>
      <title>服务端渲染</title>
    </head>
    <body>
      ${content}
    </body>
  </html>
  `)
})

var server = app.listen(4068)