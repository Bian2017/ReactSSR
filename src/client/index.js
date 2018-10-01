import React from 'react'
import ReactDOM from 'react-dom'

import Home from '../containers/Home'

// 将render方法替换成hydrate
ReactDOM.hydrate(<Home />, document.getElementById('root'))