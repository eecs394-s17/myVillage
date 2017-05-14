import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

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

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  changeMomPage(){
    this.nav.setRoot(LoginPage);
  }

  changeKidPage(){
    this.nav.setRoot(LoginPage);
  }

}
