import {Component, Input, OnInit} from '@angular/core';
import {SurfSpot} from "../../../shared/model/SurfSpot";
import {HydroDetails} from "../../../shared/model/HydroDetails";

@Component({
  selector: 'app-water-level-attribute',
  templateUrl: './water-level-attribute.component.html',
  styleUrls: ['./water-level-attribute.component.css']
})
export class WaterLevelAttributeComponent implements OnInit {

  private readonly WATER_INDICATOR_BASE_CLASS = "water-flow-indicator"
  private readonly WATER_INDICATOR_OK_CLASS = "ok"
  private readonly WATER_INDICATOR_NOK_CLASS = "nok"

  @Input() surfSpot: SurfSpot
  @Input() hydroDetails: HydroDetails

  constructor() {
  }

  ngOnInit(): void {
  }

  getIndicatorCssClasses(): string[] {
    let classesToAdd = [this.WATER_INDICATOR_BASE_CLASS]
    let now = new Date()
    let lastValidMeasurementTime = new Date()
    lastValidMeasurementTime.setHours(now.getHours()-1)
    if(this.hydroDetails.value != -1 && new Date(this.hydroDetails.measuredAt) >= lastValidMeasurementTime) {
      if(this.surfSpot.bmSpotInfo.minimalWaterLevel <= this.hydroDetails.value){
        classesToAdd.push(this.WATER_INDICATOR_OK_CLASS)
      } else {
        classesToAdd.push(this.WATER_INDICATOR_NOK_CLASS)
      }
    }
    return classesToAdd;
  }
}
