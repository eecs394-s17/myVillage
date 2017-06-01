import { Component, ViewChild } from '@angular/core';

import { ModalController, NavController, AlertController, NavParams, Content } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import "rxjs/add/operator/map";

import { MenuController } from 'ionic-angular';
import { TabsPage, isMother} from '../tabs/tabs';
import { LandingPage } from '../landing/landing';
import { SchedulePage } from '../schedule/schedule';

import { AuthService } from '../../providers/auth-service';
import { GiftsPage } from '../gifts/gifts';
import { ServiceProvidersPage } from '../service-providers/service-providers';
import { UserData } from '../../providers/user-data';

import { LoginPage } from '../login/login';
import { ModalPage } from '../modal/modal';
import { villageID, usersName, userID } from '../tabs/tabs';

import * as moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) content: Content;
  tasks: FirebaseListObservable<any>;
  gifts: FirebaseListObservable<any>;
  angFireDB: any;
  showStyle: false;
  IsMother: any;
  IsVillager: any;
  currentUserName: any = usersName;
  currentUserID: string;
  gift: any;

  constructor(public modalCtrl: ModalController,
    private nav: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    angFire: AngularFire,
    private ionicAuth: Auth,
    public user: User,
    public userData: UserData,
    public menuCtrl: MenuController) {
    this.angFireDB = angFire;
    this.IsMother = isMother;
    this.currentUserID = userID;
  }

  ionViewWillEnter() {
    console.log("loaded");
    this.gift = "time";
  }

  ionViewDidLoad() {
    console.log("loaded");
    this.gift = "time";
    this.tasks = this.angFireDB.database.list(villageID + '/tasks/', {
      query: {
        orderByChild: 'datetime',
        startAt: 0,
        endAt: 9999999999999
      }
    });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  getStyle() {
    if(this.showStyle) {
      return "yellow";
      }
    else {
      return "";
    }
  }


  taskTapped(task):void {
    let prompt = this.alertCtrl.create({
      title: "Take Task",
      message: "Please enter any notes that would be helpful",
      inputs: [
        {
          name: 't_takenby',
          value: this.currentUserName
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
          handler: data =>
          /*{
            console.log('submit clicked')
            }*/
            {
            this.tasks.update(task.$key,{
		taken: 1,
		t_takenby: data.t_takenby,
		t_notes: data.t_notes,
		t_taken_id: this.currentUserID,
            })
	    }
        }]
    });


    prompt.present();
  }

  openPayments():void {
    window.open('http://myvillagegifts.com/#/dash', '_system', 'location=yes');
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
        {
          name: 't_category',
          placeholder: "Task Category"
        }
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
              t_name: data.t_name,
              t_description: data.t_description,
              t_category: data.t_category,
              t_taken: "false",
              t_takenby: '',
              t_notes: ''
            })
          }
        }
      ]
    });

    prompt.present();
  }

  openModal() {
    let myModal = this.modalCtrl.create(ModalPage);
    myModal.present();
  }

  returnDate(datetime) {

  }

  returnDateTime(datetime) {
    return moment(datetime).format('MMMM Do YYYY, h:mm a')
  }

  // timemoney(tm) {
  //   if (tm == "money") {
  //     this.nav.push(GiftsPage);
  //   }
  // }

  // navToSchedule(event) {
  //   console.log(event);
  //   switch (event){
  //     case "Schedule":
  //       this.nav.push(SchedulePage);
  //       break;
  //     case "Gifts":
  //       //this.nav.push(GiftsPage);
  //       break;
  //     case "Service":
  //       this.nav.push(ServiceProvidersPage);
  //       break;
  //
  //     case "Logout":
  //       //this.nav.setRoot(LoginPage);
  //       this.userData.logout();
  //       this.ionicAuth.logout();
  //       window.location.reload();
  //       break;
  //
  //     default:
  //       break;
  //   }
  // }
}
