import annyang from 'annyang';

export const listInstructions = [
  'Activate Alex by saying “hey Alex”',
  'Say “add Cheese” to add to your list',
  'You can also say “delete Cheese” or “clear my list”',
  'Say “get recipes” to get some new recipes!',
  'Say “get favorite recipes” to go to your recipes',
  'Say “close” to close this window'
];

export const recipesInstructions = [
  'You can say “bookmark recipe number (corresponding recipe number)“',
  'Or “steps for recipe number (corresponding recipe number)“',
  'You can also “close number (corresponding recipe number)“'
]

export const favRecipeInstructions = [
  'Begin by saying “Start cooking recipe (corresponding recipe number)“',
  'You can also “delete recipe (corresponding recipe number)“'
]

export const singleFavRecipeInstructions = [
  'Say “Yes I am” to get started',
  'You can also say “next step”',
  'And “previous step”',
  'Also, “Repeat step”'
]

export const profileInstructions = [
  'Say “sign out” to sign out :('
]

export const navInstructions = [
  'Say "Get List" to view shopping list.',
  'Say "Get Recipes" to view recipes.',
  'Say "Get Favorite Recipes" to view favorite recipes.',
]

export default annyang;
