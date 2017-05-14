import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";

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
  details: UserDetails = {'email': '', 'password': '', 'name': '', 'username': ''};
  lastname: any;
  firstname: any;
  email: any;
    
  constructor(private nav: NavController, private ionicAuth: Auth, public user: User)
  { } 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this.ionicAuth.signup(this.details).then(() => {
      console.log(this.details.email + this.details.password);
	
	this.ionicAuth.login('basic', this.details).then(() => {
	   console.log("Login succesful (on registration page!)");
	   this.user.set("name", this.firstname + " " + this.lastname);
	    this.user.save();
       }, error =>{
	   console.log("Login failed on registration page. This should not happen");
       });
      this.nav.setRoot(HomePage);
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
