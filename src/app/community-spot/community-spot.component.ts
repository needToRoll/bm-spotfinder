import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AVAILABLE_ROPE_LENGTHS } from '../shared/model/RopeLength';
import { SPOT_DIFFICULTIES } from '../shared/model/SpotDifficultyLevel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunitySpotService } from './service/community-spot-service';
import { CommunitySpot } from '../shared/model/CommunitySpot';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-community-spot',
  templateUrl: './community-spot.component.html',
  styleUrls: ['./community-spot.component.scss'],
})
export class CommunitySpotComponent implements OnInit {
  public readonly AVAILABLE_ROPE_LENGTHS = AVAILABLE_ROPE_LENGTHS;
  public readonly SPOT_DIFFICULTIES = SPOT_DIFFICULTIES;
  overlayPortal: TemplatePortal;
  overlayRef: OverlayRef;
  @ViewChild('progressSpinnerRef')
  spinnerTemplateRef: TemplateRef<MatProgressSpinner>;

  communitySpotFrom: FormGroup = new FormGroup<any>({
    title: new FormControl<string>('', Validators.required),
    street: new FormControl<string>('', Validators.required),
    zip: new FormControl<number>(undefined, Validators.required),
    town: new FormControl<string>('', Validators.required),
    rope: new FormGroup({}),
    difficulty: new FormControl(undefined, Validators.required),
    comments: new FormControl(''),
  });

  constructor(
    private vcRef: ViewContainerRef,
    private communitySpotService: CommunitySpotService,
    private overlay: Overlay
  ) {
    let ropeGroup = this.communitySpotFrom.controls['rope'] as FormGroup;
    for (let option of this.AVAILABLE_ROPE_LENGTHS) {
      ropeGroup.addControl(String(option.value), new FormControl(false));
    }
  }

  ngOnInit(): void {
    this._initializeSpinnerOverlay();
  }

  submitSpotRecommendation() {
    if (this.communitySpotFrom.valid) {
      this.overlayRef.attach(this.overlayPortal);
      let value = this.communitySpotFrom.value as CommunitySpotFormValue;
      let dto = this._formValuesToDto(value);
      console.log(JSON.stringify(dto));
      this.communitySpotService
        .saveSpot(dto)
        .then(() => this.communitySpotFrom.reset())
        .finally(() => this._closeSpinner());
    }
  }

  private _closeSpinner() {
    return this.overlayRef.detach();
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
      placeId: 'UNKNOWN',
      title: formValue.title,
      address1: formValue.street,
      address2: formValue.zip + ' ' + formValue.town,
      coords: {
        lat: 0.0,
        lng: 0.0,
      },
      bmSpotInfo: {
        difficulty: formValue.difficulty,
        ropeLength: selectedRopeLength,
        additionalInfo: additionalInfo,
      },
    };
  }

  private _initializeSpinnerOverlay() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
    this.overlayPortal = new TemplatePortal(
      this.spinnerTemplateRef,
      this.vcRef
    );
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
