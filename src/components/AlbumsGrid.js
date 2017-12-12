import React from 'react'
import '../styles/albumsGrid.css'

import Album from './Album'

const AlbumsGrid = ({ data, filter, token }) => {
  function getFilteredData() {
    const pattern = filter.toLowerCase()
    return data.filter(item => {
      const artistsName = item.album.artists.map(artist =>
        artist.name.toLowerCase()
      )

      const isInside = artistsName.reduce((prev, curr) => {
        return curr.includes(pattern) ? true : prev
      }, false)

      return item.album.name.toLowerCase().includes(pattern) || isInside
    })
  }

  return (
    <div className="albums-grid">
      {getFilteredData().map(item => (
        <Album key={item.album.id} token={token} data={item} />
      ))}
    </div>
  )
}

export default AlbumsGrid
