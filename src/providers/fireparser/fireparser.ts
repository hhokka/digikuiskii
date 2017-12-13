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


/*
  Generated class for the FireparserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireparserProvider {

  constructor(public http: Http) {
    console.log('Hello FireparserProvider Provider');
  }

  myPerson = {};

  ngOnInit() {
  }

  createPerson(firstName: string, lastName: string): void {
    alert (firstName + " " +  lastName);
    const personRef: firebase.database.Reference = firebase.database().ref(`/Data/`);
    personRef.set({
      firstName,
      lastName
    })
  }

  updatePerson(firstName: string, lastName: string): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/Data/`);
    personRef.update({
      firstName,
      lastName
    })
  }

  deletePerson(): void {
    const personRef: firebase.database.Reference = firebase.database().ref(`/Data/`);
    personRef.remove()
  }
  ionViewDidLoad() {
    const personRef: firebase.database.Reference = firebase.database().ref(`Data`);
    personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
    });
  }
}
