import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { villageID } from '../tabs/tabs';
import * as moment from 'moment';


/*
  Generated class for the Modal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {
  content: Array<string>; // = ['Task1', 'Task2'];
  // Add in prepoulated tasks here
  catHash = { 'physical': ['Volunteer to babysit', 'Pick up item from store'],
              'mental': ['Schedule a friend date'],
              'nutritional': ['Cook a meal', 'Get groceries']};
  tasks: FirebaseListObservable<any>;
  angFireDB: any;
  taskChecks: Array<boolean> = [false, false];
  taskName: String;
  taskDate: any;
  taskTime: any;
  taskDateTime: any;
  taskCategory: String;

  constructor(public viewCtrl: ViewController, angFire: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
    this.angFireDB = angFire;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.tasks = this.angFireDB.database.list(villageID + '/tasks/');
  }

  closeModal() {
    this.taskDateTime = moment(this.taskDate + " " + this.taskTime);
    for (var i=0; i<this.content.length; i++) {
      if (this.taskChecks[i]) {
        this.tasks.push({
          name: this.taskName,
          category: this.taskCategory,
          datetime: this.taskDateTime.valueOf(),
          date: moment(this.taskDateTime).format('MMMM Do, YYYY'),
          time: moment(this.taskDateTime).format('h:mm a'),
          taken: 0

        });
      }
    }

    // console.log(moment.utc(this.taskDateTime.valueOf()).local());
    this.viewCtrl.dismiss();

  }

  getCategory(category) {
    this.taskCategory = category;
  	this.content = this.catHash[category];
  }

  chooseTask(t) {
    this.taskName = this.content[t];
    this.taskChecks[t] = !this.taskChecks[t];
  }

}
