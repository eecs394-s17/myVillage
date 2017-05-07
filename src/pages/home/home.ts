import { Component, ViewChild } from '@angular/core';

import { NavController, AlertController, NavParams, Content } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import "rxjs/add/operator/map";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;
  tasks: FirebaseListObservable<any>;
  angFireDB: any;

  constructor(private nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, angFire: AngularFire) {
    this.angFireDB = angFire;
    this.tasks = angFire.database.list('/tasks');
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
