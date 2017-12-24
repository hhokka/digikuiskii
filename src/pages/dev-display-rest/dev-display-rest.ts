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
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public fireparserProvider: FireparserProvider) {
    this.getUsers();
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
  getUsers() {
    this.restProvider.getRemoteData()
      .then(data => {
        this.printData = data;
        this.printData = JSON.parse(this.printData._body);
        console.log('printData: ' + JSON.stringify(this.printData[0]));

      });
  };

  /* Inputs jobs' coords and calculates distance to current pos. */
getDistance(x,y){
 return this.fireparserProvider.getDistance(x,y);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DevDisplayRestPage');
  };
}