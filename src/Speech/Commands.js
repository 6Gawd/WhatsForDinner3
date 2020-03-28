import annyang from 'annyang';
import trevor, { speechSynth } from './OutputSpeech';

//  const [open, setOpen] = useState(false);
//   const [modalInstructions, setModalInstructions] = useState({ steps: [] });

export const listInstructions = [
  'You can add any food item you like to your list. Say "add Cheese"',
  'You can also delete any food item off of your list. Say "delete Cheese"',
  'If you want to clear your current shopping list, say "clear my list"',
  'If you want to get some recipes using your current shopping list, say "get recipes"',
  'If you want to go to your favorite recipes, say "get favorite recipes"',
  'Say "close instructions" to close this window'
];

//Navbar
// 'You can say "go to my list", "get recipes", "go to my profile", "get favorite recipes"'

export default annyang;
