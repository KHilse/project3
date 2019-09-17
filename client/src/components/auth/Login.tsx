import React, { Component } from 'react'
import { AppProps } from '../../react-app-env'

class Login extends Component <AppProps, {}> {

  submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }

  render() {
    let loginForm;
    if (!this.props.user) {
     loginForm= (
      <form onSubmit={this.submitLogin}>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
      </form>
    )
    }
    return(
      <div className="login">
        {loginForm}
      </div>
    )
  }
}

export default Login
