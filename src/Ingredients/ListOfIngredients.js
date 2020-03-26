import React from 'react';

const ListOfIngredients = ({ ingredients, deleteIngredient }) => {

  return ingredients.length ? (
    <ul className="collection">
      {ingredients.map(ingredient => {
        return (
          <li className="collection-item" key={ingredient.id}>
            <div>
              {ingredient.name}
              <button
                className="btn-floating btn-small waves-effect waves-light red secondary-content"
                type="button"
                name="action"
                onClick={() => deleteIngredient(ingredient.id)}
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>No Ingredients Yet</p>
  );

};

export default ListOfIngredients;
