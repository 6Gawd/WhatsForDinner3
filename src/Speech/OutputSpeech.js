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

//GUI FOR FRONTEND TO SHOW DIFFERENT COMMANDS. ALSO INCLUDES MIC ICON
// // Tell KITT to use annyang
// SpeechKITT.annyang();
// // Define a stylesheet for KITT to use
// SpeechKITT.setStylesheet(
//   '//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css'
// );
// // Render KITT's interface
// SpeechKITT.vroom();
