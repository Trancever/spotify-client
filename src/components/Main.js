import React from 'react'
import { Switch, Route } from 'react-router-dom'

import View from './View'
import PlaylistDetailsContainer from './PlaylistDetailsContainer'
import AlbumDetailsContainer from './AlbumDetailsContainer'
import AlbumsContainer from './AlbumsContainer'
import TracksContainer from './TracksContainer'
import ArtistsContainer from './ArtistsContainer'

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={View} />
        <Route
          exact
          path="/playlist/:playlistId/:ownerId"
          render={props => (
            <PlaylistDetailsContainer {...props} {...this.props} />
          )}
        />
        <Route
          exact
          path="/album/:albumId"
          render={props => (
            <AlbumDetailsContainer {...props} token={this.props.token} />
          )}
        />
        <Route
          exact
          path="/albums"
          render={() => <AlbumsContainer {...this.props} />}
        />
        <Route
          exact
          path="/tracks"
          render={() => <TracksContainer token={this.props.token} />}
        />
        <Route
          exact
          path="/artists"
          render={() => <ArtistsContainer token={this.props.token} />}
        />
      </Switch>
    )
  }
}

export default Main
