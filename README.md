# Digikuiskii

Mobiiliapplikaatio Digikuiskii-projektia varten.



## Applikaatio sivuittain

##### Digikuiskii (aloitussivu)

Etusivu, jolla ei ole toiminnallisuutta.



![Etusivu](readme_files/etusivu.png)





##### Päävalikko

Päävalikko, jolla navigoidaan sivujen välillä.



![kaikki-sivut](readme_files/kaikki-sivut.png)



##### Map (sijainti kartalla)

Näyttää kartan sekä käyttäjän sijainnin sillä.



![location](readme_files/location.png)



##### Location (devaamiseen)

Sivu, jota voi käyttää devaamiseen. Tällä hetkellä näyttää käyttäjän sijainnin koordinaatit, osoitteen sekä osoitehistorian ('Addresses').



![gps](readme_files/gps.png)



##### Firebase (tietokannan manipulointi devaamisessa)

Sivu, jota voi käyttää Firebasen tietokannan muokkaamiseen devaamisvaiheessa.



![firebase-manipulation](readme_files/firebase-manipulation.png)



##### Login (rekisteröinti, kirjautuminen, salasanan resetointi)

Sivu, jolla uusi käyttäjä rekisteröityy Firebasen Autentikointiin ('create a new account'). Rekisteröitymisen jälkeen käyttäjä kirjautuu sisään ('Email', 'Password', 'login'). Jos salasana on päässyt unohtumaan, 'i forgot my password' resetoi salasanan sähköpostin avulla.



![login](readme_files/login.png)



##### User Details (käyttäjän tiedot)

Käyttäjän preferenssit, kiinnostuksen kohteet, kotikunta. Tätä on tarkoitus laajentaa.



![user-details](readme_files/user-details.png)



##### Työpaikat (kysyy ensin järjestysperustetta)

Alert kysyy datan järjestämisperustetta, esim. 'Etäisyys'.



![tyopaikat-alert](readme_files/tyopaikat-alert.png)



##### Työpaikat (järjestettynä alert-valinnan mukaan)

Sivu näyttää REST-dataa eri apien kautta noudettuna. Dataa voi järjestää edellisen kohdan Alertin avulla. Tässä data on Vantaan avoimia työpaikkoja, järjestettynä käyttäjän etäisyyden perusteella ('Distance').



![tyopaikat-sorted](readme_files/tyopaikat-sorted.png)





## Firebase

Firebase on Googlen Back End -pilvipalvelu. Digikuiskiissa on käytetty kahta sen ominaisuutta: autentikointia ja tietokantaa.

Alla näkymä autentikoinnista. Luotuna on yksi käyttäjä, hans.hokka@gmail.com.  'Login'-sivu on suoraan tähän yhteydessä.



![firebase-auth](readme_files/firebase-auth.png)



Seuraavana näkymä tietokannasta. Tietokannan nimi on 'smartlab-digikuiskii'. Sen alla '7V...' -sarja on käyttäjän id. Tässä on luotu yksi käyttäjä. 'address' sisältää käyttäjän tämänhetkisen sijainnin tekstinä. 'userDetailedInfo' sisältää käyttöliittymän sivun 'User Details' tiedot, tässä on esimerkiksi valittu kotikunnaksi 'Kauniainen'.

Tietokanta on NoSql-tyyppiä. *Käytännössä sitä voi pitää JSON-objektina.*



![firebase-database](readme_files/firebase-database.png)



Osoite Firebasen konsoliin: https://console.firebase.google.com/project/smartlab-digikuiskii/overview

Osoitteeseen smartlabvantaa@gmail.com on lähetetty kutsu, jolla pääsee digikuiskiin owneriksi Firebaseen.



## Devausympäristön rakentaminen

A) Asenna **Java JDK**, **Apache Ant** ja **Android SDK**.

*NOTE: Whenever you make changes to the PATH, or any other environment variable, you'll need to restart or open a new tab in your shell program for the PATH change to take effect.*

**Java JDK**

Install the most recent [Java 8 JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (NOT just the JRE), JDK 9 is NOT currently (2017.12) supported by Cordova.

Next, create an environment variable for `JAVA_HOME` pointing to the root folder where the Java JDK was installed. So, if you installed the JDK into `C:\Program Files\Java\jdk7`, set `JAVA_HOME` to be this path. After that, add the JDK's `bin` directory to the PATH variable as well. Following the previous assumption, this should be either `%JAVA_HOME%\bin` or the full path `C:\Program Files\Java\jdk7\bin`

**Apache Ant**

To install Ant, download a zip from [here](http://ant.apache.org/bindownload.cgi), extract it, move the first folder in the zip to a safe place, and update your PATH to include the `bin` folder in that folder. For example, if you moved the Ant folder to `c:/`, you'd want to add this to your PATH: `C:\apache-ant-1.9.2\bin`.

**Android SDK**

Installing the [Android SDK](http://developer.android.com/sdk/index.html) is also necessary. The Android SDK provides you the API libraries and developer tools necessary to build, test, and debug apps for Android.

Cordova requires the ANDROID_HOME environment variable to be set. This should point to the `[ANDROID_SDK_DIR]\android-sdk` directory (for example `c:\android\android-sdk`).

Next, update your PATH to include the `tools/` and `platform-tools/` folder in that folder. So, using ANDROID_HOME, you would add both `%ANDROID_HOME%\tools` and `%ANDROID_HOME%\platform-tools`



B) Asenna loput tarvittavat:
1. [Git for Windows](http://git-scm.com/download/win)
2. [Node.js](http://nodejs.org/)
3. Apache Cordova
```
npm install -g cordova
```
4. [Visual Studio Code](https://code.visualstudio.com/)

5. Ionic

```
npm install -g ionic
```
```
ionic cordova platform add android
```
D) Testaa asennus
```
ionic cordova build android
ionic cordova emulate android
```

E) Kloonaa repo https://github.com/City-of-Vantaa-SmartLab/digikuiskii.git

F) Käynnistä IonicLab:

```
ionic serve -l
```

G) Asenna / emuloi uusin build: [android-debug.apk](readme_files/android-debug.apk)

## Koodi



![tree-app](/readme_files/tree-app.png)



##### app.components.ts

Import-blokkiin lisätään uudet sivut, esim. 'UserdetailsPage'.

```typescript
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

```
Seuraavaa blokkia ei tarvitse muuttaa tai ylipäätään huomioida:

```typescript
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
```

Tähän arrayhin lisätään uudet sivut, esim. User Details:
```typescript
    this.pages = [
      { title: 'Digikuiskii', icon: 'home', component: FrontPage},
      { title: 'Map', icon: 'map', component: MapPage },
      { title: 'Location', icon: 'compass', component: GpsPage},
      { title: 'Firebase', icon: 'cloud-upload', component: DbManipulatePage},
      { title: 'Login', icon: 'key', component: LoginPage},
      { title: 'User Details', icon: 'person', component: UserdetailsPage},
      { title: 'Työpaikat', icon: 'logo-euro', component: DevDisplayRestPage}   ];


```
Loput voi jättää huomiotta
```typescript
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
```



##### app.module.ts

Oleelliset osat:
```typescript
import { UserdetailsPage } from '../pages/userdetails/userdetails';
```

```typescript

@NgModule({
  declarations: [
    MyApp,
    MapPage,
	DbManipulatePage,
	FrontPage,
	GpsPage,
	LoginPage,
	UserdetailsPage,
	DevDisplayRestPage,
	ExpandableComponent
  ],

  imports: [
  	BrowserModule,
  	IonicModule.forRoot(MyApp),
  	HttpModule,
  	AngularFireDatabaseModule
  ],

  bootstrap: [IonicApp],

  entryComponents: [
	MyApp,
	MapPage,
	DbManipulatePage,
	FrontPage,
	GpsPage,
	LoginPage,
	UserdetailsPage,
	DevDisplayRestPage
```





##### Pages

Esimerkkinä userdetails.

Sivu koostuu neljästä pulikasta, joista kaksi on olennaisia: userdetails.html, userdetails.ts.





![tree-userdetails](/readme_files/tree-userdetails.png)



##### userdetails.html

```html
<ion-header>
    <ion-navbar color="primary">
      
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>

      <ion-title>User Details</ion-title>

    </ion-navbar>
  </ion-header>

<ion-content padding>
  <form [formGroup]="signupForm" (submit)="signupUser()" novalidate>
<ion-list>
  <ion-item>
    <ion-label>Urheilu</ion-label>
    <ion-checkbox checked="false" formControlName="urheilu"></ion-checkbox>
  </ion-item>
  
  <ion-item>
    <ion-label>Musiikki</ion-label>
      <ion-checkbox checked="false" formControlName="musiikki"></ion-checkbox
  </ion-item>
  <ion-item>
      <ion-label>Elokuvat</ion-label>
      <ion-checkbox checked="false" formControlName="elokuvat"></ion-checkbox>
  </ion-item>

  <ion-item>
      <ion-label>TVohjelmat</ion-label>
      <ion-checkbox checked="false" formControlName='tvohjelmat'></ion-checkbox>
  </ion-item>

  <ion-item>
    <ion-label>Kirjat</ion-label>
    <ion-checkbox checked="false" formControlName='kirjat'></ion-checkbox>
  </ion-item>

  <ion-item>
    <ion-label>Pelit</ion-label>
    <ion-checkbox checked="false" formControlName='pelit'></ion-checkbox>
  </ion-item>

  <ion-item>
      <ion-label> Kotikuntasi</ion-label>
      <ion-select formControlName="kotikunta">
        <ion-option>Helsinki</ion-option>
        <ion-option>Espoo</ion-option>
        <ion-option>Vantaa</ion-option>
        <ion-option>Kauniainen</ion-option>
      </ion-select>
  </ion-item>
</ion-list>
    <button ion-button block type="submit">
      Lähetä tiedot
    </button>
  </form>
</ion-content>
```



##### userdetails.ts

Importit, huomioi firebase

```typescript
import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
```
@Dekoraattorit, vertaa app.components.ts
```typescript
@IonicPage({
  name: 'userdetails'
})

@Component({
  selector: 'page-userdetails',
  templateUrl: 'userdetails.html',
})

export class UserdetailsPage {
```
  Muuttujat, huomaa tyypitys
  ```typescript
  public first: boolean;
  public signupForm: FormGroup;
  public loading: Loading;
  ```
Konstruktori, tähän laitetut tulevat käyttöön koodissa
```typescript
  constructor(
  	 public navCtrl: NavController,
     public authProvider: AuthData,
     public formBuilder: FormBuilder, 
     public loadingCtrl: LoadingController,
     public alertCtrl: AlertController

  ) {
```
Ks. Angular formBuilder
```typescript
    
       this.signupForm = formBuilder.group({
         urheilu: [false],
         musiikki: [false],
         tvohjelmat: [false],
         elokuvat: [false],
         pelit: [false],
         kirjat: [false],
         kotikunta: ['']
       });
     }
```
Funktio, lukee signupFormin ja kutsuu sillä toista funktiota
```typescript
signupUser(){
  let data: string;
  data = this.signupForm.value;
  console.log(this.signupForm.value);
  this.putInfoToFirebase(data);
}
```
Funktio, tuuppaa dataa Firebaseen
```typescript
putInfoToFirebase(userDetailedInfo: string): void {
  const personRef: firebase.database.Reference = firebase.database().ref('/' + firebase.auth().currentUser.uid);
     personRef.set({
       userDetailedInfo
     })
	}
}
```



## Tekijät

* **Hans Hokka** - *Initial work*



