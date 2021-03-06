import React from 'react'
import '../styles/playlist.css'

import PlaylistItem from './PlaylistItem'

const Playlists = props => {
  return props.data.map((item, index) => {
    return (
      <PlaylistItem
        key={index}
        data={item}
        selectedElement={props.selectedElement}
        onChange={props.onChange}
      />
    )
  })
}

export default Playlists
