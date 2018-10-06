import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { getHomeList } from './store/actions'
import styles from './index.css'
import HocStyle from '../../HocStyle'

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
    return list.map(value => <div key={value.id} className={styles.list}>{value.title}</div>)
  }

  render() {
    return (<Fragment>
        <Helmet>
          <title>英文新闻页面(React SSR)---丰富多彩的资讯</title>
          <meta name="description" content="这是React SSR的英文新闻页面" />
        </Helmet>
        <div className={styles.content}>
          {this.getList()}
        </div>
      </Fragment>)
  }
}

const mapStateToProps = state => ({
  list: state.home.newsList
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})

const ExportHome = connect(mapStateToProps, mapDispatchToProps)(HocStyle(Home, styles))

// 给Home组件添加静态方法loadData，不代表ExportHome会有这个静态方法(虽然connect会自动添加静态方法)
ExportHome.loadData = (store) => {        // 静态方法loadData：负责在服务器端渲染之前，把这个路由需要的数据提取加载好。
  return store.dispatch(getHomeList())    // 返回Promise
}

export default ExportHome