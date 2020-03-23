import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './Auth.js';
import { db } from './base';
// import OutputSpeech from './Speech/OutputSpeech';
// import InputSpeech from './Speech/InputSpeech';

const List = () => {
  const { currentUser } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  // const [ name, setName ] = useState('');

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
    } catch (error) {
      console.error('No Ingredients', error);
    }
  };

  useEffect(() => {
    if (currentUser) gotIngredients(currentUser.uid);
  }, [currentUser]);

  const handleChange = event => {
    setIngredient(event.target.value);
  };

  const addIngredient = async ingredient => {
    try {
      const newIngredient = { ...ingredient };
      await db
        .collection('ingredients')
        .add(ingredient)
        .then(obj => (newIngredient.id = obj.id));
      return newIngredient;
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
      const newIngredients = ingredients.filter(
        ingredient => ingredient.id !== ingredientId
      );
      setIngredients(newIngredients);
    } catch (error) {
      console.error('Error deleting ingredient', error);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const returnedIngredient = await addIngredient({
      name: ingredient,
      userId: currentUser.uid
    });
    setIngredients([...ingredients, returnedIngredient]);
    setIngredient('');
  };

  // const startedListening = (name) => {
  // 	this.setState({ name: name });
  // };

  const ingredientList = ingredients.length ? (
    ingredients.map(ingredient => {
      return (
        <div key={ingredient.id} className="row">
          <p className="center-align">
            {ingredient.name}{' '}
            <button
              className="btn-mini waves-effect waves-light red right"
              type="button"
              name="action"
              onClick={() => deleteIngredient(ingredient.id)}
            >
              <i className="material-icons center-align">x</i>
            </button>
          </p>
        </div>
      );
    })
  ) : (
    <p>No Ingredients Yet</p>
  );

  return (
    // INGREDIENT LIST FORM
    <div>
      <h1 className="center-align">Your Shopping List</h1>
      {ingredientList}
      {/* INPUT ITEM FORM */}
      <form onSubmit={handleSubmit}>
        <div className="main-header">
          <div>
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
              {/* <OutputSpeech content={state.name} onClick={() => handleSubmit} /> */}
            </div>
          </div>
        </div>
      </form>
      {/* <InputSpeech startedListening={startedListening} /> */}
    </div>
  );
};

// return <ul>{ingredients.map((ingredient) => <li key={ingredient.id}>{ingredient.name}</li>)}</ul>;

export default List;
