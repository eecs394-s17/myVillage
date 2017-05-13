import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { AuthService} from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


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

    constructor(private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private ionicAuth: AuthService, public user: User, angFire: AngularFire)
  {
  }


   details: UserDetails = {email: '', password: ''};

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 public login() {
  console.log("Starting login...");
 }
}
