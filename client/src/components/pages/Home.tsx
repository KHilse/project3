import React, { Component } from 'react';
import AuthBox from '../auth/AuthBox'

<<<<<<< HEAD
const Home = props => {

    return (
      <div className="formTemp">
      <AuthBox />

=======
import Login, { LoginInt } from '../auth/Login'

class Home extends Component <LoginInt> {
  render() {
    return (
      <div>
      lalalalalala
      <Login refreshUser={this.props.refreshUser}/>
>>>>>>> b5ca380e2dcca2a178fcc5993c16f9615f1d5e24
      </div>
    )

}

export default Home
