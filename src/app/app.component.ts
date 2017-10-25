import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
/*import { MenuPage } from '../pages/menu/menu';*/
import { ContactPage } from '../pages/contact/contact';
import { GpsPage } from '../pages/gps/gps';
import { Firebase } from '@ionic-native/firebase';
import firebase from 'firebase';
import { FIREBASE_CREDENTIALS } from '../shared/credentials';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ContactPage;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    firebase.initializeApp({ FIREBASE_CREDENTIALS });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Digikuiskii', icon: 'home', component: ContactPage},
      { title: 'Map', icon: 'map', component: HomePage },
        { title: 'Location', icon: 'compass', component: GpsPage},
       { title: 'Firebase', icon: 'star', component: AboutPage}    ];

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
