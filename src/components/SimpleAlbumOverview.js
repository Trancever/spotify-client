import React from 'react'
import '../styles/simpleAlbumOverview.css'
import { graphql } from 'react-apollo'

import { album } from '../queries/queries'
import SimpleAlbumHeader from './SimpleAlbumHeader'

const SimpleAlbumOverview = props => {
  const { album } = props.data

  return (
    <div className="simple-album-overview">
      {props.data.loading ? null : <SimpleAlbumHeader album={album} />}
      <div className="simple-album-overview-main" />
    </div>
  )
}

export default graphql(album, {
  options: props => {
    return {
      variables: {
        token: props.token,
        albumId: props.albumId,
      },
    }
  },
})(SimpleAlbumOverview)
