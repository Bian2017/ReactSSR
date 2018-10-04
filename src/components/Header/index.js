import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from './store/index'

class Header extends Component {
  render() {
    const { login, handleLogin, handleLogout } = this.props

    return (<div>
      <Link to='/'>首页</Link>
      <br />
      {
        login ? <Fragment>
          <Link to='/login'>翻译列表</Link>
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