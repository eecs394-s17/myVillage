import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { RegisterPage } from '../register/register';

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

    constructor(private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private ionicAuth: Auth, public user: User, angFire: AngularFire)
    {}
    
  loading: Loading;
  details: UserDetails = {email: '', password: ''};

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   public login() {
       this.showLoading()
       this.ionicAuth.login('basic', this.details).then(() => {
	   console.log("Login succesful");
	   setTimeout(() => {
               this.loading.dismiss();
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
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  public createAccount() {
     //this.nav.push(RegisterPage);
     this.nav.setRoot(RegisterPage);
  }
    
}
