import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth';
import { db } from '../base';
import RecipeDisplay from './RecipeDisplay';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeFromFavoritesToast } from '../ToastNotifications/Toasts';

const FavoriteRecipes = ({history}) => {
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
			const toastHTML = `
      <div>
        <p>Recipe removed from favorites</p>
      </div>`;
			await db.collection('favoriteRecipes').doc(recipeId).delete();
			const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
			setRecipes(updatedRecipes);
			removeFromFavoritesToast();
		} catch (error) {
			console.error('Error deleting recipe', error);
		}
	};

	return (
		<div className="col s12 l12">
			<div>
				<h1 className="center-align">Your Favorite Recipes</h1>
				<div className="container">
					<div className="card-panel">
						<div className="row">
							{recipes.length ? (
								recipes.map((recipe, idx) => (
									<RecipeDisplay
										key={recipe.id}
                    idx={idx}
										recipe={recipe}
                    history={history}
										removeFromFavorites={removeFromFavorites}
									/>
								))
							) : (
								<p>No Favorite Recipes yet</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FavoriteRecipes;
