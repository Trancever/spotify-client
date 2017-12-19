import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { graphql } from 'react-apollo'

import { myTracks } from '../queries/queries'
import ArtistsContainer from './ArtistsContainer'
import ArtistDetailsContainer from './ArtistDetailsContainer'

class ArtistsRouter extends React.Component {
  filterTracksByArtistId(artistId) {
    return this.props.data.myTracks.items.filter(({ track }) =>
      track.artists.some(artist => artist.id === artistId)
    )
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/artists"
          render={() => <ArtistsContainer token={this.props.token} />}
        />
        <Route
          exact
          path="/artists/:artistId"
          render={props => {
            const { loading } = this.props.data
            const tracks = loading
              ? []
              : this.filterTracksByArtistId(props.match.params.artistId)
            return (
              <ArtistDetailsContainer
                {...props}
                token={this.props.token}
                tracks={tracks}
              />
            )
          }}
        />
      </Switch>
    )
  }
}

export default graphql(myTracks, {
  options: props => {
    return {
      variables: {
        token: props.token,
        offset: 0,
        limit: 50,
      },
    }
  },
})(ArtistsRouter)
