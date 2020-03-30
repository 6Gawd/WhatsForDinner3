export const speechSynth = window.speechSynthesis;

// const getVoice = async () => {
// 	const voice = await window.speechSynth;
// 	// .getVoices();
// 	// // filter(function(name) {
// 	// 	return name.name === 'Fiona';
// 	// })[0];
// 	return voice;
// };
// const tre = getVoice();
// console.log(tre);
let trevor = new SpeechSynthesisUtterance(`Default Text`);

// trevor.voice = voice;
// console.log(trevor.voice);

export default trevor;
