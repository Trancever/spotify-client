import React from 'react'
import '../styles/leftSidebar.css'

import PlaylistsContainer from './PlaylistsContainer'
import Libraries from './Libraries'

class LeftSidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedElement: 'Albums',
    }
    this.setSelectedElement = this.setSelectedElement.bind(this)
  }

  setSelectedElement(selectedElement) {
    return () => {
      this.setState({ selectedElement })
    }
  }

  render() {
    return (
      <div className="sidebar">
        <Libraries
          selectedElement={this.state.selectedElement}
          onChange={this.setSelectedElement}
        />,
        <PlaylistsContainer
          {...this.props}
          selectedElement={this.state.selectedElement}
          onChange={this.setSelectedElement}
        />
      </div>
    )
  }
}

export default LeftSidebar
