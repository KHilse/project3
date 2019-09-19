import React from 'react'
//import Axios from 'axios';

interface IState {
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string,
  passwordVerify?: string,
  isVendor?: boolean
}

interface IProps {}

class Signup extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      firstname: props.firstname || '',
      lastname: props.lastname || '',
      email: props.email || '',
      password: props.password || '',
      passwordVerify: props.passwordVerify || '',
      isVendor: props.isVendor || false
    }
  }

  handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 //   let newUser: {} = this.state;
    let { isVendor, ...newUser } = this.state;

    console.log("NEWUSER:", newUser)
    fetch('http://localhost:3001/v1/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log("ERROR")
    })
  }

	storeInput = e => {
      if (e.target.name === 'vendor') {
        this.setState({[e.target.name]: !e.target.value})
      } else {
        this.setState({	[e.target.name]: e.target.value	})
      }
	}


  render() {
    return(
      <form onSubmit={this.handleSignup}>
        <input name="firstname" type="text" onChange={this.storeInput} value={this.state.firstname} />
        <input name="lastname" type="text" onChange={this.storeInput} value={this.state.lastname} />
        <input name="email" type="email" onChange={this.storeInput} value={this.state.email} />
        <input name="password" type="password" onChange={this.storeInput} value={this.state.password} />
        <input name="passwordVerify" type="password" onChange={this.storeInput} value={this.state.passwordVerify} />
        <input name="vendor" type="checkbox" onChange={this.storeInput} checked={this.state.isVendor} />
        <input type="submit" value="Sign Up!" />
      </form>
    )
  }
}

export default Signup
