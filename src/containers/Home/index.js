import React, { Component } from 'react'   //esModule语法
import Header from '../../components/Header'
import { connect } from 'react-redux'
import { getHomeList } from './store/actions'

class Home extends Component {

  // componentDidMount生命周期函数只会在客户端渲染的时候才会执行，在服务端渲染的时候不会执行。
  // 所以看到的消息列表是在客户端渲染出来的。
  componentDidMount() {
    this.props.getHomeList()
  }

  getList() {
    const { list } = this.props
    return list.map(value => <div key={value.id}>{value.title}</div>)
  }

  render() {
    return (
      <div>
        <Header />
        {this.getList()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.home.newsList
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    console.log('test')
    dispatch(getHomeList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)