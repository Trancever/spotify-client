import React from 'react'
import '../styles/albumsGrid.css'
import Waypoint from 'react-waypoint'
import { SyncLoader } from 'react-spinners'

import Album from './Album'

const AlbumsGrid = ({
  data,
  filter,
  token,
  fetchMoreData,
  fetchingMoreData,
}) => {
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

  return [
    <div key="grid" className="albums-grid">
      {getFilteredData().map(item => (
        <Album key={item.album.id} token={token} data={item} />
      ))}
    </div>,
    <Waypoint key="waypoint" onEnter={fetchMoreData} />,
    <div key="spinner" className="spinner-container">
      <SyncLoader loading={fetchingMoreData} color={'#2ebd59'} size={12} />
    </div>,
  ]
}

export default AlbumsGrid
