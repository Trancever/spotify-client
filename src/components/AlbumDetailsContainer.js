import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import DetailsHeader from './DetailsHeader'
import AlbumDetailsTracks from './AlbumDetailsTracks'

class AlbumDetailsContainer extends React.Component {
  render() {
    const data = this.props.data.album
    return [
      <div className="playlist-details-header" key="header">
        {this.props.data.loading ? null : (
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
        {this.props.data.loading ? null : (
          <AlbumDetailsTracks data={data.tracks.items} />
        )}
      </div>,
    ]
  }
}

const query = gql`
  query album($albumId: String!, $token: String!) {
    album(albumId: $albumId, token: $token) {
      id
      name
      images {
        url
      }
      artists {
        id
        name
      }
      popularity
      tracks {
        items {
          id
          name
          duration_ms
        }
      }
    }
  }
`

export default graphql(query, {
  options: props => {
    return {
      variables: {
        albumId: props.match.params.albumId,
        token: props.token,
      },
    }
  },
})(AlbumDetailsContainer)
