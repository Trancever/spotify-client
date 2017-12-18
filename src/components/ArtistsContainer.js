import React from 'react'
import { graphql } from 'react-apollo'

import { myArtists } from '../queries/queries'
import FilterableHeader from './FilterableHeader'
import ArtistsGrid from './ArtistsGrid'

class ArtistsContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: '',
    }
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onFilterClose = this.onFilterClose.bind(this)
  }

  onFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  onFilterClose() {
    this.setState({ filter: '' })
  }

  render() {
    console.log(this.props)
    return [
      <div key="header" className="artists-header">
        <FilterableHeader
          name="Artists"
          onFilterChange={this.onFilterChange}
          onFilterClose={this.onFilterClose}
        />
      </div>,
      <div key="main" className="artists-wrapper">
        {this.props.data.loading ? null : (
          <ArtistsGrid
            artists={this.props.data.myArtists.items}
            filter={this.state.filter}
          />
        )}
      </div>,
    ]
  }
}

export default graphql(myArtists, {
  options: props => {
    return {
      variables: {
        token: props.token,
        limit: 50,
        offset: 0,
      },
    }
  },
})(ArtistsContainer)
