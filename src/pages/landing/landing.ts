import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { UserData } from '../../providers/user-data';

/*
  Generated class for the LandingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

    constructor(public nav: NavController, public navParams: NavParams, public userData: UserData) {
	console.log("Landing page is live");
	console.log(this.userData.hasLoggedIn());
	this.userData.hasLoggedIn().then((val) => {
	    if (val){
		this.userData.getName().then((getName) => {
		    console.log(userData.getUsername());
		});
		// this is where I load the relevant data and redirect to the home page
		// TODO: finish this
		this.userData.getName().then((curUserName) => {
		    this.userData.getStatus().then((curUserStatus) => {
			this.userData.getVillageID().then((curVillageID) => {
			    this.nav.setRoot(TabsPage, {
				currentUsername: curUserName,
				currentUserStatus: curUserStatus,
				villageID: curVillageID
			    });
			});
		    });
		});
	    }
	});
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  changeMomPage(){
      //this.nav.setRoot(LoginPage);
      this.nav.setRoot(LoginPage, {
	  status: "M"
      });
  }
      		       
  changeKidPage(){
      //this.nav.setRoot(LoginPage);
      this.nav.setRoot(LoginPage, {
	  status: "V"
      });
  }

}
