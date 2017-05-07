import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the WishList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wish-list',
  templateUrl: 'wish-list.html'
})
export class WishListPage {
  wishList: FirebaseListObservable<any>;
  angFireDB: any;

  constructor(private nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, angFire: AngularFire) {
    this.angFireDB = angFire;
    this.wishList = angFire.database.list('/wishlist');
  }
}
