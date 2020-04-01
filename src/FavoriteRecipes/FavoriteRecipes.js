import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth';
import { db } from '../base';
import RecipeDisplay from './RecipeDisplay';
import 'react-toastify/dist/ReactToastify.css';
import { removeFromFavoritesToast } from '../ToastNotifications/Toasts';
import { favRecipeInstructions } from '../Speech/Commands';
import InstructionModal from '../Modal/InstructionModal';
import annyang from 'annyang';
import alex, { speechSynth } from '../Speech/OutputSpeech';
import Spinner from '../Modal/Spinner';

const FavoriteRecipes = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    annyang.addCommands(instructionsCommands);
    getFavoriteRecipes();

    return () => {
      annyang.removeCommands(Object.keys(instructionsCommands));
    };
  }, []);

  const instructionsCommands = {
    help: () => setOpen(true),
    close: () => setOpen(false)
  };

  const getFavoriteRecipes = async () => {
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
      if (recipes.length > 0) {
        alex.text = `Loading your favorite recipes`;
        speechSynth.speak(alex);
        setRecipes(recipes);
        setLoading(false);
      } else {
        alex.text = `please bookmark some recipes first`;
        speechSynth.speak(alex);
      }
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
      alex.text = `removed from favorites`;
      speechSynth.speak(alex);
      removeFromFavoritesToast();
    } catch (error) {
      console.error('Error deleting recipe', error);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
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
                        idx={idx + 1}
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
          <InstructionModal
            open={open}
            setOpen={setOpen}
            instructions={favRecipeInstructions}
          />
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
