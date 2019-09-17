import React, { Component } from 'react';

import Login, { LoginInt } from '../auth/Login'

class Home extends Component <LoginInt> {
  render() {
    return (
      <div>
      lalalalalala
      <Login refreshUser={this.props.refreshUser}/>
      </div>
    )
  }
}

export default Home
