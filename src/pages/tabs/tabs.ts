import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { SettingsPage } from '../settings/settings'
import { SchedulePage } from '../schedule/schedule'
import { ServiceProvidersPage } from '../service-providers/service-providers';
import { UserData } from '../../providers/user-data';
import { GiftsPage } from '../gifts/gifts';
import { LoginPage } from '../login/login';
import { ModalPage } from '../modal/modal';
import { LandingPage } from '../landing/landing';
import { AuthService } from '../../providers/auth-service';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

export var isMother: boolean = false;
export var isVillager: boolean = false;
export var villageID: any;
export var villageIDsymbol: string;
export var usersName: string;
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any;
  tab2Root = SettingsPage

    tasks: FirebaseListObservable<any>;
    angFireDB: any;
    Username: any;
    UserStatus: any;
    
    constructor(public alertCtrl: AlertController, public nav: NavController, public navParams: NavParams, angFire: AngularFire, public userData: UserData, private ionicAuth: Auth)  {
      this.UserStatus = navParams.get("currentUserStatus");
      console.log(this.UserStatus);
      usersName = navParams.get("currentUsername");
      console.log(usersName);
      villageIDsymbol = navParams.get("villageIDsymbol");
      console.log(villageIDsymbol);
      isMother = (this.UserStatus == 'M');
      if (isMother){
	  this.tab1Root = HomePage//SchedulePage;
      }else{
	  this.tab1Root = HomePage;
      }
      console.log(isMother);
	isVillager = (this.UserStatus == 'V');
	console.log("VillageID for tabs page...");	
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

  navToSchedule(event) {
    console.log(event);
    switch (event){
      case "Schedule":
        this.nav.push(SchedulePage);
        break;
      case "Gifts":
        //this.nav.push(GiftsPage);
        break;
      case "Service":
        this.nav.push(ServiceProvidersPage);
        break;

      case "Logout":
        //this.nav.setRoot(LoginPage)k
        this.userData.logout();
        this.ionicAuth.logout();
	window.location.reload();
        break;

      default:
        break;
    }
  }
  
}





