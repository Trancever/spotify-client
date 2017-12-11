import React from 'react'
import '../styles/filter.css'

const Filter = ({ value, onChange, placeholder = 'Filter', onClose }) => {
  return (
    <div className="tracks-filter">
      <i className="fa fa-search white-color search-icon" aria-hidden="true" />
      <input
        className="filter-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <i
        onClick={this.onClose}
        className="fa fa-times white-color close-icon"
        aria-hidden="true"
      />
    </div>
  )
}

export default Filter
