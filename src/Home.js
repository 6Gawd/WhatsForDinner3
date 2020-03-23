import React from 'react';
import { auth } from './base';

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<button onClick={() => auth.signOut()}>Sign out</button>
		</div>
	);
};

export default Home;
