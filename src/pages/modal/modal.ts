import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { villageID } from '../tabs/tabs';

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
  taskDate: 1234567;
  taskCategory: String;
 
  constructor(public viewCtrl: ViewController, angFire: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
    this.angFireDB = angFire;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.tasks = this.angFireDB.database.list(villageID + '/tasks/');
  }

  closeModal() {
    let count = 0;
    for (let bool of this.taskChecks) {
      if ((bool) && (this.content[count] != 'n/a/')) {
        this.taskName = this.content[count];
        this.tasks.push({
          date: this.taskDate,
          name: this.taskName,
          category: this.taskCategory,
          taken: 0
        });
      }
    }
    this.tasks.push({
      date: this.taskDate,
      name: this.taskName,
      category: this.taskCategory,
      taken: 0
    })
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
