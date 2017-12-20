import React from 'react'
import '../styles/artistHeader.css'

const ArtistHeader = ({ imageUrl, name }) => {
  return (
    <div className="artist-header-wrapper">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="artist-background-image"
      >
        <div className="content">
          <p className="artist-name">{name}</p>
        </div>
      </div>
    </div>
  )
}

export default ArtistHeader
