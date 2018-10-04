import { CHANGE_LOGIN } from './constants'

const initState = {
  login: true
}

export default (previousState = initState, action) => {
  console.log('action', action.type)
  switch (action.type) {
    case CHANGE_LOGIN:
      return {
        ...previousState,
        login: action.payload
      }
    default:
      console.log('其他状态', action.type, action.payload)
      return previousState
  }
}