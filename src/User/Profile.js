import React, { useEffect } from 'react';
import { auth } from '../base';
import { AuthContext } from '../Auth.js';
import annyang from 'annyang'

const Profile = ({history}) => {

  useEffect(() => {
    annyang.start();
    annyang.addCommands(navbarCommands());
    return () => {
      annyang.removeCommands();
      annyang.abort();
    };
  }, []);

  const navbarCommands = () => {
  	return {
  		'go to my list': () => {
        history.push("/list")
      },
      'go to my favorite recipes': () => {
        history.push("/favoriterecipes")
      },
      'go to my profile': () => {
        history.push("/profile")
      },
      'get recipes': () => {
        history.push("/recipes")
      },
      'sign out': () => {
        auth.signOut()
      }
  	}
  }

  return (
    <div>
      <h1>Profile</h1>
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
