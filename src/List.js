import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './Auth.js';
import { db } from './base';
import { Redirect } from 'react-router-dom';

import ListOfIngredients from './Ingredients/ListOfIngredients';
import OutputSpeech from './Speech/OutputSpeech';
import InputSpeech from './Speech/InputSpeech';
import annyang from 'annyang';
import Commands, { returnCommands } from './Speech/Commands';

const speechSynth = window.speechSynthesis;

const List = ({ history }) => {
	const { currentUser } = useContext(AuthContext);
	const [ ingredients, setIngredients ] = useState([]);
	const [ ingredient, setIngredient ] = useState('');

	useEffect(
		() => {
			gotIngredients(currentUser.uid);
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
			return ingredients;
		} catch (error) {
			console.error('No Ingredients', error);
		}
	};

	const addIngredient = async (ingredient) => {
		try {
			let names = [];
			for (let i = 0; i < ingredients.length; i++) {
				names.push(ingredients[i].name.toLowerCase());
			}
			if (names.includes(ingredient.name.toLowerCase())) {
				speechSynth.speak(new SpeechSynthesisUtterance(`You have already added this item!`));
			} else {
				const newIngredient = { ...ingredient };
				await db.collection('ingredients').add(ingredient).then((obj) => (newIngredient.id = obj.id));
				return newIngredient;
			}
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
		if (returnedIngredient) {
			setIngredients([ ...ingredients, returnedIngredient ]);
			setIngredient('');
		}
	};

	const startedListening = (name) => {
		setIngredient(name);
	};

	const addVoice = async (tag) => {
		const currentIngredients = await gotIngredients(currentUser.uid);
		let names = [];
		for (let i = 0; i < currentIngredients.length; i++) {
			names.push(currentIngredients[i].name.toLowerCase());
		}
		if (names.includes(tag)) {
			speechSynth.speak(new SpeechSynthesisUtterance(`You have already added this item!`));
		} else {
			await addIngredient({
				name: tag,
				userId: currentUser.uid
			});
			gotIngredients(currentUser.uid);
			//Make voice playback
			speechSynth.speak(new SpeechSynthesisUtterance(`got ${tag}`));
			setIngredient('');
		}
	};

	const deleteVoice = async (tag) => {
		try {
			const id = await db
				.collection('ingredients')
				.where('userId', '==', currentUser.uid)
				.where('name', '==', tag)
				.get()
				.then((doc) => doc.docs[0].id);
			if (id) {
				await db.collection('ingredients').doc(id).delete();
				await gotIngredients(currentUser.uid);
			}
			speechSynth.speak(new SpeechSynthesisUtterance(`removed ${tag}`));
		} catch (error) {
			speechSynth.speak(new SpeechSynthesisUtterance(`couldnt find ${tag}`));
		}
	};

	const getRecipes = async () => {
		const ingre = [];
		await db.collection('ingredients').where('userId', '==', currentUser.uid).get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				const item = doc.data();
				item.id = doc.id;
				ingre.push(item);
			});
		});
		//for some reason, if ingre is an empty array, it doesn't fire the if statement. Reading as if its "truthy"
		if (!ingre[0]) speechSynth.speak(new SpeechSynthesisUtterance(`you need to add some ingredients first`));
		else {
			speechSynth.speak(new SpeechSynthesisUtterance(`getting your recipes`));
			history.push('/recipes');
		}
	};

	const clearList = async () => {
		speechSynth.speak(new SpeechSynthesisUtterance(`removing your list`));
		//When you do the querySnapshot, you can call firebase methods inside of the collection you get.
		await db.collection('ingredients').where('userId', '==', currentUser.uid).get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				db.collection('ingredients').doc(doc.id).delete();
			});
		});
		setIngredients([]);
	};

	const returnCommands = () => {
		return {
			'add *tag': (tag) => {
				addVoice(tag);
			},
			'delete *tag': (tag) => {
				deleteVoice(tag);
			},
			'get recipes': () => getRecipes(),
			'clear my list': () => clearList()
		};
	};

	annyang.start();
	if (currentUser) annyang.addCommands(returnCommands());

	console.log('INGREDIENTS:', ingredients);
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
			{/* need to make this look prettier later */}
			<h3>Test out these Commands!</h3>
			<p>You can add any food item you like to your list. Say "add Cheese"</p>
			<p>You can also delete any food item off of your list. Say "delete Cheese"</p>
			<p>If you want to get some recipes using your current shopping list, say "get recipes"</p>
			<p>If you want to remove your current shopping list, say "clear my list"</p>
		</div>
	);
};

export default List;
