/**
 * reducer: 纯函数
 */

import { CHANGE_LIST } from './constants'

const initState = {
  newsList: []
}

export default (previousState = initState, action) => {
  console.log('xxx', action.type)
  switch (action.type) {
    case CHANGE_LIST:
      return {
        ...previousState,
        newsList: action.payload
      }
    default:
      return previousState
  }
}
