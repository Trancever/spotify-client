import React from 'react'
import '../styles/libraries.css'

const Libraries = props => {
  return (
    <ul className="libraries-list">
      <li className="library-header">YOUR LIBRARY</li>
      <li className="library-item">Your Daily Mix</li>
      <li className="library-item">Recently Played</li>
      <li className="library-item">Songs</li>
      <li className="library-item">Albums</li>
      <li className="library-item">Artists</li>
    </ul>
  )
}

export default Libraries
