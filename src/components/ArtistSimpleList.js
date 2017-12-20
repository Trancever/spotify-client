import React from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/artistSimpleList.css'

const ArtistSimpleList = ({ artists, history }) => {
  function changeRouteToArtist(artistId) {
    return () => {
      history.push(`/artists/${artistId}`)
    }
  }

  return (
    <div className="artist-list-container">
      <p className="artist-list-title">Related Artists</p>
      <ul className="artist-simple-list">
        {artists.map(artist => (
          <li
            onClick={changeRouteToArtist(artist.id)}
            key={artist.id}
            className="artist-list-item"
          >
            <img
              src={artist.images[0].url}
              width="40"
              height="40"
              alt=""
              className="artist-list-item-image"
            />
            <p className="artist-list-item-name">{artist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withRouter(ArtistSimpleList)
