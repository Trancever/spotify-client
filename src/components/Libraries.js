import React from 'react'
import '../styles/libraries.css'

import { Link } from 'react-router-dom'

const Libraries = props => {
  return (
    <ul className="libraries-list">
      <li className="library-header">
        <a>YOUR LIBRARY</a>
      </li>
      <li className="library-item">
        <Link to="/daily_mix">Your Daily Mix</Link>
      </li>
      <li className="library-item">
        <Link to="/recently_played">Recently Played</Link>
      </li>
      <li className="library-item">
        <Link to="/songs">Songs</Link>
      </li>
      <li className="library-item">
        <Link to="/albums">Albums</Link>
      </li>
      <li className="library-item">
        <Link to="/artists">Artists</Link>
      </li>
    </ul>
  )
}

export default Libraries
