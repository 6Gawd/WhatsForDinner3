export const speechSynth = window.speechSynthesis;

let voice = speechSynthesis.getVoices().filter(function(voice) {
  return voice.name == 'Google UK English Female';
})[0];
let trevor = new SpeechSynthesisUtterance(`Default Text`);
trevor.voice = voice;

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
