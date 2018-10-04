/**
 * actions
 */

import { CHANGE_LIST } from './constants'

const changeList = (list) => ({
  type: CHANGE_LIST,
  payload: list
})

// 使用redux-thunk进行异步请求时，返回的函数除了可以接收到dispatch方法，还可以接收到自己定制的参数
export const getHomeList = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/news.json?secret=D37msjPeC3')      // 返回Promise
      .then((res) => {
        const list = res.data.data
        dispatch(changeList(list))
      })
  }
}