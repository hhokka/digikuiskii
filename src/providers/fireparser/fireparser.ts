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

  public allDataPerUser: any;
  public firstName: string;
  lastName: string;
  constructor(public http: Http) {
    console.log('Hello FireparserProvider Provider');
  }


  ngOnInit() {
  }

  public getJSON(tag) {
    const allDataRef: firebase.database.Reference = firebase.database().ref('/' + firebase.auth().currentUser.uid + '/');
    allDataRef.on('value', allDataSnapshot => {
      this.allDataPerUser = allDataSnapshot.val();
      if (tag == 'address'){
        console.log('yup');
      return ('this.allDataPerUser');
      }else{
        console.log('nope');
        return 'nope';
      }
    });
  }

 /*WON'T RETURN ANYTHING, MAYBE SHOULD USE SLT:

  parameter: ReplaySubject<string> = new ReplaySubject<string>(1);
  
  constructor(public http: Http, public storage: Storage) {
    storage.get('Parameter').then((param) => {
      if (param) {
        this.parameter.next(param);
      } else {
        http.get('url').subscribe((rsp) => {
          this.parameter.next(rsp.json().parameter);
          // you could save it in storage here if you want
        }
        // TODO: error handling
      }
    }
  }
  
  class Page {
    parameter: string = "loading...or whatever dummy value makes sense";
  
    constructor(pp: ParameterProvider) {
      pp.parameter.subscribe((param) => {
        this.parameter = param;
      }
    }
  } */

  getAddress(){
    console.log('this ' + this.getJSON('address'));
    return this.getJSON('address');
  }
}