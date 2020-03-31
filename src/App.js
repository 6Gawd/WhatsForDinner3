import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Signout from './User/Signout';
import Login from './User/Login';
import SignUp from './User/SignUp';
import Recipes from './Recipes/Recipes';
import List from './List/List';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import NavBar from './Navbar';
import FavoriteRecipes from './FavoriteRecipes/FavoriteRecipes';
import RecipeInstructions from './FavoriteRecipes/RecipeInstructions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <PrivateRoute exact path="/signout" component={Signout} />
            <PrivateRoute exact path="/list" component={List} />
            <PrivateRoute exact path="/recipes" component={Recipes} />
            <PrivateRoute
              exact
              path="/favoriterecipes"
              component={FavoriteRecipes}
            />
            <PrivateRoute
              exact
              path="/favoriterecipes/instructions/:id"
              component={RecipeInstructions}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route render={() => <Redirect to="/list" />} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
