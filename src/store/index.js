import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = (previousState = { name: 'Ben' }, action) => {
  return previousState
}

// 通过函数返回store，解决服务端获取相同store的问题
const getStore = ()=> {
  return createStore(reducer, applyMiddleware(thunk))
}

export default getStore