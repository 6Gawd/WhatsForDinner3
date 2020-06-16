import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { auth } from '../base.js';
import { AuthContext } from '../Auth.js';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
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
        <h8>
          Or prefer a demo? Try the following credentials:
          <br />
          <strong>Email:</strong> demo@email.com
          <br />
          <strong>Password:</strong> 123456
        </h8>
      </div>
      <div className="card-panel">
        <h4>Demo Video</h4>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/QWUM5zslF6c"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default withRouter(Login);
