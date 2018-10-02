import express from 'express'
import { serverRender } from './utils'

const app = express()
app.use(express.static('public'))

app.get('*', function (req, res) {
  res.send(serverRender(req))
})

var server = app.listen(4068)