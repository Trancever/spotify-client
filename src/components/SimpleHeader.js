import React from 'react'
import '../styles/simpleHeader.css'

import HorizontalLine from './HorizontalLine'
import PlayButton from './PlayButton'

const SimpleHeader = ({ name }) => {
  return (
    <div className="filterable-header-wrapper">
      <div className="content-box">
        <p className="filterable-header white-text">{name}</p>
        <div className="simple-header-button-wrapper">
          <PlayButton />
        </div>
        <HorizontalLine />
      </div>
    </div>
  )
}

export default SimpleHeader
