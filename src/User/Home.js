import React, { useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { AuthContext } from '../Auth';

const Home = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="home-padding">
      <div className="container">
        <div className="card-panel">
          <h4>Welcome to What's 4 Dinner</h4>
          <h6>
            A virtual interactive shopping list, recipe generator & cooking
            instructions provider.
          </h6>
          <p>Made by: Yan Gao, Leslie Wu, Ya-Sin Zenk & Mike Damato</p>

          <div className="row">
            <div className="col s12 m4 l4">
              <p>
                <button
                  className="btn waves-effect indigo center"
                  type="submit"
                  name="action"
                  onClick={() => history.push('/list')}
                >
                  Get Shopping List
                  <i className="tiny material-icons right">shopping_cart</i>
                </button>
              </p>
            </div>
            <div className="col s12 m4 l4">
              <p>
                <button
                  className="btn waves-effect green center"
                  type="submit"
                  name="action"
                  onClick={() => history.push('/recipes')}
                >
                  Get Recipes
                  <i className="tiny material-icons right">shopping_cart</i>
                </button>
              </p>
            </div>
            <div className="col s12 m4 l4">
              <p>
                <button
                  className="btn waves-effect red lighten-2 center"
                  type="submit"
                  name="action"
                  onClick={() => history.push('/favoriterecipes')}
                >
                  Get Favorite Recipes
                  <i className="tiny material-icons right">favorite</i>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
