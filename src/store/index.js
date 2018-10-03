import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../containers/Home/store'

const reducer = combineReducers({
  home: homeReducer
})

// 通过函数返回store，解决服务端获取相同store的问题
const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk))
}

const getClientStore = () => {
  const defaultState = window.context.state

  // 将defaultState作为默认值传给浏览器端
  return createStore(reducer, defaultState, applyMiddleware(thunk))
}

export {
  getStore,
  getClientStore
}