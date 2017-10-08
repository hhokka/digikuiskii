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

  constructor(public navCtrl: NavController,
    private dishservice: DishProvider,
    private promotionservice: PromotionProvider,
    private leaderservice: LeaderProvider,
    private gpsservice: GpsProvider,
    private geolocation: Geolocation,

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
      console.log(pos);

    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }
  ionViewDidEnter() {
    this.getUserPosition();
  }

  ngOnInit() {
    this.gpsservice.getGeolocation()
      .subscribe(gps => this.gps = gps,
      errmess => this.gpsErrMess = <any>errmess);

  }

}