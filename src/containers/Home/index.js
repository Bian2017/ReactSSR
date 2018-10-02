import React from 'react'   //esModule语法
import Header from '../../components/Header'

const Home = () => {
  return (
    <div>
      <Header />
      <h1>welcome to home </h1>
      <button onClick={() => {console.log('click')}}>
        按钮
      </button>
    </div>
  )
}


export default Home