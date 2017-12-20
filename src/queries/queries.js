import gql from 'graphql-tag'

export const myAlbums = gql`
  query myAlbums($token: String!, $limit: Int, $offset: Int) {
    myAlbums(token: $token, limit: $limit, offset: $offset) {
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
      limit
      offset
      total
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

export const myPlaylists = gql`
  query myPlaylists($token: String!) {
    myPlaylists(token: $token) {
      items {
        name
        id
        href
        owner {
          id
        }
      }
    }
  }
`

export const myPlaylist = gql`
  query myPlaylist($userId: String!, $playlistId: String!, $token: String!) {
    myPlaylist(userId: $userId, playlistId: $playlistId, token: $token) {
      id
      name
      description
      images {
        width
        height
        url
      }
    }
  }
`

export const myPlaylistTracks = gql`
  query myPlaylistTracks(
    $userId: String!
    $playlistId: String!
    $token: String!
    $limit: Int
    $offset: Int
  ) {
    myPlaylistTracks(
      userId: $userId
      playlistId: $playlistId
      token: $token
      limit: $limit
      offset: $offset
    ) {
      items {
        track {
          duration_ms
          name
          id
          album {
            name
            id
          }
          artists {
            name
          }
        }
      }
      limit
      offset
      total
    }
  }
`

export const myArtists = gql`
  query myArtists($token: String!, $limit: Int) {
    myArtists(token: $token, limit: $limit) {
      items {
        id
        name
        images {
          url
        }
      }
      total
      limit
    }
  }
`

export const artist = gql`
  query artist($token: String!, $artistId: String!) {
    artist(token: $token, artistId: $artistId) {
      name
      id
      images {
        url
      }
    }
  }
`

export const saveAlbumForUser = gql`
  mutation saveAlbumForUser($token: String!, $albumId: String!) {
    saveAlbumForUser(token: $token, albumId: $albumId) {
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

export const artistTopTracks = gql`
  query artistTopTracks(
    $token: String!
    $artistId: String!
    $country: String!
  ) {
    artistTopTracks(token: $token, artistId: $artistId, country: $country) {
      tracks {
        id
        name
        album {
          images {
            url
          }
        }
        duration_ms
      }
    }
  }
`
