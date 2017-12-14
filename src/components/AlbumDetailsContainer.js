import React from 'react'
import { graphql } from 'react-apollo'

import { album } from '../queries/queries'
import DetailsHeader from './DetailsHeader'
import AlbumDetailsTracks from './AlbumDetailsTracks'

class AlbumDetailsContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.albumData.album) {
      nextProps.albumData.album = this.props.albumData.album
    }
  }

  render() {
    const data = this.props.albumData.album
    console.log(this.props)
    return [
      <div className="playlist-details-header" key="header">
        {!this.props.albumData.album ? null : (
          <DetailsHeader
            name={data.name}
            imageUrl={data.images[0].url}
            createdBy={data.artists[0].name}
            type="ALBUM"
            token={this.props.token}
            albumId={data.id}
          />
        )}
      </div>,
      <div className="playlist-details-wrapper" key="main">
        {!this.props.albumData.album ? null : (
          <AlbumDetailsTracks data={data.tracks.items} />
        )}
      </div>,
    ]
  }
}

export default graphql(album, {
  options: props => {
    return {
      variables: {
        albumId: props.match.params.albumId,
        token: props.token,
      },
    }
  },
  name: 'albumData',
})(AlbumDetailsContainer)
