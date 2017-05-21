import { Component, ViewChild } from '@angular/core';
import { App, Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { SchedulePage } from '../pages/schedule/schedule';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { GiftsPage } from '../pages/gifts/gifts';
import { UserData } from '../providers/user-data';
import { ServiceProvidersPage } from '../pages/service-providers/service-providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LandingPage;
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
      { title: 'Register Page', component: RegisterPage}
    ];
    this.menuPages = [
      { title: 'New Mom Care Plan', component: HomePage },
      { title: 'Schedule', component: SchedulePage },
      { title: 'Service Providers', component: ServiceProvidersPage },
      { title: 'Gifts Page', component: GiftsPage },
      { title: 'Logout', component: LoginPage },

    ];  }

  initializeApp() {
    this.platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if (page == "Logout") {
      this.userData.logout();
      this.ionicAuth.logout();
      window.location.reload();
    }
    this.nav.setRoot(page.component);
  }

}
