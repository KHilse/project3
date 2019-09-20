import React, { Component } from 'react'
import axios from 'axios'
import Test from './Test'
import SERVER_URL from '../../const'
//import { AppProps } from '../../react-app-env'

export interface LoginInt {
  user?: ({} | null),
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
    axios.post(`${SERVER_URL}/v1/auth/login`, this.state)
    .then(response => {
      localStorage.setItem('mernToken', response.data.token)
      this.props.refreshUser()
      return(response)
    })
    .then(response => {
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
    return(
      <div>
        <form onSubmit={this.submitLogin}>
        <Test refreshUser={this.props.refreshUser} user={this.props.user} handleChange={this.handleChange} />
        </form>
      </div>
    )
  }
}

export default Login
