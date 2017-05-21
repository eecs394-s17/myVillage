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
  content: Array<string> = ['n/a', 'n/a']; // = ['Task1', 'Task2'];
  catHash = { 'p': ['physical task 1', 'physical task 2'], 'm': ['mental task 1', 'mental task 2'], 'n': ['nutrition task 1', 'nutrition task 2'] };
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
    console.log(this.taskDate);
    console.log(this.taskTime);
    this.taskDateTime = moment(this.taskDate + " " + this.taskTime);
    for (let bool of this.taskChecks) {
      if ((bool) && (this.content[0] != 'n/a/')) {
        this.taskName = this.content[0];
        this.tasks.push({
          category: this.taskCategory,
          datetime: this.taskDateTime.valueOf(),
          taken: 0
        });
      }
    }
    this.tasks.push({
      name: this.taskName,
      category: this.taskCategory,
      datetime: this.taskDateTime.valueOf(),
      taken: 0
    })
    console.log(moment.utc(this.taskDateTime.valueOf()).local());
    this.viewCtrl.dismiss();

  }

  getCategory(category) {
    this.taskCategory = category;
  	console.log(category);
  	this.content = this.catHash[category];
  }

  chooseTask(t) {
    console.log(t);
    this.taskName = this.content[t];
    this.taskChecks[t] = !this.taskChecks[t];
    console.log(this.taskChecks);
  }

}
