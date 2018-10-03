import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import routes from '../routes'
import { Provider } from 'react-redux'
import getStore from '../store'

const App = () => {
  return (
    <Provider store={getStore()}>
      <BrowserRouter>
        <div>
          {
            routes.map(route =>
              <Route {...route} />)
          }
        </div>
      </BrowserRouter>
    </Provider>
  )
}

// 将render方法替换成hydrate
ReactDOM.hydrate(<App />, document.getElementById('root'))