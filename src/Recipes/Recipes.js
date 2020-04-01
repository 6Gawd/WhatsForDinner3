import React, { useContext, useState, useEffect } from 'react';
// import { auth } from './base';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import axios from 'axios';
import SingleRecipe from './SingleRecipe';
import annyang from 'annyang';
import alex, { speechSynth } from '../Speech/OutputSpeech';
import { recipesInstructions } from '../Speech/Commands';
import InstructionModal from '../Modal/InstructionModal';
import Spinner from '../Modal/Spinner';

const Recipes = () => {
  const recipeURLStart =
    'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
  const recipeURLEnd = `&number=12&apiKey=9dbfb748dfa44db2becd40388c22f59c`;
  const { currentUser } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const instructionCommands = {
    help: () => setOpen(true),
    close: () => setOpen(false)
  };

  useEffect(() => {
    annyang.addCommands(instructionCommands);
    getRecipes();
    return () => {
      annyang.removeCommands(Object.keys(instructionCommands));
    };
  }, []);

  const getRecipes = async () => {
    //Return recipes with User's current ingredients in their Shopping List
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

    if (fetchedIngredients.length > 0 && currentUser) {
      alex.text = `getting your recipes`;
      speechSynth.speak(alex);
      const { data } = await axios.get(
        recipeURLStart +
          fetchedIngredients.map(ingredient => ingredient.name).join(',+') +
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
      setLoading(false);
    } else {
      alex.text = `add some ingredients first`;
      speechSynth.speak(alex);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="col l12">
          <div>
            <h1>Recipes</h1>
            <div className="container">
              <div className="card-panel">
                <div className="row">
                  {recipes.map((recipe, idx) => (
                    <SingleRecipe
                      key={recipe.id}
                      recipe={recipe}
                      idx={idx + 1}
                    />
                  ))}
                </div>
              </div>
            </div>
            <InstructionModal
              open={open}
              setOpen={setOpen}
              instructions={recipesInstructions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
