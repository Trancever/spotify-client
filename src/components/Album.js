import React from 'react'
import '../styles/album.css'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Album extends React.Component {
  constructor() {
    super()
    this.state = {
      imageHovered: false,
      tickHovered: false,
    }

    this.imageMouseEnter = this.imageMouseEnter.bind(this)
    this.imageMouseLeave = this.imageMouseLeave.bind(this)
    this.tickMouseEnter = this.tickMouseEnter.bind(this)
    this.tickMouseLeave = this.tickMouseLeave.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  imageMouseEnter() {
    this.setState({ imageHovered: true })
  }

  imageMouseLeave() {
    this.setState({ imageHovered: false })
  }

  tickMouseEnter() {
    this.setState({ tickHovered: true })
  }

  tickMouseLeave() {
    this.setState({ tickHovered: false })
  }

  handleButtonClick() {
    this.props
      .mutate({
        variables: {
          token: this.props.token,
          albumId: this.props.data.album.id,
        },
      })
      .then(res => console.log(res))
  }

  renderImageExtender() {
    const cssClass = this.state.tickHovered
      ? 'fa fa-times fa-2x'
      : 'fa fa-check fa-2x'
    return (
      <div className="image-extender" onMouseLeave={this.imageMouseLeave}>
        <div
          className="save-tick"
          onMouseEnter={this.tickMouseEnter}
          onMouseLeave={this.tickMouseLeave}
        >
          <i
            className={cssClass}
            aria-hidden="true"
            onClick={this.handleButtonClick}
          />
        </div>
      </div>
    )
  }

  render() {
    console.log(this.props)
    const { data } = this.props
    return (
      <div className="album-box">
        {this.state.imageHovered ? this.renderImageExtender() : null}
        <img
          src={data.album.images[0].url}
          alt=""
          height="220"
          width="220"
          onMouseEnter={this.imageMouseEnter}
          className="album-image"
        />
        <p className="album-desc color-white">
          <strong>{data.album.name}</strong>
        </p>
        <p className="album-desc color-grey">{data.album.artists[0].name}</p>
      </div>
    )
  }
}

const mutation = gql`
  mutation removeAlbumFromSaved($token: String!, $albumId: String!) {
    removeAlbumFromSaved(token: $token, albumId: $albumId) {
      id
    }
  }
`

export default graphql(mutation)(Album)
