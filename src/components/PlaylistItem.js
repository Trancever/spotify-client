import React from 'react'
import '../styles/playlistItem.css'
import { Link } from 'react-router-dom'

const PlaylistItem = props => {
  return (
    <div>
      <p className="playlist-item">
        <Link to={`/playlist/${props.data.id}/${props.data.owner.id}`}>
          {props.data.name}
        </Link>
      </p>
    </div>
  )
}

export default PlaylistItem
