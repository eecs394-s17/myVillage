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
  catHash = { 'physical': ['Volunteer to Babysit', 'Pickup item from store'],
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
    console.log("time is: " + this.taskTime);
    this.taskDateTime = moment(this.taskDate + " " + this.taskTime);
    console.log("Content 0 = " + this.content[0]);
    console.log("Content 1 = " + this.content[1]);
    console.log(this.content.length);
    for (var i=0; i<this.content.length; i++) {
      console.log("i=" + i);
      console.log("Content " + i + "= " + this.content[i]);
      console.log("Task Name: " + this.taskName); // for some reason taskName isn't getting saved
      console.log("Category: " + this.taskCategory);
      console.log("DateTime: " + this.taskDateTime);
      console.log(this.taskChecks);
      if (this.taskChecks[i]) {
        console.log("hi this is taskchecks" + i);
        console.log("Content " + i + "= " + this.content[i]);
        this.tasks.push({
          name: this.taskName,
          category: this.taskCategory,
          datetime: this.taskDateTime.valueOf(),
          taken: 0,
          clockTime: this.taskTime
        });
        console.log("This is being pushed");
      }
    }

    // console.log(moment.utc(this.taskDateTime.valueOf()).local());
    this.viewCtrl.dismiss();

  }

  getCategory(category) {
    this.taskCategory = category;
  	console.log(category);
  	this.content = this.catHash[category];
  }

  chooseTask(t) {
    console.log("task = " + t);
    this.taskName = this.content[t];
    this.taskChecks[t] = !this.taskChecks[t];
    console.log(this.taskChecks);
  }

}
