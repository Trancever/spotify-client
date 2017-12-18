import React from 'react'
import '../styles/artist.css'

const Artist = ({ artist }) => {
  return (
    <div className="artist-wrapper">
      <img
        src={artist.images[1].url}
        alt=""
        height="200"
        width="200"
        className="artist-image"
      />
      <div className="faded-box" />
      <p className="artist-name">{artist.name}</p>
    </div>
  )
}

export default Artist
