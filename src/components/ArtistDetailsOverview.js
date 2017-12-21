import React from 'react'
import '../styles/artistDetailsOverview.css'
import { graphql, compose } from 'react-apollo'

import { artistTopTracks, artistAlbums } from '../queries/queries'
import TracksList from './TracksList'
import SaveButton from './SaveButton'
import ArtistSimpleList from './ArtistSimpleList'
import SimpleAlbumOverview from './SimpleAlbumOverview'
import HorizontalLine from './HorizontalLine'

class ArtistDetailsOverview extends React.Component {
  constructor() {
    super()
    this.state = {
      popularTracksListExpanded: false,
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick() {
    this.setState(state => ({
      popularTracksListExpanded: !state.popularTracksListExpanded,
    }))
  }

  filterAlbums(albums) {
    return albums.filter(album => album.album_type === 'album')
  }

  filterSingles(albums) {
    return albums.filter(album => album.album_type === 'single')
  }

  renderAlbums(albums, text) {
    return albums.length > 0 ? (
      <div className="artist-albums-container">
        <p className="artist-albums-title">{text}</p>
        <HorizontalLine />
        {albums.map(album => (
          <SimpleAlbumOverview
            key={album.id}
            token={this.props.token}
            albumId={album.id}
          />
        ))}
      </div>
    ) : null
  }

  render() {
    const { popularTracksListExpanded } = this.state
    const { artistTopTracks } = this.props.artistTopTracks
    const { artistAlbums } = this.props.artistAlbums

    const tracks = artistTopTracks ? artistTopTracks.tracks : []
    const slicedTracks = popularTracksListExpanded
      ? tracks.slice(0, 10)
      : tracks.slice(0, 5)

    const artists = this.props.artistRelatedArtists
    const filteredArtists = artists.filter(artist => artist.images.length > 0)
    const slicedArtists = popularTracksListExpanded
      ? filteredArtists.slice(0, 9)
      : filteredArtists.slice(0, 5)

    return (
      <div className="artist-details-container">
        <div className="top-artist-details-wrapper">
          <div className="left-artist-details-box">
            {tracks.length > 0 ? (
              <div>
                <p className="popular-tracks-title">Popular</p>
                <div className="tracklist-wrapper">
                  <TracksList data={slicedTracks} />
                </div>
                <div className="artist-details-button-container">
                  <SaveButton
                    text={popularTracksListExpanded ? 'Hide 5' : 'Show 5 more'}
                    onClick={this.handleButtonClick}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="right-artist-details-box">
            <ArtistSimpleList artists={slicedArtists} />
          </div>
        </div>
        {this.renderAlbums(
          this.filterSingles(artistAlbums ? artistAlbums.items : []),
          'Singles'
        )}
        {this.renderAlbums(
          this.filterAlbums(artistAlbums ? artistAlbums.items : []),
          'Albums'
        )}
      </div>
    )
  }
}

export default compose(
  graphql(artistTopTracks, {
    options: props => {
      return {
        variables: {
          token: props.token,
          artistId: props.artistId,
          country: 'US',
        },
      }
    },
    name: 'artistTopTracks',
  }),
  graphql(artistAlbums, {
    options: props => ({
      variables: {
        token: props.token,
        artistId: props.artistId,
      },
    }),
    name: 'artistAlbums',
  })
)(ArtistDetailsOverview)
