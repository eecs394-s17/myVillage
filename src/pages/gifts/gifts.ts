import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Gifts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gifts',
  templateUrl: 'gifts.html'
})
export class GiftsPage {
	segment: any;

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  	this.segment = "money";
    console.log('ionViewDidLoad GiftsPage');
  }

  timemoney(tm) {
  	if (tm == "time") {
  		this.nav.pop();
  	}
  }

}
