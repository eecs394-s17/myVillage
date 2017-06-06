# myVillage
A registry that gives moms full tummies, sleep, alone time, emotional support, mental health, and stress management.

This project was created for EECS 394, Spring 2017.
Developers:  Dylan McCann, Joseph Sevirini, Junwon Jang, Rohan Mehta, Shin Lee, Vijeta Gupta,

## Project Status
myVillage allows new/expecting Mothers (or someone acting on her behalf) to create a village, where they can post tasks that they want help with. Villagers can be added to this village, where they sign up to help with these tasks, or contribute money to help pay a service provider to do the task.

### Mother/Admin Workflow
To create a new village, click on "New/Expecting Mother' on the landing page. On the login page, click 'Create Account'. On the registration page, fill out the relevant information and click the "New Village?" checkbox. Note that any information you put into the 'Village ID' line will be discarded. [Get pictures corresponding to each of these steps]

You will be redirected to the schedule page. This is where you can create tasks that the mother could use help with. Click on the "Add Task" button and input the relevant information. [Pics]

Note that you can use the buttons the top of the page to filter by taken/untaken tasks. [Pics]

To add more people to the village, you need to give them the villageID. To see this, click on the settings page button, located on the bottom of the schedule page. You will see the villageID displayed [Pics]

### Villager Workflow
To create a villager account, click on the "Villager" button on the landing page. On the login pae, click 'Create Account'. On the registration page, fill out the relevant information, including the myVillage ID (which the user must be given ahead of time). Do NOT click the "New Village?" checkbox! [Pics]

You will be redirected to the home page. This is where the villager can volunteer to help the mother with certain tasks. Open tasks are displayed this page. To take a task, simply click on the task and enter any relevant information. [Pics]

To see the tasks that you have signed up for, click on the "Settings" button on the button of the page. The tasks that you have signed up for will be shown under the "Taken Tasks:" header. Note that the villageID is also displayed here. [Pics]

If you are too busy to help with any of the tasks then you can assist the mother in another way! Click on the "Spend Money" button that is shown on the top of the home page. Click on one of the items to be redirected to the payements page, where you can help pay a service provider to help the mother. [Pics]

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

The project should start up and a new browser tab should appear on which the application is running. If this is Chrome, copy the url into Firefox/another-browser and proceed from there. Chrome does not like they we are caching user data locally, so it will crash when you try to log-into/create an account. However, this is a crucial feature for using this app on mobile devices (because nobody wants to have to log into the app every single time they use it)!

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

TODO: Users can be associated with multiple villagers

TODO: Clear tasks which will have already happened from the Villager's home page / settings page

## Viewing and editing code
If you are new to coding, we'd recommend installing a text editor on your computer. Atom, Sublime Text 2, or TextWrangler all seem to work pretty well. This basically color codes different tags and lines of code based on the type of file you are editing, which makes it way easier to write new code.

## Security

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
Deploying to Android and iOS devices: https://ionicframework.com/docs/intro/deploying/
