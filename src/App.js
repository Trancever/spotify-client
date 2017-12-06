import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'

import Main from './components/Main'

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="app">
        <div className="header">
          <Link to="/board">Board</Link>
          <a href="https://spotify-graphql.herokuapp.com/auth/spotify">
            Login with Spotify
          </a>
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
