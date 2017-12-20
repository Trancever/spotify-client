import React from 'react'
import '../styles/tracksList.css'
import Waypoint from 'react-waypoint'
import { SyncLoader } from 'react-spinners'

import { milisecondsToMMSS } from '../utils/utils'

const TracksList = ({ data, fetchMoreData, fetchingMoreData }) => {
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
              <div className="album-index-column album-white">{index + 1}</div>
              <div className="album-title-column album-white">{track.name}</div>
              <div className="album-time-column album-grey">
                {milisecondsToMMSS(track.duration_ms)}
              </div>
            </li>
          )
        })}
      </ul>
      <Waypoint onEnter={fetchMoreData} />
      <div className="spinner-container">
        <SyncLoader loading={fetchingMoreData} color={'#2ebd59'} size={12} />
      </div>
    </div>
  )
}

export default TracksList
