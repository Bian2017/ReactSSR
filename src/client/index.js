import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../routes'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const reducer = (previousState = { name: 'Ben' }, action) => {
  return previousState
}

const store = createStore(reducer, applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {Routes}
      </BrowserRouter>
    </Provider>
  )
}

// 将render方法替换成hydrate
ReactDOM.hydrate(<App />, document.getElementById('root'))