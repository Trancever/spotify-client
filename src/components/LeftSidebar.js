import React from 'react'
import '../styles/leftSidebar.css'

import PlaylistsContainer from './PlaylistsContainer'
import Libraries from './Libraries'

const LeftSidebar = props => {
  return (
    <div className="sidebar">
      <Libraries />,
      <PlaylistsContainer {...props} />
    </div>
  )
}

export default LeftSidebar
