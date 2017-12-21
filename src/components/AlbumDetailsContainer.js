import React from 'react'
import '../styles/albumDetailsContainer.css'
import { graphql, compose } from 'react-apollo'

import {
  album,
  checkAlbum,
  saveAlbumForUser,
  myAlbums,
} from '../queries/queries'
import DetailsHeader from './DetailsHeader'
import TracksList from './TracksList'

class AlbumDetailsContainer extends React.Component {
  constructor() {
    super()
    this.saveAlbum = this.saveAlbum.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.albumData.album) {
      nextProps.albumData.album = this.props.albumData.album
    }
  }

  saveAlbum(albumId) {
    const { mutate, token } = this.props
    return () => {
      mutate({
        variables: {
          token: token,
          albumId: albumId,
        },
        refetchQueries: [
          {
            query: myAlbums,
            variables: {
              token: token,
              limit: 30,
            },
          },
          {
            query: checkAlbum,
            variables: {
              token: token,
              albumId: albumId,
            },
          },
        ],
      }).then(res => console.log(res))
    }
  }

  render() {
    const data = this.props.albumData.album
    const show =
      !this.props.albumData.album || !this.props.checkAlbum.checkUserAlbum
    return [
      <div className="album-details-header" key="header">
        {show ? null : (
          <DetailsHeader
            name={data.name}
            imageUrl={data.images[0].url}
            createdBy={data.artists[0].name}
            type="ALBUM"
            token={this.props.token}
            albumId={data.id}
            isSaved={this.props.checkAlbum.checkUserAlbum.data[0]}
            onSaveClick={this.saveAlbum(data.id)}
          />
        )}
      </div>,
      <div className="album-details-wrapper" key="main">
        {!this.props.albumData.album ? null : (
          <TracksList data={data.tracks.items} fetchingMoreData={false} />
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
  }),
  graphql(saveAlbumForUser)
)(AlbumDetailsContainer)
