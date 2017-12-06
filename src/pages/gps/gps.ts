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

  constructor(public navCtrl: NavController,
    private dishservice: DishProvider,
    private promotionservice: PromotionProvider,
    private leaderservice: LeaderProvider,
    private gpsservice: GpsProvider,
    private geolocation: Geolocation,
    private geocoder: GeocoderProvider,
    private http: Http,

    @Inject('BaseURL') private BaseURL) { }

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
    this.getUserPosition();
    let interval: number = setInterval(() => {
      this.updateLocationToFirebase(iterator, this.timestamp, this.latitude, this.longitude);
      iterator++;
      this.getUserPosition();
    }, 1000);
  }
  updateLocationToFirebase(index: number, timestamp: number, latitude: number, longitude: number): void {
    const locationRef: firebase.database.Reference = firebase.database().ref('/Data/user/Hans/Location/' + index + '/' + timestamp + '/')
    this.result = JSON.stringify(this.geocoder.getLocation('finland'));
    locationRef.set({
      //address,
      latitude,
      longitude
    });
    console.log('address: ' + this.result);
  }

  
  ngOnInit() {
    this.gpsservice.getGeolocation()
      .subscribe(gps => this.gps = gps,
      errmess => this.gpsErrMess = <any>errmess);

  }

}