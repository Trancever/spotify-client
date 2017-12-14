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

    const { selectedElement, onChange } = this.props
    return (
      <ul className="playlists-list">
        <li className="playlists-header">PLAYLISTS</li>
        <Playlists
          data={data}
          selectedElement={selectedElement}
          onChange={onChange}
        />
      </ul>
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
