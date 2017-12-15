import gql from 'graphql-tag'

export const myAlbums = gql`
  query myAlbums($token: String!, $limit: Int) {
    myAlbums(token: $token, limit: $limit) {
      items {
        added_at
        album {
          id
          name
          images {
            url
          }
          artists {
            name
          }
        }
      }
    }
  }
`

export const album = gql`
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

export const checkAlbum = gql`
  query checkUserAlbum($albumId: String!, $token: String!) {
    checkUserAlbum(albumId: $albumId, token: $token) {
      data
    }
  }
`

export const myTracks = gql`
  query myTracks($offset: Int, $limit: Int, $token: String!) {
    myTracks(offset: $offset, limit: $limit, token: $token) {
      items {
        track {
          id
          name
          duration_ms
          album {
            name
            id
          }
          artists {
            name
            id
          }
        }
      }
      limit
      offset
      total
    }
  }
`
