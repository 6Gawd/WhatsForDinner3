import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import annyang from 'annyang';
import trevor, { speechSynth } from '../Speech/OutputSpeech';
import { readyToBeginToast } from '../ToastNotifications/Toasts';
import { singleFavRecipeInstructions } from '../Speech/Commands';
import InstructionModal from '../Modal/InstructionModal';

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
    getFavoriteRecipe();
    annyang.addCommands(returnCommands());
    trevor.text = "Let's Start Cooking, Are you Ready?";
    speechSynth.speak(trevor);
    readyToBeginToast();
    return () => {
      annyang.removeCommands(Object.keys(returnCommands()));
    };
  }, []);

  const returnCommands = () => {
    //had to use closure because Annyang only takes commands objects and doesnt have access to the currentStep state
    let steps = 0;
    return {
      'Yes I am': () => {
        readCurrentStep(steps);
      },
      'next step': async () => {
        let bool = await readCurrentStep(steps + 1);
        if (bool) {
          steps++;
        } else {
          trevor.text = 'You are already on the last step';
          speechSynth.speak(trevor);
        }
      },
      'repeat step': () => {
        readCurrentStep(steps);
      },
      'previous step': async () => {
        let bool = await readCurrentStep(steps - 1);
        if (bool) {
          steps--;
        } else {
          trevor.text = 'You are already on the first step';
          speechSynth.speak(trevor);
        }
      },
      'help': () => {
        setOpen(true);
      },
      'close': () => {
        setOpen(false);
      }
    };
  };

  const readCurrentStep = async step => {
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

  const getFavoriteRecipe = async () => {
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
      <InstructionModal
        open={open}
        setOpen={setOpen}
        instructions={singleFavRecipeInstructions}
      />
    </div>
  );
};

export default RecipeInstructions;
