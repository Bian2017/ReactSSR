/**
 * 渲染二级路由内容
 */
import React from 'react'
import Header from './components/Header/index'
import { renderRoutes } from 'react-router-config'
import { actions } from './components/Header/store/'

const App = (props) => {
  return (
    <div>
      <Header />
      {renderRoutes(props.route.routes)}
    </div>
  )
}

App.loadData = (store) => {
  store.dispatch(actions.getHeaderInfo())
}

export default App 