import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = (previousState = { name: 'Ben' }, action) => {
  return previousState
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store