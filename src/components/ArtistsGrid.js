import React from 'react'
import '../styles/artistsGrid.css'

import Artist from './Artist'

const ArtistsGrid = ({ artists, filter = '', artistChanged }) => {
  const pattern = filter.toLowerCase()
  return (
    <div className="artists-grid">
      {artists
        .filter(
          artist =>
            artist.images.length > 0 &&
            artist.name.toLowerCase().includes(pattern)
        )
        .map(artist => (
          <Artist
            key={artist.id}
            artist={artist}
            artistChanged={artistChanged}
          />
        ))}
    </div>
  )
}

export default ArtistsGrid
