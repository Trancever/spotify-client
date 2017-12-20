import React from 'react'
import PropTypes from 'prop-types'
import '../styles/detailsHeader.css'

import PlayButton from './PlayButton'
import Savebutton from './SaveButton'

const DetailsHeader = ({
  imageUrl,
  circleImage,
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
            className={circleImage ? 'header-image circled' : 'header-image'}
            src={imageUrl}
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
            {createdBy ? (
              <p className="grey-text small-text">Created by: {createdBy}</p>
            ) : null}
            <div className="buttons-container">
              <PlayButton onClick={handleButtonClick} />
              <div className="margin-left-10">
                <Savebutton
                  onClick={onSaveClick}
                  text={isSaved ? 'SAVED' : 'SAVE'}
                />
              </div>
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
  circleImage: PropTypes.bool,
}

export default DetailsHeader
