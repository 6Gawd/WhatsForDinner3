import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';

const RecipeDisplay = ({ recipe, removeFromFavorites }) => {
	const { id, title, image } = recipe;

	return (
		<div>
			<div className="row">
				<div className="col s12 m6">
					<div className="card">
						<div className="card-image">
							<img src={image} alt={title} />
							<span className="card-title">{title}</span>
							<a className="btn-floating halfway-fab waves-effect waves-light red">
								<i className="material-icons" onClick={() => removeFromFavorites(id)}>
									-
								</i>
							</a>
						</div>
						<div className="card-action">
							<a href="/favoriterecipes/">Instructions</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeDisplay;
