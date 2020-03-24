import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile';
import Login from './Login';
import SignUp from './SignUp';
import Recipes from './Recipes';
import List from './List';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import NavBar from './Navbar';
import FavoriteRecipes from './Recipes/FavoriteRecipes';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div className="App">
					<NavBar />
					<Switch>
						<PrivateRoute exact path="/" component={Profile} />
						<PrivateRoute exact path="/list" component={List} />
						<PrivateRoute exact path="/recipes" component={Recipes} />
						<PrivateRoute exact path="/favoriterecipes" component={FavoriteRecipes} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={SignUp} />
						<Route render={() => <Redirect to="/" />} />
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
