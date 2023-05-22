import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {SurfSpot} from "../../shared/model/SurfSpot";
import {DistanceMatrixService} from "../service/distance/distance-matrix.service";

@Component({
  selector: 'app-mobile-spot-info-sheet',
  templateUrl: './mobile-spot-info-sheet.component.html',
  styleUrls: ['./mobile-spot-info-sheet.component.scss']
})
export class MobileSpotInfoSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { spot: SurfSpot },
    private _bottomSheetRef: MatBottomSheetRef<MobileSpotInfoSheetComponent>,
    private distanceService: DistanceMatrixService
  ) {
  }

  ngOnInit(): void {
  }

  getSpotTitleText(spot: SurfSpot): string {
    return this.distanceService.getDisplayTitleIncludingDistance(spot);
  }

}
