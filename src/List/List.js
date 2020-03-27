import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';

import ListOfIngredients from './ListOfIngredients';
import annyang from 'annyang';
import trevor, { speechSynth } from '../Speech/OutputSpeech';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addIngredientToast,
  deleteIngredientToast,
  clearListToast
} from '../ToastNotifications/Toasts';

const List = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  // const [ active, setActive ] = useState(false);

  const instructionsToast = () => {
    toast.info(
      'Test out these commands:' +
        '\n' +
        'To activate our assistant say "Hey Trevor"' +
        '\n' +
        'You can add any food item you like to your list. "Say add Cheese"' +
        '\n' +
        'You can also delete any food item off of your list. Say "delete Cheese"' +
        '\n' +
        'If you want to get some recipes using your current shopping list, say "get recipes"' +
        '\n' +
        'If you want to remove your current shopping list, say "clear my list"',
      {
        position: 'bottom-left',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );
  };

  useEffect(() => {
    getIngredients();
    instructionsToast();
    annyang.start();
    return () => {
      annyang.abort();
    };
  }, []);

  const getIngredients = async () => {
    try {
      const fetchIngredients = [];
      await db
        .collection('ingredients')
        .where('userId', '==', currentUser.uid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            const item = doc.data();
            item.id = doc.id;
            fetchIngredients.push(item);
          });
        });
      setIngredients(fetchIngredients);
      return fetchIngredients;
    } catch (error) {
      console.error('No Ingredients', error);
    }
  };

  const addIngredient = async ingredient => {
    try {
      const currentIngredients = await getIngredients();
      const names = currentIngredients.map(ingredient =>
        ingredient.name.toLowerCase()
      );
      if (names.includes(ingredient.name.toLowerCase())) {
        trevor.text = `You have already added this item!`;
        speechSynth.speak(trevor);
        return false;
      } else {
        const newIngredient = { ...ingredient };
        await db
          .collection('ingredients')
          .add(ingredient)
          .then(obj => (newIngredient.id = obj.id));
        addIngredientToast();
        return newIngredient;
      }
    } catch (error) {
      console.error('No Ingredients', error);
    }
  };

  const deleteIngredient = async listIngredient => {
    try {
      await db
        .collection('ingredients')
        .doc(listIngredient.id)
        .delete();
      const updatedIngredients = ingredients.filter(
        ingredient => ingredient.id !== listIngredient.id
      );
      deleteIngredientToast();
      setIngredients(updatedIngredients);
      trevor.text = `removed ${listIngredient.name}`;
      speechSynth.speak(trevor);
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

  const addWithVoice = async tag => {
    const returned = await addIngredient({
      name: tag,
      userId: currentUser.uid
    });
    if (returned) {
      getIngredients();
      //Make voice playback
      trevor.text = `got ${tag}`;
      speechSynth.speak(trevor);
      setIngredient('');
    }
  };

  const deleteWithVoice = async tag => {
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
        await getIngredients();
      }
      trevor.text = `removed ${tag}`;
      deleteIngredientToast();
      speechSynth.speak(trevor);
    } catch (error) {
      trevor.text = `couldnt find ${tag}`;
      speechSynth.speak(trevor);
    }
  };

  const getRecipesWithVoice = async () => {
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
    //for some reason, if ingredients is an empty array, it doesn't fire the if statement. Reading as if its "truthy"
    if (!ingredients[0]) {
      trevor.text = `you need to add some ingredients first`;
      speechSynth.speak(trevor);
    } else {
      trevor.text = `getting your recipes`;
      speechSynth.speak(trevor);
      history.push('/recipes');
    }
  };

  const getFavoriteRecipesWithVoice = async () => {
    trevor.text = `getting your favorite recipes`;
    speechSynth.speak(trevor);
    history.push('/favoriterecipes');
  };

  const clearListWithVoice = async () => {
    const currentList = await getIngredients();
    if (currentList.length < 1) {
      trevor.text = `your list is empty`;
      speechSynth.speak(trevor);
    } else {
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
      trevor.text = `removing your list`;
      speechSynth.speak(trevor);
      setIngredients([]);
      clearListToast();
    }
  };

  const activatedCommands = () => {
    return {
      'add *tag': tag => {
        addWithVoice(tag);
      },
      'delete *tag': tag => {
        deleteWithVoice(tag);
      },
      'get recipes': () => getRecipesWithVoice(),
      'get my favorite recipes': () => getFavoriteRecipesWithVoice(),
      'clear my list': () => clearListWithVoice()
    };
  };

  const initCommands = () => {
    return {
      'hey trevor': () => {
        startAnnyang();
        trevor.text = `at your service`;
        speechSynth.speak(trevor);
      },
      'trevor stop': () => stopListening()
    };
  };

  annyang.addCommands(initCommands());

  const stopListening = () => {
    const initialCommands = Object.keys(activatedCommands());
    //Removes all the initial commands
    annyang.removeCommands(initialCommands);
  };

  const startAnnyang = () => {
    annyang.addCommands(activatedCommands());
  };

  return (
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
            className="btn waves-effect waves-light red center"
            type="submit"
            name="action"
            onClick={() => clearListWithVoice()}
          >
            Clear List
          </button>
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
