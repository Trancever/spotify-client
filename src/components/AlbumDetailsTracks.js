import React from 'react'
import '../styles/albumDetailsTracks.css'

import { milisecondsToMMSS } from '../utils/utils'

const AlbumDetailsTracks = ({ data }) => {
  return (
    <div className="album-details-tracks-container">
      <ul className="album-tracks-list">
        <li className="album-tracks-row album-track-header">
          <div className="album-index-column">#</div>
          <div className="album-title-column">TITLE</div>
          <div className="album-time-column">
            <i className="fa fa-clock-o fa-lg" aria-hidden="true" />
          </div>
        </li>
        {data.map((track, index) => {
          return (
            <li key={track.id} className="album-tracks-row album-track-item">
              <div className="album-index-column">{index + 1}</div>
              <div className="album-title-column">{track.name}</div>
              <div className="album-time-column">
                {milisecondsToMMSS(track.duration_ms)}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AlbumDetailsTracks
