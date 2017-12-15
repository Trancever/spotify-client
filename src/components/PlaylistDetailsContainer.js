import React from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/playlistDetailsContainer.css'

import DetailsHeader from './DetailsHeader'
import TracksDetailedList from './TracksDetailedList'

class PlaylistDetailsContainer extends React.Component {
  render() {
    const data = this.props.myPlaylist.myPlaylist
    return [
      <div className="playlist-details-header" key="header">
        {this.props.myPlaylist.loading ? null : (
          <DetailsHeader
            name={data.name}
            description={data.description}
            imageUrl={data.images[0].url}
            createdBy={this.props.user.display_name}
            type="PLAYLIST"
            isSaved
          />
        )}
      </div>,
      <div className="playlist-details-wrapper" key="main">
        {this.props.myPlaylist.loading ? null : (
          <TracksDetailedList
            data={this.props.myPlaylistTracks.myPlaylistTracks.items}
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
    $limit: Int!
  ) {
    myPlaylistTracks(
      userId: $userId
      playlistId: $playlistId
      token: $token
      limit: $limit
    ) {
      items {
        track {
          duration_ms
          name
          id
          album {
            name
            id
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
          limit: 50,
        },
      }
    },
  })
)(PlaylistDetailsContainer)
