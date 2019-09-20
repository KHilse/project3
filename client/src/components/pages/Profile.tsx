import React, { Component } from 'react'
<<<<<<< HEAD
import  { IUser, IVendor }  from '../../../../interfaces/modelInterfaces';
=======
>>>>>>> eb2a2ac6f2ebec4c2eed81cd62b3856702273d07
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { ContentInt } from '../../react-app-env';
import {Paper, Grid} from '@material-ui/core';
import Favorites from './Favorites'




class Profile extends Component<ContentInt, { current }> {
  constructor(props) {
    super(props);

    this.state = {
      current: this.props.current,
    }
  }
 useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
  }),
);


  componentDidMount() {
    console.log("CURRENT", this.state.current);
    if (!this.state.current.email) {
      this.setState({
        current: {
          firstname: 'Joe',
          lastname: 'Blow',
          email: 'abc@def.com',
          favorites: ['http://placekitten.com/100/100', 'http://placekitten.com/150/100'],
          vendor: {
            address: {
              streetNumber: '123',
              street: 'Main St',
              streetSuffix: 'NW',
              state: 'WA',
              country: 'USA',
              zipcode: '98133'
            },
            phoneNumber: '(205) 555-1212',
            website: 'http://mysite.com',
            pinned: ['http://placekitten.com/50/50']
          }
        }
      })
    }
  }

  renderFavorites() : JSX.Element {
    console.log("FAVE:", this.state.current.favorites);
    if (this.state.current.favorites) {
        return (
          <div>
            <p>Favorites</p>
            {this.state.current.favorites.map((favorite: string, i : number) => {
              return <img key={i} src={favorite} />
              })
            }
          </div>
        )
      } else {
        return <div><p>No Favorites!</p></div>
      }

  }

  renderVendor() : JSX.Element {
    if (this.state.current.vendor) {
      return (
        <div>
          <h2>Vendor Info</h2>
          <p>Address:</p>
          <p>{this.state.current.vendor.address.streetNumber} {this.state.current.vendor.address.street} {this.state.current.vendor.address.streetSuffix}<br />
          {this.state.current.vendor.address.state} {this.state.current.vendor.address.zipcode}, {this.state.current.vendor.address.country}</p>
          <p>{this.state.current.vendor.phoneNumber}</p>
          <p>{this.state.current.vendor.website}</p>
          <p>Pinned Instagram Posts</p>
          <img src={this.state.current.vendor.pinned[0]} alt="tattoo" />
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="profile-box">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper>
            <h1>My Profile</h1>
            <br />
            <p>{this.state.current.firstname} {this.state.current.lastname}</p>
            {this.renderVendor()}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <div>
            <Favorites savedPics={this.state.current.favorites} />
          </div>

        </Grid>
      </Grid>
      </div>
    )
  }
}

export default Profile
