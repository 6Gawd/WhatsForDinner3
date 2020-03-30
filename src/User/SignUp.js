import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { auth } from '../base';
import { AuthContext } from '../Auth.js';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth.createUserWithEmailAndPassword(email.value, password.value);
        history.push('/list');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container card-padding">
      <div className="card-panel">
        <h1>Sign up</h1>
        <form onSubmit={handleSignUp}>
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
            Sign Up
          </button>
          <h6>
            Already have an account? <Link to="/login">Login</Link>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
