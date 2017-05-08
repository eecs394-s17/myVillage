import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { WishListPage } from '../pages/wish-list/wish-list';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';


import { AngularFireModule } from 'angularfire2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CloudSettings, CloudModule, GoogleAuth, User } from '@ionic/cloud-angular';


export const firebaseConfig = {
    apiKey: "AIzaSyCxzKGE4nNpuYVPza48rY0hQ8fRFXgP9DA",
    authDomain: "myvillage-45883.firebaseapp.com",
    databaseURL: "https://myvillage-45883.firebaseio.com",
    projectId: "myvillage-45883",
    storageBucket: "myvillage-45883.appspot.com",
    messagingSenderId: "593820200176"
};


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'myvillage-167022'
  },
  'auth': {
    'google': {
      'webClientId': '58751299731-lobfatfq87g13ir1rdshalui86cecvnc.apps.googleusercontent.com',
      'scope': ['permission1', 'permission2']
    }
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    WishListPage,
    LandingPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    WishListPage,
    LandingPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
