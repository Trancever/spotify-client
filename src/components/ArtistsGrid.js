import React from 'react'
import '../styles/artistsGrid.css'

import Artist from './Artist'

const ArtistsGrid = ({ artists }) => {
  console.log('Artist grid')
  return (
    <div className="artists-grid">
      {artists
        .filter(artist => artist.images.length > 0)
        .map(artist => <Artist key={artist.id} artist={artist} />)}
    </div>
  )
}

export default ArtistsGrid
