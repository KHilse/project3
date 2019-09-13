import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Profile from '../components/Profile'

const Nav = () => {
  return (
    <nav>
      <Link component={Profile} />
    </nav>
  )
}

export default Nav
