import React from 'react'
import '../styles/playlist.css'

import PlaylistItem from './PlaylistItem'

const Playlists = props => {
  function renderSinglePlaylist(item, index) {
    return <PlaylistItem key={index} data={item} />
  }

  return <ul className="playlist">{props.data.map(renderSinglePlaylist)}</ul>
}

export default Playlists
