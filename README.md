# myVillage
A registry that gives moms full tummies, sleep, alone time, emotional support, mental health, and stress management.

This project was created for EECS 394, Spring 2017.
Developers:  Dylan McCann, Joseph Sevirini, Junwon Jang, Rohan Mehta, Shin Lee, Vijeta Gupta

## Project Status
At this moment, we have implemeneted most of the features and user stories requested at the beginning of the term. We have not built out a lot of functionality with service providers, however. While the basic functionality works, there are much needed design improvements. 

### Mother/Admin Workflow
To create a new village, click on "New/Expecting Mother' on the landing page. On the login page, click 'Create Account'. On the registration page, fill out the relevant information and click the "New Village?" checkbox. Note that any information you put into the 'Village ID' line will be discarded.

You will be redirected to the schedule page. This is where you can create tasks that the mother could use help with. Click on the "Add Task" button and input the relevant information.

Note that you can use the buttons the top of the page to filter by taken/untaken tasks.

To add more people to the village, you need to give them the villageID. To see this, click on the settings page button, located on the bottom of the schedule page. You will see the villageID displayed.

### Villager Workflow
To create a villager account, click on the "Villager" button on the landing page. On the login pae, click 'Create Account'. On the registration page, fill out the relevant information, including the myVillage ID (which the user must be given ahead of time). Do NOT click the "New Village?" checkbox!

You will be redirected to the home page. This is where the villager can volunteer to help the mother with certain tasks. Open tasks are displayed on this page. To take a task, simply click on the task and enter any relevant information.

To see the tasks that you have signed up for, click on the "Settings" button on the button of the page. The tasks that you have signed up for will be shown under the "Taken Tasks:" header. Note that the villageID is also displayed here. 

If you are too busy to help with any of the tasks then you can assist the mother in another way! Click on the "Spend Money" button on the top of the home page. Click on one of the items to be redirected to the payements page, where you can help pay a service provider to assist the mother.

## Setup
### Preparing the Local System
Install the appropriate version of [Git](https://git-scm.com/downloads)

Install the appropriate version of [Node.js](https://nodejs.org/en/download/)

Open your favorite command line interface (CLI) (terminal on mac, command prompt on windows, probably bash on Linux). A full description of the capabilities of these interfaces is outside the scope of this tutorial, but Google has excellent tutorials for each.

Navigate (using the CLI) to the directory in which you want the myVillage project directory to be located.

Clone this Github repo by typing the following commmand into the CLI and pressing enter `git clone git@github.com:eecs394-s17/MyVillage.git`

Navigate to inside the project directory.

Install Ionic 2 with the command `npm install -g cordova ionic` (and then pressing enter)

Install the rest of the components needed for this application `npm install`

Now we need to make some changes to the program configuration so that it uses the correct APIs/services.

### Required Services

#### Setting up Firebase
* Create a [firebase account](https://firebase.google.com/) and then create a new project
* Replace the dummy credentials located in app.module.ts (inside of the firebaseConfig object).
You can find each of the component pieces of the credentials on the Firebase console. Be sure to consult the [official docs](https://firebase.google.com/docs/web/setup) so you know which parts of the dummy credentials to replace (specifically, see the node.js code snippet)! In the event that you are having trouble finding stuff, Google is an excellent aid!
* Once done, navigate to the 'Database' section of the Firebase console. Add a new data value under the top-level attribute by clicking the `+` button. In the `name` field, type `villageSymbolMap`. Click on the plus button again and in the new `name` field type `newKey` and in the corresponding `value` field type `1`. Click the `ADD` button.
* Navigate to the 'Rules' header of the 'Database' section. Replace the rules found there with:
`{
  "rules": {
    ".read": "true",
    ".write": "true",
    "$tasks": {
      ".indexOn": "datetime"
    }
  }
}`
Note that before this application is ready for production, these rules must be replaced by rules that verify that the user has the permissions to do the actions which they are attempting to do (for more information about this, please see the 'Security' section below).

#### Setting up Ionic Authentication
* Create an [Ionic account](https://apps.ionic.io/) and click "create a new app"
* Go to your newly-created Ionic project page (on the website you just made an account on). Copy the ID located under the name of the app.
* Insert this ID into the application in two places. First, go to app.module.ts (in the 'app' directory and replace the dummy value for 'app_id' located on line 35. Then, go to 'ionic.config.json' and replace the dummy value for "app_id" located on line 3.

Note: The user is advised to consult the [official documentation](https://docs.ionic.io/setup.html) in the event of a problem.


### Setting up payments integration
The payments application will run separatetly from the myVillage app on a DigitalOcean droplet. To set up this droplet (server), head over to https://www.digitalocean.com/ and sign up for an account. Once that is done, you will want to create a 512mb droplet.
- Seting up firewall and permissions
- Installing nodejs
- Setting up NGINX
- Moving project folder to path where NGINX catches it
- Domain Name ?


## Deploy app
### Deploying to local web server
Move to the local project directory and run (in the CLI) `ionic serve`

The project should start up and a new browser tab should appear on which the application is running. If this is Chrome, copy the url into Firefox/another-browser and proceed from there. Chrome does not like that we are caching user data locally, so it will crash when you try to log-into/create an account. However, this is a crucial feature for using this app on mobile devices (because nobody wants to have to log into the app every single time they use it)!

### Deploying to devices

* Create an Ionic account (should already have been done when setting up Ionic authentication)
* Follow instructions at "https://docs.ionic.io/tools/view/" to test app on ionic view
* Follow instructions at "https://ionicframework.com/docs/intro/deploying/" to deploy app to phone
  - In order to deploy to iOS, make sure you have xCode7 or higher installed as well as an Apple developer account
  - In order to deploy to Android, make sure you have Java SDK, Android Studio, and updated Android SDK tools, platform and component dependencies installed, which are available through SDK Manager.

### Using Ionic View
Ionic View is a handy service that comes free with Ionic and allows you to share your app with clients and testers without going through the process of deploying as a beta to the iOS or Android store. Users who test the app can even submit feedback through Ionic View. In the ionic.config.json file, you can change the app ID to whatever ID you'd like and then in terminal/command line type `ionic upload`. It may ask you to log in to your ionic account so make sure that is configured properly. Once it is deployed, others can view the most recent version using the "Preview Shared App" feature in Ionic View - they will be asked to enter the app ID. Note that any time you want to update to the most current version, the person who deployed to their Ionic account must again run `ionic upload`.

## Known Bugs and TODO

### BUGS
* Some Security Issues (see 'Security' section below)
* Tasks that have already happened still show up on the Villager's home page / settings page (albeit with the proper date)
* Logo size is too large on "Spend Time" and "Spend Money" page
* Mother has the option to "Take task" but this should only be an option for villagers
* Overlap of menu bar and tabs bar for iOS for Mother's side
* Tasks appear in both "Taken tasks" and "Untaken tasks" when it should be one or another
* Application automatically caches data locally (great for mobile), but this can cause problems on browsers such as Chrome (but not Firefox)

### TO DOS
* Some further type of authentication before another mother can join an already-existing village (right now it is too easy to get admin status)
* Push notifications for new/taken tasks
* Allow mother/admin to add tasks that cost money. Right now these are hard coded in HTML based on the generic template from the myVillage website. This can easily done by adding a new field to the form for adding task that asks whether the task costs money, and then routing these tasks to the Spend Money segment, similar to how it is done for Spend Time in home.html.
* Have the payments page pre-load a specific dollar amount based on the item that was clicked.
* Answers to the questions on the FAQs page
* Moments page can display significant events/moments that the Mother has had recently
* Users can be associated with multiple villagers
* Integration with Google Calendar

## Viewing and editing code
If you are new to coding, we'd recommend installing a text editor on your computer. Atom, Sublime Text 2, or TextWrangler all seem to work pretty well. This basically color codes different tags and lines of code based on the type of file you are editing, which makes it way easier to write new code.

## Security
There are a few security-related issues that must be addressed before this app is ready for production.

Some decisions for which data to display are handled in the front end, via the use of ngIf's. This is potentially a bad practice because a malicious user could modify the variables in the ngIf's boolean expression to change whether or not the ngIf will display certain information. In particular, in home.html, we are using an ngIf to check if any user has signed up for a given task in order to determine whether or not to display information about that task to the current user (if not taken -> display to current user). A malicious user could manipulate this so that they can see all the tasks (including the already-taken ones), which is a security concern because it would allow to the attacker to see the Mother's entire schedule. This *should* be the only case where this practice is a security concern.

We are storing many of the  relevant user attributes in the javascript front-end, which we then use to construct our database queries. This is a problem because an attacker could change these values (using the browser console, etc.). This would allow the attacker to change their isMother status (from villager to mother), change their villageID (from one village to another), or to change their usersName (to impersonate another user).

The decision for which data to display on the page must be moved from the ngIf's to the database queries. The Javascript variables that are used to construct these queries must be protected from possible malicious-user interference. However, Javascript variables are *never* secure. The verification/construction of the database queries must therefore be moved to the backend, either through server-side checks (so even if the local values are changed, the server won't be fooled), or by encapsulating all relevant user data inside a session (or a similar construct).


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
