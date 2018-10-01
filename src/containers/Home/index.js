import React from 'react'   //esModule语法

const Home = () => {
  return (
    <div>
      <h1>welcome to home </h1>
      <button onClick={() => {console.log('click')}}>
        按钮
      </button>
    </div>
  )
}


export default Home