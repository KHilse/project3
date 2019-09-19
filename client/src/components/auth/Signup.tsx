import React from 'react'
//import Axios from 'axios';
//import { IUserModel } from '../../../../interfaces/modelInterfaces';

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

class Signup extends React.Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      firstname: props.firstname || '',
      lastname: props.lastname || '',
      email: props.email || '',
      password: props.password || '',
      passwordVerify: props.passwordVerify || '',
      isVendor: props.isVendor || true,
      vendor: props.vendor || {
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

  
  handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    let newUser: {} = this.state;

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
      console.log(e.target.name, e.target.value, e.target.checked);
      if (e.target.name === 'isVendor') {
        this.setState({ isVendor: !this.state.isVendor })
      } else if (e.target.name.startsWith('vendoraddress')) {
        let tempName = e.target.name.slice('vendoraddress'.length);
        let vendorCopy = JSON.parse(JSON.stringify(this.state.vendor));
        vendorCopy.address[tempName] = e.target.value;
        this.setState({ vendor: vendorCopy});
      } else if (e.target.name.startsWith('vendor')) {
        let tempName = e.target.name.slice('vendor'.length);
        let vendorCopy = JSON.parse(JSON.stringify(this.state.vendor));
        vendorCopy[tempName] = e.target.value;
        this.setState({ vendor: vendorCopy});
      } else {
        let tempName = e.target.name;
        let stateCopy = JSON.parse(JSON.stringify(this.state.vendor));
        stateCopy[tempName] = e.target.value;
        this.setState(stateCopy);
      }
	}


  render() {
    let vendorFields;
    if (this.state.isVendor) {
      vendorFields = (
        <div>
          <input name="vendoraddressstreetNumber" type="text" placeholder="Street Number" onChange={this.storeInput} value={this.state.vendor.address.streetNumber} />
          <input name="vendoraddressstreet" type="text" placeholder="Street Name" onChange={this.storeInput} value={this.state.vendor.address.street} />
          <input name="vendoraddressstreetSuffix" type="text" placeholder="Street Suffix" onChange={this.storeInput} value={this.state.vendor.address.streetSuffix} />
          <input name="vendoraddresscity" type="text" placeholder="City" onChange={this.storeInput} value={this.state.vendor.address.city} />
          <input name="vendoraddressstate" type="text" placeholder="State" onChange={this.storeInput} value={this.state.vendor.address.state} />
          <input name="vendoraddresscountry" type="text" placeholder="Country" onChange={this.storeInput} value={this.state.vendor.address.country} />
          <input name="vendoraddresszipcode" type="text" placeholder="Zip Code" onChange={this.storeInput} value={this.state.vendor.address.zipcode} />
          <input name="vendorphonenumber" type="text" placeholder="Phone Number" onChange={this.storeInput} value={this.state.vendor.phoneNumber} />
          <input name="vendorwebsite" type="text" placeholder="Website" onChange={this.storeInput} value={this.state.vendor.website} />
        </div>
      )
    } else {
      vendorFields = (<div></div>);
    }


    return (
      <form onSubmit={this.handleSignup}>
        <input name="firstname" type="text" placeholder="First Name" onChange={this.storeInput} value={this.state.firstname} />
        <input name="lastname" type="text" placeholder="Last Name" onChange={this.storeInput} value={this.state.lastname} />
        <input name="email" type="email" placeholder="Email" onChange={this.storeInput} value={this.state.email} />
        <input name="password" type="password" placeholder="Password" onChange={this.storeInput} value={this.state.password} />
        <input name="passwordVerify" type="password" placeholder="Confirm Password" onChange={this.storeInput} value={this.state.passwordVerify} />
        Are you an artist?
        <input name="isVendor" type="checkbox" onChange={this.storeInput} checked={this.state.isVendor} />
        {vendorFields}
        <input type="submit" value="Sign Up!" />
      </form>
    )
  }
}

export default Signup;