import React, { useContext } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import axios from 'axios';

const SingleRecipe = ({ recipe }) => {
  const {
    id,
    title,
    image,
    missedIngredients,
    usedIngredients,
    unusedIngredients
  } = recipe;

  const { currentUser } = useContext(AuthContext);
  const recipeURLStart = 'https://api.spoonacular.com/recipes/';
  const recipeURLEnd =
    '/analyzedInstructions?apiKey=9dbfb748dfa44db2becd40388c22f59c';

  const addRecipeToFavorite = async () => {
    const newFavoriteRecipe = { title, userId: currentUser.uid, image };
    try {
      const { data } = await axios.get(recipeURLStart + id + recipeURLEnd);
      // console.log(data);
      newFavoriteRecipe.steps = data[0].steps.map(step => step.step);
      console.log(newFavoriteRecipe);
    } catch (error) {
      console.log('No Recipe', error);
    }

    await db.collection('favoriteRecipes').add(newFavoriteRecipe);
  };
  return (
    // <div className="col s12 l12">
    <div>
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image">
            <img src={image} alt={title} />
            <span className="card-title">{title}</span>
            <a className="btn-floating halfway-fab waves-effect waves-light red">
              <i className="material-icons" onClick={addRecipeToFavorite}>
                favorite
              </i>
            </a>
          </div>
          <div className="card-content left-align">
            <ul>
              <li>
                <i className="tiny material-icons">check_box</i>
                Used Ingredients: {usedIngredients.join(', ')}
              </li>
              <li>
                <i className="tiny material-icons">remove_shopping_cart</i>
                Missed Ingredients: {missedIngredients.join(', ')}
              </li>
              <li>
                <i className="tiny material-icons">shopping_cart</i>
                Unused Ingredients: {unusedIngredients.join(', ')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
