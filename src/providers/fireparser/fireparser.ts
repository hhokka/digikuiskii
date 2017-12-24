import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { History } from '../../shared/history';
import { HistoryProvider } from '../../providers/history/history';
import { Promotion } from '../../shared/promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';
import { IonicPage, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Frequency } from '../../shared/frequency';
/*
  Generated class for the FireparserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireparserProvider {

  public allDataPerUser: any;
  firstName: string;
  lastName: string;
  address: string;
  addresses: any;
  latitude: any;
  longitude: any;
  allDataRef: firebase.database.Reference = firebase.database().ref('/' + firebase.auth().currentUser.uid);

  arr1 = ['1', '1', '1', '1', '1', '3', 'a', '3', 'a', '2', '4', '9', '3'];
  mf = 1;
  m = 0;
  item;
  setLatitude(latitude) {
    this.latitude = latitude;
 }

  setLongitude(longitude) {
    this.longitude = longitude;

  }

  public getLatitude() {
    return this.latitude;
  }

  public getLongitude() {
    return this.longitude;
  }

  setUserName(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getUserName() {
    return this.firstName + ' ' + this.lastName;
  }

  getAddress() {
    this.getJSON('address');

    return this.address;
  }

  getAddresses() {
    var x;
    this.getJSON('addresses');
    if (this.addresses != null) {
      for (x in this.addresses) {
        this.getFrequencys(this.addresses[x]);
      }



    };
    return this.addresses;
  }


  setAddress(addr) {
    this.address = addr;
  }

  setAddresses(addr) {
    this.addresses = addr;

  }
  constructor(public http: Http) {
    this.firstName = 'Blank';
    this.lastName = 'Name';
    console.log('Hello FireparserProvider Provider');
  }

  getFrequencys(array) {

    for (var i = 0; i < array.length; i++) {
      for (var j = i; j < array.length; j++) {
        if (array[i] == array[j])
          this.m++;
        if (this.mf < this.m) {
          this.mf = this.m;
          this.item = array[i];
        }
      }
      this.m = 0;
    }
    console.log('a freq: ' + this.item + " ( " + this.mf + " times ) ");
  }
  ngOnInit() {
  }
  public getDistance(latitude1: number, longitude1: number) {
this.getJSON('latitude');
this.getJSON('longitude');
    var distance: number;
    var distanceX: number;
    var distanceY: number;
    distanceX = latitude1 - this.getLatitude();
    distanceY = longitude1 - this.getLongitude();
    distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    console.log('latitude_____: ' + this.getLatitude());
    
    console.log('longitude_____: ' + this.getLongitude());
    
    console.log('distance_____: ' + distance);
    return distance;
  }

  public getJSON(tag) {


    this.allDataRef.on('value', allDataSnapshot => {
      this.allDataPerUser = allDataSnapshot.val();

      if (tag == 'address') {
        this.address = this.allDataPerUser.address;

        return ('address');
      }
      else if (tag == 'addresses') {
        this.addresses = this.allDataPerUser.address_history;
        this.setAddresses(this.addresses);
        return ('address');
      }
      else if (tag == 'latitude') {
        this.setLatitude(this.allDataPerUser.latitude);
        return this.allDataPerUser.latitude;
      }
      else if (tag == 'longitude') {
        this.setLongitude(this.allDataPerUser.longitude);
        return this.allDataPerUser.longitude;
      }
      else {
        console.log('nope');
        return 'nope';
      }
    });
  }


}