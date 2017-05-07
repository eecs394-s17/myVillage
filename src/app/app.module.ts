import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { WishListPage } from '../pages/wish-list/wish-list';
import { LandingPagePage } from '../pages/landing-page/landing-page';

import { AngularFireModule } from 'angularfire2';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    WishListPage,
    LandingPagePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    WishListPage,
    LandingPagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
