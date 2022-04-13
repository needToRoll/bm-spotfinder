import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  // positionDetectedEmitter: EventEmitter<GeolocationPosition>
  //
  // constructor() {
  //   this.positionDetectedEmitter = new EventEmitter();
  // }

  getUserLocation(): Promise<GeolocationPosition> {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
    } else {
      // Browser doesn't support
      return Promise.reject("Geolocation lookup not supported")
    }
  }
}
