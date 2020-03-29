import React, { useContext, useState, useEffect } from 'react';
// import { auth } from './base';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import axios from 'axios';
import SingleRecipe from './SingleRecipe';
import annyang from 'annyang';
import trevor, { speechSynth } from '../Speech/OutputSpeech';

const Recipes = ({ history }) => {
	const recipeURLStart = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
	const recipeURLEnd = `&number=6&apiKey=ea67a4bdaf834f4b86818a43a58433eb`;
	const { currentUser } = useContext(AuthContext);
	const [ ingredients, setIngredients ] = useState([]);
	const [ recipes, setRecipes ] = useState([]);

	useEffect(() => {
		getIngredients().then((ingredients) => {
			if (ingredients.length > 0) {
				trevor.text = `getting your recipes`;
				speechSynth.speak(trevor);
			} else {
				trevor.text = `add some ingredients first`;
				speechSynth.speak(trevor);
			}
		});

		return () => {
			annyang.removeCommands();
			annyang.abort();
		};
	}, []);

	//Make it so that it auto renders recipes when it loads on the page,
	useEffect(
		() => {
			//Add React Loading here
			getRecipes(ingredients);
			annyang.start();
			annyang.addCommands(navbarCommands());
		},
		[ ingredients ]
	);

	const getIngredients = async () => {
		try {
			const ingredients = [];
			await db
				.collection('ingredients')
				.where('userId', '==', currentUser.uid)
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						const item = doc.data();
						item.id = doc.id;
						ingredients.push(item);
					});
				});
			setIngredients(ingredients);
			return ingredients;
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

	const navbarCommands = () => {
		return {
			'go to my list': () => {
				history.push('/list');
			},
			'go to my favorite recipes': () => {
				history.push('/favoriterecipes');
			},
			'go to my profile': () => {
				history.push('/profile');
			},
			'get recipes': () => {
				history.push('/recipes');
			}
		};
	};

	return (
		<div className="col s12 l12">
			<div>
				<h1>Recipes</h1>
				<div className="container">
					<div className="row">
						{recipes.map((recipe, idx) => <SingleRecipe key={recipe.id} recipe={recipe} idx={idx} />)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Recipes;
