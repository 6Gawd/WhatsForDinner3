import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToFavoritesToast } from '../ToastNotifications/Toasts';
import annyang from 'annyang';
import trevor, {speechSynth} from '../Speech/OutputSpeech'

const SingleRecipe = ({ recipe, idx }) => {
  const {
    id,
    title,
    image,
    missedIngredients,
    usedIngredients,
    unusedIngredients
  } = recipe;

  const addToFavoriteCommands = {
    ['bookmark recipe number ' + (idx + 1)]: () => {
      addRecipeToFavorite();
    }
  };

  useEffect(() => {
    annyang.addCommands(addToFavoriteCommands);
    return () => {
      annyang.removeCommands(['bookmark recipe number ' + (idx + 1)]);
    };
  }, []);

  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [modalInstructions, setModalInstructions] = useState({ steps: [] });
  const recipeURLStart = 'https://api.spoonacular.com/recipes/';
  const recipeURLEnd =
    '/analyzedInstructions?apiKey=ea67a4bdaf834f4b86818a43a58433eb';

  const addRecipeToFavorite = async () => {

			const recipes = [];
			await db.collection('favoriteRecipes').where('userId', '==', currentUser.uid).get().then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					const item = doc.data();
					item.id = doc.id;
					recipes.push(item.spoonacularId);
				});
			});
			if(recipes.includes(id)){
        trevor.text = 'You already bookmarked this recipe'
        speechSynth.speak(trevor)
      }else{
    const newFavoriteRecipe = {
      title,
      userId: currentUser.uid,
      image,
      spoonacularId: id,
      ingredients: missedIngredients.concat(usedIngredients)
    };
    try {
      const { data } = await axios.get(recipeURLStart + id + recipeURLEnd);
      newFavoriteRecipe.steps = data[0].steps.map(step => step.step);
      addToFavoritesToast();
      await db.collection('favoriteRecipes').add(newFavoriteRecipe);
    trevor.text = `bookmarked recipe ${idx + 1}`
    speechSynth.speak(trevor)
    } catch (error) {
      trevor.text = 'Unfortunetly this recipe does not have instructions'
      speechSynth.speak(trevor)
    }
  }
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
    <div>
      <div className="col s12 m6 l4">
        <div className="card large">
          <div className="card-image">
            <img src={image} alt={title} />
            <span className="card-title">
              <a className="btn-floating halfway-fab waves-effect waves-light blue left">
                {idx + 1}
              </a>
            </span>
            <a className="btn-floating halfway-fab waves-effect waves-light red">
              <i className="material-icons" onClick={addRecipeToFavorite}>
                favorite
              </i>
            </a>
          </div>
          <div className="card-content left-align">
            <h6 className="center-align">{title}</h6>
            <ul>
              <li className='card-text'>
                <i className="tiny material-icons card-text">check_box</i>
                Used Ingredients: {usedIngredients.join(', ')}
              </li>
              <li className='card-text'>
                <i className="tiny material-icons card-text">remove_shopping_cart</i>
                Missed Ingredients: {missedIngredients.join(', ')}
              </li>
              <li className='card-text'>
                <i className="tiny material-icons card-text">shopping_cart</i>
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
              Instructions
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
