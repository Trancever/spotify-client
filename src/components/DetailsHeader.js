import React from 'react'
import PropTypes from 'prop-types'
import '../styles/playlistDetailsHeader.css'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PlayButton from './PlayButton'
import Savebutton from './SaveButton'

const DetailsHeader = ({
  imageUrl,
  name,
  description,
  createdBy,
  type,
  mutate,
  token,
  albumId,
}) => {
  function handleButtonClick() {
    console.log('Button clicked')
  }

  function handleSave() {
    mutate({
      variables: {
        token: token,
        albumId: albumId,
      },
      refetchQueries: ['myAlbums'],
    }).then(res => console.log(res))
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
              <Savebutton onClick={handleSave} text="SAVE" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const saveAlbumForUser = gql`
  mutation saveAlbumForUser($token: String!, $albumId: String!) {
    saveAlbumForUser(token: $token, albumId: $albumId) {
      id
      name
      images {
        url
      }
      artists {
        id
        name
      }
      popularity
      tracks {
        items {
          id
          name
          duration_ms
        }
      }
    }
  }
`

DetailsHeader.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  createdBy: PropTypes.string,
  albumId: PropTypes.string,
  token: PropTypes.string,
  mutate: PropTypes.func,
}

export default graphql(saveAlbumForUser)(DetailsHeader)
