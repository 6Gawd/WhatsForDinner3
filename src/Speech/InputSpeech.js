import React, { useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

const InputSpeech = ({ startedListening }) => {
	// const [name, setName] = useState('');
	const [ listening, setListening ] = useState(true);
	const [ intermitten, setIntermitten ] = useState('');

	// useEffect(
	// 	() => {
	// 		startedListening(intermitten);
	// 	},
	// 	[ intermitten ]
	// );

	const toggleListen = () => {
		console.log('BEFORE LISTENING');
		setListening(!listening);
		handleListen();
	};

	const handleListen = () => {
		console.log('started listening!');
		if (listening) recognition.start();
		let finalTranscript = '';
		recognition.onresult = (event) => {
			let interimTranscript = '';
			// console.log(event);

			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				// console.log('Int TRANSCRIPT', transcript);
				if (event.results[i].isFinal) finalTranscript += transcript + ' ';
				else {
					interimTranscript += transcript;
					// props.handleTranscript(interimTranscript);
				}
			}
			setIntermitten(interimTranscript);
			setListening(!listening);
			startedListening(finalTranscript);
		};
		console.log('DONE LISTENING');
	};

	return (
		<div className="center-align container">
			<input disabled value={intermitten || 'Interim Transcription'} id="disabled" />
			<button className="btn waves-effect waves-light grey" id="microphone-btn" onClick={toggleListen}>
				Toggle Speech
			</button>
			<div id="interim" />
			<div id="final" />
		</div>
	);
};

export default InputSpeech;
