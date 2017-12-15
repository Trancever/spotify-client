import React from 'react'
import { graphql, compose } from 'react-apollo'

import { album, checkAlbum } from '../queries/queries'
import DetailsHeader from './DetailsHeader'
import TracksList from './TracksList'

class AlbumDetailsContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.albumData.album) {
      nextProps.albumData.album = this.props.albumData.album
    }
  }

  render() {
    const data = this.props.albumData.album
    const show =
      !this.props.albumData.album || !this.props.checkAlbum.checkUserAlbum
    return [
      <div className="playlist-details-header" key="header">
        {show ? null : (
          <DetailsHeader
            name={data.name}
            imageUrl={data.images[0].url}
            createdBy={data.artists[0].name}
            type="ALBUM"
            token={this.props.token}
            albumId={data.id}
            isSaved={this.props.checkAlbum.checkUserAlbum.data[0]}
          />
        )}
      </div>,
      <div className="playlist-details-wrapper" key="main">
        {!this.props.albumData.album ? null : (
          <TracksList data={data.tracks.items} />
        )}
      </div>,
    ]
  }
}

export default compose(
  graphql(album, {
    options: props => {
      return {
        variables: {
          albumId: props.match.params.albumId,
          token: props.token,
        },
      }
    },
    name: 'albumData',
  }),
  graphql(checkAlbum, {
    options: props => {
      return {
        variables: {
          albumId: props.match.params.albumId,
          token: props.token,
        },
      }
    },
    name: 'checkAlbum',
  })
)(AlbumDetailsContainer)
