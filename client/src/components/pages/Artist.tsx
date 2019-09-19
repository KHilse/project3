import axios from "axios";
import React, { Component } from "react";

import Contact from "../Interactive/Contact";
import Map from "../Interactive/Map";
import Pinned from "../Interactive/Pinned";

import BASE_URL from "../../const";

interface IArtistProps {
  artistId: string;
}

interface IArtistState {
  address: {};
  businessName: string;
  contactInfo: {
    email: string;
    instagramIdPage: string;
    name: string;
    phoneNumber: string;
    website: string;
  };
  id: string;
  pinned: [];
}

class ArtistPage extends Component<IArtistProps, IArtistState> {
  constructor(props) {
    super(props);
    this.state = {
      address: {},
      businessName: "",
      contactInfo: {
        email: "",
        instagramIdPage: "",
        name: "",
        phoneNumber: "",
        website: "",
      },
      id: "",
      pinned: [],
    };
  }

  public componentDidMount() {
    axios.get(BASE_URL + "/v1/users" + this.props.artistId)
    .then((response) => {
      const data = response.data.message;
      this.setState({
        address: data.vendor.address,
        businessName: data.vendor.businessName,
        contactInfo: {
          email: data.email,
          instagramIdPage: data.vendor.instagramIdPage,
          name: data.name,
          phoneNumber: data.vendor.phoneNumber,
          website: data.vendor.website,
        },
        id: data.id,
        pinned: data.vendor.pinned,
      });
    });
  }

  public render() {
    return(
      <div>
        <h4>{this.state.businessName}</h4>
        <Pinned pinned={this.state.pinned} userId={this.state.id}/>
        <Contact contactInfo={this.state.contactInfo}/>
        <Map address={this.state.address}/>
      </div>
    );
  }
}

export default ArtistPage;
