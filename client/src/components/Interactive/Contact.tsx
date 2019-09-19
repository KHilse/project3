import React from "react";

const Contact = (props) => {
  return(
    <div>
      <span>{props.contactInfo.email}</span>
      <span>{props.contactInfo.instagramIdPage}</span>
      <span>{props.contactInfo.name}</span>
      <span>{props.contactInfo.phoneNumber}</span>
      <span>{props.contactInfo.website}</span>
    </div>
  );
};

export default Contact;
