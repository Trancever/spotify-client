import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/playlistDetailsTracks.css'

import { milisecondsToMMSS } from '../utils/utils'

class PlaylistDetailsTracks extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: '',
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onClearIconClick = this.onClearIconClick.bind(this)
  }

  onFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  onClearIconClick() {
    this.setState({ filter: '' })
  }

  filterTracks() {
    const { filter } = this.state
    const pattern = filter.toLowerCase()
    return this.props.data.items.filter(({ track }) => {
      return (
        track.name.toLowerCase().includes(pattern) ||
        track.album.name.includes(pattern)
      )
    })
  }

  render() {
    return (
      <div className="playlist-details-tracks-container">
        <div className="tracks-filter">
          <i
            className="fa fa-search white-color search-icon"
            aria-hidden="true"
          />
          <input
            className="filter-input"
            type="text"
            value={this.state.filter}
            onChange={this.onFilterChange}
            placeholder="Filter"
          />
          <i
            onClick={this.onClearIconClick}
            className="fa fa-times white-color close-icon"
            aria-hidden="true"
          />
        </div>
        <ul className="tracks-list">
          <li className="list-header">
            <div className="list-header-container">
              <div className="title-column">TITLE</div>
              <div className="artist-column">ARTIST</div>
              <div className="album-column">ALBUM</div>
              <div className="duration-column">
                <i className="fa fa-clock-o fa-lg" aria-hidden="true" />
              </div>
            </div>
          </li>
          {this.filterTracks().map(({ track }) => (
            <li key={track.id} className="track-item">
              <div className="list-item-container">
                <div className="title-column ellipsis-wrap">{track.name}</div>
                <div className="artist-column ellipsis-wrap">
                  <Link to="">{track.artists[0].name}</Link>
                </div>
                <div className="album-column ellipsis-wrap">
                  <Link to={`/album/${track.album.name}`}>
                    {track.album.name}
                  </Link>
                </div>
                <div className="duration-column grey-text ellipsis-wrap">
                  {milisecondsToMMSS(track.duration_ms)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PlaylistDetailsTracks