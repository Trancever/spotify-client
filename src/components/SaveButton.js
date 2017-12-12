import React from 'react'
import '../styles/saveButton.css'

const SaveButton = props => {
  return (
    <button onClick={props.onClick} className="save-button">
      {props.text}
    </button>
  )
}

export default SaveButton
