import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import annyang from 'annyang';

const RecipeDisplay = ({ history, recipe, removeFromFavorites, idx }) => {
  const { id, title, image } = recipe;
  const startCookingCommands = {
    ['start cooking recipe ' + (idx + 1)]: () => {
      history.push(`/favoriterecipes/instructions/${id}`)
    }
  }

  useEffect(() => {
    annyang.addCommands(startCookingCommands);
    return () => {
      annyang.removeCommands(['start cooking recipe ' + (idx + 1)]);
    };
  }, []);

  return (
    <div>
      <div className="col s12 m6 l4">
        <div className="card">
          <div className="card-image">
            <img src={image} alt={title} />
            <span className="card-title card-title-black">{title}</span>
            <a className="btn-floating halfway-fab waves-effect waves-light blue left">
                {idx + 1}
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
          <div className="card-action">
            <Link to={`favoriterecipes/instructions/${id}`}>Let's Start Cooking</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
