import React from 'react';

const ListOfIngredients = ({ ingredients, deleteIngredient }) => {
  return ingredients.length ? (
    ingredients.map(ingredient => {
      return (
        <div key={ingredient.id}>
          <p>
            {ingredient.name}
            <button
              className="btn-mini waves-effect waves-light red right"
              type="button"
              name="action"
              onClick={() => deleteIngredient(ingredient.id)}
            >
              <i className="material-icons">x</i>
            </button>
          </p>
        </div>
      );
    })
  ) : (
    <p>No Ingredients Yet</p>
  );
};

export default ListOfIngredients;
