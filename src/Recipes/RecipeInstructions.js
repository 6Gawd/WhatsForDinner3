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
		<div>
			<img src={selectedRecipe.image} alt={selectedRecipe.title} />
			<ul className="collection with-header">
				<li className="collection-header">
					<h4>{selectedRecipe.title}</h4>
				</li>
				{selectedRecipe.steps.map((step) => (
					<li key={step} className="collection-item left-align">
						{step}
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecipeInstructions;
