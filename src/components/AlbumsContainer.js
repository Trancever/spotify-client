import React from 'react'
import { graphql } from 'react-apollo'
import '../styles/albumsContainer.css'

import { myAlbums } from '../queries/queries'
import FilterableHeader from './FilterableHeader'
import AlbumsGrid from './AlbumsGrid'

class AlbumsContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      sortedBy: '',
      filter: '',
      isFetchingMoreData: false,
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onFilterClose = this.onFilterClose.bind(this)
    this.fetchMoreData = this.fetchMoreData.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
  }

  onFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  onFilterClose() {
    this.setState({ filter: '' })
  }

  fetchMoreData() {
    const { data } = this.props
    const { limit, offset, total } = data.myAlbums
    if (offset + limit < total) {
      this.setState({ isFetchingMoreData: true })
      data.fetchMore({
        variables: {
          token: this.props.token,
          offset: offset + limit,
          limit: 50,
        },
        updateQuery: this.updateQuery,
      })
    }
  }

  updateQuery(previousResult, { fetchMoreResult }) {
    this.setState({ isFetchingMoreData: false })
    if (!fetchMoreResult) {
      return previousResult
    }
    const items = [
      ...previousResult.myAlbums.items,
      ...fetchMoreResult.myAlbums.items,
    ]
    const offset = fetchMoreResult.myAlbums.offset
    const myAlbums = {
      ...previousResult.myAlbums,
      items,
      offset,
    }
    return { ...previousResult, myAlbums }
  }

  render() {
    console.log(this.props)
    return [
      <div className="albums-header" key="header">
        <FilterableHeader
          onFilterChange={this.onFilterChange}
          onFilterClose={this.onFilterClose}
          filter={this.state.filter}
          name="Albums"
        />
      </div>,
      <div className="albums-list" key="main">
        {this.props.data.loading ? null : (
          <AlbumsGrid
            data={this.props.data.myAlbums.items}
            filter={this.state.filter}
            token={this.props.token}
            fetchMoreData={this.fetchMoreData}
            fetchingMoreData={this.state.isFetchingMoreData}
          />
        )}
      </div>,
    ]
  }
}

export default graphql(myAlbums, {
  options: props => {
    return {
      variables: {
        token: props.token,
        limit: 30,
        offset: 0,
      },
    }
  },
})(AlbumsContainer)
