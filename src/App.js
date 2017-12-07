import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'

import Main from './components/Main'

class App extends Component {
  constructor() {
    super()
    this.state = {
      accessToken: null,
    }
  }

  componentDidMount() {
    ipcRenderer.on('spotify-oauth-token', (event, { access_token: token }) => {
      this.setState({ accessToken: token })
    })

    ipcRenderer.send('spotify-oauth', {})
  }

  render() {
    console.log(this.state)
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

const query = gql`
  {
    currentUser {
      spotifyId
      accessToken
      refreshToken
    }
  }
`

export default graphql(query)(App)
