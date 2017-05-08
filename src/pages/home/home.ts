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

  addTask():void{
    let prompt = this.alertCtrl.create({
      title: 'New Task',
      message: 'Enter the task details in the form below',
      inputs: [
        {
          name: 't_name',
          placeholder: "Task Name"
        },
        {
          name: 't_description',
          placeholder: "Task Description"
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
            var newRef = this.tasks.push({
              p_name: data.t_name,
              p_description: data.t_description,
            })
          }
        }
      ]
    });

    prompt.present();
  }
}
