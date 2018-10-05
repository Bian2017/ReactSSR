import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from './store/index'
import styles from './index.css'

class Header extends Component {
  componentWillMount() {
    // Header不是路由组件，没有staticContext属性，需父组件透传下来
    if (this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss())
    }
  }

  render() {
    const { login, handleLogin, handleLogout } = this.props

    return (<div className={styles.header}>
      <Link to='/'>首页</Link>
      <br />
      {
        login ? <Fragment>
          <Link to='/translation'>翻译列表</Link>
          <div onClick={() => handleLogout()}>注销</div>
        </Fragment> : <div onClick={() => handleLogin()}>登录</div>
      }
      <br />
    </div>)
  }
}


const mapState = (state) => ({
  login: state.header.login
})

const mapDispatch = (dispatch) => ({
  handleLogin() {
    dispatch(actions.login())
  },
  handleLogout() {
    console.log('actions', actions)
    dispatch(actions.logout())
  }
})

export default connect(mapState, mapDispatch)(Header)