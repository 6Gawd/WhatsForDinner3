import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './Auth.js';
import { db } from './base';

import ListOfIngredients from './Ingredients/ListOfIngredients';
import OutputSpeech from './Speech/OutputSpeech';
import InputSpeech from './Speech/InputSpeech';
import annyang from 'annyang';
import VoiceCommands from './Speech/VoiceCommands';

const List = () => {
	const { currentUser } = useContext(AuthContext);
	const [ ingredients, setIngredients ] = useState([]);
	const [ ingredient, setIngredient ] = useState('');

	useEffect(
		() => {
			if (currentUser) gotIngredients(currentUser.uid);
		},
		[ currentUser ]
	);

	const gotIngredients = async (userId) => {
		try {
			const ingredients = [];
			await db.collection('ingredients').where('userId', '==', userId).get().then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					const item = doc.data();
					item.id = doc.id;
					ingredients.push(item);
				});
			});
			setIngredients(ingredients);
		} catch (error) {
			console.error('No Ingredients', error);
		}
	};

	const addIngredient = async (ingredient) => {
		try {
			const newIngredient = { ...ingredient };
			await db.collection('ingredients').add(ingredient).then((obj) => (newIngredient.id = obj.id));
			return newIngredient;
		} catch (error) {
			console.error('No Ingredients', error);
		}
	};

	const deleteIngredient = async (ingredientId) => {
		try {
			await db.collection('ingredients').doc(ingredientId).delete();
			const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== ingredientId);
			setIngredients(updatedIngredients);
		} catch (error) {
			console.error('Error deleting ingredient', error);
		}
	};

	const handleChange = (event) => {
		setIngredient(event.target.value);
	};

	const handleTranscript = (string) => {
		setIngredient(string);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const returnedIngredient = await addIngredient({
			name: ingredient,
			userId: currentUser.uid
		});
		setIngredients([ ...ingredients, returnedIngredient ]);
		setIngredient('');
	};

	const startedListening = (name) => {
		setIngredient(name);
	};

	const voiceSubmit = async (tag) => {
		await addIngredient({
			name: tag,
			userId: currentUser.uid
		});
		gotIngredients(currentUser.uid);
		setIngredient('');
	};

	const returnCommands = (userId) => {
		return {
			'add *tag': (tag) => {
				voiceSubmit(tag);
				// const returnedIngredient = await addIngredient({ name: tag, userId: userId });
				// setIngredients([...ingredients, returnedIngredient])
				// setIngredient("")
			}
		};
	};

	annyang.start();

	if (currentUser) annyang.addCommands(returnCommands(currentUser.uid));

	return (
		// INGREDIENT LIST FORM
		<div>
			<h1 className="center-align">Your Shopping List</h1>
			<ListOfIngredients ingredients={ingredients} deleteIngredient={deleteIngredient} />
			{/* INPUT ITEM FORM */}
			<form onSubmit={handleSubmit}>
				<div className="main-header">
					<div className="showcase container">
						<div className="row">
							<div className="col s12 m10 offset-m1 center">
								<label htmlFor="ingredient">Add Ingredient</label>
								<input value={ingredient} name="name" onChange={handleChange} />
							</div>
							<button className="btn waves-effect waves-light indigo center" type="submit" name="action">
								Add Ingredient
							</button>
							<OutputSpeech content={ingredient} onClick={() => handleSubmit} />
						</div>
					</div>
				</div>
			</form>
			<InputSpeech startedListening={startedListening} handleTranscript={handleTranscript} />
		</div>
	);
};

export default List;
