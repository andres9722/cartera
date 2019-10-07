import React, { Fragment } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import Routes from './components/routes/Routes'
import './App.scss'
import { AuthProvider, AuthConsumer } from './providers/AuthProvider'
import Loader from './components/atoms/Loader'

const App = () => {
  return (
    <AuthProvider>
      <AuthConsumer>
        {({ auth, loading }) => (
          <Fragment>
            {loading === true
              ? <div className='loader--full'>
                <Loader />
              </div>
              : <Router>
                <Routes auth={auth} />
              </Router>}
          </Fragment>
        )}
      </AuthConsumer>
    </AuthProvider>
  )
}

export default App
