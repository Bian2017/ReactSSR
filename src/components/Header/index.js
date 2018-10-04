import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Header = ({ login }) => {
  return (
    <div>
      <Link to='/'>首页</Link>
      <br />
      {
        login ? <Fragment>
          <Link to='/login'>翻译列表</Link>
          <br />
          <Link to='/login'>注销</Link>
        </Fragment> : <Link to='/login'>登录</Link>
      }
      <br />
    </div>
  )
}


const mapState = (state) => ({
  login: state.header.login
})

export default connect(mapState, null)(Header)