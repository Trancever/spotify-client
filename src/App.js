import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import './App.css'

import Main from './components/Main'
import PlaylistsContainer from './components/PlaylistsContainer'

class App extends Component {
  renderContent() {
    return (
      <div className="app">
        <div className="left-sidebar">
          <PlaylistsContainer {...this.props} />
        </div>
        <div className="right-sidebar" />
        <div className="main">
          <Main {...this.props} user={this.props.data.me} />
        </div>
      </div>
    )
  }

  render() {
    return this.props.data.loading ? null : this.renderContent()
  }
}

const query = gql`
  query me($token: String!) {
    me(token: $token) {
      id
      display_name
      country
    }
  }
`

export default graphql(query, {
  options: props => {
    return {
      variables: {
        token: props.token,
      },
    }
  },
})(App)
