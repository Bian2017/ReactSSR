/**
 * 存放整个工程的Reducer
 */
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../containers/Home/store'
import { reducer as headReducer } from '../components/Header/store/'
import cAxios from '../client/request'
import sAxios from '../server/request'

const reducer = combineReducers({
  home: homeReducer,
  header: headReducer
})

/**
 * 服务端store: 通过函数返回store，解决服务端获取相同store的问题
 */
const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(sAxios)))
}

/**
 * 客户端store
 */
const getClientStore = () => {
  const defaultState = window.context.state

  // 将defaultState作为默认值传给浏览器端
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(cAxios)))
}

export {
  getStore,
  getClientStore
}