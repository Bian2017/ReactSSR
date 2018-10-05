/**
 * 高阶组件：针对CSS样式进行处理
 */
import React, { Component } from 'react'

// 函数：用于生成高阶组件。
export default (DecoratedComponent, styles) => {

  // 返回的组件称之为高阶组件。
  return class StyleComponent extends Component {
    componentWillMount() {
      if (this.props.staticContext) {
        this.props.staticContext.css.push(styles._getCss())
      }
    }

    render() {
      return <DecoratedComponent {...this.props} />
    }
  }
}