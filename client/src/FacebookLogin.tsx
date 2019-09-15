import React from 'react';

class FacebookLogin extends React.Component {
  checkFacebookLogin = () => {
    window.FB.getLoginStatus(response =>{
      console.log(response)
      if(response.status === 'connected'){
        console.log(response)
      }
      else {
        window.FB.login(function(response) {
          console.log(response)
        });
      }
    })
  }

  render() {
    return(
      <div>
        <button onClick={this.checkFacebookLogin}>Facebook</button>
      </div>
    )
  }
}

export default FacebookLogin;