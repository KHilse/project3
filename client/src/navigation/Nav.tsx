import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const Nav = () => {
  return (
    <div className="navBar">
      <span>
        <Link to='/profile'>Profile</Link>
        <Link to='/browse'>Artworks</Link>
        <Link to='/'>Home</Link>
      </span>
    </div>
  )
}

export default Nav
