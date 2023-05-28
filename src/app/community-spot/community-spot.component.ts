import {Component, OnInit} from '@angular/core';
import {AVAILABLE_ROPE_LENGTHS} from "../shared/model/RopeLength";
import {SPOT_DIFFICULTIES} from "../shared/model/SpotDifficultyLevel";
import {UntypedFormGroup} from "@angular/forms";
import {PlaceSearchResult} from "../shared/model/PlaceSearchResult";

@Component({
  selector: 'app-community-spot',
  templateUrl: './community-spot.component.html',
  styleUrls: ['./community-spot.component.scss']
})
export class CommunitySpotComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  protected readonly AVAILABLE_ROPE_LENGTHS = AVAILABLE_ROPE_LENGTHS;
  protected readonly SPOT_DIFFICULTIES = SPOT_DIFFICULTIES;
  surfSpotFilterControl: UntypedFormGroup;


  onPlaceFoundBasedOnSearch(locationSearchResult: PlaceSearchResult) {
    return
    //this.placeFound.emit(locationSearchResult)
  }
}
