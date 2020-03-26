import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './Auth.js';
import { db } from './base';

import ListOfIngredients from './Ingredients/ListOfIngredients';
import annyang from 'annyang';
import trevor, { speechSynth } from './Speech/OutputSpeech';
import ToastContainer from 'react-toastify';
// import Commands, { returnCommands } from './Speech/Commands';

const List = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  // const [ active, setActive ] = useState(false);

  useEffect(() => {
    gotIngredients(currentUser.uid);
    return () => {
      annyang.abort();
    };
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
        trevor.text = `You have already added this item!`;
        speechSynth.speak(trevor);
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

  const addVoice = async tag => {
    const currentIngredients = await gotIngredients(currentUser.uid);
    let names = [];
    for (let i = 0; i < currentIngredients.length; i++) {
      names.push(currentIngredients[i].name.toLowerCase());
    }
    if (names.includes(tag)) {
      trevor.text = `You have already added this item!`;
      speechSynth.speak(trevor);
    } else {
      await addIngredient({
        name: tag,
        userId: currentUser.uid
      });
      gotIngredients(currentUser.uid);
      //Make voice playback
      trevor.text = `got ${tag}`;
      speechSynth.speak(trevor);
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
      trevor.text = `removed ${tag}`;
      speechSynth.speak(trevor);
    } catch (error) {
      trevor.text = `couldnt find ${tag}`;
      speechSynth.speak(trevor);
    }
  };

  const getRecipes = async () => {
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
    //for some reason, if ingre is an empty array, it doesn't fire the if statement. Reading as if its "truthy"
    if (!ingre[0]) {
      trevor.text = `you need to add some ingredients first`;
      speechSynth.speak(trevor);
    } else {
      trevor.text = `getting your recipes`;
      speechSynth.speak(trevor);
      history.push('/recipes');
    }
  };

  const clearList = async () => {
    trevor.text = `removing your list`;
    speechSynth.speak(trevor);
    //When you do the querySnapshot, you can call firebase methods inside of the collection you get.
    await db
      .collection('ingredients')
      .where('userId', '==', currentUser.uid)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection('ingredients')
            .doc(doc.id)
            .delete();
        });
      });
    setIngredients([]);
  };

  const returnCommands = () => {
    return {
      'add *tag': tag => {
        addVoice(tag);
      },
      'delete *tag': tag => {
        deleteVoice(tag);
      },
      'get recipes': () => getRecipes(),
      'clear my list': () => clearList()
    };
  };

  const startAnnyang = () => {
    annyang.start();
    annyang.addCommands(returnCommands());
  };

  // annyang.start();
  // if (currentUser) annyang.addCommands(returnCommands());

  return (
    // INGREDIENT LIST FORM
    <div>
      <div className="container col s12 m10 offset-m1 center">
        <div className="card-panel">
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
                    <input
                      value={ingredient}
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    className="btn waves-effect waves-light indigo center"
                    type="submit"
                    name="action"
                  >
                    Add Ingredient
                    <i className="tiny material-icons">add_shopping_cart</i>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <button
            className="btn waves-effect waves-light grey center"
            onClick={startAnnyang}
          >
            Start Listening
          </button>
        </div>
      </div>

      {/* need to make this look prettier later */}

      <div className="container col s12 m10 offset-m1 center">
        <div className="card-panel">
          <h3>Test out these Commands!</h3>
          <p>
            You can add any food item you like to your list. Say "add Cheese"
          </p>
          <p>
            You can also delete any food item off of your list. Say "delete
            Cheese"
          </p>
          <p>
            If you want to get some recipes using your current shopping list,
            say "get recipes"
          </p>
          <p>
            If you want to remove your current shopping list, say "clear my
            list"
          </p>
        </div>
      </div>
    </div>
  );
};

export default List;
