import React from 'react'
import { Redirect } from 'react-router-dom'
//import Axios from 'axios';
//import { IUserModel } from '../../../../interfaces/modelInterfaces';
import Vendors from './Vendors'
import UserForm from './UserForm'
import Button from '@material-ui/core/Button';

interface IUserCheck {
  user: (string | null | undefined),
  refreshUser();
}

interface IState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordVerify: string;
  isVendor: boolean;
  vendor: {
    address?: {
      city?: string;
      streetNumber?: string;
      street?: string;
      streetSuffix?: string;
      state?: string;
      country?: string;
      zipcode?: string;
    };
    instagramAccessToken?: string;
    instagramIdPage?: string;
    phoneNumber?: string;
    website?: string;
  };
}

class Signup extends React.Component<IUserCheck, IState> {
  constructor(props) {
    super(props);

    this.state = {
      firstname: props.firstname || '',
      lastname: props.lastname || '',
      email: props.email || '',
      password: props.password || '',
      passwordVerify: props.passwordVerify || '',
      isVendor: props.isVendor || false,
      vendor: {
        address: {
          city: '',
          streetNumber: '',
          street: '',
          streetSuffix: '',
          state: '',
          country: '',
          zipcode: '',
        },
        instagramAccessToken: '',
        instagramIdPage: '',
        phoneNumber: '',
        website: ''
      }
    }
  }

  checkFacebookLogin = () => {
    window.FB.getLoginStatus( (response) => {
      if (response.status === "connected") {
        this.setState({
          vendor: {
            instagramAccessToken: response.authResponse.accessToken,
          },
        });
      } else {
        window.FB.login( (response) => {
          this.setState({
            vendor: {
              instagramAccessToken: response.authResponse.accessToken,
            },
          });
        });
      }
      console.log("Made it here");
    });
  }

  handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    let newUser: {} = this.state;

    console.log("NEWUSER:", newUser)
    fetch('http://localhost:3001/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        console.log('Signup success!', result);
        this.props.refreshUser()
        this.render();
      })
      .catch(err => {
        console.log("ERROR")
      })
  }

  storeInput = e => {
    console.log(e.target.name, e.target.value, e.target.checked);
    if (e.target.name === 'isVendor') {
      this.setState({ isVendor: !this.state.isVendor })
    } else if (e.target.name.startsWith('vendoraddress')) {
      let tempName = e.target.name.slice('vendoraddress'.length);
      let vendorCopy = JSON.parse(JSON.stringify(this.state.vendor));
      vendorCopy.address[tempName] = e.target.value;
      this.setState({ vendor: vendorCopy });
    } else if (e.target.name.startsWith('vendor')) {
      let tempName = e.target.name.slice('vendor'.length);
      let vendorCopy = JSON.parse(JSON.stringify(this.state.vendor));
      vendorCopy[tempName] = e.target.value;
      this.setState({ vendor: vendorCopy });
    } else {
      let tempName = e.target.name;
      let stateCopy = JSON.parse(JSON.stringify(this.state.vendor));
      stateCopy[tempName] = e.target.value;
      this.setState(stateCopy);
    }
  }

  render() {
    let vendorFields;
    console.log('this.props.user', this.props.user);
    if (this.props.user) {
      return (<Redirect to='/browse' />)
    }
    if (this.state.isVendor) {
      vendorFields = (
        <div>
          <Vendors recordVendor={this.storeInput} newVendor={this.state.vendor} checkFacebookLogin={this.checkFacebookLogin}/>
        </div>
      )
    } else {
      vendorFields = (<div></div>);
    }


    return (
      <form onSubmit={this.handleSignup}>
        <h1>Sign Up</h1>
        <UserForm recordUser={this.storeInput} newUser={this.state}/>
        <br />
        <div className="isVendor">
          <h1 className="Artist" >Are you an artist? <input className="ArtistCheck" name="isVendor" type="checkbox" onChange={this.storeInput} checked={this.state.isVendor} /></h1>

          <br />
        </div>
        {vendorFields}
        <Button variant="contained" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    )
  }
}

export default Signup;
