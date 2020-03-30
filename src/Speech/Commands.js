import annyang from 'annyang';

export const listInstructions = [
  'In order to activate Trevor on our app, you begin by saying "hey Trevor"',
  'You can add any food item you like to your list. Say "add Cheese"',
  'You can also delete any food item off of your list. Say "delete Cheese"',
  'If you want to clear your current shopping list, say "clear my list"',
  'If you want to get some recipes using your current shopping list, say "get recipes"',
  'If you want to go to your favorite recipes, say "get favorite recipes"',
  'Say "close instructions" to close this window'
];

export const recipesInstructions = [
  'To add a new recipe to your favorites, say "bookmark recipe number (corresponding recipe number)"'

]

export const favRecipeInstructions = [
  'To see recipe instructions, say "Start cooking recipe (corresponding recipe number)"'
]

export const singleFavRecipeInstructions = [
  'Say "Yes I am" to get started',
  'Say "Go to next step" to hear the next step',
  'Say "Go to previous step" to hear the previous step',
  'Say "Repeat step" to hear the step over again'
]

export const profileInstructions = [
  'Say "sign out" to sign out :('
]

export default annyang;
