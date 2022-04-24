import {Component, Input, OnInit} from '@angular/core';
import {SurfSpot} from "../model/SurfSpot";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-spot-details',
  templateUrl: './spot-details.component.html',
  styleUrls: ['./spot-details.component.css']
})
export class SpotDetailsComponent implements OnInit {

  @Input() surfspot: SurfSpot

  constructor() { }

  ngOnInit(): void {
  }

  getAddressPartsList(): string[] {
    return [this.surfspot.address1, this.surfspot.address2]
  }

  getRopeLengthsWithUnit(): string[] {
    return this.surfspot.bmSpotInfo.ropeLength.sort().map(value => value + " " + environment.ropeLengthUnit);
  }

}
