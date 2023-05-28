import {Component, Input, OnInit} from '@angular/core';
import {SurfSpot} from "../../shared/model/SurfSpot";
import {environment} from "../../../environments/environment";
import {HydroDataProviderService} from "../service/hydro/hydro-data-provider.service";
import {Observable} from "rxjs";
import {HydroDetails} from "../../shared/model/HydroDetails";

@Component({
  selector: 'app-spot-details',
  templateUrl: './spot-details.component.html',
  styleUrls: ['./spot-details.component.scss']
})
export class SpotDetailsComponent implements OnInit {

  @Input() surfspot: SurfSpot

  constructor(private _hydoDataProvider: HydroDataProviderService) {
  }

  ngOnInit(): void {
  }

  getAddressPartsList(): string[] {
    return [this.surfspot.address1, this.surfspot.address2]
  }

  getRopeLengthsWithUnit(): string[] {
    return this.surfspot.bmSpotInfo.ropeLength.sort().map(value => value + " " + environment.ropeLengthUnit);
  }

  spotWithHydroDetails(): Observable<HydroDetails> {
    return this._hydoDataProvider.readHydroDataForSpot(this.surfspot)
  }
}
