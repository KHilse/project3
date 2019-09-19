import React from 'react';
import AuthBox from '../auth/AuthBox'
import Map from '../Interactive/Map';

const Home = props => {

    return (
      <div className="home">
<<<<<<< Updated upstream
      <AuthBox user={props.user} refreshUser={props.refreshUser} />
=======
        <Map />
      <AuthBox />
>>>>>>> Stashed changes
      </div>
    )

}

export default Home
