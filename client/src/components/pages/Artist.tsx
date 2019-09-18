import axios from "axios";
import React, { Component } from "react";

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {},
      email: "",
      instagramIdPage: "",
      name: "",
      phoneNumber: "",
      pinned: "",
      website: "",
    };
  }

  public componentDidMount() {
    axios.get(BASE_URL + "/v1/users" + this.props.artistId)
    .then((response) => {
      const data = response.data.message;
      this.setState({
        address: data.vendor.address,
        email: data.email,
        instagramIdPage: data.vendor.instagramIdPage,
        name: data.name,
        phoneNumber: data.vendor.phoneNumber,
        pinned: data.vendor.pinned,
        website: data.vendor.website,
      });
    })
    .catch();
  }

  public render() {
    return(
      <div>
        This is a stub for looking at an Artist page (user side)
      </div>
    );
  }
}

export default Artist;
