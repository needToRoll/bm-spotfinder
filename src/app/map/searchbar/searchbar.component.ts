import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import {
  AVAILABLE_ROPE_LENGTHS,
  RopeLength,
} from '../../shared/model/RopeLength';
import {
  SPOT_DIFFICULTIES,
  SpotDifficultyLevel,
} from '../../shared/model/SpotDifficultyLevel';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { SpotFilter } from '../../shared/model/SpotFilter';
import { PlaceSearchResult } from '../../shared/model/PlaceSearchResult';

@Component({
  selector: 'map-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  expanded: boolean = true;

  @HostListener('window:scroll', []) onWindowScroll() {
    if (this.expanded) {
      // do some stuff here when the window is scrolled
      const verticalOffset =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.expanded = verticalOffset == 0;
    }
  }

  @Output()
  spotFilterValue: EventEmitter<SpotFilter>;
  @Output()
  placeFound: EventEmitter<PlaceSearchResult>;

  ropeLengthOptions: RopeLength[] = AVAILABLE_ROPE_LENGTHS;
  difficultyOptions: SpotDifficultyLevel[] = SPOT_DIFFICULTIES;
  // readonly npxPlaceSearchAutocompleteOptions: Options = new Options({
  //   types: ['geocode'],
  //   fields: ['place_id', 'formatted_address', 'geometry.location']
  // });

  mapPlaceSearchControl: UntypedFormControl;
  surfSpotFilterControl: UntypedFormGroup;

  constructor() {
    this.spotFilterValue = new EventEmitter<SpotFilter>();
    this.placeFound = new EventEmitter<PlaceSearchResult>();
    this.mapPlaceSearchControl = new UntypedFormControl();
    this.surfSpotFilterControl = new UntypedFormGroup({
      ropeLength: new UntypedFormControl(),
      difficulty: new UntypedFormControl(),
    });
  }

  ngOnInit(): void {
    this.surfSpotFilterControl.valueChanges.subscribe((value) =>
      this.spotFilterValue.emit(value)
    );
  }

  onPlaceFoundBasedOnSearch(locationSearchResult: PlaceSearchResult) {
    this.placeFound.emit(locationSearchResult);
  }
}
