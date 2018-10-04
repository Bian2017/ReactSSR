/**
 * actions
 */

import { CHANGE_LIST } from './constants'
import cAxios from '../../../client/request'
import sAxios from '../../../server/request'

const changeList = (list) => ({
  type: CHANGE_LIST,
  payload: list
})

// 使用redux-thunk进行异步请求的时候，返回的函数可以接收到dispatch方法
export const getHomeList = (server) => {
  const request = server ? sAxios : cAxios

  return (dispatch) => {
    // 返回Promise
    return request.get('/api/news.json?secret=D37msjPeC3')
      .then((res) => {
        const list = res.data.data
        dispatch(changeList(list))
      })
  }
}