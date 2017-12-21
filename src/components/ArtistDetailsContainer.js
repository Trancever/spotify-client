import React from 'react'
import '../styles/artistDetailsContainer.css'
import { graphql } from 'react-apollo'

import { artist } from '../queries/queries'
import DetailsHeader from './DetailsHeader'
import TabPanel from './TabPanel'
import ArtistDetailsOverview from './ArtistDetailsOverview'

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
  }

  onTabChange(tabId) {
    this.setState({ selectedTabId: tabId })
  }

  render() {
    return [
      <div key="header" className="artist-details-header">
        {!this.props.data.artist ? null : (
          <DetailsHeader
            imageUrl={this.props.data.artist.images[0].url}
            name={this.props.data.artist.name}
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
        {this.state.selectedTabId === 1 && this.props.data.artist ? (
          <ArtistDetailsOverview
            token={this.props.token}
            artistId={this.props.data.artist.id}
          />
        ) : null}
      </div>,
    ]
  }
}

export default graphql(artist, {
  options: props => {
    return {
      variables: {
        token: props.token,
        artistId: props.match.params.artistId,
      },
    }
  },
})(ArtistDetailsContainer)
