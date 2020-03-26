import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import annyang from 'annyang';
import trevor, { speechSynth } from '../Speech/OutputSpeech';

const RecipeInstructions = props => {
  const { currentUser } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState({ steps: [] });

  const id = props.match.params.id;

  useEffect(() => {
    // if (currentUser) {
    getFavoriteRecipe(currentUser.uid);
    annyang.start();
    trevor.text = "Let's Start Cooking, Are you Ready?";
    speechSynth.speak(trevor);

    const returnCommands = () => {
      // const recipe = await db
      //   .collection('favoriteRecipes')
      //   .doc(id)
      //   .get()
      //   .then(function(doc) {
      //     return doc.data();
      //   });
      let steps = 0;
      return {
        'Yes I am': () => rec(steps),
        'Go to next step': () => {
          steps++;
          rec(steps);
          // trevor.text = `${x.steps[currentStep]}`;
          // speechSynth.speak(trevor);
        },
        'repeat current step': () => {
          rec(steps);
        },
        'Trevor stop': () => {
          annyang.pause();
        },
        'go to previous step': () => {
          steps--;
          rec(steps);
          // trevor.text = `${x.steps[currentStep]}`;
          // speechSynth.speak(trevor);
        }
      };
    };

    annyang.addCommands(returnCommands());
  }, []);

  const rec = async step => {
    const recipe = await db
      .collection('favoriteRecipes')
      .doc(id)
      .get()
      .then(function(doc) {
        return doc.data();
      });
    setCurrentStep(step);
    trevor.text = `Step ${step + 1}. ${recipe.steps[step]}`;
    speechSynth.speak(trevor);
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
    <div>
      <div className="container container-padding">
        <div className="col 12 m7">
          <div className="card horizontal">
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <h4 className="right-align">{selectedRecipe.title}</h4>
            <p className="valign-wrapper left-align">
              Current Step: {selectedRecipe.steps[currentStep]}
            </p>
          </div>
        </div>
      </div>
      <div className="container container-padding">
        <div className="col 12 m7">
          <div className="card horizontal">
            <ul>
              {/* <li className="collection-header"></li> */}
              {selectedRecipe.steps.length ? (
                selectedRecipe.steps.map((step, i) => (
                  <li key={step} className="left-align">
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
    </div>
  );
};

export default RecipeInstructions;
