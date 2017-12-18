import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { Promotion } from '../../shared/promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';
import { Gps } from '../../shared/gps';
import { GpsProvider } from '../../providers/gps/gps';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import * as firebase from 'firebase';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';
import { Http } from '@angular/http';
import { ViewChild, ElementRef } from '@angular/core';
import { FireparserProvider } from '../../providers/fireparser/fireparser';
import { Frequency } from '../../shared/frequency';
declare var google;
@Component({
  selector: 'page-gps',
  templateUrl: 'gps.html'
})
export class GpsPage implements OnInit {


  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;
  gpsErrMess: string;
  gps: Gps;
  latitude: number;
  longitude: number;
  timestamp: number;
  speed: number;
  options: GeolocationOptions;
  currentPos: Geoposition;
  result: string;
  address: string;
  displayAddress: string;
  displayAddresses: string;

  constructor(public navCtrl: NavController,
    private dishservice: DishProvider,
    private promotionservice: PromotionProvider,
    private leaderservice: LeaderProvider,
    private gpsservice: GpsProvider,
    private geolocation: Geolocation,
    private geocoder: GeocoderProvider,
    private http: Http,
    private fireparserservice: FireparserProvider,

    @Inject('BaseURL') private BaseURL) { }

  set(){
    this.fireparserservice.setUserName('hans', 'hokka');
  }
  get(){
    console.log('get: ' + this.fireparserservice.getAddress());
    this.displayAddress = this.fireparserservice.getAddress();
    this.displayAddresses = this.fireparserservice.getAddresses();
  }
  getUserPosition() {
    this.options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      this.currentPos = pos;
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
      this.timestamp = pos.timestamp;
      this.speed = pos.coords.speed;
      //console.log(pos);

    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }
  ionViewDidEnter() {
    let iterator: number = 0;
    this.set();
    this.getUserPosition();
    this.get();
    let interval: number = setInterval(() => {
      this.updateLocationToFirebase(iterator, this.timestamp, this.latitude, this.longitude);
      iterator++;
      this.getUserPosition();
      this.get();
      
      
    }, 5000);
  }


  // TYPESCRIPT SCOPE ISSUE: THIS.ADDRESS DOESN'T SHOW OUTSIDE GEOCODE FUNCTION

  updateLocationToFirebase(index: number, timestamp: number, latitude: number, longitude: number): void {

    var address: string;
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(this.latitude, this.longitude);
    var request = {
      latLng: latlng
    };
    geocoder.geocode(request, function (data, status) {
      this.address = data[0].formatted_address;

      if (status == google.maps.GeocoderStatus.OK) {
        if (data[0] != null) {
          const addressRef: firebase.database.Reference = firebase.database().ref('/' + firebase.auth().currentUser.uid + '/address/');
          const latitudeRef: firebase.database.Reference = firebase.database().ref('/' + firebase.auth().currentUser.uid + '/latitude/');
          const longitudeRef: firebase.database.Reference = firebase.database().ref('/' + firebase.auth().currentUser.uid + '/longitude/');
          const addressHistoryRef: firebase.database.Reference = firebase.database().ref('/' + firebase.auth().currentUser.uid + '/address_history');
          addressRef.set(data[0].formatted_address);
          latitudeRef.set(latitude);
          longitudeRef.set(longitude);
          addressHistoryRef.push().set(data[0].formatted_address);
        } else {
          alert("No address available");
        }
      }

    });

  }

  ngOnInit() {
    this.gpsservice.getGeolocation()
      .subscribe(gps => this.gps = gps,
      errmess => this.gpsErrMess = <any>errmess);

  }

}



