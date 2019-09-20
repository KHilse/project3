import React from 'react';

interface IFacebookLoginProps {
  checkFacebookLogin();
}

class FacebookLogin extends React.Component<IFacebookLoginProps, {}> {
  constructor(props){
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.checkFacebookLogin();

  }

  render() {
    return(
        <button onClick={this.handleClick}>Facebook</button>
    );
  }
}

export default FacebookLogin;
