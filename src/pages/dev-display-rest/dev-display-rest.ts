import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
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
  users: any;
  printData: any;
  value: any;
  movies: any;
  movie: {};
  obj: any;
  txt: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.getUsers();
  }
  getUsers() {
    this.restProvider.getRemoteData()
    .then(data => {
      this.printData = data;
      this.printData = this.printData._body;
     });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DevDisplayRestPage');
  }

}

// SOLVE BREAKING JSON -> NG-REPEAT. PROBABLY HAVE TO STRIP AND CLEAN JSON OBJECT.
