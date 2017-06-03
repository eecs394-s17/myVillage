# MyVillage
A registry that gives moms full tummies, sleep, alone time, emotional support, mental health, and stress management.

This project was created for EECS 394, Spring 2017.

# Project Status 
[Describe what we implemented/what is does here]
[pictures are cool]

# Setup
## Needed tools
(say to install git/ionic/whatever-else)

## Running the app locally
Go to directory where you want the myVillage project directory to be located.

Run to clone the project `git clone git@github.com:eecs394-s17/MyVillage.git`

Move into project directory `cd ./MyVillage`

Install needed components `npm install`

Now we need to make some changes to the program configuration so that it uses the correct APIs/services.

## Required API Keys
### Setting up Firebase
(How to insert API keys into program)
(looks like it's just firebaseConfig in app.module.ts)
Basically, follow instructions at https://firebase.google.com/docs/web/setup up to the code snippet (beef this section way up).
### Setting up Ionic Authentication
(How to insert API keys into program)
(looks like it's just 'app_id' in app.module.ts)
Basically, follow instructions at http://docs.ionic.io/setup.html (beef this section up)
## Setting up payements integration
(Dylan needs to write this)

## Deploy app
(ionic serve / whatever else)

# Known Bugs and TODO
(what are our known bugs and what are the future steps for building this project out)
BUG: Differentation of user privileges between Motheres and Villagers happens on the front-end, should be implemented on backend for better security 
