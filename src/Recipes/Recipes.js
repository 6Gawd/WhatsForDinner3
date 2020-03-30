import React, { useContext, useState, useEffect } from 'react';
// import { auth } from './base';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import axios from 'axios';
import SingleRecipe from './SingleRecipe';
import annyang from 'annyang';
import trevor, { speechSynth } from '../Speech/OutputSpeech';
import Modal from 'react-responsive-modal';
import { recipesInstructions } from '../Speech/Commands';

const Recipes = () => {
  const recipeURLStart =
    'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
  const recipeURLEnd = `&number=6&apiKey=ea67a4bdaf834f4b86818a43a58433eb`;
  const { currentUser } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);

  const instructionCommands = {
      'show instructions': () => {
        setOpen(true);
      },
      'close instructions': () => {
        setOpen(false);
      }
  }

  useEffect(() => {
    annyang.addCommands(instructionCommands);
    getIngredients().then(ingredients => {
      if (ingredients.length > 0) {
        trevor.text = `getting your recipes`;
        speechSynth.speak(trevor);
      } else {
        trevor.text = `add some ingredients first`;
        speechSynth.speak(trevor);
      }
    });
    return () => {
      annyang.removeCommands(Object.keys(instructionCommands))
    }
  }, []);

  //Make it so that it auto renders recipes when it loads on the page,
  useEffect(() => {
    //Add React Loading here
    getRecipes(ingredients);
  }, [ingredients]);

  const getIngredients = async () => {
    try {
      const fetchedIngredients = [];
      await db
        .collection('ingredients')
        .where('userId', '==', currentUser.uid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            const item = doc.data();
            item.id = doc.id;
            fetchedIngredients.push(item);
          });
        });
      setIngredients(fetchedIngredients);
      return fetchedIngredients;
    } catch (error) {
      console.error('No Ingredients', error);
    }
  };
  const getRecipes = async ingredients => {
    //Return recipes with those ingredients

    if (ingredients.length > 0 && currentUser) {
      const { data } = await axios.get(
        recipeURLStart +
          ingredients.map(ingredient => ingredient.name).join(',+') +
          recipeURLEnd
      );
      const newRecipes = data.map(recipe => {
        delete recipe.imageType;
        delete recipe.usedIngredientCount;
        delete recipe.missedIngredientCount;
        recipe.missedIngredients = recipe.missedIngredients.map(
          ingredient => ingredient.name
        );
        recipe.usedIngredients = recipe.usedIngredients.map(
          ingredient => ingredient.name
        );
        recipe.unusedIngredients = recipe.unusedIngredients.map(
          ingredient => ingredient.name
        );
        return recipe;
      });
      setRecipes(newRecipes);
    }
  };

  return (
    <div className="col l12">
      <div>
        <h1>Recipes</h1>
        <div className="container">
          <div className="card-panel">
            <div className="row">
              {recipes.map((recipe, idx) => (
                <SingleRecipe key={recipe.id} recipe={recipe} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h4>Trevor's Commands</h4>
        <ul>
          {recipesInstructions.map((instruction, i) => (
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
    </div>
  );
};

export default Recipes;
