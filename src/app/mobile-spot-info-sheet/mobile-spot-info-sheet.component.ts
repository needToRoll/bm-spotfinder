import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {SurfSpot} from "../model/SurfSpot";

@Component({
  selector: 'app-mobile-spot-info-sheet',
  templateUrl: './mobile-spot-info-sheet.component.html',
  styleUrls: ['./mobile-spot-info-sheet.component.css']
})
export class MobileSpotInfoSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {spot: SurfSpot},
    private _bottomSheetRef: MatBottomSheetRef<MobileSpotInfoSheetComponent>
  ) { }

  ngOnInit(): void {
  }

}
