import express from 'express'
import { matchRoutes } from 'react-router-config'
import { serverRender } from './utils'
import { getStore } from '../store'
import routes from '../Routes'

const app = express()
app.use(express.static('public'))

app.get('*', function (req, res) {
  const store = getStore()                                  // 获取新的store
  const matchedRoutes = matchRoutes(routes, req.path)       // 匹配路由

  const promises = []
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  })

  // 等待promises数组里的所有promise全部执行完毕，再进行服务端渲染
  Promise.all(promises).then(() => {
    res.send(serverRender({ store, routes, req }))
  })
})

const server = app.listen(4068)