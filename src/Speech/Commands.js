import annyang from 'annyang';

const getRecipes = ingredients => {
  alert(`redirected to RECIPES. Here are the top 5 recipes I've found for you`);
};
const getFavoriteRecipes = () => {
  alert(`redirect to Favorite RECIPES.`);
};
const voiceCommands = {
  hello: hello,
  onStart: annyang.pause,
  'get recipes': getRecipes,
  'get favorite recipes': getFavoriteRecipes
};

annyang.addCommands(voiceCommands);

export default annyang;

// // Tell KITT to use annyang
// SpeechKITT.annyang();
// // Define a stylesheet for KITT to use
// SpeechKITT.setStylesheet(
//   '//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css'
// );
// // Render KITT's interface
// SpeechKITT.vroom();
