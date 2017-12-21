import React from 'react'
import '../styles/simpleAlbumHeader.css'

import SaveButton from './SaveButton'

const defaultImageUrl =
  'https://lh4.ggpht.com/DGyWJI9fkNukhRXMuE46cnzXMkhfskc3nTfm-jmKt3P9eUITBMLDdU51omlCt2Jbzw=w300'

const SimpleAlbumHeader = ({ album }) => {
  return (
    <div className="simple-album-header">
      <div className="simple-album-header-left">
        <img
          src={album.images.length > 0 ? album.images[0].url : defaultImageUrl}
          width="150"
          height="150"
          alt=""
          className="simple-album-header-image"
        />
      </div>
      <div className="simple-album-header-right">
        <div className="simple-album-header-right-top">
          <p className="simple-album-header-year">2016</p>
          <p className="simple-album-header-name">{album.name}</p>
        </div>
        <div className="simple-album-header-right-bottom">
          <SaveButton text="save" />
        </div>
      </div>
    </div>
  )
}

export default SimpleAlbumHeader
