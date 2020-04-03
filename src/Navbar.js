import React, { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from './Auth';
import { auth } from './base';
import annyang from 'annyang';
import M from 'materialize-css/dist/js/materialize.min.js';
import alex, { speechSynth } from './Speech/OutputSpeech';

const Navbar = ({ history }) => {
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		let sidenav = document.querySelector('#slide-out');
		M.Sidenav.init(sidenav);
		annyang.start();
		annyang.addCommands(navbarVoiceCommands);
		return () => {
			annyang.removeCommands(Object.keys(navbarVoiceCommands));
			annyang.removeCommands('Yes sign out');
		};
	}, []);

	const navbarVoiceCommands = {
		'get list': () => {
			alex.text = `going to your list`;
			speechSynth.speak(alex);
			history.push('/list');
		},
		'get favorite recipes': () => {
			history.push('/favoriterecipes');
		},
		'get recipes': () => {
			history.push('/recipes');
		},
		'sign out': () => {
			annyang.addCommands(reallySignOut);
			alex.text = 'ARE YOU SURE ABOUT THAT?';
			speechSynth.speak(alex);
		}
	};

	const reallySignOut = {
		'Yes sign out': () => {
			alex.text = 'Okay, Bye';
			speechSynth.speak(alex);
			history.push('/login');
			auth.signOut();
		}
	};

	return (
		<div>
			<nav className="nav-wrapper indigo navbar-padding">
				<div className="container">
					<a href="#" data-target="slide-out" className="sidenav-trigger">
						<i className="material-icons">menu</i>
					</a>
					{currentUser ? (
						<ul className="hide-on-med-and-down">
							<li>
								<Link to="/list">List</Link>
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
						<Link to="/">Home</Link>
					</li>
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
			) : (
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
