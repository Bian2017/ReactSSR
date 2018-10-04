import { CHANGE_LOGIN } from './constants'

const initState = {
  login: true
}

export default (previousState = initState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return {
        ...previousState,
        login: action.payload
      }
    default:
      return previousState
  }
}