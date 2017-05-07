import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the WishList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wish-list',
  templateUrl: 'wish-list.html'
})
export class WishListPage {
  wishList: FirebaseListObservable<any>;
  angFireDB: any;

  constructor(private nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, angFire: AngularFire) {
    this.angFireDB = angFire;
    this.wishList = angFire.database.list('/wishlist');
  }

  addToWishlist():void{
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
  					var newRef = this.wishList.push({
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
