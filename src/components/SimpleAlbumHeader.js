import React from 'react'
import '../styles/simpleAlbumHeader.css'

import SaveButton from './SaveButton'

const SimpleAlbumHeader = ({ album }) => {
  console.log('Simple album header', album)
  return (
    <div className="simple-album-header">
      <div className="simple-album-header-left">
        <img
          src={album.images[0].url}
          width="200"
          height="200"
          alt=""
          className="simple-album-header-image"
        />
      </div>
      <div className="simple-album-header-right">
        <p className="simple-album-header-year">2016</p>
        <p className="simple-album-header-name">{album.name}</p>
        <SaveButton text="save" />
      </div>
    </div>
  )
}

export default SimpleAlbumHeader