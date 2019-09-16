import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Home from './components/pages/Home'
import Profile from './components/pages/Profile'
import Browse from './components/pages/Browse'
import Logout from './components/auth/Logout'



class Content extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Home}/>
        //THESE ROUTE WILL BE ADDED AFTER WE GET THE RESTFULL ROUTES DONE

        // <Route path='/profile' component={Profile} />
        // <Route path='/browse' component={Browse} />
        // <Route path='/logout' component={Logout} />
      </div>
    )
  }
}

export default Content
