import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoginPage } from "../login/login";
import { TabsPage } from "../tabs/tabs";
import { UserData } from '../../providers/user-data';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  details: UserDetails = {'email': '', 'password': ''};
  status: any;
    email: any;
    name: any;
    villageID: any;
    lastName: any;

    constructor(private nav: NavController, private ionicAuth: Auth, public user: User, public navParams: NavParams, public userData: UserData)
    {
	this.status = navParams.get("status");
	console.log(this.status);
    }

  public goBacktoLog() {
    this.nav.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this.ionicAuth.signup(this.details).then(() => {
      console.log(this.details.email + this.details.password);

	this.ionicAuth.login('basic', this.details).then(() => {
	    this.userData.logout() // if we're going to log in, make sure there isn't old data here
	    console.log("Login succesful (on registration page!)");
	    this.user.set("status", this.status);
            this.user.set("name", this.name);
	    this.user.set("lastName", this.lastName);
	    this.user.set("villageID", this.villageID);
	    this.user.save();
	    this.userData.login(this.details.email, this.name, this.status, this.villageID, this.lastName);
	}, error =>{
	   console.log("Login failed on registration page. This should not happen");
       });

	this.nav.setRoot(TabsPage, {
	    currentUsername: this.name + ' ' + this.lastName,
	    currentUserStatus: this.status,
	    villageID: this.villageID
	});
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        if (e === 'conflict_email') {
          alert('Email already exists.');
        } else {
          alert(e);
        }
      }
    });
  }

}
