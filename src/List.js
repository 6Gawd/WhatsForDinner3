import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './Auth.js';
import { db } from './base';
import { Redirect } from 'react-router-dom';

import ListOfIngredients from './Ingredients/ListOfIngredients';
import OutputSpeech from './Speech/OutputSpeech';
import InputSpeech from './Speech/InputSpeech';
import annyang from 'annyang';
import Commands, { returnCommands } from './Speech/Commands';

const List = (props, { history }) => {
  const { currentUser } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');

  useEffect(() => {
    gotIngredients(currentUser.uid);
  }, [currentUser]);

  const gotIngredients = async userId => {
    try {
      const ingredients = [];
      await db
        .collection('ingredients')
        .where('userId', '==', userId)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            const item = doc.data();
            item.id = doc.id;
            ingredients.push(item);
          });
        });
      setIngredients(ingredients);
      return ingredients;
    } catch (error) {
      console.error('No Ingredients', error);
    }
  };

  const addIngredient = async ingredient => {
    try {
      let names = [];
      for (let i = 0; i < ingredients.length; i++) {
        names.push(ingredients[i].name.toLowerCase());
      }
      if (names.includes(ingredient.name.toLowerCase())) {
        alert('You have already added that item!');
      } else {
        const newIngredient = { ...ingredient };
        await db
          .collection('ingredients')
          .add(ingredient)
          .then(obj => (newIngredient.id = obj.id));
        return newIngredient;
      }
    } catch (error) {
      console.error('No Ingredients', error);
    }
  };

  const deleteIngredient = async ingredientId => {
    try {
      await db
        .collection('ingredients')
        .doc(ingredientId)
        .delete();
      const updatedIngredients = ingredients.filter(
        ingredient => ingredient.id !== ingredientId
      );
      setIngredients(updatedIngredients);
    } catch (error) {
      console.error('Error deleting ingredient', error);
    }
  };

  const handleChange = event => {
    setIngredient(event.target.value);
  };

  const handleTranscript = string => {
    setIngredient(string);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const returnedIngredient = await addIngredient({
      name: ingredient,
      userId: currentUser.uid
    });
    if (returnedIngredient) {
      setIngredients([...ingredients, returnedIngredient]);
      setIngredient('');
    }
  };

  const startedListening = name => {
    setIngredient(name);
  };

  const addVoice = async tag => {
    const currentIngredients = await gotIngredients(currentUser.uid);
    let names = [];
    for (let i = 0; i < currentIngredients.length; i++) {
      names.push(currentIngredients[i].name.toLowerCase());
    }
    if (names.includes(tag)) {
      alert('You have already added this item!');
    } else {
      await addIngredient({
        name: tag,
        userId: currentUser.uid
      });
      gotIngredients(currentUser.uid);
      setIngredient('');
    }
  };

  const deleteVoice = async tag => {
    try {
      const id = await db
        .collection('ingredients')
        .where('userId', '==', currentUser.uid)
        .where('name', '==', tag)
        .get()
        .then(doc => doc.docs[0].id);
      if (id) {
        await db
          .collection('ingredients')
          .doc(id)
          .delete();
        await gotIngredients(currentUser.uid);
      }
    } catch (error) {
      console.log('No such Item', error);
    }
  };

  const getRecipes = () => {
    history.push('/recipes');
  };

  const returnCommands = () => {
    return {
      'add *tag': tag => {
        addVoice(tag);
      },
      'delete *tag': tag => {
        deleteVoice(tag);
      },
      'get recipes': () => getRecipes()
    };
  };

  annyang.start();

  if (currentUser) annyang.addCommands(returnCommands());

  console.log('Ingredients:', ingredients);

  return (
    // INGREDIENT LIST FORM
    <div>
      <h1 className="center-align">Your Shopping List</h1>
      <ListOfIngredients
        ingredients={ingredients}
        deleteIngredient={deleteIngredient}
      />
      {/* INPUT ITEM FORM */}
      <form onSubmit={handleSubmit}>
        <div className="main-header">
          <div className="showcase container">
            <div className="row">
              <div className="col s12 m10 offset-m1 center">
                <label htmlFor="ingredient">Add Ingredient</label>
                <input value={ingredient} name="name" onChange={handleChange} />
              </div>
              <button
                className="btn waves-effect waves-light indigo center"
                type="submit"
                name="action"
              >
                Add Ingredient
              </button>
              <OutputSpeech content={ingredient} onClick={() => handleSubmit} />
            </div>
          </div>
        </div>
      </form>
      <InputSpeech
        startedListening={startedListening}
        handleTranscript={handleTranscript}
      />
    </div>
  );
};

export default List;
