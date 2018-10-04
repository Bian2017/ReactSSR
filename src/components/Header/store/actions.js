import { CHANGE_LOGIN } from './constants'

const changeLogin = (value) => ({
  type: CHANGE_LOGIN,
  payload: value
})

export const login = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/login.json?secret=D37msjPeC3')      // 返回Promise
      .then((res) => {
        dispatch(changeLogin(true))
      })
  }
}

export const logout = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/logout.json?secret=D37msjPeC3')      // 返回Promise
      .then((res) => {
        dispatch(changeLogin(false))
      })
  }
}

export const getHeaderInfo = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/isLogin.json?secret=D37msjPeC3')      // 返回Promise
      .then((res) => {
        const list = res.data.data
        dispatch(changeLogin(res.data.data.login))
      })
  }
}