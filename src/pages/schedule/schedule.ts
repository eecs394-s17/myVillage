import { Component, ViewChild } from '@angular/core';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { villageID } from '../tabs/tabs';
import { ServiceProvidersPage } from '../service-providers/service-providers';
import * as moment from 'moment';

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
  currDate: any;
  angFireDB: any;
  startDate: any;
  endDate: any;
  currDay: number;
  tasks: FirebaseListObservable<any>;
  test: FirebaseListObservable<any>;
  months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  taken = 2;  // 2 == all, 0 == untaken, 1 == taken

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
  	this.startDate = moment();
    this.currDate = moment().toISOString();
    this.currDay = moment().day();
    this.endDate = moment().add(1, 'days');

  }

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();

    console.log('Start date is: ' + this.startDate);
    console.log('End date is: ', this.endDate)
    console.log('Current day is: ' + this.currDay);

    // this.tasks = this.angFireDB.database.list('/days/' + this.currDay + '/10/tasks');
    this.updateTasks();

  }

  updateTasks() {
    this.tasks = this.angFireDB.database.list(villageID + '/tasks/', {
      query: {
        orderByChild: 'date',
        startAt: this.startDate.valueOf(),
        endAt: this.endDate.valueOf()
      }
    });
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
    this.startDate = this.endDate;
    console.log(this.startDate);
    this.currDate = this.startDate.toISOString();
    this.endDate = this.startDate.clone().add(1, 'days');
  	this.currDay = this.startDate.day();
  	console.log(this.currDay);
  	this.daySched = this.angFireDB.database.list(villageID + '/days/' + this.currDay + '/');
  	console.log(villageID + '/days/' + this.currDay + '/');
    this.updateTasks();
  }

  prevDay() {
    console.log(this.startDate);
    this.endDate = this.startDate;
    this.startDate.subtract(1, 'days');
    this.currDate = this.startDate.toISOString();
    this.currDay = this.startDate.day();
    this.daySched = this.angFireDB.database.list(villageID + '/days/' + this.currDay + '/');
    this.updateTasks();
  }

  changeDay(key) {
    console.log('This is logging');
    console.log('key' + key);
    this.startDate.day(key);
    this.endDate = this.startDate.clone().add(1, 'days');
    this.currDate = this.startDate.toISOString();
    this.currDay = this.startDate.day();
    console.log('currDay: ' + this.currDay);
    console.log('nextDay: ' + this.endDate.day());
    console.log('new currDay: ' + this.currDay);
    this.daySched = this.angFireDB.database.list(villageID + '/days/' + this.currDay + '/');
    console.log(this.daySched);
    this.updateTasks();
  }

  taskTapped(task):void {
    let prompt = this.alertCtrl.create({
      title: "Take Task",
      message: "Please enter your name and any notes that would be helpful",
      inputs: [
        {
          name: 't_takenby',
          placeholder: 'Name'
        },
        {
          name: 't_notes',
          placeholder: 'Notes'
        },
        ],
        buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log('cancel clicked')
          }
        },
        {
          text: "Submit",
          handler: data => {
            this.tasks.update(task.$key,{
            t_taken: "true",
            t_takenby: data.t_takenby,
            t_notes: data.t_notes
            })
          }
        }]
    });

    prompt.present();
  }

  taskTaken(num) {
    this.taken = num
    console.log(this.taken);
  }

}
