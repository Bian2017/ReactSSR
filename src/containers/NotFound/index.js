import React, { Component } from 'react'

class NotFound extends Component {
  componentWillMount() {
    // 服务器端渲染才用staticContext属性
    const { staticContext } = this.props

    staticContext && (staticContext.NOT_FOUND = true)// 添加一个属性
  }

  render() {
    return <div>
      <h1>404 Not Found</h1>
    </div>
  }
}

export default NotFound