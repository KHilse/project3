import React, { Component } from 'react'
import axios from 'axios'
//import { AppProps } from '../../react-app-env'

export interface LoginInt {
  user?: (string | null),
  email?: string,
  password?: string,
  refreshUser(),
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface FormState {
  user?: (string | null)
  email: string,
  password: string,
  firstname?: string,
  lastname?: string
}

class Login extends Component <LoginInt, {}> {

  state: FormState = {
    user: null,
    email: '',
    password: ''
  }

  submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post(`http://localhost:3001/v1/auth/login`, this.state)
    .then(response => {
      localStorage.setItem('mernToken', response.data.token)
      this.props.refreshUser()
      console.log(response)
    })
    .catch(err => {
      console.dir(err)
    })
  }

  handleChange = (e: ChangeEvent) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {
    // let loginForm;
    // if (this.props.user) {
    //  loginForm= (
    //   <form onSubmit={this.submitLogin}>
    //     <input type="email" placeholder="email" onChange={this.handleChange} name="email" />
    //     <input type="password" placeholder="password" onChange={this.handleChange} name="password" />
    //     <input type='submit' value='submit' />
    //   </form>
    // )
    // }
    return(
      <div className="login">
        <form onSubmit={this.submitLogin}>
          <input type="email" placeholder="email" onChange={this.handleChange} name="email" />
          <input type="password" placeholder="password" onChange={this.handleChange} name="password" />
          <input type='submit' value='submit' />
        </form>
      </div>
    )
  }
}

export default Login
