import { CHANGE_LOGIN } from './constants'

const changeLogin = (value) => ({
  type: CHANGE_LOGIN,
  payload: value
})

// 使用redux-thunk进行异步请求时，返回的函数除了可以接收到dispatch方法，还可以接收到自己定制的参数
export const getHeaderInfo = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/isLogin.json?secret=D37msjPeC3')      // 返回Promise
      .then((res) => {
        const list = res.data.data
        console.log('res', res.data.data.login)
        dispatch(changeLogin(res.data.data.login))
      })
  }
}