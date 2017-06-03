import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {

    HAS_LOGGED_IN = 'hasloggedin';
    NAME_OF_USER = 'usersName';
    STATUS_OF_USER = 'usersStatus';

  constructor(public http: Http, public storage: Storage, public events: Events) {

  }

    login(username: string, usersName: string, usersStat: string, villageID: string, usersLastName: string, villageIDsymbol: string, userID: string): void {
	this.storage.set(this.HAS_LOGGED_IN, true);
	this.setUsername(username);
	this.storage.set(this.NAME_OF_USER, usersName);
	this.storage.set(this.STATUS_OF_USER, usersStat);
	this.storage.set('USERS_LAST_NAME', usersLastName);
	this.storage.set('VILLAGE_ID_SYMBOL', villageIDsymbol);
	this.storage.set('USER_ID', userID);
	this.events.publish('user:login');
	this.storage.set('villageID', villageID);
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout(): void {
      this.storage.remove(this.HAS_LOGGED_IN);
      this.storage.remove('username');
      this.storage.remove(this.NAME_OF_USER);
      this.storage.remove(this.STATUS_OF_USER);
      this.storage.remove('villageID');
      this.storage.remove('USERS_LAST_NAME');
      this.storage.remove('USER_ID');
      this.storage.remove('VILLAGE_ID_SYMBOL');
      this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  getName(): Promise<string> {
    return this.storage.get(this.NAME_OF_USER).then((value) => {
      return value;
    });
  };

  getLastName(): Promise<string> {
			return this.storage.get('USERS_LAST_NAME').then((value) => {
					return value;
			});
  };

  getStatus(): Promise<string> {
    return this.storage.get(this.STATUS_OF_USER).then((value) => {
      return value;
    });
  };

  getVillageID(): Promise<string> {
    return this.storage.get('villageID').then((value) => {
      return value;
    });
  };

    getVillageIDsymbol(): Promise<string> {
    return this.storage.get('VILLAGE_ID_SYMBOL').then((value) => {
      return value;
    });
  };

    getUserID(): Promise<string> {
	return this.storage.get('USER_ID').then((value) => {
	    return value;
	});
    };


    hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
	     return value === true;
    });
  };

}
