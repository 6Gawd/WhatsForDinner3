import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import NavBar from './Navbar';
import List from './List';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<NavBar />
				<div>
					<PrivateRoute exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/list" component={List} />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
