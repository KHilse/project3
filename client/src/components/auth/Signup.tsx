import Button from "@material-ui/core/Button";
import React from "react";
import { Redirect } from "react-router-dom";
// import Axios from 'axios';
// import { IUserModel } from '../../../../interfaces/modelInterfaces';
import FacebookLogin from "../../FacebookLogin";
import UserForm from "./UserForm";
import Vendors from "./Vendors";

interface IUserCheck {
  user: (string | null | undefined);
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
      email: props.email || "",
      firstname: props.firstname || "",
      isVendor: props.isVendor || false,
      lastname: props.lastname || "",
      password: props.password || "",
      passwordVerify: props.passwordVerify || "",
      vendor: {
        address: {
          city: "",
          country: "",
          state: "",
          street: "",
          streetNumber: "",
          streetSuffix: "",
          zipcode: "",
        },
        instagramAccessToken: "",
        instagramIdPage: "",
        phoneNumber: "",
        website: "",
      },
    };
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
        window.FB.login( (loginResponse) => {
          this.setState({
            vendor: {
              instagramAccessToken: loginResponse.authResponse.accessToken,
            },
          });
        });
      }
    });
  }

  handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: {} = this.state;
    fetch("http://localhost:3001/v1/auth/signup", {
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then( (response) => response.json())
      .then( (result) => {
        this.props.refreshUser();
        this.render();
      })
      .catch( (err) => {
        console.log("ERROR");
      });
  }

  storeInput = (e) => {
    console.log(e.target.name, e.target.value, e.target.checked);
    if (e.target.name === "isVendor") {
      this.setState({ isVendor: !this.state.isVendor });
    } else if (e.target.name.startsWith("vendoraddress")) {
      const tempName = e.target.name.slice("vendoraddress".length);
      const vendorCopy = JSON.parse(JSON.stringify(this.state.vendor));
      vendorCopy.address[tempName] = e.target.value;
      this.setState({ vendor: vendorCopy });
    } else if (e.target.name.startsWith("vendor")) {
      const tempName = e.target.name.slice("vendor".length);
      const vendorCopy = JSON.parse(JSON.stringify(this.state.vendor));
      vendorCopy[tempName] = e.target.value;
      this.setState({ vendor: vendorCopy });
    } else {
      const tempName = e.target.name;
      const stateCopy = JSON.parse(JSON.stringify(this.state.vendor));
      stateCopy[tempName] = e.target.value;
      this.setState(stateCopy);
    }
  }

  render() {
    let vendorFields;
    if (this.props.user) {
      return (<Redirect to="/browse" />);
    }
    if (this.state.isVendor) {
      vendorFields = (
        <div>
        <FacebookLogin checkFacebookLogin={this.checkFacebookLogin}/>
        </div>
      );
    } else {
      vendorFields = (<div></div>);
    }

    return (
      <form onSubmit={this.handleSignup}>
        <h1>Sign Up</h1>
        <UserForm recordUser={this.storeInput} newUser={this.state}/>
        <br />
        <div className="isVendor">
          <h1 className="Artist" >Are you an artist? <input className="ArtistCheck"
                                                            name="isVendor"
                                                            type="checkbox"
                                                            onChange={this.storeInput}
                                                            checked={this.state.isVendor} />
          </h1>
          <br />
        </div>
        {vendorFields}
        <Button variant="contained" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default Signup;
