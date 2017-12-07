import React, { Component } from 'react'
import { ipcRenderer } from 'electron'

import App from './App'

class AppWrapper extends Component {
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
    return this.state.accessToken ? (
      <App token={this.state.accessToken} />
    ) : null
  }
}

export default AppWrapper
