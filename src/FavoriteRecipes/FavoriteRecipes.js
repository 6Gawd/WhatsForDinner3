import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth';
import { db } from '../base';
import RecipeDisplay from './RecipeDisplay';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeFromFavoritesToast } from '../ToastNotifications/Toasts';
import { favRecipeInstructions } from '../Speech/Commands';
import Modal from 'react-responsive-modal';
import annyang from 'annyang';
import trevor, { speechSynth} from '../Speech/OutputSpeech'

const FavoriteRecipes = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    annyang.addCommands(instructionsCommands);
    getRecipes();

		return () => {
			annyang.removeCommands(Object.keys(instructionsCommands))
		}
  }, []);

  const instructionsCommands = {
    'show instructions': () => {
      setOpen(true);
    },
    'close instructions': () => {
      setOpen(false);
    }
  };

  const getRecipes = async () => {
    try {
      const recipes = [];
      await db
        .collection('favoriteRecipes')
        .where('userId', '==', currentUser.uid)
        .get()
        .then(function(querySnapshot) {
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

  const removeFromFavorites = async recipeId => {
    try {
      await db
        .collection('favoriteRecipes')
        .doc(recipeId)
        .delete();
      const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
			setRecipes(updatedRecipes);
			// await getRecipes()
      trevor.text = `removed from favorites`
      speechSynth.speak(trevor)
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <h4>Trevor's Commands</h4>
        <ul>
          {favRecipeInstructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ul>
      </Modal>
      <div className="fixed-action-btn">
        <a
          className="btn-floating btn-medium amber"
          onClick={() => setOpen(true)}
        >
          <i className="large material-icons">help_outline</i>
        </a>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
