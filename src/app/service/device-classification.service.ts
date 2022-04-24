import { Injectable } from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";

@Injectable({
  providedIn: 'root'
})
export class DeviceClassificationService {

  constructor(private deviceService: DeviceDetectorService) { }

  public shouldUseBottomSheet(): boolean {
    console.log(window.innerWidth)
    return (!this.deviceService.isDesktop() && this.isTouchDevice()) || window.innerWidth < 1750
  }

  public isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))
  }
}
