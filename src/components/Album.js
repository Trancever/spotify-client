import React from 'react'
import '../styles/album.css'

const Album = ({ data }) => {
  console.log(data)
  return (
    <div className="album-box">
      <img src={data.album.images[0].url} alt="" height="220" width="220" />
      <p className="album-desc color-white">
        <strong>{data.album.name}</strong>
      </p>
      <p className="album-desc color-grey">{data.album.artists[0].name}</p>
    </div>
  )
}

export default Album
