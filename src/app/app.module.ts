import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { LandingPage } from '../pages/landing/landing';
import { SchedulePage } from '../pages/schedule/schedule';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { GiftsPage } from '../pages/gifts/gifts';
import { ServiceProvidersPage } from '../pages/service-providers/service-providers';


import { AngularFireModule } from 'angularfire2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { Storage } from '@ionic/storage';

import { UserData } from '../providers/user-data';

const cloudSettings: CloudSettings = {
 'core': {
   'app_id': '4ccd7258'
 }
};

export const firebaseConfig = {
    apiKey: "AIzaSyCxzKGE4nNpuYVPza48rY0hQ8fRFXgP9DA",
    authDomain: "myvillage-45883.firebaseapp.com",
    databaseURL: "https://myvillage-45883.firebaseio.com",
    projectId: "myvillage-45883",
    storageBucket: "myvillage-45883.appspot.com",
    messagingSenderId: "593820200176"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    SettingsPage,
    LandingPage,
    SchedulePage,
    LoginPage,
    RegisterPage,
    GiftsPage,
    ServiceProvidersPage
  ],
  imports: [
      IonicModule.forRoot(MyApp),
      CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SettingsPage,
    LandingPage,
    SchedulePage,
    LoginPage,
    RegisterPage,
    GiftsPage,
    ServiceProvidersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserData,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
