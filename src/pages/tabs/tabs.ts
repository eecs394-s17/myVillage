import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;

  tasks: FirebaseListObservable<any>;
	angFireDB: any;

  constructor(public alertCtrl: AlertController, public nav: NavController, public navParams: NavParams, angFire: AngularFire) {
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
