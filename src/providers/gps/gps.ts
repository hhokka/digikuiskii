import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { Gps } from '../../shared/gps';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class GpsProvider {

  constructor(public http: Http,
    private processHTTPMsgService: ProcessHttpmsgProvider) { }
  getGeolocation(): Observable<Gps> {
    let gpsMockData = {
      name: 'name',
      location: 'location',
      country: 'country',
      latitude: 666,
      longitude: 666,
      icontype: 'icontype',
    }
    return Observable.of(gpsMockData);
  };
}