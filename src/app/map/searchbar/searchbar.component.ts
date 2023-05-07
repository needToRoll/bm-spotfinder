import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AVAILABLE_ROPE_LENGTHS, RopeLength} from "../../model/RopeLength";
import {SPOT_DIFFICULTIES, SpotDifficultyLevel} from "../../model/SpotDifficultyLevel";
import {FormControl, FormGroup} from "@angular/forms";
import {SpotFilter} from "../../model/SpotFilter";
import {Options} from "ngx-google-places-autocomplete/objects/options/options";
import {PlaceSearchResult} from "../../model/PlaceSearchResult";

@Component({
  selector: 'map-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  expanded: boolean = true

  @Output()
  spotFilterValue: EventEmitter<SpotFilter>
  @Output()
  placeFound: EventEmitter<PlaceSearchResult>

  ropeLengthOptions: RopeLength[] = AVAILABLE_ROPE_LENGTHS
  difficultyOptions: SpotDifficultyLevel[] = SPOT_DIFFICULTIES
  npxPlaceSearchAutocompleteOptions = new Options({
    types: ['geocode'],
    fields: ['place_id', 'formatted_address', 'geometry.location']

  });

  mapPlaceSearchControl: FormControl
  surfSpotFilterControl: FormGroup

  constructor() {
    this.spotFilterValue = new EventEmitter<SpotFilter>()
    this.placeFound = new EventEmitter<PlaceSearchResult>();
    this.mapPlaceSearchControl = new FormControl()
    this.surfSpotFilterControl = new FormGroup({
      ropeLength: new FormControl(),
      difficulty: new FormControl()
    })
  }

  ngOnInit(): void {
    this.surfSpotFilterControl.valueChanges.subscribe(value => this.spotFilterValue.emit(value))
  }


  onPlaceFoundBasedOnSearch(locationSearchResult: PlaceSearchResult) {
    this.placeFound.emit(locationSearchResult)
  }
}
