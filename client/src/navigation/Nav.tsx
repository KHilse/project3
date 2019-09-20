import React from 'react'
import { Link } from 'react-router-dom'


const Nav = props => {
  let links;

  if (props.user) {
    links = (
      <span>
        <Link to='/profile'>Profile</Link>
        <Link to='/logout'>Logout</Link>
        <Link to='/profile'>Profile</Link>
      </span>
    )
  } else {
   links = <Link to='/signup'>Login/Signup</Link>
  }


  return (
    <div className="navBar">
        <div className="homeNav">
          <Link to='/'>Inkline</Link>
        </div>
        <div className="otherNav">
          <Link to='/browse'>Artworks</Link>
          {links}
        </div>
    </div>
  )
}

export default Nav
