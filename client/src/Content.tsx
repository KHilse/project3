import React, { Component } from 'react'
import { Route } from "react-router-dom"

import Browse from './components/pages/Browse'
import Home from './components/pages/Home'
import Logout from './components/auth/Logout'
import FacebookLogin from './FacebookLogin'
import Profile from './components/pages/Profile'

import { ContentInt } from './react-app-env'



class Content extends Component<ContentInt> {
  render() {
    console.log('USER:', this.props.user);
    return (
      <div>
        <Route exact path='/' render={ () =>
          <Home refreshUser={this.props.refreshUser} />
        } />
<<<<<<< HEAD
        <Route path='/profile' component={Profile} />
=======

        <Route path='/profile' render={
        () => <Profile user={this.props.user} /> } />

>>>>>>> b5ca380e2dcca2a178fcc5993c16f9615f1d5e24
        <Route path='/browse' render={ () =>
           <Browse refreshArtworks={this.props.refreshArtworks}
            artworks={this.props.artworks} />
          } />
      </div>
    )
  }
}

export default Content
