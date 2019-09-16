import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import Artist from './components/pages/Artist'
import FacebookLogin from './FacebookLogin'
import Footer from './navigation/Footer'
import Nav from './navigation/Nav'
import Header from './navigation/Header'
import SERVER_URL from './const'

export interface TokenCheck {
  user: (string | null);
}

class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    //see if theres a token
    let token = localStorage.getItem('mernToken')
    console.log('get user callews')
    //If theres a token, try to use it ot get the user info
    if (token) {
      console.log('token was there', token)
      axios.get(`${SERVER_URL}/auth/current/user`, {
        headers: {'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log(response)
        this.setState({ user: response.data.user })
      })
      .catch(err => {
        console.log('Error with token', err)
      })
    }
    else {
      this.setState({ user: null })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Nav />
          <Header />
          <FacebookLogin />
          <Footer />
        </header>
      </div>
    );
  }
}

export default App;
