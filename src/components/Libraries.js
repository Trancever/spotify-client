import React from 'react'
import '../styles/libraries.css'

import { Link } from 'react-router-dom'

const libraries = [
  { name: 'Your Daily Mix', path: '/daily_mix' },
  { name: 'Recently Played', path: '/recently_played' },
  { name: 'Songs', path: '/tracks' },
  { name: 'Albums', path: '/albums' },
  { name: 'Artists', path: '/artists' },
]

const Libraries = props => {
  return (
    <ul className="libraries-list">
      <li className="library-header">
        <a>YOUR LIBRARY</a>
      </li>
      {libraries.map(library => {
        const cssClass =
          library.name === props.selectedElement
            ? 'library-item selected-element'
            : 'library-item'
        return (
          <li key={library.path} className={cssClass}>
            <Link onClick={props.onChange(library.name)} to={library.path}>
              {library.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Libraries
