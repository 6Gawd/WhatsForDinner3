import React, { useContext, useState, useEffect } from 'react';
// import { auth } from './base';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import axios from 'axios';
import SingleRecipe from './SingleRecipe';
import annyang from 'annyang';
import trevor, { speechSynth } from '../Speech/OutputSpeech';

const Recipes = ({ history }) => {
  const recipeURLStart =
    'https://api.spoonacular.com/recipes/findByIngredients?ingredients=';
  const recipeURLEnd = `&number=6&apiKey=ea67a4bdaf834f4b86818a43a58433eb`;
  const { currentUser } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    getIngredients().then(ingredients=>{
      if (ingredients.length > 0) {
        trevor.text = `getting your recipes`;
        speechSynth.speak(trevor);
      } else {
        trevor.text = `add some ingredients first`;
        speechSynth.speak(trevor);
      }})
      annyang.start();
      annyang.addCommands(navbarCommands());

    return () => {
      annyang.removeCommands();
      annyang.abort();
    };
  }, []);

  //Make it so that it auto renders recipes when it loads on the page,
  useEffect(() => {
    //Add React Loading here
    getRecipes(ingredients);
  }, [ingredients]);

  const getIngredients = async () => {
    try {
      const ingredients = [];
      await db
        .collection('ingredients')
        .where('userId', '==', currentUser.uid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            const item = doc.data();
            item.id = doc.id;
            ingredients.push(item);
          });
        });
      setIngredients(ingredients);
      return ingredients
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

  	const navbarCommands = () => {
  	return {
  		'go to my list': () => {
        history.push("/list")
      },
      'go to my favorite recipes': () => {
        history.push("/favoriterecipes")
      },
      'go to my profile': () => {
        history.push("/profile")
      },
      'get recipes': () => {
        history.push("/recipes")
      },
      'bookmark recipe number *tag': (tag)=>{
        addRecipeToFavorite(tag-1)
        console.log('this is the Tag', tag)
      }
  	}
  }

  const addRecipeToFavorite = async (idx) => {

    const ingre = [];
      await db
        .collection('ingredients')
        .where('userId', '==', currentUser.uid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            const item = doc.data();
            item.id = doc.id;
            ingre.push(item);
          });
        });
        const { data } = await axios.get(
          recipeURLStart +
            ingre.map(ingredient => ingredient.name).join(',+') +
            recipeURLEnd
        );
        // const addToFav = data[idx]

        const newRecipes = await data.map(recipe => {
          delete recipe.imageType;
          delete recipe.usedIngredientCount;
          delete recipe.missedIngredientCount;
          recipe.spoonacularId = recipe.id
          delete recipe.id
          recipe.missedIngredients = recipe.missedIngredients.map(
            ingredient => ingredient.name
          );
          recipe.usedIngredients = recipe.usedIngredients.map(
            ingredient => ingredient.name
          );
          recipe.ingredients = recipe.missedIngredients.concat(recipe.usedIngredients)
          delete recipe.unusedIngredients
          delete recipe.usedIngredients
          delete recipe.missedIngredients
          return recipe;
        });
        console.log("new recipes", newRecipes)

      const spoon = await axios.get('https://api.spoonacular.com/recipes/' + newRecipes[idx].spoonacularId + '/analyzedInstructions?apiKey=9dbfb748dfa44db2becd40388c22f59c');
      console.log("spoon", spoon)
      newRecipes[idx].steps = spoon.data[0].steps.map(step => step.step);

    await db.collection('favoriteRecipes').add(newRecipes[idx]);
  };

  return (
    <div className="col s12 l12">
      <div>
        <h1>Recipes</h1>
        <div className="container">
          <div className="row">
            {recipes.map((recipe, idx) => (
              <SingleRecipe key={recipe.id} recipe={recipe} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
