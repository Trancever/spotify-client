import React from 'react'
import { Switch, Route } from 'react-router-dom'

import View from './View'
import PlaylistDetailsContainer from './PlaylistDetailsContainer'
import AlbumDetailsContainer from './AlbumDetailsContainer'

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
          render={props => <AlbumDetailsContainer {...props} {...this.props} />}
        />
      </Switch>
    )
  }
}

export default Main
