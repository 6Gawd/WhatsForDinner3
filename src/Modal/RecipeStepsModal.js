import React from 'react';
import Modal from 'react-responsive-modal';

const RecipeStepsModal = ({ open, setOpen, idx, modalInstructions, addToFavoriteFromModal }) => {
	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<h4>
				Recipe #{idx}: {modalInstructions.title}
			</h4>
			<ul>
				{modalInstructions.steps.length ? (
					modalInstructions.steps.map((step, i) => (
						<li key={i} className="left-align">
							<strong>{`Step ${i + 1}:`}</strong> {`${step}`}
						</li>
					))
				) : (
					<p>Instructions unavailable at this time</p>
				)}
			</ul>
			<a className="btn-floating halfway-fab waves-effect waves-light red">
				<i className="material-icons" onClick={() => addToFavoriteFromModal(modalInstructions)}>
					favorite
				</i>
			</a>
		</Modal>
	);
};

export default RecipeStepsModal;
