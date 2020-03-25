import React, { useContext, useState, useEffect } from 'react';
// import { auth } from './base';
import { AuthContext } from './Auth.js';
import { db } from './base';
import axios from 'axios';
import SingleRecipe from './Recipes/SingleRecipe';
import './secrets';
// const spoonConfig = {
// 	API: process.env.SPOON_API_KEY
// };

const Recipes = () => {
	const recipeURLStart = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
	const recipeURLEnd = `&number=6&apiKey=9dbfb748dfa44db2becd40388c22f59c`;
	// console.log('APIKEY', spoonConfig.API);
	const { currentUser } = useContext(AuthContext);
	const [ ingredients, setIngredients ] = useState([]);
	const [ recipes, setRecipes ] = useState([]);

	useEffect(
		() => {
			gotIngredients(currentUser.uid);
		},
		[ currentUser ]
	);
	//Make it so that it auto renders recipes when it loads on the page,
	useEffect(
		() => {
			//Add React Loading here
			getRecipes(ingredients);
		},
		[ ingredients ]
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

		if (ingredients.length > 0 && currentUser) {
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
			setRecipes(newRecipes);
		}
	};

	return (
		<div>
			<h1>Recipes</h1>
			<div className="row">
				<div className="col s12 m6">
					{recipes.map((recipe) => <SingleRecipe key={recipe.id} recipe={recipe} />)}
				</div>
			</div>
			{/* <button
        className="btn"
        type="button"
        onClick={() => getRecipes(ingredients)}
      >
        Get Recipes
      </button> */}
		</div>
	);
};

export default Recipes;
