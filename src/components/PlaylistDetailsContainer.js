import React from 'react'
import { compose, graphql } from 'react-apollo'
import '../styles/playlistDetailsContainer.css'

import { myPlaylist, myPlaylistTracks } from '../queries/queries'
import DetailsHeader from './DetailsHeader'
import TracksDetailedList from './TracksDetailedList'

class PlaylistDetailsContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      isFetchingMoreData: false,
    }
    this.fetchMoreData = this.fetchMoreData.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
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
        updateQuery: this.updateQuery,
      })
    }
  }

  updateQuery(previousResult, { fetchMoreResult }) {
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
  }

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
            fetchMoreData={this.fetchMoreData}
            fetchingMoreData={this.state.isFetchingMoreData}
          />
        )}
      </div>,
    ]
  }
}

export default compose(
  graphql(myPlaylist, {
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
  graphql(myPlaylistTracks, {
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
