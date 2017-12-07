import React from 'react'
import '../styles/playButton.css'

const PlayButton = props => {
  return (
    <button onClick={props.onClick} className="play-button">
      PLAY
    </button>
  )
}

export default PlayButton
