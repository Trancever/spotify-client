import React from 'react'
import '../styles/artist.css'
import { withRouter } from 'react-router-dom'

const Artist = ({ artist, history }) => {
  function changeRoute() {
    history.push(`/artists/${artist.id}`)
  }

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
        <div className="faded-box" onClick={changeRoute} />
        <div className="play-image-button" />
      </div>
      <p className="artist-name">{artist.name}</p>
    </div>
  )
}

export default withRouter(Artist)
