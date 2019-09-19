import React from 'react'
//import Axios from 'axios';
import { Document } from "mongoose";
import { IVendorModel, IAddressModel, IUserModel } from '../../../../interfaces/modelInterfaces';
​
// interface IState {
//   firstname?: string,
//   lastname?: string,
//   email?: string,
//   password?: string,
//   passwordVerify?: string,
//   isVendor?: boolean,
//   streetNumber?: string,
//   street?: string,
//   streetSuffix?: string,
//   state?: string,
//   country?: string,
//   zipcode?: string,
//   instagramAccessToken?: string,
//   instagramIdPage?: string,
//   phoneNumber?: string,
//   website?: string
// }
interface IState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordVerify: string;
  isVendor: boolean;
  vendor: {
    address: {
      city: string;
      streetNumber: string;
      street: string;
      streetSuffix: string;
      state: string;
      country: string;
      zipcode: string;
    };
    instagramAccessToken: string;
    instagramIdPage: string;
    phoneNumber: string;
    website: string;
    };
}
​
interface IProps {}
​
class Signup extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
​
    this.state = {
      firstname: props.firstname || '',
      lastname: props.lastname || '',
      email: props.email || '',
      password: props.password || '',
      passwordVerify: props.passwordVerify || '',
      isVendor: props.isVendor || false,
      vendor: {
        address: {
          city: props.vendor.address.city || '',
          streetNumber: props.vendor.address.streetNumber || '',
          street: props.vendor.address.street || '',
          streetSuffix: props.vendor.address.streetSuffix || '',
          state: props.vendor.address.state || '',
          country: props.vendor.address.country || '',
          zipcode: props.vendor.address.zipcode || '',
        },
        instagramAccessToken: '',
        instagramIdPage: '',
        phoneNumber: props.vendor.phoneNumber || '',
        website: props.vendor.website || ''
        }
    }
  }
​
  handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // let newUser: {} = {};
​
    // newUser['firstname'] = this.state.firstname;
    // newUser['lastname'] = this.state.lastname;
    // newUser['email'] = this.state.email;
    // newUser['password'] = this.state.password;
    // newUser['passwordVerify'] = this.state.passwordVerify;
​
    // if (this.state.isVendor) {
    //   newUser['vendor']['address']['streetNumber'] = this.state.vendor.address.streetNumber;
    //   newUser['vendor']['address']['street'] = this.state.vendor.address.street;
    //   newUser['vendor']['address']['streetSuffix'] = this.state.streetSuffix;
    //   newUser['vendor']['address']['state'] = this.state.state;
    //   newUser['vendor']['address']['country'] = this.state.country;
    //   newUser['vendor']['address']['zipcode'] = this.state.zipcode;
    //   newUser['vendor']['instagramAccessToken'] = '';
    //   newUser['vendor']['instagramIdPage'] = '';
    //   newUser['vendor']['phoneNumber'] = this.state.vendor.phoneNumber;
    //   newUser['vendor']['website'] = this.state.vendor.website;
    // }
    
    let newUser: {} = this.state;
​
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
​
	storeInput = e => {
      if (e.target.name === 'isVendor') {
        this.setState({ [e.target.name]: !e.target.value })
      } else {
        this.setState({	[e.target.name]: e.target.value	})
      }
	}
​
​
  render() {
    let vendorFields;
    if (this.state.isVendor) {
      vendorFields = (
        <div>
          <input name="streetNumber" type="text" onChange={this.storeInput} value={this.state.vendor.address.streetNumber} />
          <input name="street" type="text" onChange={this.storeInput} value={this.state.vendor.address.street} />
          <input name="streetSuffix" type="text" onChange={this.storeInput} value={this.state.vendor.address.streetSuffix} />
          <input name="state" type="text" onChange={this.storeInput} value={this.state.vendor.address.state} />
          <input name="country" type="text" onChange={this.storeInput} value={this.state.vendor.address.country} />
          <input name="zipcode" type="text" onChange={this.storeInput} value={this.state.vendor.address.zipcode} />
        </div>
      )
    } else {
      vendorFields = ( <div></div> );
    }
​
​
    return(
      <form onSubmit={this.handleSignup}>
        <input name="firstname" type="text" onChange={this.storeInput} value={this.state.firstname} />
        <input name="lastname" type="text" onChange={this.storeInput} value={this.state.lastname} />
        <input name="email" type="email" onChange={this.storeInput} value={this.state.email} />
        <input name="password" type="password" onChange={this.storeInput} value={this.state.password} />
        <input name="passwordVerify" type="password" onChange={this.storeInput} value={this.state.passwordVerify} />
        <input name="isVendor" type="checkbox" onChange={this.storeInput} checked={this.state.isVendor} />
        {vendorFields}
        <input type="submit" value="Sign Up!" />
      </form>
    )
  }
}
​
export