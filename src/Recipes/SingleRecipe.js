import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToFavoritesToast } from '../ToastNotifications/Toasts';

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
  const [open, setOpen] = useState(false);
  const [modalInstructions, setModalInstructions] = useState({ steps: [] });
  const recipeURLStart = 'https://api.spoonacular.com/recipes/';
  const recipeURLEnd =
    '/analyzedInstructions?apiKey=ea67a4bdaf834f4b86818a43a58433eb';

  const addRecipeToFavorite = async () => {
    const newFavoriteRecipe = {
      title,
      userId: currentUser.uid,
      image,
      spoonacularId: id
    };
    try {
      const { data } = await axios.get(recipeURLStart + id + recipeURLEnd);

      newFavoriteRecipe.steps = data[0].steps.map(step => step.step);
      addToFavoritesToast();
    } catch (error) {
      console.log('No Recipe', error);
    }
    newFavoriteRecipe.ingredients = missedIngredients.concat(usedIngredients);

    await db.collection('favoriteRecipes').add(newFavoriteRecipe);
  };

  const getInstructions = async () => {
    try {
      setOpen(true);
      const selectedRecipe = {
        title,
        userId: currentUser.uid,
        image,
        spoonacularId: id
      };
      const { data } = await axios.get(recipeURLStart + id + recipeURLEnd);
      selectedRecipe.steps = data[0].steps.map(step => step.step);
      setModalInstructions(selectedRecipe);
    } catch (error) {
      console.log('No Recipe', error);
    }
  };

  const addToFavoriteFromModal = async modalObject => {
    try {
      modalObject.ingredients = missedIngredients.concat(usedIngredients);
      await db.collection('favoriteRecipes').add(modalObject);
      addToFavoritesToast();
    } catch (error) {
      console.error('Error adding to favorite recipes');
    }
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
          <div className="card-action">
            <button
              data-target={`#${id}`}
              className="btn modal-trigger indigo"
              onClick={() => getInstructions()}
            >
              View Instructions
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <h4>{modalInstructions.title}</h4>
              <ul>
                {modalInstructions.steps.length ? (
                  modalInstructions.steps.map((step, i) => (
                    <li key={step} className="left-align">
                      <strong>{`Step ${i + 1}:`}</strong> {`${step}`}
                    </li>
                  ))
                ) : (
                  <p>Instructions unavailable at this time</p>
                )}
              </ul>
              <a className="btn-floating halfway-fab waves-effect waves-light red">
                <i
                  className="material-icons"
                  onClick={() => addToFavoriteFromModal(modalInstructions)}
                >
                  favorite
                </i>
              </a>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
