## What's 4 Dinner?
#### An interactive shopping list & recipe generator, that also provides you cooking instructions.
##### Created By: Leslie Wu, Yan Gao, Ya-Sin Zenk & Mike Damato
###### Deployed on: https://whats4dinner.web.app/
### Tech Stack
- React
- Firebase/Authentification
- Firestore
- Materialize CSS
- Annyang voice API
- Webspeech API - SpeechSynthesis
- Spoonacular recipe API
### Local Setup
1. Run git clone https://github.com/6Gawd/WhatsForDinner3.git and navigate to the project folder with cd WhatsForDinner
2. Run npm install
3. Run npm start to start the app on http://localhost:3000/
### Features
- Local login & authentication.
- Persistent user shopping list and favorite recipes.
- Automated recipe generating.
- Full voice command integration across application.
- Speech-to-text voice commands.
- Speech interaction with virtual assistant (Alex).
- User interaction with various text & speech notifications.
#### Log In
![](GIFs/Login.gif)
#### Site Navigation
###### With our virtual assistant Alex, you can navigate our website with voice control. You can tell Alex to "Get List", "Get Recipes" & "Get Favorite Recipes" to access each page of the website without having to lift a finger. If you want to know all of what Alex can do simply say "Help" to see how he may help you on each page.
![](GIFs/SiteNavigationAndHelp.gif)
#### Add/Delete Items from Shopping List
###### Our assistant Alex can also help you add or delete items to your shopping list by simply telling him what to do. You can say "Add cheese" or "Delete cheese" for example.
![](GIFs/AddAndDeleteList.gif)
#### Clearing your Shopping List
###### You can also clear your shopping list by saying "clear list".
![](GIFs/ClearedList.gif)
#### Getting Recipes
###### You can tell Alex to show instructions of the individual recipes available by saying "Steps for Recipe [recipe number]" to see the instructions.
![](GIFs/GetRecipes.gif)
#### Getting Favorite Recipes
###### You can also say "Bookmark recipe [recipe number]" to have Alex add the recipe to your favorite recipes.
![](GIFs/FavoriteRecipes.gif)
#### Reading Instructions
###### Alex is a great help in the kitchen as well. He can read the steps to the recipe for you. Tell him "Let's start cooking [recipe number]" to get started. He will provide a new page with instructions and some new commands available. Say "Yes I am" to get started. If you would like to go to the next step say "Next Step". You can also ask him to "Repeat Step" or go back by saying "Previous Step".
![](GIFs/FavoriteRecipes.gif)
