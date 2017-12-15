import React from 'react'
import '../styles/playlistItem.css'
import { Link } from 'react-router-dom'

const PlaylistItem = props => {
  const cssClass =
    props.selectedElement === props.data.name
      ? 'playlist-item selected-element'
      : 'playlist-item'

  return (
    <li className={cssClass}>
      <Link
        onClick={props.onChange(props.data.name)}
        to={`/playlist/${props.data.id}/${props.data.owner.id}`}
      >
        {props.data.name}
      </Link>
    </li>
  )
}

export default PlaylistItem
