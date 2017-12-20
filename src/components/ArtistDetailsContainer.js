import React from 'react'
import '../styles/artistDetailsContainer.css'
import { graphql } from 'react-apollo'

import { artist } from '../queries/queries'
import DetailsHeader from './DetailsHeader'

class ArtistDetailsContainer extends React.Component {
  render() {
    return [
      <div key="header" className="artist-details-header">
        {this.props.data.loading ? null : (
          <DetailsHeader
            imageUrl={this.props.data.artist.images[0].url}
            name={this.props.data.artist.name}
            type="ARTIST"
            circleImage
          />
        )}
      </div>,
      <div key="main" className="artist-details-tracks" />,
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
