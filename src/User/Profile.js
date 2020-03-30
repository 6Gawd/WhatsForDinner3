import React, { useEffect, useState } from 'react';
import { auth } from '../base';
import { AuthContext } from '../Auth.js';
import annyang from 'annyang';
import Modal from 'react-responsive-modal';
import { profileInstructions } from '../Speech/Commands';

const Profile = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    annyang.addCommands(signOut);
    return () => {
      annyang.removeCommands(Object.keys(signOut));
    };
  }, []);

  const signOut = {
    'sign out': () => auth.signOut(),
    'show instructions': () => {
      setOpen(true);
    },
    'close instructions': () => {
      setOpen(false);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <button
        className="waves-effect waves-light btn-small red"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h4>Trevor's Commands</h4>
        <ul>
          {profileInstructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ul>
      </Modal>
      <div className="fixed-action-btn">
        <a
          className="btn-floating btn-medium amber"
          onClick={() => setOpen(true)}
        >
          <i className="large material-icons">help_outline</i>
        </a>
      </div>
    </div>
  );
};

export default Profile;
