import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the LandingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-landing-page',
  templateUrl: 'landing-page.html'
})
export class LandingPagePage {

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPagePage');
  }

  changeMomPage(){
    this.nav.setRoot(TabsPage);
  }

  changeKidPage(){
    this.nav.setRoot(TabsPage);
  }

}
