import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './Auth.js';
import { db } from './base';

const FavoriteRecipes = () => {
	const { currentUser } = useContext(AuthContext);
	const [ recipes, setRecipes ] = useState([]);

	useEffect(
		() => {
			if (currentUser) getRecipes(currentUser.uid);
		},
		[ currentUser ]
	);

	const getRecipes = async (userId) => {
		try {
			const recipes = [];
			await db.collection('favoriteRecipes').where('userId', '==', userId).get().then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					const item = doc.data();
					item.id = doc.id;
					recipes.push(item);
				});
			});
			setRecipes(recipes);
		} catch (error) {
			console.error('No Recipes', error);
		}
	};

	const removeFromFavorites = async (recipeId) => {
		try {
			await db.collection('favoriteRecipes').doc(recipeId).delete();
			const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
			setRecipes(updatedRecipes);
		} catch (error) {
			console.error('Error deleting recipe', error);
		}
	};

	const { id, title, image, steps } = recipes;
	return (
		<div>
			<div className="row">
				<div className="col s12 m6">
					<div className="card">
						<div className="card-image">
							<img src={image} alt={title} />
							<span className="card-title">{title}</span>
							<a className="btn-floating halfway-fab waves-effect waves-light red">
								<i className="material-icons" onClick={removeFromFavorites}>
									-
								</i>
							</a>
						</div>
						<div className="card-action">
							<a href="#">Instructions</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FavoriteRecipes;
