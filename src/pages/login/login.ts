
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

import { UserData } from '../../providers/user-data';

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

    constructor(private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private ionicAuth: Auth, public user: User, angFire: AngularFire, public userData: UserData, public navParams: NavParams)
    {
	this.userStatus = navParams.get("status");
	console.log(this.userStatus);
	this.userData.logout() // if we're going to log in, make sure there isn't old data here 
    }
    
  loading: Loading;
  details: UserDetails = {email: '', password: ''};
  userStatus: any;
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   public login() {
       this.showLoading()
       this.ionicAuth.login('basic', this.details).then(() => {
	   this.userData.logout() // if we're going to log in, make sure there isn't old data here 
	   console.log("Login succesful");
	   setTimeout(() => {
               this.loading.dismiss();
           });
	   if(this.ionicAuth.isAuthenticated()){
	       console.log("This user is authenticated!");
	       console.log(this.user);
	   }
	   else {
	       console.log("This user is NOT authenticated");
	   }
	   let curUsername = this.user.get('name', 'Anonymous');
	   let curLastName = this.user.get('lastName', 'Villager');
	   let curUserstat = this.user.get('status', 'V');
	   let curVillageID = this.user.get('villageID', 'No village ID');
	   this.userData.login(this.details.email, curUsername, curUserstat, curVillageID, curLastName);
	   this.nav.setRoot(TabsPage, {
	       currentUsername: curUsername + ' ' + curLastName,
	       currentUserStatus: curUserstat,
	       villageID: curVillageID
	   });

      }, error => {
	  setTimeout(() => {
              this.loading.dismiss();
          });
	  this.showError("Username/Password is incorrect");
      });
   }

   showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    //setTimeout(() => {
    //  this.loading.dismiss();
    //});

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['Try Again']
    });
    alert.present(prompt);
  }

  public createAccount() {
      //this.nav.push(RegisterPage);
      //this.nav.setRoot(RegisterPage);
      this.nav.setRoot(RegisterPage, {
	  status: this.userStatus
      });
  }

   public logout() {
    //this.nav.setRoot(LoginPage);
     this.userData.logout() 
    this.ionicAuth.logout();
    window.location.reload();
  }
}
