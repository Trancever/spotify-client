import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/albumsContainer.css'

import FilterableHeader from './FilterableHeader'
import AlbumsGrid from './AlbumsGrid'

class AlbumsContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      sortedBy: '',
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
    return [
      <div className="albums-header" key="header">
        <FilterableHeader
          onFilterChange={this.onFilterChange}
          onFilterClose={this.onFilterClose}
          filter={this.state.filter}
        />
      </div>,
      <div className="albums-list" key="main">
        {this.props.data.loading ? null : (
          <AlbumsGrid data={this.props.data.myAlbums.items} />
        )}
      </div>,
    ]
  }
}

const query = gql`
  query myAlbums($token: String!, $limit: Int) {
    myAlbums(token: $token, limit: $limit) {
      items {
        added_at
        album {
          id
          name
          images {
            url
          }
          artists {
            name
          }
        }
      }
    }
  }
`

export default graphql(query, {
  options: props => {
    return {
      variables: {
        token: props.token,
        limit: 30,
      },
    }
  },
})(AlbumsContainer)
