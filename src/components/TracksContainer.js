import React from 'react'
import { graphql } from 'react-apollo'
import '../styles/tracksContainer.css'

import { myTracks } from '../queries/queries'
import SimpleHeader from './SimpleHeader'
import TracksDetailedList from './TracksDetailedList'

class TracksContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: '',
      isFetchingMoreData: false,
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onFilterClose = this.onFilterClose.bind(this)
    this.fetchMoreData = this.fetchMoreData.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
  }

  onFilterClose() {
    this.setState({ filter: '' })
  }

  onFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  mapApiResponseToProps(items) {
    return items.map(item => item.track)
  }

  filterData(tracks) {
    const pattern = this.state.filter.toLowerCase()
    return tracks.filter(track => track.name.toLowerCase().includes(pattern))
  }

  fetchMoreData() {
    if (!this.props.tracks.myTracks) return
    const { offset, limit, total } = this.props.tracks.myTracks
    if (offset + limit < total) {
      this.setState({ isFetchingMoreData: true })
      this.props.tracks.fetchMore({
        variables: {
          offset: offset + limit,
          limit: 50,
          token: this.props.token,
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
      ...previousResult.myTracks.items,
      ...fetchMoreResult.myTracks.items,
    ]
    const offset = fetchMoreResult.myTracks.offset
    const myTracks = { ...previousResult.myTracks, items, offset }
    return { ...previousResult, myTracks }
  }

  render() {
    const data = this.props.tracks.loading
      ? []
      : this.props.tracks.myTracks.items
    return [
      <div key="header" className="tracks-details-header">
        <SimpleHeader name="Songs" />
      </div>,
      <div key="main" className="tracks-details-wrapper">
        <TracksDetailedList
          data={data}
          fetchMoreData={this.fetchMoreData}
          fetchingMoreData={this.state.isFetchingMoreData}
        />
      </div>,
    ]
  }
}

export default graphql(myTracks, {
  options: props => {
    return {
      variables: {
        token: props.token,
        limit: 50,
      },
    }
  },
  name: 'tracks',
})(TracksContainer)
