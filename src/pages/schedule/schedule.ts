import { Component, ViewChild } from '@angular/core';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { villageID } from '../tabs/tabs';
import { ServiceProvidersPage } from '../service-providers/service-providers';
import * as moment from 'moment';
import { ModalPage } from '../modal/modal';

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
  currDate: any;
  angFireDB: any;
  startDate: any;
  endDate: any;
  currDay: number;
  tasks: FirebaseListObservable<any>;
  test: FirebaseListObservable<any>;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  taken = 2;  // 2 == all, 0 == untaken, 1 == taken
  segment: any;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
      angFire: AngularFire,
      public nav: NavController
  ) {
  	this.angFireDB = angFire;
  	this.startDate = moment().startOf('day');
    this.currDate = this.startDate.format();
    this.currDay = this.startDate.day();
    this.endDate = this.startDate.clone().add(1, 'days');
  }

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateTasks();
  }

  ionViewDidEnter() {
    console.log("entered");
    this.segment = "alltasks";
  }

  updateSchedule() {
    console.log("sorry");
    this.startDate = moment(this.currDate);
    this.currDay = this.startDate.day();
    this.endDate = this.startDate.clone().add(1, 'days');
    console.log("start: " + this.startDate.valueOf() + "end: " + this.endDate.valueOf());
    this.updateTasks();
  }

  updateTasks() {
    this.tasks = this.angFireDB.database.list(villageID + '/tasks/', {
      query: {
        orderByChild: 'datetime',
        startAt: this.startDate.valueOf(),
        endAt: this.endDate.valueOf()
      }
    });
  }

  takenTaskAlert(task) {
    let alert = this.alertCtrl.create({
      title: (task.t_takenby + " left a note:"),
      subTitle: task.t_notes,
    });
    alert.present();
    console.log("This should be alerting you")
  }

  nextDay() {
    console.log("start: " + this.startDate.valueOf() + "end: " + this.endDate.valueOf());
    this.startDate = this.endDate;
    this.currDate = this.startDate.format();
    this.endDate = this.startDate.clone().add(1, 'days');
  	this.currDay = this.startDate.day();
  	console.log(villageID + '/days/' + this.currDay + '/');
    this.updateTasks();
  }

  prevDay() {
    console.log("start: " + this.startDate.valueOf() + "end: " + this.endDate.valueOf());
    console.log(this.startDate);
    this.startDate.subtract(1, 'days');
    this.endDate = this.startDate.clone().add(1, 'days');
    this.currDate = this.startDate.format();
    this.currDay = this.startDate.day();
    this.updateTasks();
  }

  changeDay(key) {
    this.startDate.day(key); // change date window based on day selected
    this.endDate = this.startDate.clone().add(1, 'days');
    this.currDate = this.startDate.format();
    this.currDay = this.startDate.day();
    this.updateTasks();
  }

  chooseDate() {
    this.startDate = moment(this.currDate);
    this.endDate = this.startDate.clone().add(1, 'days');
    this.updateTasks();
    console.log("choice: " + this.startDate);
  }

  taskTaken(num) {
    this.taken = num
  }

  openModal() {
    let myModal = this.modalCtrl.create(ModalPage);
    myModal.present();
  }



}
