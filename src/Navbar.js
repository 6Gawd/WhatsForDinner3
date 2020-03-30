import React, { useContext, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from './Auth';
import Modal from 'react-responsive-modal';
import annyang from 'annyang';
import M from  'materialize-css/dist/js/materialize.min.js';


const Navbar = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // console.log('navbar', props);
  useEffect(() => {
		let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav);
    annyang.start();
    annyang.addCommands(navbarVoiceCommands);
	}, []);

	//   useEffect(() => {
  //   let sidenav = document.querySelector('#slide-out');
  //   M.Sidenav.init(sidenav, {});
  // }, [])

  const navbarVoiceCommands = {
    'go to my list': () => {
      history.push('/list');
    },
    'go to my favorite recipes': () => {
      history.push('/favoriterecipes');
    },
    'go to my profile': () => {
      history.push('/profile');
    },
    'get recipes': () => {
      history.push('/recipes');
    }
  };

  return (
    <div>
      <nav className="nav-wrapper indigo navbar-padding">
        <Modal open={open} onClose={() => setOpen(false)} />
        <div className="container">
          <a href="#" data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          {currentUser ? (
            <ul className="hide-on-med-and-down">
              <li>
                <Link to="/list" >List</Link>
              </li>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
							 <li>
                <Link to="/favoriterecipes">Favorite Recipes</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              {/* // <li>
						// 	<a className="btn-floating" onClick={() => console.log('STAY BLESSED')}>
						// 		<i className="material-icons">help_outline</i>
						// 	</a>
						// </li> */}

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
					<ul>
					<li className="right">
                <Link to="/">What's 4 Dinner?</Link>
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
        </div>
      </nav>

      <ul id="slide-out" className="sidenav">
        <li>
          <Link to="/list">List</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link></li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/favoriterecipes">Favorite Recipes</Link>
        </li>
      </ul>
    </div>

  );
};

export default withRouter(Navbar);
