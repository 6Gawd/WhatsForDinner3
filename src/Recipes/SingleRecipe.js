import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { addToFavoritesToast } from '../ToastNotifications/Toasts';
import annyang from 'annyang';
import alex, { speechSynth } from '../Speech/OutputSpeech';
import RecipeStepsModal from '../Modal/RecipeStepsModal';

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
    ['bookmark recipe number ' + idx]: () => {
      addRecipeToFavorite();
    },
    ['steps for recipe number ' + idx]: () => {
      getInstructions();
    },
    ['close number ' + idx]: () => setOpen(false)
  };

  useEffect(() => {
    annyang.addCommands(addToFavoriteCommands);
    return () => {
      annyang.removeCommands(Object.keys(addToFavoriteCommands));
    };
  }, []);

  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [modalInstructions, setModalInstructions] = useState({ steps: [] });
  const recipeURLStart = 'https://api.spoonacular.com/recipes/';
  const recipeURLEnd =
    '/analyzedInstructions?apiKey=9dbfb748dfa44db2becd40388c22f59c';

  const addRecipeToFavorite = async () => {
    //validation for duplicate recipe bookmarked
    const recipes = [];
    await db
      .collection('favoriteRecipes')
      .where('userId', '==', currentUser.uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const item = doc.data();
          item.id = doc.id;
          recipes.push(item.spoonacularId);
        });
      });
    if (recipes.includes(id)) {
      alex.text = 'You already bookmarked this recipe';
      speechSynth.speak(alex);
    } else {
      const newFavoriteRecipe = {
        title,
        userId: currentUser.uid,
        image,
        spoonacularId: id,
        ingredients: missedIngredients.concat(usedIngredients)
      };
      //validation for recipes that includes intructions from the api
      try {
        const { data } = await axios.get(recipeURLStart + id + recipeURLEnd);
        newFavoriteRecipe.steps = data[0].steps.map(step => step.step);
        addToFavoritesToast();
        await db.collection('favoriteRecipes').add(newFavoriteRecipe);
        alex.text = `bookmarked recipe ${idx}`;
        speechSynth.speak(alex);
      } catch (error) {
        alex.text = 'unfortunately this recipe does not have instructions';
        speechSynth.speak(alex);
      }
    }
  };

  const getInstructions = async () => {
    //To display instruction in the modal
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
      alex.text = 'unfortunately this recipe does not have instructions';
      speechSynth.speak(alex);
    }
  };

  const addToFavoriteFromModal = async modalObject => {
    const recipes = [];
    await db
      .collection('favoriteRecipes')
      .where('userId', '==', currentUser.uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const item = doc.data();
          item.id = doc.id;
          recipes.push(item.spoonacularId);
        });
      });
    if (recipes.includes(id)) {
      alex.text = 'You already bookmarked this recipe';
      speechSynth.speak(alex);
    } else {
      try {
        modalObject.ingredients = missedIngredients.concat(usedIngredients);
        await db.collection('favoriteRecipes').add(modalObject);
        addToFavoritesToast();
      } catch (error) {
        console.error('Error adding to favorite recipes');
      }
    }
  };

  return (
    <div>
      <div className="col s12 m6 l4">
        <div className="card large">
          <div className="card-image">
            <img src={image} alt={title} />
            <span className="card-title">
              <a className="btn-floating halfway-fab waves-effect blue left">
                {idx}
              </a>
            </span>
            <a className="btn-floating halfway-fab waves-effect red">
              <i className="material-icons" onClick={addRecipeToFavorite}>
                favorite
              </i>
            </a>
          </div>
          <div className="card-content left-align">
            <h6 className="center-align">{title}</h6>
            <ul>
              <li className="card-text">
                <i className="tiny material-icons card-text">check_box</i>
                Used Ingredients: {usedIngredients.join(', ')}
              </li>
              <li className="card-text">
                <i className="tiny material-icons card-text">
                  remove_shopping_cart
                </i>
                Missed Ingredients: {missedIngredients.join(', ')}
              </li>
              <li className="card-text">
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
            <RecipeStepsModal
              open={open}
              setOpen={setOpen}
              modalInstructions={modalInstructions}
              idx={idx}
              addToFavoriteFromModal={addToFavoriteFromModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
