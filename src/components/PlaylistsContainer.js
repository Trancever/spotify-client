import React from 'react'
import { graphql } from 'react-apollo'
import '../styles/playlistsContainer.css'

import { myPlaylists } from '../queries/queries'
import Playlists from './Playlists'

class PlaylistsContainer extends React.Component {
  render() {
    const data = this.props.data.loading
      ? []
      : this.props.data.myPlaylists.items

    const { selectedElement, onChange } = this.props
    return (
      <ul className="playlists-list">
        <li className="playlists-header">PLAYLISTS</li>
        <Playlists
          data={data}
          selectedElement={selectedElement}
          onChange={onChange}
        />
      </ul>
    )
  }
}

export default graphql(myPlaylists, {
  options: props => {
    return {
      variables: {
        token: props.token,
      },
    }
  },
})(PlaylistsContainer)
