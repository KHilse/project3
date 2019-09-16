import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Browse from './components/pages/Browse'
import Home from './components/pages/Home'
import Logout from './components/auth/Logout'
import FacebookLogin from './FacebookLogin'
import Profile from './components/pages/Profile'

export interface ContentInt {
  getArtworks():void,
  artworks: {id: string, image: string},
}



class Content extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Home}/>
        //THESE ROUTE WILL BE ADDED AFTER WE GET THE RESTFULL ROUTES DONE
        //<Route pathe='/login' component={FacebookLogin} />

        // <Route path='/profile' component={Profile} />
         <Route path='/browse' refreshArtworks={this.props.refreshArtworks} component={Browse} />
        // <Route path='/logout' component={Logout} />
      </div>
    )
  }
}

export default Content
