import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Auth';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="nav-wrapper indigo">
      <div className="container">
        {currentUser ? (
          <ul>
            {/* <li>
                <Link to="/list">
                  <img
                    // className="valign-center"
                    style={{ height: '40px', width: '40px', margin: '10px' }}
                    src="/shopping-bag.svg"
                    alt="What's For Dinner Logo"
                  />
                </Link>
              </li> */}
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
