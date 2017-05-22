import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { LoginPage } from "../login/login";
import { TabsPage } from "../tabs/tabs";
import { UserData } from '../../providers/user-data';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {
  details: UserDetails = {'email': '', 'password': ''};
  status: any;
    email: any;
    name: any;
    villageID: any;
    newVillageP: boolean  = false;
    newKeyVal: any; 

    
    constructor(private nav: NavController, private ionicAuth: Auth, public user: User, public navParams: NavParams, public userData: UserData, public angFireDB: AngularFire)
    {
	this.status = navParams.get("status");
	console.log(this.status);

	let villageSymbols = this.angFireDB.database.list('/villageSymbolMap/');
	console.log(villageSymbols);
	villageSymbols.forEach(newKey => {
	    console.log('GETTING THE KEYS...');
	    console.log(newKey);
	    console.log(newKey.length);
	    for (var i = 0; i < newKey.length; i++) {
		console.log(newKey[i]);
		if (newKey[i].$key === "newKey"){
		    console.log("New Key Val:");
		    console.log(newKey[i].$value);
		    this.newKeyVal = newKey[i].$value;
		}
	    }
	}); 
    }

  public goBacktoLog() {
    this.nav.setRoot(LoginPage);
  }

    
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this.ionicAuth.signup(this.details).then(() => {
      console.log(this.details.email + this.details.password);

	this.ionicAuth.login('basic', this.details).then(() => {
	    this.userData.logout() // if we're going to log in, make sure there isn't old data here
	    console.log("Login succesful (on registration page!)");
	    this.user.set("status", this.status);
            this.user.set("name", this.name);
	    
	    if (this.newVillageP) {
		console.log("You should create a new villageID here!");

		console.log(this.newKeyVal);
		if (this.newKeyVal){
		    this.angFireDB.database.list('/').update('villageSymbolMap', {'newKey': this.newKeyVal + 1});
		}

		// make new village subarea and put stuff there
		let newVillage = this.angFireDB.database.list('/villages/');
		//console.log(newVillage.$key);
		var  newVillagePush = newVillage.push({ tasks: {date: 1, name: "Test", taken: "1"}});
		console.log("THIS SHOULD SHOW UP");
		console.log("ID of new pushed thing");
		console.log(newVillagePush.key);
	    
		this.user.set("villageID", newVillagePush.key);

		// this id would be added to the symbol table
		var newSymbolTable = this.angFireDB.database.list('/villageSymbolMap/' + this.newKeyVal);
		newSymbolTable.push(newVillagePush.key);
	    } else{
		if (this.villageID == "village") {
		    this.user.set("villageID", this.villageID);
		} else {
		    console.log("Checking symbol table...from symbol table...");
		    let relevantVillageSymbol = this.angFireDB.database.list('/villageSymbolMap/' + this.villageID);
		    console.log(relevantVillageSymbol);
		    relevantVillageSymbol.forEach(vals => {
			console.log('here come the vals...');
			console.log(vals);
			console.log(vals.length);
			for (var i = 0; i < vals.length; i++) {
			    console.log(vals[i]);
			    console.log("Corresponding villageID...");
			    console.log(vals[i].$value);
			    this.user.set("villageID", '/villages/' + vals[i].$value);
			}
		    });
		}
	    }
	    this.user.save();
	    this.userData.login(this.details.email, this.name, this.status, this.villageID);
	}, error =>{
	   console.log("Login failed on registration page. This should not happen");
       });

	this.nav.setRoot(TabsPage, {
	    currentUsername: this.name,
	    currentUserStatus: this.status,
	    villageID: this.villageID
	});
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        if (e === 'conflict_email') {
          alert('Email already exists.');
        } else {
          alert(e);
        }
      }
    });
  }

}
