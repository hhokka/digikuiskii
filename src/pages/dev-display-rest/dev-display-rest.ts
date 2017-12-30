import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FireparserProvider } from '../../providers/fireparser/fireparser'
import * as firebase from 'firebase';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { reorderArray } from 'ionic-angular/util/util';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the DevDisplayRestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dev-display-rest',
  templateUrl: 'dev-display-rest.html',
})
export class DevDisplayRestPage {
  shownGroup = null;
  users: any;
  printData: any;
  value: any;
  movies: any;
  movie: {};
  obj: any;
  txt: string;
  distance: number;
  options: GeolocationOptions;
  currentPos: Geoposition;
  latitude: number;
  longitude: number;
  timestamp: number;
  speed: number;
  result: string;
  address: string;
  displayAddress: string;
  displayAddresses: string;
  testRadioOpen: boolean;
  testRadioResult;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public fireparserProvider: FireparserProvider,
    public geolocation: Geolocation,
    public alertCtrl: AlertController) {


  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };
  /* Inputs jobs' coords and calculates distance to current pos. */

  getDistance(x, y) {
    return this.fireparserProvider.getDistance(x, y);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevDisplayRestPage');
    this.getUsers();

  }

  sortPrintDataBySelection(printData, selector) {
    if (selector == 'aidinkieli') {
      this.printData.sort(function (a, b) {
        if (a.tag == 1) return -1;
        if (a.tag != 1) return 1;
        return 0;
      })
    }
    if (selector == 'liikunta') {
      this.printData.sort(function (a, b) {
        if (a.tag == 2) return -1;
        if (a.tag != 2) return 1;
        return 0;
      })
    }
    if (selector == 'musiikki') {
      this.printData.sort(function (a, b) {
        if (a.tag == 3) return -1;
        if (a.tag != 3) return 1;
        return 0;
      })
    }
    if (selector == 'biologia') {
      this.printData.sort(function (a, b) {
        if (a.tag == 4) return -1;
        if (a.tag != 4) return 1;
        return 0;
      })
    }

    if (selector == 'distance') {
      this.printData.sort(function (a, b) {
        if (a.distance < b.distance) return -1;
        if (a.distance > b.distance) return 1;
        return 0;
      })
    }

  }
  getUsers() {
    this.doRadio();
    this.restProvider.getRemoteData()
      .then(data => {
        this.printData = data;
        this.printData = JSON.parse(this.printData._body);
        for (let i in this.printData) {



          this.printData[i].tag = Math.floor(Math.random() * 5);;
          this.printData[i].distance = this.getDistance(

            this.printData[i].x, this.printData[i].y);
        }
        this.sortPrintDataBySelection(this.printData, 'tag');
        console.log('printData: ' + JSON.stringify(this.printData[0]));
      });


  };

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

      console.log(this.latitude);
    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }
  doRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Valitse järjestysperuste');

    alert.addInput({
      type: 'radio',
      label: 'Etäisyys',
      value: 'distance',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Äidinkieli',
      value: 'aidinkieli'

    });

    alert.addInput({
      type: 'radio',
      label: 'Liikunta',
      value: 'liikunta'
    });

    alert.addInput({
      type: 'radio',
      label: 'Musiikki',
      value: 'musiikki'
    });

    alert.addInput({
      type: 'radio',
      label: 'Biologia',
      value: 'biologia'
    });

    alert.addButton('Peru');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.sortPrintDataBySelection(this.printData, data);
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

}