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
![Log In](https://media.giphy.com/media/QyshPHsMYWJz22n3yq/giphy.gif)
#### Site Navigation
###### With our virtual assistant Alex, you can navigate our website with voice control. You can tell Alex to "Get List", "Get Recipes" & "Get Favorite Recipes" to access each page of the website without having to lift a finger. If you want to know all of what Alex can do simply say "Help" to see how he may help you on each page.
![Site Navigation](https://media.giphy.com/media/gKaMk6mPBu4kk7oSZC/giphy.gif)
#### Add/Delete Items from Shopping List
###### Our assistant Alex can also help you add or delete items to your shopping list by simply telling him what to do. You can say "Add cheese" or "Delete cheese" for example.
![Add & Delete](https://media.giphy.com/media/h4roTwMKEzaPsaGxSk/giphy.gif)
#### Clearing your Shopping List
###### You can also clear your shopping list by saying "clear list".
![Clear List](https://media.giphy.com/media/QVO3DjJ40g455FUzgi/giphy.gif)
#### Getting Recipes
###### You can tell Alex to show instructions of the individual recipes available by saying "Steps for Recipe [recipe number]" to see the instructions.
![Get Recipes](https://media.giphy.com/media/SqHXDo2Hoi3xG3Xmd4/giphy.gif)
#### Getting Favorite Recipes
###### You can also say "Bookmark recipe [recipe number]" to have Alex add the recipe to your favorite recipes.
![Get Recipes](https://media.giphy.com/media/McJQhsU1s1dO5C3JWV/giphy.gif)
#### Reading Instructions
###### Alex is a great help in the kitchen as well. He can read the steps to the recipe for you. Tell him "Let's start cooking [recipe number]" to get started. He will provide a new page with instructions and some new commands available. Say "Yes I am" to get started. If you would like to go to the next step say "Next Step". You can also ask him to "Repeat Step" or go back by saying "Previous Step".
![Favorite Recipes](https://media.giphy.com/media/eHLvgwxEQ9RZBZ3x77/giphy.gif)

#### Biggest Challenge
- Incorporating multiple different API's and new technologies. Using Annnyang! to recieve user input, then generate recipes from Spoonacular API based off that input, then store the results for each user in Firebase. Lastly, using MDN Web Speech - API to provide users with an interactive voice feedback to their actions.
