import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapPage } from '../pages/map/map';
import { DbManipulatePage } from '../pages/dbmanipulate/dbmanipulate';
/*import { MenuPage } from '../pages/menu/menu';*/
import { FrontPage } from '../pages/front/front';
import { GpsPage } from '../pages/gps/gps';
import { UserdetailsPage } from '../pages/userdetails/userdetails';
import { DevDisplayRestPage } from '../pages/dev-display-rest/dev-display-rest';
import { LoginPage } from '../pages/login/login';
import { Firebase } from '@ionic-native/firebase';
import firebase from 'firebase';
import { FIREBASE_CREDENTIALS } from '../shared/credentials';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    firebase.initializeApp({
      apiKey: "AIzaSyBqB9en9SLmoOrUKKlhTvRTw6kyLAkJKBM",
    authDomain: "smartlab-digikuiskii.firebaseapp.com",
    databaseURL: "https://smartlab-digikuiskii.firebaseio.com",
    storageBucket: "smartlab-digikuiskii.appspot.com",
    messagingSenderId: "937628060376"
    });
    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Digikuiskii', icon: 'home', component: FrontPage},
      { title: 'Map', icon: 'map', component: MapPage },
        { title: 'Location', icon: 'compass', component: GpsPage},
       { title: 'Firebase', icon: 'cloud-upload', component: DbManipulatePage},
       { title: 'Login', icon: 'key', component: LoginPage},
       { title: 'User Details', icon: 'person', component: UserdetailsPage},
      {title: 'DevDisplayRest', icon: 'outlet', component: DevDisplayRestPage}   ];

       const unsubscribe = firebase.auth().onAuthStateChanged( user => {
        if (!user) {
          this.rootPage = LoginPage;
          unsubscribe();
        } else { 
          this.rootPage = FrontPage;
          unsubscribe();
        }
      });
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
