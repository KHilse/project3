import React from 'react'
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
    links = (
      <span>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </span>
    )
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
