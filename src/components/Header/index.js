import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from './store/index'
import styles from './index.css'
import HocStyle from '../../HocStyle'

class Header extends Component {
  render() {
    const { login, handleLogin, handleLogout } = this.props

    return (<div className={styles.header}>
      <Link to='/' className={styles.item}>首页</Link>
      {
        login ? <Fragment>
          <Link to='/translation' className={styles.item}>翻译表</Link>
          <span className={styles.item} onClick={() => handleLogout()}>注销</span>
        </Fragment> : <span className={styles.item} onClick={() => handleLogin()}>登录</span>
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

export default connect(mapState, mapDispatch)(HocStyle(Header, styles))