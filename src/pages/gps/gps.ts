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
  visibleAddress: any;

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

  getUserPosition() {
    this.options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      this.fireparserservice.createPerson('teemu', 'testaaja');
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
  returnValue(rdata){
    return rdata;
  }
  ionViewDidEnter() {
    let iterator: number = 0;
    let address;
    this.getUserPosition();
    let interval: number = setInterval(() => {
      this.updateLocationToFirebase(iterator, this.timestamp, this.latitude, this.longitude, this.returnValue);
      iterator++;
      this.getUserPosition();
    }, 1000);
  }
  // TYPESCRIPT SCOPE ISSUE: THIS.ADDRESS DOESN'T SHOW OUTSIDE GEOCODE FUNCTION

  updateLocationToFirebase = async(index: number, timestamp: number, latitude: number, longitude: number, returnValue) => {
    var address;
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(this.latitude, this.longitude);
    var request = {
      latLng: latlng
    };
    geocoder.geocode(request, function (data, status) {
      address = data[0].formatted_address;
      returnValue(address);
      if (status == google.maps.GeocoderStatus.OK) {
        if (data[0] != null) {
          const locationRef: firebase.database.Reference = firebase.database().ref('/Data/user/Hans/Location/' + index + '/Timestamp: ' + timestamp + '/Address: ' + this.address);
          locationRef.set({
            latitude,
            longitude
          });

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




