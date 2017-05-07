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

  projects: FirebaseListObservable<any>;
	angFireDB: any;

  constructor(public alertCtrl: AlertController, public nav: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.projects = angFire.database.list('/Projects');
		this.angFireDB = angFire;
  }

  addProject():void{
  	let prompt = this.alertCtrl.create({
  		title: 'New Project',
  		message: 'Enter the project details in the form below',
  		inputs: [
  			{
  				name: 'p_name',
  				placeholder: "Project Name"
  			},
  			{
  				name: 'p_description',
  				placeholder: "Project Description"
  			},
        {
          name: 'lang_tools',
          placeholder: "Language and Tools"
        },
        {
          name: 'p_length',
          placeholder: "Expected Length"
        }
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
  					var newRef = this.projects.push({
  						p_name: data.p_name,
              p_description: data.p_description,
              lang_tools: data.lang_tools,
              p_length: data.p_length
  					})
  				}
  			}
  		]
  	});

  	prompt.present();
  }
}
