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
  projects: FirebaseListObservable<any>;
  angFireDB: any;

  constructor(private nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, angFire: AngularFire) {
    this.angFireDB = angFire;
    this.projects = angFire.database.list('/Projects', {
      query: {
        limitToLast: 40
      }
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
