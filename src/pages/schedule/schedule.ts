import { Component, ViewChild } from '@angular/core';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
/*
  Generated class for the Schedule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  daySched: FirebaseListObservable<any>;
  angFireDB: any;
  date: any;
  currDay: number; 
  days = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 0: 'Sunday', '-1': 'Saturday', '-2': 'Friday', '-3': 'Thursday', '-4': 'Wednesday', '-5': 'Tuesday', '-6': 'Monday' }

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    angFire: AngularFire
  ) {
  	this.angFireDB = angFire;
  	this.date = new Date()
  }

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
    let num = this.date.getDay();
    this.currDay = num;
    this.daySched = this.angFireDB.database.list('/days/' + this.currDay + '/');
    console.log(this.days[this.date.getDay()]);
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    console.log('loaded schedule page');
    console.log(this.currDay);
  }
  
  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data
    // this.navCtrl.push(SessionDetailPage, {
    //   name: sessionData.name,
    //   session: sessionData
    // });
    console.log('GoTo button');
  }

  nextDay() {
  	this.currDay = (this.currDay+1)%7;
  	console.log(this.currDay);
  	this.daySched = this.angFireDB.database.list('/days/' + this.currDay + '/');
  	console.log('/days/' + this.currDay + '/');
  }

  prevDay() {
  	this.currDay = (this.currDay-1)%7;
  	console.log(this.currDay);
  }

}
