import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

/*
  Generated class for the GeocoderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocoderProvider {

  constructor(public http: Http, private nativeGeocoder: NativeGeocoder) {

    console.log('Hello GeocoderProvider Provider');
  }
  public getAddressFromCoords() {
    return this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
    .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
    .catch((error: any) => console.log(error));
  }  
  public getCoordsFromAddress() {
    return this.nativeGeocoder.forwardGeocode('Berlin')
      .then((coordinates: NativeGeocoderForwardResult) => console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
      .catch((error: any) => console.log(error));
  };

}
