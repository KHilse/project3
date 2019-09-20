import React from 'react';
import AuthBox from '../auth/AuthBox'

const Home = props => {

    return (
      <div className="home">
      <AuthBox user={props.user} refreshUser={props.refreshUser} />
      </div>
    )

}

export default Home
