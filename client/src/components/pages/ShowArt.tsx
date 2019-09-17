import React, { Component } from 'react'
import { IPost } from '../../react-app-env';

class ShowArt extends Component<IPost> {
  render() {
    return(
      <div>
        Show the art individually: TODO pop up with a close out window.
        <p>{this.props.id} {this.props.media_type} {this.props.timestamp}</p>
        <img src={this.props.media_url} />
      </div>
    )
  }
}

export default ShowArt
