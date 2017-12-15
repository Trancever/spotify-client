import React from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/playlistDetailsContainer.css'

import DetailsHeader from './DetailsHeader'
import TracksDetailedList from './TracksDetailedList'

class PlaylistDetailsContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      isFetchingMoreData: false,
    }
    this.fetchMoreData = this.fetchMoreData.bind(this)
  }

  fetchMoreData() {
    const { myPlaylistTracks } = this.props
    const { limit, offset, total } = myPlaylistTracks.myPlaylistTracks
    if (offset + limit < total) {
      this.setState({ isFetchingMoreData: true })
      myPlaylistTracks.fetchMore({
        variables: {
          offset: offset + limit,
          limit: 50,
          token: this.props.token,
          userId: this.props.match.params.ownerId,
          playlistId: this.props.match.params.playlistId,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          this.setState({ isFetchingMoreData: false })
          if (!fetchMoreResult) {
            return previousResult
          }
          const items = [
            ...previousResult.myPlaylistTracks.items,
            ...fetchMoreResult.myPlaylistTracks.items,
          ]
          const offset = fetchMoreResult.myPlaylistTracks.offset
          const myPlaylistTracks = {
            ...previousResult.myPlaylistTracks,
            items,
            offset,
          }
          return { ...previousResult, myPlaylistTracks }
        },
      })
    }
  }

  render() {
    console.log(this.props)
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
            fetchMoreData={this.fetchMoreData}
            fetchingMoreData={this.state.isFetchingMoreData}
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
    $limit: Int
    $offset: Int
  ) {
    myPlaylistTracks(
      userId: $userId
      playlistId: $playlistId
      token: $token
      limit: $limit
      offset: $offset
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
      limit
      offset
      total
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
