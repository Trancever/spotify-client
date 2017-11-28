import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="header">
          <Link to="/board">Board</Link>
        </div>
        <div className="left-sidebar" />
        <div className="right-sidebar" />
        <div className="main">
          <Main />
        </div>
      </div>
    )
  }
}

export default App
