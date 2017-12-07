import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/playlistsContainer.css'

import Playlists from './Playlists'

class PlaylistsContainer extends React.Component {
  render() {
    const data = this.props.data.loading
      ? []
      : this.props.data.myPlaylists.items
    return (
      <div className="playlists-container">
        <p className="title">PLAYLISTS</p>
        <Playlists data={data} />
      </div>
    )
  }
}

const query = gql`
  query myPlaylists($token: String!) {
    myPlaylists(token: $token) {
      items {
        name
        id
        href
        owner {
          id
        }
      }
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
})(PlaylistsContainer)
