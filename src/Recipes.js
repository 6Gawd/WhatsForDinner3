import React, { useContext, useState, useEffect } from 'react';
// import { auth } from './base';
import { AuthContext } from './Auth.js';
import { db } from './base';
import axios from 'axios';
import SingleRecipe from './Recipes/SingleRecipe';
// import secrets from '../secrets';
// const spoonConfig = {
// 	API: process.env.SPOON_API_KEY
// };

const Recipes = () => {
	const recipeURLStart = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
	const recipeURLEnd = '&number=6&apiKey=ea67a4bdaf834f4b86818a43a58433eb';
	// console.log('APIKEY', spoonConfig.API);
	const { currentUser } = useContext(AuthContext);
	const [ ingredients, setIngredients ] = useState([]);
	const [ recipes, setRecipes ] = useState([]);

	useEffect(
		() => {
			if (currentUser) gotIngredients(currentUser.uid);
		},
		[ currentUser ]
	);

	const gotIngredients = async (userId) => {
		try {
			const ingredients = [];
			await db.collection('ingredients').where('userId', '==', userId).get().then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					const item = doc.data();
					item.id = doc.id;
					ingredients.push(item);
				});
			});
			setIngredients(ingredients);
		} catch (error) {
			console.error('No Ingredients', error);
		}
	};

	const getRecipes = async (ingredients) => {
		//Return recipes with those ingredients

		if (ingredients.length > 0) {
			const { data } = await axios.get(
				recipeURLStart + ingredients.map((ingredient) => ingredient.name).join(',+') + recipeURLEnd
			);
			const newRecipes = data.map((recipe) => {
				delete recipe.imageType;
				delete recipe.usedIngredientCount;
				delete recipe.missedIngredientCount;
				recipe.missedIngredients = recipe.missedIngredients.map((ingredient) => ingredient.name);
				recipe.usedIngredients = recipe.usedIngredients.map((ingredient) => ingredient.name);
				recipe.unusedIngredients = recipe.unusedIngredients.map((ingredient) => ingredient.name);
				return recipe;
			});
			console.log('NEW RECIPES', newRecipes);
			setRecipes(newRecipes);
		} else {
			console.error('error');
		}
	};

	return (
		<div>
			<h1>Recipes</h1>
			{recipes.map((recipe) => <SingleRecipe key={recipe.id} recipe={recipe} />)}
			<button className="btn" type="button" onClick={() => getRecipes(ingredients)}>
				Get Recipes
			</button>
		</div>
	);
};

export default Recipes;
