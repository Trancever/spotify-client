import React from 'react'
import Proptypes from 'prop-types'
import '../styles/tabPanel.css'

const TabPanel = ({ data, selectedId, onTabChange }) => {
  function tabChanged(tabId) {
    return () => onTabChange(tabId)
  }

  return (
    <div className="tab-panel">
      {data.map(item => {
        const cssClass = selectedId === item.id ? 'tab isSelected' : 'tab'
        return (
          <div key={item.id} className={cssClass} onClick={tabChanged(item.id)}>
            {item.label}
          </div>
        )
      })}
    </div>
  )
}

TabPanel.propTypes = {
  data: Proptypes.array,
  selectedId: Proptypes.number,
  onTabChange: Proptypes.func,
}

export default TabPanel
