import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

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
 
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getCategory(category) {
  	console.log(category);
  	this.content = this.catHash[category];
  }

}
