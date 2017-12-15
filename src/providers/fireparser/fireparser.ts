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
  firstName: string;
  lastName: string;
  address: string;

  setUserName(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;       
  }

  getUserName() {
      return this.firstName + ' ' + this.lastName;
  }  
  
  getAddress(){
    this.getJSON('address');
    return this.address;
  }

  setAddress(addr){
    this.address = addr;
    console.log(addr);
    alert(addr);
  }
  constructor(public http: Http) {
    this.firstName = 'Blank';
    this.lastName = 'Name';
    console.log('Hello FireparserProvider Provider');
  }


  ngOnInit() {
  }

  public getJSON(tag) {
    const allDataRef: firebase.database.Reference = firebase.database().ref('/' + firebase.auth().currentUser.uid + '/');
    allDataRef.on('value', allDataSnapshot => {
      this.allDataPerUser = allDataSnapshot.val();
      if (tag == 'address'){
        this.address = JSON.stringify(this.allDataPerUser);
        this.setAddress(this.address);
        console.log(this.address[0]);
      return ('this.allDataPerUser');
      }else{
        console.log('nope');
        return 'nope';
      }
    });
  }
  
  
}