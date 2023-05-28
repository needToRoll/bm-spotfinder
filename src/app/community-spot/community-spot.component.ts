import { Component, OnInit } from '@angular/core';
import { AVAILABLE_ROPE_LENGTHS } from '../shared/model/RopeLength';
import { SPOT_DIFFICULTIES } from '../shared/model/SpotDifficultyLevel';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-community-spot',
  templateUrl: './community-spot.component.html',
  styleUrls: ['./community-spot.component.scss'],
})
export class CommunitySpotComponent implements OnInit {
  protected readonly toString = String;
  public readonly AVAILABLE_ROPE_LENGTHS = AVAILABLE_ROPE_LENGTHS;
  public readonly SPOT_DIFFICULTIES = SPOT_DIFFICULTIES;
  surfSpotFilterControl: UntypedFormGroup;

  constructor() {}

  ngOnInit(): void {}

  submitSpotRecommendation() {}
}
