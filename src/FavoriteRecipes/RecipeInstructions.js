import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import annyang from 'annyang';
import trevor, { speechSynth } from '../Speech/OutputSpeech';
import {
  readyToBeginToast,
} from '../ToastNotifications/Toasts';
import { singleFavRecipeInstructions } from '../Speech/Commands';
import Modal from 'react-responsive-modal';

const RecipeInstructions = props => {
  const { currentUser } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState({
    steps: [],
    ingredients: []
  });
  const [open, setOpen] = useState(false);

  const id = props.match.params.id;

  useEffect(() => {
    getFavoriteRecipe(currentUser.uid);
    annyang.addCommands(returnCommands());
    trevor.text = "Let's Start Cooking, Are you Ready?";
    speechSynth.speak(trevor);
    readyToBeginToast();
    return () => {
      annyang.removeCommands(Object.keys(returnCommands()));
    };
  }, []);

  const returnCommands = () => {
    let steps = 0;
    return {
      'Yes I am': () => {
        rec(steps);
      },
      'Go to next step': async () => {
        let bool = await rec(steps + 1);
        if (bool) {
          steps++;
        } else {
          trevor.text = 'You are already on the last step';
          speechSynth.speak(trevor);
        }
      },
      'repeat current step': () => {
        rec(steps);
      },
      'go to previous step': async () => {
        let bool = await rec(steps - 1);
        if (bool) {
          steps--;
        } else {
          trevor.text = 'You are already on the first step';
          speechSynth.speak(trevor);
        }
      },
      'show instructions': () => {
        setOpen(true);
      },
      'close instructions': () => {
        setOpen(false);
      }
    };
  };

  const rec = async step => {
    const recipe = await db
      .collection('favoriteRecipes')
      .doc(id)
      .get()
      .then(function(doc) {
        return doc.data();
      });
    if (step < recipe.steps.length && step >= 0) {
      setCurrentStep(step);
      trevor.text = `Step ${step + 1}. ${recipe.steps[step]}`;
      speechSynth.speak(trevor);
      return true;
    } else {
      return false;
    }
  };

  const getFavoriteRecipe = async userId => {
    try {
      const recipe = await db
        .collection('favoriteRecipes')
        .doc(id)
        .get()
        .then(function(doc) {
          return doc.data();
        });
      if (recipe) setSelectedRecipe(recipe);
    } catch (error) {
      console.error('No Recipe', error);
    }
  };

  return (
    <div className="card-padding">
      <div className="container container-padding">
        <div className="col 12 m7">
          <div className="card horizontal">
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <div>
              <h4 className="left-align instructions-text">
                {selectedRecipe.title}
              </h4>
              <p className="valign-wrapper left-align instructions-text">
                Current Step: {selectedRecipe.steps[currentStep]}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* INGREDIENTS */}
      <div className="container container-padding">
        <div className="col 12 m7">
          <div className="card horizontal instructions-text">
            <h6 className="left-align">
              Ingredients: {selectedRecipe.ingredients.join(', ')}
            </h6>
          </div>
        </div>
      </div>

      {/* INSTRUCTIONS */}
      <div className="container container-padding">
        <div className="col 12 m7">
          <div className="card horizontal">
            <ul>
              {/* <li className="collection-header"></li> */}
              {selectedRecipe.steps.length ? (
                selectedRecipe.steps.map((step, i) => (
                  <li key={step} className="left-align instructions-text">
                    <strong>{`Step ${i + 1}:`}</strong> {`${step}`}
                  </li>
                ))
              ) : (
                <p>Instructions unavailable at this time</p>
              )}
            </ul>
          </div>
        </div>
      </div>
			      <Modal open={open} onClose={() => setOpen(false)}>
        <h4>Trevor's Commands</h4>
        <ul>
          {singleFavRecipeInstructions.map((instruction, i) => (
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

export default RecipeInstructions;
