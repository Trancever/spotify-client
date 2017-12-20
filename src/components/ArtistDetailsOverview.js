import React from 'react'
import '../styles/artistDetailsOverview.css'
import { graphql } from 'react-apollo'

import { artistTopTracks } from '../queries/queries'
import TracksList from './TracksList'
import SaveButton from './SaveButton'

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

  render() {
    const { popularTracksListExpanded } = this.state
    const { artistTopTracks } = this.props.data
    const tracks = artistTopTracks ? artistTopTracks.tracks : []
    const slicedTracks = popularTracksListExpanded
      ? tracks.slice(0, 10)
      : tracks.slice(0, 5)
    return (
      <div className="top-artist-details-wrapper">
        <div className="left-artist-details-box">
          {tracks.length > 0 ? (
            <div>
              <p className="popular-tracks-title">Popular</p>
              <TracksList data={slicedTracks} />
              <div className="artist-details-button-container">
                <SaveButton
                  text={popularTracksListExpanded ? 'Hide 5' : 'Show 5 more'}
                  onClick={this.handleButtonClick}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="right-artist-details-box" />
      </div>
    )
  }
}

export default graphql(artistTopTracks, {
  options: props => {
    return {
      variables: {
        token: props.token,
        artistId: props.artistId,
        country: 'US',
      },
    }
  },
})(ArtistDetailsOverview)
