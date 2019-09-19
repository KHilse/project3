import React from 'react'
import { Link } from 'react-router-dom'


const Nav = props => {
  let links;

  if (props.user) {
    links = (
      <span>
        <Link to='/logout'>Logout</Link>
      </span>
    )
  } else {
   links = ''
  }


  return (
    <div className="navBar">
        <div className="homeNav">
          <Link to='/'>Home</Link>
        </div>
        <div className="otherNav">
          <Link to='/browse'>Artworks</Link>
          <Link to='/profile'>Profile</Link>
          {links}
        </div>
    </div>
  )
}

export default Nav
