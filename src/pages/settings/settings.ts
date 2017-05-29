import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { UserData } from '../../providers/user-data';
import { villageIDsymbol, userID, villageID } from '../tabs/tabs';
/*
  Generated class for the WishList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
    wishList: FirebaseListObservable<any>;
    angFireDB: any;
    username: string;
    villageSymbol: string;
    takenTasks: any;
    
  constructor(private nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, angFire: AngularFire, public userData: UserData) {
    this.angFireDB = angFire;
    this.wishList = angFire.database.list('/wishlist');
      this.villageSymbol = villageIDsymbol;
      //console.log("Relevant settings page values...");
      //console.log(villageID);
      //console.log(userID);
      //this.takenTasks = this.angFireDB.database.list('/users/' + userID);
      this.takenTasks = this.angFireDB.database.list(villageID + '/tasks/', {
	query: {
	    orderByChild: 't_taken_id',
	    equalTo: userID
	}
      });
  }

  ionViewDidLoad() {
    this.getUsername();
    console.log('ionViewDidLoad settings');
  }

  wishTapped(wish):void {
    let prompt = this.alertCtrl.create({
      title: "Get this Item",
      message: "Please enter your name and any notes that would be helpful",
      inputs: [
        {
          name: 'wl_takenby',
          placeholder: 'Name'
        },
        {
          name: 'wl_notes',
          placeholder: 'Notes'
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
            this.wishList.update(wish.$key,{
            wl_taken: "true",
            wl_takenby: data.wl_takenby,
            wl_notes: data.wl_notes
            })
          }
        }]
    });

    prompt.present();
  }

  addToWishlist():void{
    let prompt = this.alertCtrl.create({
      title: 'New Wish List Item',
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
            var newRef = this.wishList.push({
              wl_name: data.t_name,
              wl_description: data.t_description,
              wl_taken: false,
              wl_takenby: '',
              wl_notes: ''
            })
          }
        }
      ]
    });

    prompt.present();
  }

  sayMyName() {
    console.log(this.username);
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      console.log(this.username);
      this.username = username;
    });
  }

}
