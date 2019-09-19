import React, { Component } from 'react';

import Login, { LoginInt } from '../auth/Login'
import Signup from '../auth/Signup';

class Home extends Component <LoginInt> {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Login refreshUser={this.props.refreshUser}/>
        <Signup />
      </div>
    )
  }
}

export default Home
