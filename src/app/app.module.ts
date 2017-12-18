import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { DbManipulatePage } from '../pages/dbmanipulate/dbmanipulate';

import { FrontPage } from '../pages/front/front';
import { GpsPage } from '../pages/gps/gps';

import { baseURL } from '../shared/baseurl';
import { Frequency } from '../shared/frequency';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DishProvider } from '../providers/dish/dish';
import { LeaderProvider } from '../providers/leader/leader';
import { PromotionProvider } from '../providers/promotion/promotion';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';
import { HistoryProvider } from '../providers/history/history';
import { GpsProvider } from '../providers/gps/gps';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { Firebase } from '@ionic-native/firebase';
import { LoginPage } from '../pages/login/login';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';
import { Camera } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AuthData } from '../providers/auth/auth';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { UserdetailsPage } from '../pages/userdetails/userdetails';
import { RestProvider } from '../providers/rest/rest';
import { DevDisplayRestPage } from '../pages/dev-display-rest/dev-display-rest'
import { FireparserProvider } from '../providers/fireparser/fireparser';
import { ExpandableComponent } from '../components/expandable/expandable';
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    ProcessHttpmsgProvider,
    { provide: 'BaseURL', useValue: baseURL },
    HistoryProvider,
    GpsProvider,
    GoogleMaps,
    Camera,
    EmailComposer,
    SocialSharing,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Firebase,
    EventProvider,
    ProfileProvider,
    AndroidPermissions,
    AngularFireAuth,
    AuthData,
    NativeGeocoder,
    GeocoderProvider,
    RestProvider,
    FireparserProvider

  ]
})

export class AppModule { }
