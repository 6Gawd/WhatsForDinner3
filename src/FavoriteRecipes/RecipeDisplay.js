import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import annyang from 'annyang';

const RecipeDisplay = ({ history, recipe, removeFromFavorites, idx }) => {
  const { id, title, image } = recipe;
  const favoritesCommands = {
    ['start cooking recipe ' + idx]: () => {
      history.push(`/favoriterecipes/instructions/${id}`);
    },
    ['delete recipe ' + idx]: () => {
      removeFromFavorites(id);
    }
  };

  useEffect(() => {
    annyang.addCommands(favoritesCommands);
    return () => {
      annyang.removeCommands(Object.keys(favoritesCommands));
    };
  }, []);

  return (
    <div>
      <div className="col s12 m6 l4">
        <div className="card medium">
          <div className="card-image">
            <img src={image} alt={title} />
            <a className="btn-floating halfway-fab waves-effect waves-light blue left">
              {idx}
            </a>
            <a className="btn-floating halfway-fab waves-effect waves-light red">
              <i
                className="material-icons"
                onClick={() => removeFromFavorites(id)}
              >
                remove
              </i>
            </a>
          </div>
          <div className="card-content card-text">
            <div className="container">
              <h6>{title}</h6>
            </div>
          </div>
          <div className="card-action">
            <Link to={`favoriterecipes/instructions/${id}`}>
              Let's Start Cooking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
