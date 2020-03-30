import React, { useEffect } from 'react';
import { auth } from '../base';
import { AuthContext } from '../Auth.js';
import annyang from 'annyang';

const Profile = () => {
	useEffect(() => {
		annyang.addCommands(signOut);
		return () => {
			annyang.removeCommands('sign out');
		};
	}, []);

	const signOut = {
		'sign out': () => auth.signOut()
	};

	return (
		<div>
			<h1>Profile</h1>
			<button className="waves-effect waves-light btn-small red" onClick={() => auth.signOut()}>
				Sign out
			</button>
		</div>
	);
};

export default Profile;
