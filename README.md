# myVillage
A registry that gives moms full tummies, sleep, alone time, emotional support, mental health, and stress management.

This project was created for EECS 394, Spring 2017.
Developers:  Dylan McCann, Joseph Sevirini, Junwon Jang, Rohan Mehta, Shin Lee, Vijeta Gupta,

## Project Status
[Describe what we implemented/what it does here]
[pictures are cool]

The myVillage application allows a the creation of a village, a social structure where a mother (or another admin acting for her) can post tasks (better word needed) that she needs (wants?) help with. Villagers can signup for these tasks, or instead give money to help the mother have a 'serve provider' (babysitter, nanny, etc.) accomplish that task instead.

Actions that users take are only visible to other people in their village. You can create a new village on the registration page. The villageID can be found on the settings page. The villageID is used during the registration process so that other people can join an already existing village. Note that all admins should select the 'Mother' option on the landing page. Note that currently each user can only be associated with a single village.

## Setup
### Needed tools
Install the appropriate version of Node.js `https://nodejs.org/en/download/`

Install Bower `https://bower.io/`

Install the appropriate version of Git `https://git-scm.com/downloads`

Install Ionic 2 by starting up your favorite command line interface (CLI) and typing `npm install -g cordova ionic` (and then pressing enter)

Install AngularFire2, which is used to interface with Firebase, `npm install firebase angularfire2 --save` (and then pressing enter)

[Riesbeck's instructions are good: https://www.cs.northwestern.edu/academics/courses/394/ionic-setup-tips.php]

### Running the app locally
Go to directory where you want the myVillage project directory to be located.

Run to clone the project `git clone git@github.com:eecs394-s17/MyVillage.git`

Move into project directory `cd ./MyVillage`

Install needed components `npm install`

Now we need to make some changes to the program configuration so that it uses the correct APIs/services.

### System Requirements
- Ionic 2.0+

### Required Services

### Setting up Firebase
* Create a firebase account and then create a new project
* Replace the dummy crediantials located in app.module.ts
You can find each of the component pieces of the credentials in the following places:
*apiKey: [where you can find this on the website],
*authDomain: [where you can find this on the website],
*databaseURL:  [where you can find this on the website],
*storageBucket:  [where you can find this on the website],
*messagingSenderId:  [where you can find this on the website],

### Setting up Ionic Authentication
* Create an Ionic account (https://apps.ionic.io/) and click "create a new app"
* Install the cloud client using `npm install @ionic/cloud-angular --save`
* Run `ionic io init` to get everything ready to communicate with the cloud
* Go to your newly-created Ionic project page (on the website you just made an account on). Copy the ID located under the name of the app.
* Insert this ID into the application in two places. First, go to app.module.ts (in the 'app' directory and replace the dummy value for 'app_id' located on line 35. Then, go to 'ionic.config.json' and replace the dummy value for "app_id" located on line 3. 

## Setting up payments integration
(Dylan needs to write this)

## Deploy app
### Deploying to local web server
Move to the local project directory and run 'ionic serve'

THe project should start up and a new browser tab should appear on which the application is running. If this is Chrome, copy the url into Firefox/another-browser and proceed from there. Chrome does not like they we are caching user data locally, so it will crash when you try to log-into/create an account. However, this is a crucial feature for using this app on mobile devices (because nobody wants to have to log into the app every single time they use it)!

### Deploying to Android/iOS devices
[alternatively, we could just tell them how to use Ionic View because this is pretty complicataed]
#### Android
(How to deploy to Andriod)

### iOS
(How to deploy to iOS)

## Known Bugs and TODO
[what are our known bugs and what are the future steps for building this project out]

BUG: Differentiation of user privileges between Mothers and Villagers happens on the front-end, should be implemented on backend for better security

TODO: some further type of authentication before another mother can join an already-existing village (right now it is too easy to get admin status)

TODO: Push notifications for new/taken tasks

TODO: Answers to the questions on the FAQs page

TODO: Moments page can display significant events/moments that the Mother has had recently 

## Viewing and editing code
If you are new to coding, we'd recommend installing a text editor on your computer. Atom, Sublime Text 2, or TextWrangler all seem to work pretty well. This basically color codes different tags and lines of code based on the type of file you are editing, which makes it way easier to write new code.

## security

## Using Ionic View

## Adding additional code
This app was built using the Ionic 2 Framework combined with AngularJS and Firebase.
Ionic is well documented, so you can learn about a lot of the components on their website: https://ionicframework.com/docs/components/.
We've also found that nearly every problem we encountered was discussed somewhere on StackExchange,
so turn to that for coding help.
A cool sample app that demonstrates a lot of the features available through Ionic can be viewed here:
https://github.com/ionic-team/ionic-conference-app.

## Other useful tutorials
HTML/CSS: https://www.codecademy.com/learn/learn-html-css
JS: https://www.codecademy.com/learn/javascript
Angular: https://angular.io/docs/ts/latest/tutorial/s
Ionic 2: https://www.joshmorony.com/beginners-guide-to-getting-started-with-ionic-2/
