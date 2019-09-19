import React, { Component } from "react";
import { Route } from "react-router-dom";

import Art from "./components/pages/Art";
import Artist from "./components/pages/Artist";
import Browse from "./components/pages/Browse";
import Home from "./components/pages/Home";
//import Logout from "./components/auth/Logout"
//import FacebookLogin from "./FacebookLogin"
import Profile from "./components/pages/Profile";

import { ContentInt } from "./react-app-env";

class Content extends Component<ContentInt> {
  render() {
    return (
      <div>
        <Route exact path="/" render={ () =>
          <Home refreshUser={this.props.refreshUser}/>
        } />
        <Route path="/profile" render={() =>
          <Profile current={this.props.current}
                   refreshUser={this.props.refreshUser}
                   refreshArtworks={this.props.refreshArtworks}  />
        } />
        <Route path="/browse" render={ () =>
           <Browse refreshArtworks={this.props.refreshArtworks}
                   artworks={this.props.artworks} />
          } />
        <Route exact path="/art/:artistId/:postId" render={ (path) =>
          <Art userId={path.match.params.artistId}
                         postId={path.match.params.postId} />
        } />
        <Route path="/artist/:id" render={ (path) =>
          <Artist id={path.match.params.id}/>
        } />
      </div>
    );
  }
}

export default Content;
