import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth';
import { db } from '../base';
import RecipeDisplay from './RecipeDisplay';

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

	return (
		<div>
			<h1 className="center-align">Your Favorite Recipes</h1>
			{recipes.length ? (
				recipes.map((recipe) => (
					<RecipeDisplay key={recipe.id} recipe={recipe} removeFromFavorites={removeFromFavorites} />
				))
			) : (
				<p>No Favorite Recipes yet</p>
			)}
		</div>
	);
};

export default FavoriteRecipes;