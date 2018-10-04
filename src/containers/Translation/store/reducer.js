/**
 * reducer: 纯函数
 */

import { CHANGE_LIST } from './constants'

const initState = {
  translationList: []
}

export default (previousState = initState, action) => {
  switch (action.type) {
    case CHANGE_LIST:
      return {
        ...previousState,
        translationList: action.payload
      }
    default:
      return previousState
  }
}
