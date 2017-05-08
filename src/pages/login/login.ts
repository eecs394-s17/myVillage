import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleAuth, User } from '@ionic/cloud-angular';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: any;
  username: any;
  localGoogleAuth: any;
  localUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public googleAuth: GoogleAuth, public user: User) {
      this.localGoogleAuth = googleAuth;
      this.localUser = user;
  }

  login(){
    this.localGoogleAuth.login().then((response) => console.log(response) );
    console.log(this.localUser);
  }

  logout(){
    this.localGoogleAuth.logout().then(() => console.log("You logged out")) ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
