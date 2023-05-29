import { Component, OnInit } from '@angular/core';
import { AVAILABLE_ROPE_LENGTHS } from '../shared/model/RopeLength';
import { SPOT_DIFFICULTIES } from '../shared/model/SpotDifficultyLevel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunitySpotService } from './service/community-spot-service';
import { CommunitySpot } from '../shared/model/CommunitySpot';

@Component({
  selector: 'app-community-spot',
  templateUrl: './community-spot.component.html',
  styleUrls: ['./community-spot.component.scss'],
})
export class CommunitySpotComponent implements OnInit {
  public readonly AVAILABLE_ROPE_LENGTHS = AVAILABLE_ROPE_LENGTHS;
  public readonly SPOT_DIFFICULTIES = SPOT_DIFFICULTIES;
  communitySpotFrom: FormGroup = new FormGroup<any>({
    title: new FormControl<string>('', Validators.required),
    street: new FormControl<string>('', Validators.required),
    zip: new FormControl<number>(undefined, Validators.required),
    town: new FormControl<string>('', Validators.required),
    rope: new FormGroup({}),
    difficulty: new FormControl(undefined, Validators.required),
    comments: new FormControl(''),
  });

  constructor(private communitySpotService: CommunitySpotService) {
    let ropeGroup = this.communitySpotFrom.controls['rope'] as FormGroup;
    for (let option of this.AVAILABLE_ROPE_LENGTHS) {
      ropeGroup.addControl(String(option.value), new FormControl(false));
    }
  }

  ngOnInit(): void {}

  submitSpotRecommendation() {
    let value = this.communitySpotFrom.value as CommunitySpotFormValue;
    let dto = this._formValuesToDto(value);
    console.log(JSON.stringify(dto));
    this.communitySpotService
      .saveSpot(dto)
      .then(() => this.communitySpotFrom.reset());
  }

  private _formValuesToDto(formValue: CommunitySpotFormValue): CommunitySpot {
    let selectedRopeLength: number[] = [];
    for (const [k, v] of Object.entries(formValue.rope))
      if (v) {
        selectedRopeLength.push(parseInt(k));
      }
    let additionalInfo = formValue.comments
      .split('\n')
      .map((value) => value.trim())
      .filter((value) => value.length != 0);
    return {
      placeId: '',
      title: formValue.title,
      address1: formValue.street,
      address2: formValue.zip + ' ' + formValue.town,
      coords: undefined,
      bmSpotInfo: {
        difficulty: formValue.difficulty,
        ropeLength: selectedRopeLength,
        additionalInfo: additionalInfo,
      },
    };
  }
}

export interface CommunitySpotFormValue {
  title: string;
  street: string;
  zip: number;
  town: string;
  rope: any;
  difficulty: number;
  comments: string;
}
