import React from 'react'
import '../styles/artist.css'

const Artist = ({ artist }) => {
  return (
    <div className="artist-wrapper">
      <div className="image-box">
        <img
          src={artist.images[1].url}
          alt=""
          height="200"
          width="200"
          className="artist-image"
        />
        <div className="faded-box" />
        <div className="play-image-button" />
      </div>
      <p className="artist-name">{artist.name}</p>
    </div>
  )
}

export default Artist
