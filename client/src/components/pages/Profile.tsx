import {Grid, Paper} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { Component } from "react";
import { ContentInt } from "../../react-app-env";
import Favorites from "./Favorites";

const Profile =  (props) => {

 const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
  }),
 );

  let renderFavorites= () : JSX.Element => {
    console.log("FAVE:", props.current.favorites);
    if (props.current.favorites) {
        return (
          <div>
            <p>Favorites</p>
            {props.current.favorites.map((favorite: string, i : number) => {
              return <img key={i} src={favorite} />
              })
            }
          </div>
        );
      } else {
        return <div><p>No Favorites!</p></div>;
      }

  }

  let renderVendor = function() : JSX.Element {
    if (props.current.vendor) {
      return (
        <div>
          <h2>Vendor Info</h2>
          <p>Address:</p>
          <p>{props.current.vendor.address.streetNumber} {props.current.vendor.address.street} {props.current.vendor.address.streetSuffix}<br />
          {props.current.vendor.address.props} {props.current.vendor.address.zipcode}, {props.current.vendor.address.country}</p>
          <p>{props.current.vendor.phoneNumber}</p>
          <p>{props.current.vendor.website}</p>
          <p>Pinned Instagram Posts</p>
          <img src={props.current.vendor.pinned[0]} alt="tattoo" />
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }

    return (
      <div className="profile-box">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper>
            <h1>My Profile</h1>
            <br />
            <p>{props.current.firstname} {props.current.lastname}</p>
            {renderVendor()}
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <div>
            <Favorites savedPics={props.current.favorites} />
          </div>

        </Grid>
      </Grid>
      </div>
    )
}

export default Profile;
