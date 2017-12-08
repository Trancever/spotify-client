import React from 'react'
import '../styles/albumDetailsTracks.css'

const AlbumDetailsTracks = ({ data }) => {
  return (
    <div className="album-details-tracks-container">
      <ul className="album-tracks-list">
        {data.map(track => {
          return <li className="album-track-item">{track.name}</li>
        })}
      </ul>
    </div>
  )
}

export default AlbumDetailsTracks
