import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  
  apiUrl:string = 'https://jsonplaceholder.typicode.com/posts';
  testUrl = 'http://echo.jsontest.com/';
  randomUrl = 'https://randomuser.me/api/';
  remoteUrl = 'http://gis.vantaa.fi/rest/tyopaikat/v1/Opetusala';
  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  getRemoteData() {
    return new Promise(resolve => {
      this.http.get(this.remoteUrl+'').subscribe(data => {
        
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  postRemoteData(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
