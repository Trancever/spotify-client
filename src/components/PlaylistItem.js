import React from 'react'
import '../styles/playlistItem.css'
import { Link } from 'react-router-dom'

const PlaylistItem = props => {
  return (
    <li className="playlist-item">
      <Link to={`/playlist/${props.data.id}/${props.data.owner.id}`}>
        {props.data.name}
      </Link>
    </li>
  )
}

export default PlaylistItem
