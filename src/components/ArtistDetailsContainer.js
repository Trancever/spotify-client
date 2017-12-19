import React from 'react'
import '../styles/artistDetailsContainer.css'
import { graphql } from 'react-apollo'

import { artist } from '../queries/queries'
import DetailsHeader from './DetailsHeader'
import TracksDetailedList from './TracksDetailedList'

class ArtistDetailsContainer extends React.Component {
  render() {
    const artist = this.props.data.loading ? null : this.props.data.artist
    return [
      <div key="header" className="artist-details-header">
        {artist ? (
          <DetailsHeader
            name={artist.name}
            imageUrl={artist.images[0].url}
            type="ARTIST FROM YOUR LIBRARY"
          />
        ) : null}
      </div>,
      <div key="main" className="artist-details-tracks">
        <TracksDetailedList data={this.props.tracks} fetchingMoreData={false} />
      </div>,
    ]
  }
}

export default graphql(artist, {
  options: props => {
    return {
      variables: {
        token: props.token,
        artistId: props.match.params.artistId,
      },
    }
  },
})(ArtistDetailsContainer)
