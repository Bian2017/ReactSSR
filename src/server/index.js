import express from 'express'
import { matchRoutes } from 'react-router-config'
import { serverRender } from './utils'
import getStore from '../store'
import routes from '../Routes'

const app = express()
app.use(express.static('public'))

app.get('*', function (req, res) {
  const store = getStore()
  // store里面填充的数据，需结合当前用户请求地址、路由做判断。
  const matchedRoutes = matchRoutes(routes, req.path)

  const promises = []
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  })

  Promise.all(promises).then(() => {
    res.send(serverRender({ store, routes, req }))
  })
})

var server = app.listen(4068)