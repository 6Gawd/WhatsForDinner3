import React from 'react';

const ListOfRecipes = ({ recipe }) => {
	const { title, image, missedIngredients, usedIngredients, unusedIngredients } = recipe;
	return (
		<div>
			<div className="row">
				<div className="col s12 m6">
					<div className="card">
						<div className="card-image">
							<img src={image} />
							<span className="card-title">{title}</span>
							<a className="btn-floating halfway-fab waves-effect waves-light red">
								<i className="material-icons">+</i>
							</a>
						</div>
						<div className="card-content">
							<p>Used Ingredients: {usedIngredients}</p>
							<p>Missed Ingredients: {missedIngredients}</p>
							<p>Unused Ingredients: {unusedIngredients}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListOfRecipes;
