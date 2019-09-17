import React, { Component } from 'react';

import Signup from '../auth/Signup'
import Login from '../auth/Login'
import Browse from './Browse'

class Home extends Component {
  render() {
    return (
      <div>
      <Signup />
      <Login />
      </div>
    )
  }
}

export default Home
