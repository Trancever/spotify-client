import React from 'react'
import '../styles/playlistDetailsHeader.css'

import PlayButton from './PlayButton'

const PlaylistDetailsHeader = props => {
  function handleButtonClick() {
    console.log('Button clicked')
  }

  return (
    <div className="wrapper">
      <div className="header-box">
        <div className="left-box">
          <img
            src={props.data.images[0].url}
            alt="Nothing"
            width="230"
            height="230"
          />
        </div>
        <div className="right-box">
          <div>
            <p className="white-text small-text sans-serif-text">Playlist</p>
            <p className="white-text heading-text">{props.data.name}</p>
            {props.data.description ? (
              <p className="grey-text small-text">{props.data.description}</p>
            ) : null}
            <p className="grey-text small-text">
              Created by: {props.user.display_name}
            </p>
            <div className="buttons-container">
              <PlayButton onClick={handleButtonClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaylistDetailsHeader
