import React, { Component } from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'

import Profile from '../components/pages/Profile'
import Browse from '../components/pages/Browse'
import Home from '../components/pages/Home'

const Nav = () => {
  return (
    <span>
    <Router>
      <Link to='/profile' component={Profile}>Profile</Link>
      <Link to='/browse' component={Browse}>Artworks</Link>
      <Link to='/' component={Home}>Home</Link>
      </Router>
    </span>
  )
}

export default Nav
