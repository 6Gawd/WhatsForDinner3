import React from 'react';

const ListOfIngredients = ({ ingredients, deleteIngredient }) => {
	return ingredients.length ? (
		<ul className="collection">
			{ingredients.map((ingredient) => {
				return (
					<li className="collection-item" key={ingredient.id}>
						<div>
							{ingredient.name}
							<a href="#!" className="secondary-content" onClick={() => deleteIngredient(ingredient)}>
								<i className="material-icons red-text">delete_forever</i>
							</a>
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
