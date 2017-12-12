import React from 'react'
import '../styles/albumsGrid.css'

import Album from './Album'

const AlbumsGrid = ({ data, filter }) => {
  return (
    <div className="albums-grid">
      {data.map(item => <Album key={item.album.id} data={item} />)}
    </div>
  )
}

export default AlbumsGrid
