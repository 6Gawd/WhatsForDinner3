import React, { useEffect, useState } from 'react';
import { auth } from '../base';
import annyang from 'annyang';
import Modal from 'react-responsive-modal';
import { profileInstructions } from '../Speech/Commands';

const Signout = ({ history }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    annyang.addCommands(signOut);
    return () => {
      annyang.removeCommands('sign out');
    };
  }, []);

  const signOut = {
    help: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    }
  };

  const handleSignout = () => {
    history.push('/login');
    auth.signOut();
  };

  return (
    <div className="container card-padding">
      <div className="card-panel card-padding">
        <p>Do you really want to sign out?</p>
        <button
          className="waves-effect waves-light btn-small red"
          onClick={() => handleSignout()}
        >
          Sign out
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h4>Alex's Commands</h4>
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

export default Signout;
