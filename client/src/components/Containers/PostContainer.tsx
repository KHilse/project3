import axios from "axios";
import React, { Component } from "react";
import BASE_URL from "../../const";
import Post from "../Interactive/Post";
import PostInfo from "../Interactive/PostInfo";

interface IPostContainerProps {
  postId: string;
  userId: string;
}

interface IPostContainerState {
  artistInstagram: string;
  artistName: string;
  caption: string;
  id: string;
  mediaType: string;
  mediaUrl: string;
  timestamp: string;
}

class PostContainer extends Component<IPostContainerProps, IPostContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      artistInstagram: "",
      artistName: "",
      caption: "",
      id: "",
      mediaType: "",
      mediaUrl: "",
      timestamp: "",
    };
  }

  public componentDidMount() {
    axios.get(BASE_URL +
              "/v1/instagram/user/" +
              this.props.userId +
              this.props.postId)
    .then((response) => {
      return response.data.message;
    })
    .catch((err) => {
      console.log(err, "Error getting Post");
    });
  }

  public render() {
    return(
      <div>
        <Post id={this.state.id}
              mediaType={this.state.mediaType}
              mediaUrl={this.state.mediaUrl}
        />
        <PostInfo artistInstagram={this.state.artistInstagram}
                  artistName={this.state.artistName}
                  caption={this.state.caption}
                  timestamp={this.state.timestamp}
        />
      </div>
    );
  }
}

export default PostContainer;
