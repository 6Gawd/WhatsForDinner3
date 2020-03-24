import React, { useContext } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import axios from 'axios';

const SingleRecipe = ({ recipe }) => {
	const { id, title, image, missedIngredients, usedIngredients, unusedIngredients } = recipe;

	const { currentUser } = useContext(AuthContext);
	const recipeURLStart = 'https://api.spoonacular.com/recipes/';
	const recipeURLEnd = '/analyzedInstructions&apiKey=ea67a4bdaf834f4b86818a43a58433eb';

	const addRecipeToFavorite = async () => {
		const newFavoriteRecipe = { title, userId: currentUser.uid, image };
		try {
			// const { data } = await axios.get(recipeURLStart + id + recipeURLEnd);
			// console.log(data);
			const { data } = await axios({
				method: 'GET',
				url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/analyzedInstructions`,
				headers: {
					'content-type': 'application/octet-stream',
					'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
					'x-rapidapi-key': '1710db843dmsh3f5963d7d901f54p1aacd7jsn8016234f365c'
				},
				params: {
					stepBreakdown: 'false'
				}
			});
			newFavoriteRecipe.steps = data[0].steps.map((step) => step.step);
			console.log(newFavoriteRecipe);
		} catch (error) {
			console.log('No Recipe', error);
		}

		await db
			.collection(
				//#BLESSED
				'favoriteRecipes'
			)
			.add(newFavoriteRecipe);
	};
	return (
		//The god.
		//where the recipes at Fam?
		//It works Leslie

		<div>
			<div className="row">
				<div className="col s12 m6">
					<div className="card">
						<div className="card-image">
							<img src={image} alt={title} />
							<span className="card-title">{title}</span>
							<a className="btn-floating halfway-fab waves-effect waves-light red">
								<i className="material-icons" onClick={addRecipeToFavorite}>
									+
								</i>
							</a>
						</div>
						<div className="card-content">
							{/* ¯\_(ツ)_/¯ */}
							<p>Used Ingredients: {usedIngredients.join(', ')}</p>
							<p>Missed Ingredients: {missedIngredients.join(', ')}</p>
							<p>Unused Ingredients: {unusedIngredients.join(', ')}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleRecipe;
