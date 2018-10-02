import React from 'react'   //esModule语法
import Header from '../../components/Header'
import { connect } from 'react-redux'

const Home = props => {
  return (
    <div>
      <Header />
      <h1>This is {props.name} </h1>
      <button onClick={() => { console.log('click') }}>
        按钮
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  name: state.name
})

export default connect(mapStateToProps, null)(Home)