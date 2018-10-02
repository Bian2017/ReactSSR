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

export default getStore