import { Component, ViewChild } from '@angular/core';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { villageID } from '../tabs/tabs';
import { ServiceProvidersPage } from '../service-providers/service-providers';

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
  days = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thur', 5: 'Fri', 6: 'Sat'}
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
  	this.startDate = new Date();
    this.endDate = new Date();
    this.currDate = new Date().toISOString();

  }

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
    let num = this.startDate.getDay();
    this.currDay = num;

    this.endDate.setDate(this.startDate.getDate() + 1);
    this.currDate = this.startDate.toISOString();
        // this.tasks = this.angFireDB.database.list('/days/' + this.currDay + '/10/tasks');

    console.log(Number(this.startDate))
    console.log(Number(this.endDate))
    // this.tasks = this.angFireDB.database.list('/days/' + this.currDay + '/10/tasks');

    this.tasks = this.angFireDB.database.list(villageID + '/tasks/', {
      query: {
        orderByChild: 'date',
        startAt: Number(this.startDate),
        endAt: Number(this.endDate)
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
    this.endDate.setDate(this.startDate.getDate() + 1);
    this.currDate = this.startDate.toISOString();
  	this.currDay = this.startDate.getDay()
  	console.log(this.currDay);
  	this.daySched = this.angFireDB.database.list(villageID + '/days/' + this.currDay + '/');
  	console.log(villageID + '/days/' + this.currDay + '/');
  }

  prevDay(key) {
    this.endDate = this.startDate
    this.startDate.setDate(this.startDate.getDate() - 1);
    this.currDate = this.startDate.toISOString();
    this.currDay = this.startDate.getDay()
    // if (this.currDay == 0){
    //   this.currDay =  7 - this.currDay;
    // }
    // this.currDay = (this.currDay-1)%7;
  	//this.currDay = key;
    console.log(this.currDay);
    this.daySched = this.angFireDB.database.list(villageID + '/days/' + this.currDay + '/');
  	console.log(villageID + '/days/' + this.currDay + '/');
  }

  tellDate() {
    console.log(this.currDate);
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






