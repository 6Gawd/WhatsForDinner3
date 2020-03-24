import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';

const RecipeInstructions = (props) => {
	const { currentUser } = useContext(AuthContext);
	const [ selectedRecipe, setSelectedRecipe ] = useState({ steps: [] });
	const id = props.match.params.id;

	useEffect(
		() => {
			if (currentUser) getFavoriteRecipe(currentUser.uid);
		},
		[ currentUser ]
	);

	const getFavoriteRecipe = async (userId) => {
		try {
			const recipe = await db.collection('favoriteRecipes').doc(id).get().then(function(doc) {
				return doc.data();
			});
			if (recipe) setSelectedRecipe(recipe);
		} catch (error) {
			console.error('No Recipe', error);
		}
	};
	return (
		<div className="container">
			<h2>{selectedRecipe.title}</h2>
			<img src={selectedRecipe.image} alt={selectedRecipe.title} />
			<ol>
				{selectedRecipe.steps.map((step) => (
					<li key={step} className="align-left">
						{step}
					</li>
				))}
			</ol>
		</div>
	);
};

export default RecipeInstructions;
