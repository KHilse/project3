import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import Content from './Content'
import Footer from './navigation/Footer'
import Nav from './navigation/Nav'
import Header from './navigation/Header'
import SERVER_URL from './const'

import { AppProps } from './react-app-env'




class App extends Component<AppProps, {}> {

  state = {
    user: null,
    artworks: [],
    current: {}
  }

  componentDidMount() {
    this.getUser()
    this.getArtworks()
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

  getArtworks = () => {
    axios.get('https://jsonplaceholder.typicode.com/photos?_start=10&_limit=10')
    .then(artworks => {
      console.log(artworks)
      this.setState({artworks: artworks.data, current: {} })
    })
    .catch(err => {
      console.log('Err while grabbing artworks', err)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Nav />
          <Header />
          <Content
          refreshArtworks={this.getArtworks}
          artworks={this.state.artworks}
          current={this.state.current}
           />
          <Footer />
        </header>
      </div>
    );
  }
}

export default App;
