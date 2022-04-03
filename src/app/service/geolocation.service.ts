import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  positionDetectedEmitter: EventEmitter<GeolocationPosition>

  constructor() {
    this.positionDetectedEmitter = new EventEmitter();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.positionDetectedEmitter.emit(pos)
        },
        () => {
          console.warn("Geolocation lookup attempt failed")
        }
      );
    } else {
      // Browser doesn't support Geolocation
      console.warn("Geolocation lookup not supported")
    }
  }
}
