import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Auth';

const Navbar = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<nav className="nav-wrapper indigo">
			<div className="container">
				{currentUser ? (
					<div>
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
						</ul>
					</div>
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
