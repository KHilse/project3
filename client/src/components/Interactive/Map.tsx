import dotenv from 'dotenv';
import React from "react";
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// const geocodingClient = mbxGeocoding({ accessToken: process.env.mapboxAccessToken});
import { IAddress } from '../../../../interfaces/modelInterfaces';
import ReactMapGL, { InteractiveMapProps, ViewState } from 'react-map-gl';

interface IMapProps {
  address: IAddress;
}

interface IMapState {
  address: IAddress;
  viewport: ViewState & InteractiveMapProps;
}

class Map extends React.Component<IMapProps, IMapState> {

  constructor (props: IMapProps) {
    super(props);   
    
    this.state = {
      address: {
        streetNumber: props.address.streetNumber,
        street: props.address.street,
        streetSuffix: props.address.streetSuffix,
        city: props.address.city,
        state: props.address.state,
        zipcode: props.address.zipcode,
        country: props.address.country,
        geoLocation: props.address.geoLocation
      },
      viewport: {
        width: 400,
        height: 400,
        latitude: 0,
        longitude: 0,
        zoom: 0    
      }
    }  
  }

  render() {

    var view = JSON.parse(JSON.stringify(this.state));

    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState(view)}
      />
    );
  }
}


export default Map;
