import React from 'react'
import '../styles/artistDetailsOverview.css'
import { graphql, compose } from 'react-apollo'

import {
  artistTopTracks,
  artistRelatedArtists,
  artistAlbums,
} from '../queries/queries'
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

  renderAlbums() {
    return this.props.artistAlbums.artistAlbums.items.map(album => (
      <SimpleAlbumOverview
        key={album.id}
        token={this.props.token}
        albumId={album.id}
      />
    ))
  }

  render() {
    const { popularTracksListExpanded } = this.state
    const { artistRelatedArtists } = this.props.artistRelatedArtists
    const { artistTopTracks } = this.props.artistTopTracks
    const tracks = artistTopTracks ? artistTopTracks.tracks : []
    const slicedTracks = popularTracksListExpanded
      ? tracks.slice(0, 10)
      : tracks.slice(0, 5)
    const artists = artistRelatedArtists ? artistRelatedArtists.artists : []
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
        <HorizontalLine />
        <div className="artist-albums-container">
          {this.props.artistAlbums.loading ? null : this.renderAlbums()}
        </div>
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
  graphql(artistRelatedArtists, {
    options: props => {
      return {
        variables: {
          token: props.token,
          artistId: props.artistId,
        },
      }
    },
    name: 'artistRelatedArtists',
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
