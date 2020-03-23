import React, { Component } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

class InputSpeech extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			listening: false
		};
	}

	toggleListen = () => {
		this.setState(
			{
				listening: !this.state.listening
			},
			this.handleListen
		);
	};

	handleListen = () => {
		console.log('BEFORE LISTENING');
		if (this.state.listening) recognition.start();
		console.log('started listening!');
		let finalTranscript = '';
		recognition.onresult = (event) => {
			let interimTranscript = '';

			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) finalTranscript += transcript + ' ';
				else interimTranscript += transcript;
			}
			// document.getElementById('interim').innerHTML = interimTranscript
			// document.getElementById('final').innerHTML = finalTranscript
			this.setState({
				listening: !this.state.listening
			});
			this.props.startedListening(finalTranscript);
		};
		console.log('DONE LISTENING');
	};

	render() {
		return (
			<div>
				<button
					className="btn waves-effect waves-light grey"
					id="microphone-btn"
					// style={button}
					onClick={this.toggleListen}
				/>
				<div id="interim" />
				<div id="final" />
			</div>
		);
	}
}

export default InputSpeech;
