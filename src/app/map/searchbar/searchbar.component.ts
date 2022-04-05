import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AVAILABLE_ROPE_LENGTHS, RopeLength } from "../../model/RopeLength";
import {SPOT_DIFFICULTIES, SpotDifficultyLevel} from "../../model/SpotDifficultyLevel";
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {SpotFilter} from "../../model/SpotFilter";

@Component({
  selector: 'map-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  @Output()
  spotFilterValue: EventEmitter<SpotFilter>

  ropeLengthOptions: RopeLength[] = AVAILABLE_ROPE_LENGTHS
  difficultyOptions: SpotDifficultyLevel[] = SPOT_DIFFICULTIES
  placeAutoCompleteOption: Observable<String[]>
  autoFillValues: string[] = ['One', 'Two', 'Three'];

  mapPlaceSearchControl: FormControl
  surfSpotFilterControl: FormGroup

  constructor() {
    this.spotFilterValue = new EventEmitter<SpotFilter>()
    this.mapPlaceSearchControl = new FormControl()
    this.surfSpotFilterControl = new FormGroup({
      ropeLength: new FormControl(),
      difficulty: new FormControl()
    })
    this.placeAutoCompleteOption = this.mapPlaceSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));
  }

  ngOnInit(): void {
    this.surfSpotFilterControl.valueChanges.subscribe(value => this.spotFilterValue.emit(value))
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.autoFillValues.filter(option => option.toLowerCase().includes(filterValue));
  }

}
