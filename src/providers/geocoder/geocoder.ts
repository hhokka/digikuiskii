import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class GeocoderProvider {
    constructor(private http: Http) { }
    getLocation(term: string) {
       return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + term + 'CA&sensor=false').map
       ((response) => response.json());
    }
// tslint:disable-next-line:eofline
}
