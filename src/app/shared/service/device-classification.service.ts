import {Injectable} from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";

@Injectable({
  providedIn: 'root'
})
export class DeviceClassificationService {

  constructor(private deviceService: DeviceDetectorService) {
  }

  public shouldBeThreadedAsTouchDevice(): boolean {
    return (!this.deviceService.isDesktop() && this.isTouchDevice())
  }

  public isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))
  }
}
