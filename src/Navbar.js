import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Auth';
import Modal from 'react-responsive-modal';
import annyang from 'annyang';

const Navbar = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  console.log('navbar', props);
  // useEffect(() => {
  //   annyang.start();
  //   annyang.addCommands({
  //     'go to my list': () => {
  //       history.push('/list');
  //     },
  //     'go to my favorite recipes': () => {
  //       history.push('/favoriterecipes');
  //     },
  //     'go to my profile': () => {
  //       history.push('/profile');
  //     },
  //     'get recipes': () => {
  //       history.push('/recipes');
  //     }
  //   });
  // }, []);

  const navbarVoiceCommands = () => {
    return {
      testing: () => {
        console.log('testing');
      }
    };
  };

  annyang.addCommands(navbarVoiceCommands());

  return (
    <nav className="nav-wrapper indigo">
      <Modal open={open} onClose={() => setOpen(false)}></Modal>
      <div className="container">
        {currentUser ? (
          <ul>
            <li>
              <Link to="/list">List</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/favoriterecipes">Favorite Recipes</Link>
            </li>
            <li>
              <a
                className="btn-floating"
                onClick={() => console.log('STAY BLESSED')}
              >
                <i className="material-icons">help_outline</i>
              </a>
            </li>
            <li className="right">
              <Link to="/">What's For Dinner?</Link>
            </li>
            <li className="right">
              <img
                style={{
                  height: '40px',
                  width: '40px',
                  margin: '10px'
                }}
                src="/shopping-bag.svg"
                alt="What's For Dinner Logo"
              />
            </li>
          </ul>
        ) : (
          <div>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
