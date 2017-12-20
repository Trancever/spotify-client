import React from 'react'
import PropTypes from 'prop-types'
import '../styles/playlistDetailsHeader.css'

import PlayButton from './PlayButton'
import Savebutton from './SaveButton'

const DetailsHeader = ({
  imageUrl,
  name,
  description,
  createdBy,
  type,
  onSaveClick,
  token,
  albumId,
  isSaved,
}) => {
  function handleButtonClick() {
    console.log('Button clicked')
  }
  return (
    <div className="wrapper">
      <div className="header-box">
        <div className="left-box">
          <img
            className="header-image"
            src={imageUrl}
            alt="Nothing"
            width="230"
            height="230"
          />
        </div>
        <div className="right-box">
          <div>
            <p className="white-text small-text sans-serif-text">{type}</p>
            <p className="white-text heading-text">{name}</p>
            {description ? (
              <p className="grey-text small-text">{description}</p>
            ) : null}
            <p className="grey-text small-text">Created by: {createdBy}</p>
            <div className="buttons-container">
              <PlayButton onClick={handleButtonClick} />
              <Savebutton
                onClick={onSaveClick}
                text={isSaved ? 'SAVED' : 'SAVE'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DetailsHeader.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  createdBy: PropTypes.string,
  type: PropTypes.string,
  albumId: PropTypes.string,
  token: PropTypes.string,
  onSaveClick: PropTypes.func,
  isSaved: PropTypes.bool,
}

export default DetailsHeader
