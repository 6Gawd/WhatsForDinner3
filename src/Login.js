import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { auth } from './base.js';
import { AuthContext } from './Auth.js';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push('/list');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/list" />;
  }

  return (
    <div className="container">
      <div className="card-panel">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button
            type="submit"
            className="waves-effect waves-light btn-small indigo"
          >
            Log in
          </button>
        </form>
        <h6>
          New User? <Link to="/signup">Sign Up</Link>
        </h6>
      </div>
    </div>
  );
};

export default withRouter(Login);
