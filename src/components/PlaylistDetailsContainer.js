import React from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/playlistDetailsContainer.css'

import PlaylistDetailsHeader from './PlaylistDetailsHeader'
import PlaylistDetailsTracks from './PlaylistDetailsTracks'

class PlaylistDetailsContainer extends React.Component {
  render() {
    console.log(this.props)
    return [
      <div className="playlist-details-header" key="header">
        {this.props.myPlaylist.loading ? null : (
          <PlaylistDetailsHeader
            data={this.props.myPlaylist.myPlaylist}
            user={this.props.user}
          />
        )}
      </div>,
      <div className="playlist-details-wrapper" key="main">
        {this.props.myPlaylist.loading ? null : (
          <PlaylistDetailsTracks
            data={this.props.myPlaylistTracks.myPlaylistTracks}
          />
        )}
      </div>,
    ]
  }
}

const myPlaylistQuery = gql`
  query myPlaylist($userId: String!, $playlistId: String!, $token: String!) {
    myPlaylist(userId: $userId, playlistId: $playlistId, token: $token) {
      id
      name
      description
      images {
        width
        height
        url
      }
    }
  }
`

const myPlaylistTracksQuery = gql`
  query myPlaylistTracks(
    $userId: String!
    $playlistId: String!
    $token: String!
  ) {
    myPlaylistTracks(userId: $userId, playlistId: $playlistId, token: $token) {
      items {
        track {
          duration_ms
          name
          album {
            name
            release_date
          }
          artists {
            name
          }
        }
      }
    }
  }
`

export default compose(
  graphql(myPlaylistQuery, {
    name: 'myPlaylist',
    options: props => {
      return {
        variables: {
          userId: props.match.params.ownerId,
          playlistId: props.match.params.playlistId,
          token: props.token,
        },
      }
    },
  }),
  graphql(myPlaylistTracksQuery, {
    name: 'myPlaylistTracks',
    options: props => {
      return {
        variables: {
          userId: props.match.params.ownerId,
          playlistId: props.match.params.playlistId,
          token: props.token,
        },
      }
    },
  })
)(PlaylistDetailsContainer)
