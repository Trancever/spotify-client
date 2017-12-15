import React from 'react'
import '../styles/filterableHeader.css'

import HorizontalLine from './HorizontalLine'
import Filter from './Filter'

const FilterableHeader = ({
  onFilterChange,
  onFilterClose,
  onSortedByChange,
  filter,
  sortedBy,
  name,
}) => {
  return (
    <div className="filterable-header-wrapper">
      <div className="content-box">
        <p className="filterable-header white-text">{name}</p>
        <HorizontalLine />
        <Filter
          onChange={onFilterChange}
          onClose={onFilterClose}
          value={filter}
        />
        <HorizontalLine />
      </div>
    </div>
  )
}

export default FilterableHeader
