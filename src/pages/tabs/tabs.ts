import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { SettingsPage } from '../settings/settings'

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

export var isMother: boolean = false;
export var isVillager: boolean = false;
export var villageID: any;

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = SettingsPage

    tasks: FirebaseListObservable<any>;
    angFireDB: any;
    Username: any;
    UserStatus: any;
    
  constructor(public alertCtrl: AlertController, public nav: NavController, public navParams: NavParams, angFire: AngularFire)  {
      this.UserStatus = navParams.get("currentUserStatus");
      this.Username = navParams.get("currentUsername");
      console.log(this.Username);
      console.log(this.UserStatus);
      isMother = (this.UserStatus == 'M');
      console.log(isMother);
      isVillager = (this.UserStatus == 'V');
      villageID = (navParams.get("villageID"));
      console.log(villageID);
      this.tasks = angFire.database.list('/tasks');
		this.angFireDB = angFire;
  }

  addTask():void{
  	let prompt = this.alertCtrl.create({
  		title: 'New Task',
  		message: 'Enter the task details in the form below',
  		inputs: [
  			{
  				name: 't_name',
  				placeholder: "Task Name"
  			},
  			{
  				name: 't_description',
  				placeholder: "Task Description"
  			},
  		],
  		buttons: [
  			{
  				text: "Cancel",
  				handler: data => {
  					console.log('cancel clicked')
  				}
  			},
  			{
  				text: "Submit",
  				handler: data => {
  					var newRef = this.tasks.push({
  						p_name: data.t_name,
              p_description: data.t_description,
  					})
  				}
  			}
  		]
  	});

  	prompt.present();
  }
}
