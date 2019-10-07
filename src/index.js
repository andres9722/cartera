import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { init } from './config'

init()
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.register()
