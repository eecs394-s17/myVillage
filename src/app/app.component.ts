import { Component, ViewChild } from '@angular/core';
import { App, Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { UserData } from '../providers/user-data';

import { HomePage } from '../pages/home/home';
import { TabsPage, isMother } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { SchedulePage } from '../pages/schedule/schedule';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { GiftsPage } from '../pages/gifts/gifts';
import { ServiceProvidersPage } from '../pages/service-providers/service-providers';
import { AboutPage } from '../pages/about/about';
import { FAQsPage } from '../pages/faqs/faqs';
import { MomentsPage } from '../pages/moments/moments';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LandingPage;
  activePage: any;
  pages: Array<{title: string, component: any}>;
  menuPages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private ionicAuth: Auth,
    public user: User,
    public userData: UserData) {
    this.initializeApp();

    this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'Tabs Page', component: TabsPage },
      { title: 'Settings Page', component: SettingsPage },
      { title: 'Landing Page', component: LandingPage },
      { title: 'Schedule Page', component: SchedulePage },
      { title: 'Login Page', component: LoginPage },
      { title: 'Register Page', component: RegisterPage},
      { title: 'About Page', component: AboutPage},
      { title: 'FAQs Page', component: FAQsPage},
      { title: 'Moments Page', component: MomentsPage }
    ];
     // isMother is undefined when imported
     // console.log("Is this person a mother?");
     // console.log(isMother);
      //if (isMother) {
        this.menuPages = [
        { title: 'Service Providers', component: ServiceProvidersPage },
        { title: 'Moments', component: MomentsPage },
        { title: 'FAQs', component: FAQsPage},
        { title: 'About', component: AboutPage},
        { title: 'Logout', component: LoginPage },
          ];
      /*} else {
        this.menuPages = [
        { title: 'Home', component: HomePage},
        { title: 'Schedule', component: SchedulePage },
        { title: 'Service Providers', component: ServiceProvidersPage },
        { title: 'Moments', component: MomentsPage },
        { title: 'FAQs', component: FAQsPage},
        { title: 'About', component: AboutPage},
        { title: 'Logout', component: LoginPage },
          ];
      }*/

    this.activePage = this.menuPages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.menu.close();
    // navigate to the new page if it is not the current page
    if (page.title == "Logout") {
      console.log("Menu if-statement is actually doing something");
      this.userData.logout();
      this.ionicAuth.logout();
      // window.location.reload();
      this.nav.setRoot(LandingPage); // Please refer to GitIssue #4 before changing this to LoginPage
    }
    else if (!isMother && page == HomePage) {
      console.log('should be resetting tabs')
      this.nav.setRoot(TabsPage);
    }
    else if (isMother && page == SchedulePage) {
      console.log('should be resetting tabs')
      this.nav.setRoot(TabsPage);
    }
    else if (page != this.activePage) {
      this.nav.push(page.component);
      this.activePage = page;
    }
  }

  checkActive(page) {
    return (page == this.activePage);
  }
}
