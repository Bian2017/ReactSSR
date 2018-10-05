import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHomeList } from './store/actions'
import styles from './index.css'

class Home extends Component {

  componentWillMount() {
    // 浏览器端渲染的时候，styles上没有_getCss()方法，所以需判断下当前环境
    if (this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss())
    }
  }

  // componentDidMount生命周期函数只会在客户端渲染的时候才会执行，在服务端渲染的时候不会执行。
  componentDidMount() {
    if (!this.props.list.length) {        // 性能优化：服务端已获取数据则不再进行请求
      this.props.getHomeList()
    }
  }

  getList() {
    const { list } = this.props
    return list.map(value => <div key={value.id}>{value.title}</div>)
  }

  render() {
    return (
      <div className={styles.content}>
        {this.getList()}
      </div>
    )
  }
}

// 给Home组件添加静态方法loadData：负责在服务器端渲染之前，把这个路由需要的数据提取加载好。
Home.loadData = (store) => {
  // 返回Promise
  return store.dispatch(getHomeList())
}

const mapStateToProps = state => ({
  list: state.home.newsList
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)