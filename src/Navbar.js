import React, { useContext, useState, useEffect } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { AuthContext } from './Auth';
import {auth} from './base'
import Modal from 'react-responsive-modal';
import annyang from 'annyang';
import M from  'materialize-css/dist/js/materialize.min.js';
import trevor, {speechSynth}from './Speech/OutputSpeech'

const Navbar = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
		let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav);
    annyang.start();
		annyang.addCommands(navbarVoiceCommands);
		return () => {
			annyang.removeCommands(Object.keys(navbarVoiceCommands));
			annyang.removeCommands("Yes sign out")
		}
	}, []);

	//   useEffect(() => {
  //   let sidenav = document.querySelector('#slide-out');
  //   M.Sidenav.init(sidenav, {});
  // }, [])

  const navbarVoiceCommands = {
    'go to my list': () => {
      trevor.text = `going to your list`
      speechSynth.speak(trevor)
      history.push('/list');
    },
    'go to my favorite recipes': () => {
      history.push('/favoriterecipes');
    },
    'go to my profile': () => {
      trevor.text = `going to your profile`
      speechSynth.speak(trevor)
      history.push('/profile');
    },
    'get recipes': () => {
      history.push('/recipes');
		},
		'sign out': () =>{
			annyang.addCommands(reallySignOut)
			trevor.text="ARE YOU SURE ABOUT THAT?"
			speechSynth.speak(trevor)
		}
	};
	const reallySignOut = {
		'Yes sign out': ()=>{
			trevor.text="Okay, Bye"
			speechSynth.speak(trevor)
			auth.signOut()
		}
	}

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
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          ) : (
            <div>
              <ul className="hide-on-med-and-down">
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

        {currentUser ? (
      <ul id="slide-out" className="sidenav">
        <li>
          <Link to="/list">List</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/favoriterecipes">Favorite Recipes</Link>
        </li>
        <li className="red">
          <Link to="/signout">Sign Out</Link>
        </li>
        </ul>
        )
        : (
          <ul id="slide-out" className="sidenav">
        <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
          </li>
      </ul>
                )}
    </div>
  );
};

export default withRouter(Navbar);
