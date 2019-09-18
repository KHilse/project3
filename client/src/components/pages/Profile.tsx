import React, { Component } from 'react'

const Profile = (props) => {
    console.log("Profile Served");
    console.log("User:", props.user);

    let userInfo;
    let vendorInfo;
    if (props.user) {
      userInfo = props.user;
    } else {
      userInfo = {
        firstname: 'Joe',
        lastname: 'Blow',
        email: 'abc@def.com',
        vendor: {
          address: {
            streetNumber: '123',
            street: 'Main St',
            streetSuffix: 'NW',
            state: 'WA',
            country: 'USA',
            zipcode: '98133'
          },
          phoneNumber: '(205) 555-1212',
          website: 'http://mysite.com'
        }
      };
      vendorInfo = <div>
          <p>Address:</p>
          <p>{userInfo.vendor.address.streetNumber} {userInfo.vendor.address.street} {userInfo.vendor.address.streetSuffix}<br />
          {userInfo.vendor.address.state} {userInfo.vendor.address.zipcode}, {userInfo.vendor.address.country}</p>
          <p>{userInfo.vendor.phoneNumber}</p>
          <p>{userInfo.vendor.website}</p>
      </div>
    }
    
    return(
      <div>
        <h1>My Profile</h1>
        <div>
          <p>{userInfo.firstname} {userInfo.lastname}</p>
          {vendorInfo}
        </div>
      </div>
    )
}

export default Profile
