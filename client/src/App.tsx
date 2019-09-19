import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import {BrowserRouter as Router} from 'react-router-dom'

import Content from './Content'
import Footer from './navigation/Footer'
import Nav from './navigation/Nav'
//import Header from './navigation/Header'
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
    //If theres a token, try to use it ot get the user info
    if (token) {
      axios.get(`${SERVER_URL}/auth/current/user`, {
        headers: {'Authorization': `Bearer ${token}` }
      })
      .then(response => {
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
    axios.get('https://jsonplaceholder.typicode.com/photos?_start=12&_limit=12')
    .then(artworks => {
      this.setState({artworks: artworks.data, current: {} })
    })
    .catch(err => {
      console.log('Err while grabbing artworks', err)
    })
  }



  render() {
    return (
      <Router>
        <div className="App">
            <Nav user={this.state.user} />
            <Content
            refreshArtworks={this.getArtworks}
            refreshUser={this.getUser}
            artworks={this.state.artworks}
            current={this.state.current}
            />
            <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
