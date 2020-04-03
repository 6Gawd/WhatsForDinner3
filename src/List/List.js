/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';
import ListOfIngredients from './ListOfIngredients';
import annyang from 'annyang';
import alex, { speechSynth } from '../Speech/OutputSpeech';
import 'react-toastify/dist/ReactToastify.css';
import { addIngredientToast, deleteIngredientToast, clearListToast, initAlexToast } from '../ToastNotifications/Toasts';
import { listInstructions, greetings } from '../Speech/Commands';
import InstructionModal from '../Modal/InstructionModal';

const List = ({ history }) => {
	const { currentUser } = useContext(AuthContext);
	const [ ingredients, setIngredients ] = useState([]);
	const [ ingredient, setIngredient ] = useState('');
	const [ open, setOpen ] = useState(false);

	useEffect(() => {
		getIngredients();
		initGreet();
		initAlexToast();
		annyang.addCommands(initCommands);
		return () => {
			annyang.removeCommands(Object.keys(initCommands));
		};
	}, []);
	//Annyang Voice Commands

	const initGreet = () => {
		alex.text = greetings[Math.round(Math.random() * 11)];
		speechSynth.speak(alex);
	};

	const initCommands = {
		//Adds all the activated commands
		'add *tag': (tag) => addWithVoice(tag),
		'delete *tag': (tag) => deleteWithVoice(tag),
		'clear list': () => clearListWithVoice(),
		//Removes all the activated commands
		help: () => setOpen(true),
		close: () => setOpen(false)
	};

	const getIngredients = async () => {
		try {
			const fetchedIngredients = [];
			await db
				.collection('ingredients')
				.where('userId', '==', currentUser.uid)
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						const item = doc.data();
						item.id = doc.id;
						fetchedIngredients.push(item);
					});
				});
			setIngredients(fetchedIngredients);
			return fetchedIngredients;
		} catch (error) {
			console.error('No Ingredients', error);
		}
	};

	const addIngredient = async (newIngredient) => {
		try {
			const currentIngredients = await getIngredients();
			const ingredientNames = currentIngredients.map((ingredient) => ingredient.name.toLowerCase());
			//checks to see if ingredient is already in the User's list
			if (ingredientNames.includes(newIngredient.name.toLowerCase())) {
				alex.text = `You have already added this item!`;
				speechSynth.speak(alex);
			} else {
				//we created a new doc in the ingredient collection
				await db.collection('ingredients').add(newIngredient);
				alex.text = `got ${newIngredient.name}`;
				speechSynth.speak(alex);
				addIngredientToast();
				getIngredients();
				setIngredient('');
			}
		} catch (error) {
			console.error('No Ingredients', error);
		}
	};

	const addWithVoice = async (tag) => {
		await addIngredient({
			name: tag.toLowerCase(),
			userId: currentUser.uid
		});
	};

	const deleteIngredient = async (listIngredient) => {
		try {
			//Delete ingredient from DB
			await db.collection('ingredients').doc(listIngredient.id).delete();
			await getIngredients();
			deleteIngredientToast();
			alex.text = `removed ${listIngredient.name}`;
			speechSynth.speak(alex);
		} catch (error) {
			console.error('Error deleting ingredient', error);
		}
	};

	const deleteWithVoice = async (tag) => {
		//check to see if the ingredient is in the database
		try {
			let ingredient = {};
			await db
				.collection('ingredients')
				.where('userId', '==', currentUser.uid)
				.where('name', '==', tag)
				.get()
				.then((doc) => {
					ingredient = doc.docs[0].data();
					ingredient.id = doc.docs[0].id;
				});
			await deleteIngredient(ingredient);
		} catch (error) {
			alex.text = `could not find ${tag}`;
			speechSynth.speak(alex);
		}
	};

	const clearListWithVoice = async () => {
		const currentList = await getIngredients();
		if (currentList.length < 1) {
			alex.text = `your list is empty`;
			speechSynth.speak(alex);
		} else {
			//we get the User's list of ingredients and delete from DB.
			await db
				.collection('ingredients')
				.where('userId', '==', currentUser.uid)
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						db.collection('ingredients').doc(doc.id).delete();
					});
				});
			alex.text = `removing your list`;
			speechSynth.speak(alex);
			setIngredients([]);
			clearListToast();
		}
	};

	const handleChange = (event) => {
		setIngredient(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await addIngredient({
			name: ingredient.toLowerCase(),
			userId: currentUser.uid
		});
	};

	return (
		<div className="card-padding">
			<div className="container">
				<div className="card-panel">
					<h1 className="center-align">Your Shopping List</h1>
					<ListOfIngredients ingredients={ingredients} deleteIngredient={deleteIngredient} />
					<form onSubmit={handleSubmit}>
						<div className="main-header">
							<div className="showcase container">
								<div className="row">
									<div className="col s12 m10 offset-m1 center">
										<label htmlFor="ingredient">Add Ingredient</label>
										<input value={ingredient} name="name" onChange={handleChange} required />
									</div>
									<button className="btn waves-effect indigo center" type="submit" name="action">
										Add Ingredient
										<i className="tiny material-icons right">add_shopping_cart</i>
									</button>
								</div>
							</div>
						</div>
					</form>
					<div className="container">
						<button
							className="btn waves-effect green center"
							type="submit"
							name="action"
							onClick={() => history.push('/recipes')}
						>
							Get Recipes
							<i className="tiny material-icons right">shopping_cart</i>
						</button>
					</div>
					<br />
					<div className="container">
						<button
							className="btn waves-effect red center"
							type="submit"
							name="action"
							onClick={() => clearListWithVoice()}
						>
							Clear List
							<i className="tiny material-icons right">delete_sweep</i>
						</button>
					</div>
				</div>
			</div>
			<InstructionModal open={open} setOpen={setOpen} instructions={listInstructions} />
		</div>
	);
};

export default List;
