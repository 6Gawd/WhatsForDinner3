import React from 'react';
import Speech from 'react-speech';

export default function OutputSpeech({ content }) {
	return (
		<div>
			<Speech text={`added ${content}`} />
		</div>
	);
}
