import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const Nav = props => {
  let links;

  if (props.user) {
    links = (
      <span>
        <Link to='/profile'>Profile</Link>
        <Link to='/logout'>Logout</Link>
      </span>
    )
  } else {
    let links = ''
  }


  return (
    <div className="navBar">
        <span>
          <Link to='/browse'>Artworks</Link>
          <Link to='/'>Home</Link>
          {links}
        </span>
    </div>
  )
}

export default Nav
