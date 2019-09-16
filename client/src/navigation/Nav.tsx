import React, { Component } from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'

import Profile from '../components/pages/Profile'
import Browse from '../components/pages/Browse'
import Home from '../components/pages/Home'

const Nav = () => {
  return (
    <nav>
      // need to set up some routes on the backend before I insert here I think, GET routes
      // <Link component={Profile} />
      // <Link component={Browse} />
      // <Link component={Home} />
    </nav>
  )
}

export default Nav
