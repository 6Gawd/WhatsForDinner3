import React, { useContext } from 'react';
import { auth } from './base';
import { AuthContext } from './Auth.js';

const Profile = () => {
  // const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <h1>Home</h1>
      <button
        className="waves-effect waves-light btn-small red"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
};

export default Profile;
