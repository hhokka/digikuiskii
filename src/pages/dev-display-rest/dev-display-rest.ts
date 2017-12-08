import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.getUsers();
  }
  getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(JSON.stringify(data)); // PROBLEM LIES HERE
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DevDisplayRestPage');
  }

}

// SOLVE BREAKING JSON -> NG-REPEAT. PROBABLY HAVE TO STRIP AND CLEAN JSON OBJECT.
