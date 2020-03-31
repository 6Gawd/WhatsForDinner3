/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';

import ListOfIngredients from './ListOfIngredients';
import annyang from 'annyang';
import trevor, { speechSynth } from '../Speech/OutputSpeech';

import 'react-toastify/dist/ReactToastify.css';
import {
  addIngredientToast,
  deleteIngredientToast,
  clearListToast,
  initTrevorToast
} from '../ToastNotifications/Toasts';
import { listInstructions } from '../Speech/Commands';

import Modal from 'react-responsive-modal';

const List = () => {
  const { currentUser } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getIngredients();
    initTrevorToast();
    annyang.addCommands(initCommands);
    return () => {
      annyang.removeCommands(Object.keys(activatedCommands));
      annyang.removeCommands(Object.keys(initCommands));
    };
  }, []);
  //Annyang Voice Commands
  const activatedCommands = {
    'add *tag': tag => addWithVoice(tag),
    'delete *tag': tag => deleteWithVoice(tag),
    'clear my list': () => clearListWithVoice()
  };

  const initCommands = {
    //Adds all the activated commands
    'hey Trevor': () => {
      annyang.addCommands(activatedCommands);
      trevor.text = `at your service`;
      speechSynth.speak(trevor);
    },
    //Removes all the activated commands
    'trevor stop': () => annyang.removeCommands(Object.keys(activatedCommands)),
    'show instructions': () => setOpen(true),
    'close instructions': () => setOpen(false)
  };

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

  const addIngredient = async newIngredient => {
    try {
      const currentIngredients = await getIngredients();
      const ingredientNames = currentIngredients.map(ingredient =>
        ingredient.name.toLowerCase()
      );
      //checks to see if ingredient is already in the User's list
      if (ingredientNames.includes(newIngredient.name.toLowerCase())) {
        trevor.text = `You have already added this item!`;
        speechSynth.speak(trevor);
      } else {
        //we created a new doc in the ingredient collection
        await db.collection('ingredients').add(newIngredient);
        trevor.text = `got ${newIngredient.name}`;
        speechSynth.speak(trevor);
        addIngredientToast();
        getIngredients();
        setIngredient('');
      }
    } catch (error) {
      console.error('No Ingredients', error);
    }
  };

  const addWithVoice = async tag => {
    await addIngredient({
      name: tag,
      userId: currentUser.uid
    });
  };

  const deleteIngredient = async listIngredient => {
    try {
      //Delete ingredient from DB
      await db
        .collection('ingredients')
        .doc(listIngredient.id)
        .delete();
      await getIngredients();
      deleteIngredientToast();
      trevor.text = `removed ${listIngredient.name}`;
      speechSynth.speak(trevor);
    } catch (error) {
      console.error('Error deleting ingredient', error);
    }
  };

  const deleteWithVoice = async tag => {
    //check to see if the ingredient is in the database
    try {
      let ingredient = {};
      await db
        .collection('ingredients')
        .where('userId', '==', currentUser.uid)
        .where('name', '==', tag)
        .get()
        .then(doc => {
          ingredient = doc.docs[0].data();
          ingredient.id = doc.docs[0].id;
        });
      await deleteIngredient(ingredient);
    } catch (error) {
      trevor.text = `couldnt find ${tag}`;
      speechSynth.speak(trevor);
    }
  };

  const clearListWithVoice = async () => {
    const currentList = await getIngredients();
    if (currentList.length < 1) {
      trevor.text = `your list is empty`;
      speechSynth.speak(trevor);
    } else {
      //we get the User's list of ingredients and delete from DB.
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

  const handleChange = event => {
    setIngredient(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await addIngredient({
      name: ingredient,
      userId: currentUser.uid
    });
  };

  return (
    <div className="card-padding">
      <div className="container">
        <div className="card-panel">
          <h1 className="center-align">Your Shopping List</h1>
          <ListOfIngredients
            ingredients={ingredients}
            deleteIngredient={deleteIngredient}
          />
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
                    <i className="tiny material-icons right">
                      add_shopping_cart
                    </i>
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
            <i className="tiny material-icons right">delete_sweep</i>
          </button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <h4>Trevor's Commands</h4>
            <ul>
              {listInstructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ul>
          </Modal>
        </div>
      </div>
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

export default List;
