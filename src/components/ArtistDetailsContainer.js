import React from 'react'
import '../styles/artistDetailsContainer.css'
import { graphql, compose } from 'react-apollo'

import { artist, artistRelatedArtists } from '../queries/queries'
import DetailsHeader from './DetailsHeader'
import TabPanel from './TabPanel'
import ArtistDetailsOverview from './ArtistDetailsOverview'
import ArtistsGrid from './ArtistsGrid'

const tabPanelData = [
  { id: 1, label: 'OVERVIEW' },
  { id: 2, label: 'RELATED ARTISTS' },
  { id: 3, label: 'ABOUT' },
]

class ArtistDetailsContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedTabId: 1,
    }
    this.onTabChange = this.onTabChange.bind(this)
    this.artistChanged = this.artistChanged.bind(this)
  }

  onTabChange(tabId) {
    this.setState({ selectedTabId: tabId })
  }

  artistChanged() {
    this.onTabChange(1)
  }

  render() {
    const { artist } = this.props
    const { artistRelatedArtists } = this.props.artistRelatedArtists
    const artists = artistRelatedArtists ? artistRelatedArtists.artists : []
    return [
      <div key="header" className="artist-details-header">
        {!artist.artist ? null : (
          <DetailsHeader
            imageUrl={artist.artist.images[0].url}
            name={artist.artist.name}
            type="ARTIST"
            circleImage
          />
        )}
      </div>,
      <div key="main" className="artist-details-tracks">
        <TabPanel
          data={tabPanelData}
          selectedId={this.state.selectedTabId}
          onTabChange={this.onTabChange}
        />
        {this.state.selectedTabId === 1 && artist.artist ? (
          <ArtistDetailsOverview
            token={this.props.token}
            artistId={artist.artist.id}
            artistRelatedArtists={artists}
          />
        ) : null}
        {this.state.selectedTabId === 2 && artist.artist ? (
          <ArtistsGrid artists={artists} artistChanged={this.artistChanged} />
        ) : null}
      </div>,
    ]
  }
}

export default compose(
  graphql(artist, {
    options: props => {
      return {
        variables: {
          token: props.token,
          artistId: props.match.params.artistId,
        },
      }
    },
    name: 'artist',
  }),
  graphql(artistRelatedArtists, {
    options: props => {
      return {
        variables: {
          token: props.token,
          artistId: props.match.params.artistId,
        },
      }
    },
    name: 'artistRelatedArtists',
  })
)(ArtistDetailsContainer)
