import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AlbumDetailsContainer extends React.Component {
  render() {
    return null
  }
}

const query = gql`
  query album($albumId: String!, $token: String!) {
    album(albumId: $albumId, token: $token)
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
