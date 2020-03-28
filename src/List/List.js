import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Auth.js';
import { db } from '../base';

import ListOfIngredients from './ListOfIngredients';
import annyang from 'annyang';
import trevor, { speechSynth } from '../Speech/OutputSpeech';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	addIngredientToast,
	deleteIngredientToast,
	clearListToast,
	initTrevorToast,
	instructionsToast,
} from '../ToastNotifications/Toasts';
import { listInstructions } from '../Speech/Commands'

import Modal from 'react-responsive-modal'

const List = ({ history }) => {
	const { currentUser } = useContext(AuthContext);
	const [ ingredients, setIngredients ] = useState([]);
	const [ ingredient, setIngredient ] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		getIngredients();
		initTrevorToast();
		annyang.start();
		return () => {
			annyang.removeCommands();
			annyang.abort();
		};
	}, []);

	const getIngredients = async () => {
		try {
			const fetchIngredients = [];
			await db
				.collection('ingredients')
				.where('userId', '==', currentUser.uid)
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						const item = doc.data();
						item.id = doc.id;
						fetchIngredients.push(item);
					});
				});
			setIngredients(fetchIngredients);
			return fetchIngredients;
		} catch (error) {
			console.error('No Ingredients', error);
		}
	};

	const addIngredient = async (ingredient) => {
		try {
			const currentIngredients = await getIngredients();
			const names = currentIngredients.map((ingredient) => ingredient.name.toLowerCase());
			if (names.includes(ingredient.name.toLowerCase())) {
				trevor.text = `You have already added this item!`;
				speechSynth.speak(trevor);
				return false;
			} else {
				const newIngredient = { ...ingredient };
				await db.collection('ingredients').add(ingredient).then((obj) => (newIngredient.id = obj.id));
				trevor.text = `got ${newIngredient.name}`;
				speechSynth.speak(trevor);
				addIngredientToast();
				return newIngredient;
			}
		} catch (error) {
			console.error('No Ingredients', error);
		}
	};

	const deleteIngredient = async (listIngredient) => {
		try {
			await db.collection('ingredients').doc(listIngredient.id).delete();
			const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== listIngredient.id);
			deleteIngredientToast();
			setIngredients(updatedIngredients);
			trevor.text = `removed ${listIngredient.name}`;
			speechSynth.speak(trevor);
		} catch (error) {
			console.error('Error deleting ingredient', error);
		}
	};

	const handleChange = (event) => {
		setIngredient(event.target.value);
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

	const addWithVoice = async (tag) => {
		const returned = await addIngredient({
			name: tag,
			userId: currentUser.uid
		});
		if (returned) {
			getIngredients();
			setIngredient('');
		}
	};

	const deleteWithVoice = async (tag) => {
		try {
			const id = await db
				.collection('ingredients')
				.where('userId', '==', currentUser.uid)
				.where('name', '==', tag)
				.get()
				.then((doc) => doc.docs[0].id);
			if (id) {
				await db.collection('ingredients').doc(id).delete();
				await getIngredients();
			}
			trevor.text = `removed ${tag}`;
			deleteIngredientToast();
			speechSynth.speak(trevor);
		} catch (error) {
			trevor.text = `couldnt find ${tag}`;
			speechSynth.speak(trevor);
		}
	};

	const clearListWithVoice = async () => {
		const currentList = await getIngredients();
		if (currentList.length < 1) {
			trevor.text = `your list is empty`;
			speechSynth.speak(trevor);
		} else {
			await db
				.collection('ingredients')
				.where('userId', '==', currentUser.uid)
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						db.collection('ingredients').doc(doc.id).delete();
					});
				});
			trevor.text = `removing your list`;
			speechSynth.speak(trevor);
			setIngredients([]);
			clearListToast();
		}
	};

	const activatedCommands = () => {
		return {
			'add *tag': (tag) => {
				addWithVoice(tag);
			},
			'delete *tag': (tag) => {
				deleteWithVoice(tag);
			},
			'clear my list': () => clearListWithVoice()
		};
	};

	const initCommands = () => {
		return {
			'hey Trevor': () => {
				startAnnyang();
				trevor.text = `at your service`;
				speechSynth.speak(trevor);
				instructionsToast();
			},
			'trevor stop': () => stopListening(),
			'go to my list': () => {
        history.push("/list")
      },
      'go to my favorite recipes': () => {
        history.push("/favoriterecipes")
      },
      'go to my profile': () => {
        history.push("/profile")
      },
			'show instructions': () => {
				console.log("show instructions fired")
				setOpen(true)
			},
			'close instructions': () => {
				setOpen(false)
			},
      'get recipes': () => {
        history.push("/recipes")
      },
		};
	};

	annyang.addCommands(initCommands());

	const stopListening = () => {
		const initialCommands = Object.keys(activatedCommands());
		//Removes all the initial commands
		annyang.removeCommands(initialCommands);
	};

	const startAnnyang = () => {
		annyang.addCommands(activatedCommands());
	};

	return (
		<div>
			<div className="container col s12 m10 offset-m1 center">
				<div className="card-panel">
					<h1 className="center-align">Your Shopping List</h1>
					<ListOfIngredients ingredients={ingredients} deleteIngredient={deleteIngredient} />
					{/* INPUT ITEM FORM */}
					<form onSubmit={handleSubmit}>
						<div className="main-header">
							<div className="showcase container">
								<div className="row">
									<div className="col s12 m10 offset-m1 center">
										<label htmlFor="ingredient">Add Ingredient</label>
										<input value={ingredient} name="name" onChange={handleChange} required />
									</div>
									<button
										className="btn waves-effect waves-light indigo center"
										type="submit"
										name="action"
									>
										Add Ingredient
										<i className="tiny material-icons">add_shopping_cart</i>
									</button>
								</div>
							</div>
						</div>
					</form>
					<button
						className="btn waves-effect waves-light red center"
						type="submit"
						name="action"
						onClick={() => clearListWithVoice()}
					>
						Clear List
					</button>
					<div>
					<button
						className="btn waves-effect waves-light grey center"
						type="submit"
						name="action"
						onClick={() => setOpen(true)}
					>
						Instructions
						<i className="tiny material-icons">mic</i>
						</button>
						</div>


			<Modal open={open} onClose={() => setOpen(false)}>
              <h4>Trevor's Commands</h4>
              <ul>
								 {listInstructions.map((instruction,i) =>
									<li key={i}>{instruction}</li>
									)}
              </ul>
            </Modal>
						</div>
			</div>
			</div>
	);
};

export default List;
